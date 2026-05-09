import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import prisma from '../utils/prisma';
import redis from '../utils/redis';
import { OrderStatus } from '@prisma/client';

export const getDashboardAnalytics = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Check cache first (cache analytics for 5 minutes)
  const cachedAnalytics = await redis.get('admin:analytics');
  if (cachedAnalytics) {
    return res.status(200).json({
      status: 'success',
      data: JSON.parse(cachedAnalytics),
    });
  }

  const [totalUsers, totalOrders, totalProducts] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.product.count(),
  ]);

  const orders = await prisma.order.findMany({
    where: { status: { in: [OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] } },
    select: { totalAmount: true },
  });

  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  const analyticsData = {
    totalUsers,
    totalOrders,
    totalProducts,
    totalRevenue,
    recentOrders,
  };

  await redis.setex('admin:analytics', 300, JSON.stringify(analyticsData));

  res.status(200).json({
    status: 'success',
    data: analyticsData,
  });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});
