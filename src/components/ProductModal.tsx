import { useState } from 'react';
import { X, Play, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useModal } from '@/contexts/ModalContext';
import { Product } from '@/lib/api/client';
import { themeConfig } from '@/lib/themeConfig';
import { toast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product;
}

export function ProductModal({ product }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { closeModal } = useModal();

  const discountPercentage = Math.round(
    ((product.mrp - product.sellingPrice) / product.mrp) * 100
  );

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.sellingPrice,
      mrp: product.mrp,
      image: product.images?.[0] || '/placeholder.svg',
      quantity: quantity,
      inStock: product.inStock
    });
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    closeModal();
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = product.youtubeUrl ? getYouTubeVideoId(product.youtubeUrl) : null;
  const canShowVideo = themeConfig.ui.videoSupport && videoId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-background rounded-${themeConfig.ui.borderRadius} shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in`}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
          {/* Media Section */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px]">
            {showVideo && canShowVideo ? (
              <div className="w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="w-full h-full"
                  allowFullScreen
                  title={product.name}
                />
              </div>
            ) : (
              <>
                {/* Image Display */}
                <img
                  src={product.images?.[currentImageIndex] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Media Toggle Buttons */}
            {canShowVideo && (
              <div className="absolute top-4 left-4 flex gap-2">
                <Button
                  size="sm"
                  variant={showVideo ? "secondary" : "default"}
                  onClick={() => setShowVideo(false)}
                >
                  Photos
                </Button>
                <Button
                  size="sm"
                  variant={showVideo ? "default" : "secondary"}
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Video
                </Button>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {!product.inStock && (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="celebration" className="animate-glow">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Category */}
            <Badge variant="outline">
              {product.categoryName}
            </Badge>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">
                ₹{product.sellingPrice.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.sellingPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge variant="celebration" className="text-sm">
                  Save ₹{(product.mrp - product.sellingPrice).toLocaleString('en-IN')}
                </Badge>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p className="font-medium">
                  {product.inStock ? `${product.currentStock} available` : 'Out of stock'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{product.categoryName}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.currentStock, quantity + 1))}
                      disabled={quantity >= product.currentStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart - ₹{(product.sellingPrice * quantity).toLocaleString('en-IN')}
                  </Button>
                </div>

                {product.currentStock <= 10 && (
                  <p className="text-sm text-orange-600">
                    Hurry! Only {product.currentStock} left in stock.
                  </p>
                )}
              </div>
            )}

            {!product.inStock && (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">
                  This product is currently out of stock.
                </p>
                <Button variant="outline" disabled>
                  Notify When Available
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}