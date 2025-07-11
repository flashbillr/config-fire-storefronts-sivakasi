import { useEffect, useState } from 'react';
import { CheckCircle, MessageCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storeConfig } from '@/lib/storeConfig';

export default function ThankYou() {
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderNum = params.get('orderNumber');
    if (orderNum) {
      setOrderNumber(orderNum);
    }
  }, []);

  const handleWhatsAppUpdate = () => {
    const message = `Hi ${storeConfig.storeName}! I've placed order #${orderNumber}. Please keep me updated on the status.`;
    const whatsappUrl = `https://wa.me/${storeConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTrackOrder = () => {
    window.location.href = '/track-order';
  };

  const handleContinueShopping = () => {
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Placed Successfully! 🎆
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing {storeConfig.storeName}
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              Order Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Order #{orderNumber}
              </h3>
              <p className="text-muted-foreground">
                Your order has been received and is being processed.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-foreground">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• We'll verify your payment within 2-4 hours</li>
                <li>• Your order will be packed with care</li>
                <li>• We'll arrange delivery within 7-10 working days</li>
                <li>• You'll receive updates via WhatsApp & SMS</li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Our team is here to assist you with any questions about your order.
              </p>
              <div className="text-sm space-y-1">
                <p><strong>Phone:</strong> {storeConfig.contact.phone}</p>
                <p><strong>Email:</strong> {storeConfig.contact.email}</p>
                <p><strong>WhatsApp:</strong> +91 {storeConfig.contact.whatsapp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleTrackOrder}
              className="flex items-center gap-2"
            >
              <Package className="h-5 w-5" />
              Track Your Order
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsAppUpdate}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Updates
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={handleContinueShopping}
            className="text-muted-foreground"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Celebration Elements */}
        <div className="mt-12 text-6xl opacity-20 animate-float">
          🎆 ✨ 🎇 ✨ 🎆
        </div>
      </div>
    </div>
  );
}