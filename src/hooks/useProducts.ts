import useSWR from "swr";
import { Product } from "@/types/product";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=8",
    fetcher
  );

  return {
    products: data,
    loading: isLoading,
    error,
  };
}
