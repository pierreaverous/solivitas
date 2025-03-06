import { products } from "@/lib/products";
import { ProductClient } from "./product-client";

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const category = params.category as keyof typeof products;
  const id = parseInt(params.id);
  const product = products[category]?.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductClient product={product} />;
}

export async function generateStaticParams() {
  const params = [];
  for (const [category, categoryProducts] of Object.entries(products)) {
    for (const product of categoryProducts) {
      params.push({
        category,
        id: product.id.toString(),
      });
    }
  }
  return params;
}