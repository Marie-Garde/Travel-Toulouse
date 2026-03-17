export interface Image {
  id: number;
  url: string;
  alt: string | null;
  isPrimary: boolean;
  propertyId: number;
}

export interface Amenity {
  id: number;
  label: string;
  icon: string | null;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  district: string;
  price: number;
  maxGuests: number;
  rooms: number;
  images: Image[];
  amenities: Amenity[];
  createdAt: string;
}
