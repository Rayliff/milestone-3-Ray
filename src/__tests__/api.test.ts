import axios from "axios";
import { getProducts, createProduct, deleteProduct } from "@/lib/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API library", () => {
  it("fetches products", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [{ id: 1, title: "Test" }] });

    const result = await getProducts();
    expect(result).toEqual([{ id: 1, title: "Test" }]);
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("creates product", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 10, title: "New" } });

    const result = await createProduct({
      title: "New",
      price: 100,
      description: "desc",
      categoryId: 1,
      images: "img.jpg",
    });

    expect(result).toEqual({ id: 10, title: "New" });
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it("deletes product", async () => {
    mockedAxios.delete.mockResolvedValueOnce({});

    await deleteProduct(1);
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products/1"
    );
  });
});
