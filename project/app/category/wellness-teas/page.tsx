"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { products } from "@/lib/products";

export default function WellnessTeas() {
  const wellnessTeas = products["wellness-teas"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wellness Teas</h1>
        <p className="text-gray-600">
          Discover our collection of carefully selected organic teas for relaxation and wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wellnessTeas.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-64">
              <Image
                src={product.images?.[0] || ""}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600">${product.price}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link href={`/product/wellness-teas/${product.id}`}>
                  More Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}