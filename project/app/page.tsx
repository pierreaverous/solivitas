import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, Headphones, Star } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your transactions are protected with industry-standard encryption",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping on orders over $50",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer service team is always here to help",
    },
    {
      icon: Star,
      title: "Quality Products",
      description: "All products are carefully selected and tested",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
          alt="Wellness products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl font-bold mb-6">Find Your Balance with Solivitas</h1>
          <p className="text-xl mb-8 max-w-xl">
            Discover our curated collection of natural wellness products designed to bring harmony to your daily life.
          </p>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            <Link href="/category/essential-oils">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Essential Oils",
                image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
                href: "/category/essential-oils",
              },
              {
                title: "Smart Bracelets",
                image: "https://i.ibb.co/spZZFCm6/3-eme-montre-Copy.jpg",
                href: "/category/smart-bracelets",
              },
              {
                title: "Wellness Teas",
                image: "https://i.ibb.co/RLdBmK6/the-pack.jpg",
                href: "/category/wellness-teas",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <span className="text-white/90">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                At Solivitas, we believe in the power of natural wellness. Our journey began with a simple mission: to help people find balance in their busy lives through carefully curated wellness products.
              </p>
              <p className="text-gray-600 mb-8">
                Every product in our collection is thoughtfully selected to support your wellbeing journey, from our pure essential oils to our innovative smart wellness trackers.
              </p>
              <Button
                asChild
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
                alt="Our story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}