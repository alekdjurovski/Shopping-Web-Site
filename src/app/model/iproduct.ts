export interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  manufacturer: string;
  isAvailable: boolean;
  shortDescription: string;
  fullDescription: string;
  categoryId: number;
}
