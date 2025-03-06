export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for trying our demo checkout process. In a real application, this would be where you'd see your order confirmation details.
        </p>
        <p className="text-sm text-gray-500">
          Remember: This is a demo site and no actual payment was processed.
        </p>
      </div>
    </div>
  );
}