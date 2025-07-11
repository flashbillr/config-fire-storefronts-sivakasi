import { useState } from 'react';
import { Play, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useModal } from '@/contexts/ModalContext';
import { Product } from '@/lib/api/client';
import { themeConfig } from '@/lib/themeConfig';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const { addItem } = useCart();
  const { openModal } = useModal();

  const discountPercentage = Math.round(
    ((product.mrp - product.sellingPrice) / product.mrp) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.sellingPrice,
      mrp: product.mrp,
      image: product.images?.[0] || '/placeholder.svg',
      quantity: 1,
      inStock: product.inStock
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal({
      type: 'product',
      product
    });
  };

  const imageStyle = themeConfig.ui.imageStyle;
  const hoverEffects = themeConfig.effects.hoverAnimations;

  return (
    <div 
      className={`group relative bg-card rounded-${themeConfig.ui.borderRadius} border border-border overflow-hidden transition-all duration-300 ${
        hoverEffects ? 'hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.images?.[0] || '/placeholder.svg'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            hoverEffects ? 'group-hover:scale-105' : ''
          } ${
            imageStyle === 'circle' ? 'rounded-full' : 
            imageStyle === 'rounded' ? 'rounded-lg' : ''
          }`}
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.youtubeUrl && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white/90 hover:bg-white"
              onClick={handleQuickView}
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.inStock && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="celebration" className="text-xs animate-glow">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <Badge variant="outline" className="text-xs">
          {product.categoryName}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ₹{product.sellingPrice.toLocaleString('en-IN')}
          </span>
          {product.mrp > product.sellingPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.inStock && product.currentStock <= 10 && (
          <p className="text-xs text-orange-600">
            Only {product.currentStock} left!
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickView}
            className="flex-1"
          >
            Quick View
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Celebration Sparkle Effect */}
      {themeConfig.effects.celebrationMode && discountPercentage > 20 && (
        <div className="absolute top-4 right-4 animate-celebration text-xl pointer-events-none">
          🎆
        </div>
      )}
    </div>
  );
}