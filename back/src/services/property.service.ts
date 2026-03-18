import prisma from '../lib/prisma';

export const findAllProperties = async () => {
  return prisma.property.findMany({
    include: { images: true, amenities: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const findPropertyById = async (id: number) => {
  return prisma.property.findUnique({
    where: { id },
    include: { images: true, amenities: true },
  });
};
