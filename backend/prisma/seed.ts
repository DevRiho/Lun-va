import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  // Clear existing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categoryTotes = await prisma.category.create({
    data: {
      name: 'Tote Bags',
      slug: 'tote-bags',
      description: 'Spacious and elegant tote bags for everyday use.',
    },
  });

  const categoryCrossbody = await prisma.category.create({
    data: {
      name: 'Crossbody Bags',
      slug: 'crossbody-bags',
      description: 'Chic crossbody bags for hands-free convenience.',
    },
  });

  const categoryClutch = await prisma.category.create({
    data: {
      name: 'Clutches',
      slug: 'clutches',
      description: 'Elegant clutches for evening events.',
    },
  });

  // Create Products
  const products = [
    {
      name: 'The Noir Classic Tote',
      slug: 'the-noir-classic-tote',
      description: 'A timeless black leather tote that seamlessly transitions from day to night. Crafted with premium Italian leather and featuring signature gold-tone hardware.',
      price: 850.00,
      stock: 15,
      sku: 'LUN-TOT-001',
      images: [
        'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop'
      ],
      isFeatured: true,
      categoryId: categoryTotes.id,
    },
    {
      name: 'Ivory Crossbody Elegance',
      slug: 'ivory-crossbody-elegance',
      description: 'Compact yet spacious, this ivory crossbody is the perfect companion for your weekend brunches or city strolls.',
      price: 620.00,
      stock: 25,
      sku: 'LUN-CRO-001',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
      ],
      isFeatured: true,
      categoryId: categoryCrossbody.id,
    },
    {
      name: 'Sapphire Evening Clutch',
      slug: 'sapphire-evening-clutch',
      description: 'Make a statement with this stunning sapphire blue clutch, adorned with minimal crystal detailing.',
      price: 450.00,
      stock: 10,
      sku: 'LUN-CLU-001',
      images: [
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop'
      ],
      isFeatured: false,
      categoryId: categoryClutch.id,
    },
    {
      name: 'Caramel Work Tote',
      slug: 'caramel-work-tote',
      description: 'Designed for the modern professional. Fits up to a 15-inch laptop comfortably without sacrificing style.',
      price: 920.00,
      stock: 5,
      sku: 'LUN-TOT-002',
      images: [
        'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000&auto=format&fit=crop'
      ],
      isFeatured: true,
      categoryId: categoryTotes.id,
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
