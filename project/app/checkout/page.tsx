"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const TAX_RATE = 0.20; // 20% TVA
const SHIPPING_FEE = 5.99;
const FREE_SHIPPING_THRESHOLD = 50;

interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
}

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">("shipping");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
  });

  // Calcul détaillé du sous-total
  const subtotal = cart.items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);

  // Calculs des autres montants
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const taxableAmount = subtotal - promoDiscount;
  const taxAmount = taxableAmount * TAX_RATE;
  const total = subtotal - promoDiscount + shipping + taxAmount;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoDiscount(subtotal * 0.1); // 10% de réduction
    } else {
      alert("Code promo invalide");
      setPromoDiscount(0);
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation basique
    if (Object.values(shippingAddress).some(value => !value)) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    alert("Commande validée ! Ceci est une démonstration, aucun paiement n'a été traité.");
    cart.clearCart();
    router.push("/checkout/success");
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
          Continuer vos achats
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paiement</h1>

        {/* Récapitulatif de la commande */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif de la commande</h2>
          
          <div className="space-y-3 mb-6">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <div className="text-sm text-gray-500">
                    Quantité: {item.quantity} × {item.price.toFixed(2)} €
                  </div>
                </div>
                <span className="font-medium">
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>

          {/* Code promo */}
          <div className="border-t pt-4 mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Code promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button onClick={handlePromoCode} variant="outline">
                Appliquer
              </Button>
            </div>
            {promoDiscount > 0 && (
              <p className="text-green-600 text-sm mt-2">
                Code promo appliqué : -{promoDiscount.toFixed(2)} €
              </p>
            )}
          </div>

          {/* Calculs détaillés */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Réduction</span>
                <span>-{promoDiscount.toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Frais de livraison</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">Gratuit</span>
                ) : (
                  `${shipping.toFixed(2)} €`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TVA (20%)</span>
              <span>{taxAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {currentStep === "shipping" ? (
          /* Formulaire d'adresse de livraison */
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Adresse de livraison</h2>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet<span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetAddress">Adresse<span className="text-red-500">*</span></Label>
                <Input
                  id="streetAddress"
                  value={shippingAddress.streetAddress}
                  onChange={(e) => setShippingAddress({...shippingAddress, streetAddress: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal<span className="text-red-500">*</span></Label>
                  <Input
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville<span className="text-red-500">*</span></Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Pays<span className="text-red-500">*</span></Label>
                <Input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Téléphone<span className="text-red-500">*</span></Label>
                <Input
                  id="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={(e) => setShippingAddress({...shippingAddress, phoneNumber: e.target.value})}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Continuer vers le paiement
            </Button>
          </form>
        ) : (
          /* Formulaire de paiement */
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informations de paiement</h2>
              
              <div className="space-y-2">
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input
                  id="cardName"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  placeholder="4111 1111 1111 1111"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Date d'expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setCurrentStep("shipping")}
                className="flex-1"
              >
                Retour
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Traitement en cours..." : `Payer ${total.toFixed(2)} €`}
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
              Ceci est une démonstration. Aucun paiement réel ne sera effectué.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}