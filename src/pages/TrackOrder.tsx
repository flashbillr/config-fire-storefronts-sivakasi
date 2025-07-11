import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface OrderStatus {
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  trackingUpdates: Array<{
    status: string;
    description: string;
    timestamp: string;
  }>;
}

export default function TrackOrder() {
  const [tracking, setTracking] = useState({
    orderNumber: '',
    email: '',
    phone: ''
  });
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async () => {
    if (!tracking.orderNumber) {
      toast({
        title: "Order number required",
        description: "Please enter your order number",
        variant: "destructive",
      });
      return;
    }

    if (!tracking.email && !tracking.phone) {
      toast({
        title: "Contact information required",
        description: "Please enter either email or phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock order data
      const mockOrder: OrderStatus = {
        orderNumber: tracking.orderNumber,
        status: 'processing',
        createdAt: '2024-01-15T10:30:00Z',
        customerName: 'John Doe',
        customerPhone: tracking.phone,
        address: '123 Festival Street, Celebration City, TC 12345',
        items: [
          { name: 'Diwali Gift Box Premium', quantity: 2, price: 1500 },
          { name: 'Sparklers Pack', quantity: 1, price: 500 }
        ],
        totalAmount: 3500,
        trackingUpdates: [
          {
            status: 'Order Placed',
            description: 'Your order has been successfully placed',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            status: 'Payment Verified',
            description: 'Payment has been verified and confirmed',
            timestamp: '2024-01-15T12:15:00Z'
          },
          {
            status: 'Processing',
            description: 'Your order is being prepared for shipment',
            timestamp: '2024-01-16T09:00:00Z'
          }
        ]
      };

      setOrderData(mockOrder);
      setIsLoading(false);
      
      toast({
        title: "Order found!",
        description: `Order #${tracking.orderNumber} details loaded`,
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'payment verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'outline';
      case 'confirmed':
        return 'secondary';
      case 'processing':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'delivered':
        return 'celebration';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Track Your Order</h1>
        
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number *</Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., SCR123456"
                  value={tracking.orderNumber}
                  onChange={(e) => setTracking({...tracking, orderNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={tracking.email}
                  onChange={(e) => setTracking({...tracking, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={tracking.phone}
                  onChange={(e) => setTracking({...tracking, phone: e.target.value})}
                />
              </div>
            </div>
            <Button 
              onClick={handleTrackOrder}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? 'Searching...' : 'Track Order'}
            </Button>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{orderData.orderNumber}</span>
                  <Badge variant={getStatusBadgeVariant(orderData.status)}>
                    {orderData.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Customer Details</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Name:</strong> {orderData.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Phone:</strong> {orderData.customerPhone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Order Date:</strong> {new Date(orderData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Delivery Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.address}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{orderData.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.trackingUpdates.map((update, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{update.status}</h4>
                        <p className="text-sm text-muted-foreground">{update.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => {
                  const message = `Hi! I need an update on my order #${orderData.orderNumber}. Can you please help?`;
                  const whatsappUrl = `https://wa.me/9750962426?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}