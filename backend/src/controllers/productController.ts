import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import prisma from '../utils/prisma';
import redis from '../utils/redis';
import cloudinary from '../utils/cloudinary';

const uploadToCloudinary = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, stock, sku, categoryId, isFeatured } = req.body;

  if (!name || !description || !price || !categoryId || !sku) {
    return next(new AppError('Missing required fields', 400));
  }

  // Handle multiple image uploads
  const files = req.files as Express.Multer.File[];
  const imageUrls: string[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const url = await uploadToCloudinary(file.buffer, 'luneva/products');
      imageUrls.push(url);
    }
  }

  // Generate slug
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10) || 0,
      sku,
      categoryId,
      isFeatured: isFeatured === 'true',
      images: imageUrls,
    },
  });

  // Clear cache
  await redis.del('products');

  res.status(201).json({
    status: 'success',
    data: { product },
  });
});

export const getProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Check Redis cache first
  const cachedProducts = await redis.get('products');

  if (cachedProducts) {
    return res.status(200).json({
      status: 'success',
      results: JSON.parse(cachedProducts).length,
      data: { products: JSON.parse(cachedProducts) },
    });
  }

  const products = await prisma.product.findMany({
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Cache products for 1 hour
  await redis.setex('products', 3600, JSON.stringify(products));

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

export const getProductBySlug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const slug = req.params.slug as string;

  // Try fetching from cache
  const cachedProduct = await redis.get(`product:${slug}`);
  if (cachedProduct) {
    return res.status(200).json({
      status: 'success',
      data: { product: JSON.parse(cachedProduct) },
    });
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
      reviews: {
        include: {
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  await redis.setex(`product:${slug}`, 3600, JSON.stringify(product));

  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  await prisma.product.delete({ where: { id: id as string } });

  // Invalidate caches
  await redis.del('products');
  await redis.del(`product:${product.slug}`);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
