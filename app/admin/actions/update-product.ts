'use server';

import { prisma } from '@/prisma/db';

export async function updateProduct(productId: number) {
  return await prisma.product.delete({
    where: {
      id: productId,
    },
  });
}
