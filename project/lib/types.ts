export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image?: string;
  images?: string[];
  benefits?: string[];
  features?: string[];
  usage?: string[];
  ingredients?: string[];
  specifications?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}