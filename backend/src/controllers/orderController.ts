import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import prisma from '../utils/prisma';
import stripe from '../utils/stripe';
import { OrderStatus } from '@prisma/client';

export const createCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { items, shippingAddressId } = req.body; // Items should have { productId, quantity }
  const userId = (req as any).user.id;

  if (!items || items.length === 0) {
    return next(new AppError('No items in cart', 400));
  }

  // Fetch product details to verify prices and build line_items
  const lineItems = [];
  let totalAmount = 0;
  const orderItemsData = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) return next(new AppError(`Product with id ${item.productId} not found`, 404));
    
    if (product.stock < item.quantity) {
      return next(new AppError(`Not enough stock for ${product.name}`, 400));
    }

    const price = Number(product.price);
    totalAmount += price * item.quantity;

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: product.images.length > 0 ? [product.images[0]] : [],
        },
        unit_amount: Math.round(price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    });

    orderItemsData.push({
      productId: product.id,
      quantity: item.quantity,
      price: price,
    });
  }

  // Create pending order
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      shippingAddressId,
      status: OrderStatus.PENDING,
      items: {
        create: orderItemsData,
      },
    },
  });

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    customer_email: (req as any).user.email,
    client_reference_id: order.id,
    mode: 'payment',
    line_items: lineItems,
  });

  res.status(200).json({
    status: 'success',
    sessionUrl: session.url,
  });
});

export const webhookCheckout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // This MUST be raw body! Handled in app.ts
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Update order status
    const orderId = session.client_reference_id;
    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.PROCESSING,
          paymentId: session.payment_intent,
        },
      });

      // Optionally, deduct stock here
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (order) {
        for (const item of order.items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
    }
  }

  res.status(200).json({ received: true });
});

export const getUserOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await prisma.order.findMany({
    where: { userId: (req as any).user.id },
    include: {
      items: {
        include: { product: { select: { name: true, images: true } } }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders }
  });
});
