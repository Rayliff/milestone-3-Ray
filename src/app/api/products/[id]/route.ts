import { NextResponse } from "next/server";

const API_URL = "https://api.escuelajs.co/api/v1/products";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_URL}/${params.id}`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to update product" }, { status: res.status });
    }

    const updated = await res.json();
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_URL}/${params.id}`, { method: "DELETE" });
    if (!res.ok) {
      return NextResponse.json({ message: "Failed to delete product" }, { status: res.status });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}
