import { NextResponse } from "next/server";



// API URL external (Fake Store API atau Escuelajs)
const API_URL = "https://api.escuelajs.co/api/v1/products";

export async function GET() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to create product" }, { status: res.status });
    }

    const newProduct = await res.json();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}
