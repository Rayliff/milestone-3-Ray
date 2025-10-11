export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  images?: string;
  categoryId?: number;
}
