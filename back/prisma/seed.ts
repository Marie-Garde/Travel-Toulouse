import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.image.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();

  const amenities = await Promise.all([
    prisma.amenity.create({ data: { label: 'Wifi', icon: 'wifi' } }),
    prisma.amenity.create({ data: { label: 'Cuisine équipée', icon: 'utensils' } }),
    prisma.amenity.create({ data: { label: 'Parking', icon: 'car' } }),
    prisma.amenity.create({ data: { label: 'Climatisation', icon: 'wind' } }),
    prisma.amenity.create({ data: { label: 'Lave-linge', icon: 'shirt' } }),
    prisma.amenity.create({ data: { label: 'Terrasse', icon: 'tree-pine' } }),
    prisma.amenity.create({ data: { label: 'Piscine', icon: 'waves' } }),
    prisma.amenity.create({ data: { label: 'Animaux acceptés', icon: 'paw-print' } }),
  ]);

  const [wifi, kitchen, parking, ac, washer, terrace, pool, pets] = amenities;

  const properties = [
    {
      title: 'Loft design au cœur du Capitole',
      description:
        'Magnifique loft industriel à deux pas de la place du Capitole. Idéal pour découvrir Toulouse à pied, restaurants et vie nocturne en bas de l\'immeuble. Hauteur sous plafond de 4m, poutres apparentes et déco soignée.',
      address: '12 rue Saint-Rome, 31000 Toulouse',
      district: 'Capitole',
      price: 120,
      maxGuests: 4,
      rooms: 2,
      amenities: [wifi, kitchen, ac],
      images: [
        { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Salon loft Capitole', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Chambre loft Capitole' },
      ],
    },
    {
      title: 'Maison de ville avec jardin — Saint-Cyprien',
      description:
        'Belle maison toulousaine en brique rose avec jardin privatif dans le quartier branché de Saint-Cyprien. Proche des quais de la Garonne, marché Victor Hugo à 10 min à pied. Calme et authentique.',
      address: '8 rue des Fontaines, 31300 Toulouse',
      district: 'Saint-Cyprien',
      price: 185,
      maxGuests: 6,
      rooms: 3,
      amenities: [wifi, kitchen, parking, washer, terrace, pets],
      images: [
        { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', alt: 'Façade maison Saint-Cyprien', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Jardin privatif' },
      ],
    },
    {
      title: 'Studio cosy vue Garonne — Les Carmes',
      description:
        'Studio entièrement rénové avec vue dégagée sur la Garonne depuis le 5ème étage. Quartier des Carmes, entre le marché et les petits restaurants. Parfait pour un séjour solo ou en couple.',
      address: '3 quai de la Daurade, 31000 Toulouse',
      district: 'Les Carmes',
      price: 75,
      maxGuests: 2,
      rooms: 1,
      amenities: [wifi, kitchen, ac],
      images: [
        { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Vue Garonne depuis le studio', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800', alt: 'Intérieur studio cosy' },
      ],
    },
    {
      title: 'Appartement haussmannien — Compans-Caffarelli',
      description:
        'Grand appartement de caractère dans un immeuble haussmannien. Parquet en chêne, moulures et grandes fenêtres. Proche du Jardin des Plantes et du métro ligne B. Idéal pour les familles.',
      address: '22 allée Charles de Fitte, 31300 Toulouse',
      district: 'Compans-Caffarelli',
      price: 150,
      maxGuests: 5,
      rooms: 3,
      amenities: [wifi, kitchen, washer, parking],
      images: [
        { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', alt: 'Salon haussmannien', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', alt: 'Cuisine équipée' },
      ],
    },
    {
      title: 'Villa avec piscine — Côte Pavée',
      description:
        'Villa lumineuse dans le quartier résidentiel prisé de Côte Pavée. Piscine privée, grand jardin arboré et terrasse ensoleillée. À 15 min du centre en tramway. Un séjour haut de gamme dans la Ville Rose.',
      address: '47 avenue des Minimes, 31200 Toulouse',
      district: 'Côte Pavée',
      price: 320,
      maxGuests: 8,
      rooms: 4,
      amenities: [wifi, kitchen, parking, ac, pool, terrace, washer, pets],
      images: [
        { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', alt: 'Villa avec piscine Côte Pavée', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Piscine privée' },
      ],
    },
    {
      title: 'T2 moderne proche Wilson — Esquirol',
      description:
        'Appartement moderne entièrement équipé à 5 min de la place Wilson. Idéalement situé pour les déplacements professionnels ou les touristes souhaitant tout faire à pied. Immeuble sécurisé avec digicode.',
      address: '15 rue Croix-Baragnon, 31000 Toulouse',
      district: 'Esquirol',
      price: 90,
      maxGuests: 3,
      rooms: 2,
      amenities: [wifi, kitchen, ac, washer],
      images: [
        { url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800', alt: 'Séjour T2 Esquirol', isPrimary: true },
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', alt: 'Chambre T2 moderne' },
      ],
    },
  ];

  for (const property of properties) {
    const { amenities: propertyAmenities, images, ...propertyData } = property;

    await prisma.property.create({
      data: {
        ...propertyData,
        amenities: {
          connect: propertyAmenities.map((a) => ({ id: a.id })),
        },
        images: {
          create: images,
        },
      },
    });
  }

  console.log(`Seeded ${properties.length} properties with images and amenities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
