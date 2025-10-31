import useSWR from "swr";
import { Product } from "@/types/product";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useProduct(id: string | number) {
  const { data, error, isLoading } = useSWR<Product>(
    id ? `https://api.escuelajs.co/api/v1/products/${id}` : null,
    fetcher
  );

  return {
    product: data,
    loading: isLoading,
    error,
  };
}
