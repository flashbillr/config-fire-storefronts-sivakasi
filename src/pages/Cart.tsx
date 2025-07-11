import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { storeConfig } from '@/lib/storeConfig';
import { toast } from '@/hooks/use-toast';

export default function Cart() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentScreenshot(file);
      toast({
        title: "Payment screenshot uploaded",
        description: "Your payment proof has been attached.",
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (state.totalAmount < storeConfig.minimumOrderValue) {
      toast({
        title: "Minimum order not met",
        description: `Minimum order value is ₹${storeConfig.minimumOrderValue}`,
        variant: "destructive",
      });
      return;
    }

    if (!guestInfo.name || !guestInfo.phone || !guestInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!hasPaid) {
      toast({
        title: "Payment confirmation required",
        description: "Please confirm that you have made the payment.",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    const orderNumber = `SCR${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderNumber} has been received.`,
    });

    // Redirect to thank you page
    window.location.href = `/thank-you?orderNumber=${orderNumber}`;
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some beautiful fireworks to get started!</p>
          <Button onClick={() => window.location.href = '/'}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={item.product.images?.[0] || '/placeholder.svg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.categoryName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{item.product.sellingPrice.toLocaleString('en-IN')}
                      </span>
                      {item.product.mrp > item.product.sellingPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary & Checkout */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{state.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                {state.totalAmount < storeConfig.minimumOrderValue && (
                  <p className="text-sm text-orange-600 mt-2">
                    Add ₹{(storeConfig.minimumOrderValue - state.totalAmount).toLocaleString('en-IN')} more for minimum order
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">Bank Transfer</h4>
                  <p className="text-sm text-muted-foreground">
                    Account: {storeConfig.payment.bankAccount.accountNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IFSC: {storeConfig.payment.bankAccount.ifscCode}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">UPI Payment</h4>
                  <p className="text-sm text-muted-foreground">
                    UPI ID: {storeConfig.payment.upiId}
                  </p>
                </div>
              </div>
              
              {/* Upload Payment Screenshot */}
              <div className="space-y-2">
                <Label>Upload Payment Screenshot</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {paymentScreenshot && (
                  <p className="text-sm text-green-600">
                    ✓ {paymentScreenshot.name} uploaded
                  </p>
                )}
              </div>

              {/* Payment Confirmation */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payment-confirm"
                  checked={hasPaid}
                  onCheckedChange={(checked) => setHasPaid(checked === true)}
                />
                <Label htmlFor="payment-confirm" className="text-sm">
                  I have completed the payment
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  id="address"
                  value={guestInfo.address}
                  onChange={(e) => setGuestInfo({...guestInfo, address: e.target.value})}
                  placeholder="Enter complete delivery address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Place Order */}
          <Button
            size="lg"
            onClick={handlePlaceOrder}
            disabled={state.totalAmount < storeConfig.minimumOrderValue}
            className="w-full"
          >
            Place Order - ₹{state.totalAmount.toLocaleString('en-IN')}
          </Button>
        </div>
      </div>
    </div>
  );
}