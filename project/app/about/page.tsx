import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Shield, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Wellness First",
      description: "Every product is chosen with your wellbeing in mind, supporting a balanced and healthy lifestyle.",
    },
    {
      icon: Leaf,
      title: "Natural Quality",
      description: "We source only the finest natural ingredients and materials for our wellness products.",
    },
    {
      icon: Shield,
      title: "Trusted Standards",
      description: "All our products meet rigorous quality and safety standards for your peace of mind.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We build lasting relationships with our customers and support their wellness journey.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
          alt="Our story"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-xl text-white/90">
              Solivitas was created to help people regain control over their well-being in a world filled with stress and anxiety. Driven by personal experience and a passion for mental wellness, we provide trusted solutions to ease panic, reduce stress, and promote balance—so you can live with confidence and serenity.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600">
          At Solivitas, our mission is to provide reliable, science-backed solutions that help people overcome stress and anxiety. We carefully select high-quality products designed to bring immediate relief and long-term well-being. Our goal is to create a supportive community where everyone can find the resources they need to live a calmer, more balanced life. Because your peace of mind is our priority.
        </p>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
        <p className="text-xl text-gray-600 mb-8">
          Our dedicated team of wellness experts and technology innovators work together to bring you the best in natural wellness solutions.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Join Our Team
        </Button>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-xl text-gray-600 mb-8">
          Have questions about our products or want to learn more about Solivitas?
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Contact Us
        </Button>
      </div>
    </div>
  );
}