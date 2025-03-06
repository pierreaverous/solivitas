"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { Product } from "@/lib/types";

export function ProductClient({ product }: { product: Product }) {
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product);
    alert(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <div className="relative w-full max-w-[800px] mx-auto aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.images?.[0] || product.image || ""}
              alt={product.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4 max-w-[800px] mx-auto">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 200px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
          <p className="text-gray-600 mb-8">{product.longDescription}</p>

          {/* Benefits/Features Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {product.benefits ? "Benefits" : "Features"}
            </h2>
            <ul className="space-y-2">
              {(product.benefits || product.features)?.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {product.usage ? "Usage" : product.ingredients ? "Ingredients" : "Specifications"}
            </h2>
            <ul className="space-y-2">
              {(product.usage || product.ingredients || product.specifications)?.map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            onClick={handleAddToCart}
          >
            Add to Cart - ${product.price}
          </Button>
        </div>
      </div>
    </div>
  );
}