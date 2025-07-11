import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Play, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { storeConfig, getWhatsAppContactUrl } from "@/lib/storeConfig";
import { themeConfig } from "@/lib/themeConfig";
import { useCart } from "@/contexts/CartContext";
import { useModal } from "@/contexts/ModalContext";

// Import banner images
import diwaliBanner from "@/assets/diwali-banner.jpg";
import traditionalBanner from "@/assets/traditional-banner.jpg";
import bulkBanner from "@/assets/bulk-banner.jpg";

// Mock data for products - replace with API calls
const mockProducts = [
  {
    id: "1",
    name: "Premium Diwali Gift Box",
    description: "Complete celebration package with assorted fireworks",
    categoryId: "gift-boxes",
    categoryName: "Gift Boxes",
    brand: "Sathya",
    sku: "DGB001",
    mrp: 1200,
    sellingPrice: 999,
    inStock: true,
    currentStock: 25,
    images: ["/placeholder.svg"]
  },
  {
    id: "2", 
    name: "Aerial Flower Pot",
    description: "Beautiful aerial display with colorful effects",
    categoryId: "aerial",
    categoryName: "Aerial Fireworks",
    brand: "Sathya",
    sku: "AFP002",
    mrp: 450,
    sellingPrice: 399,
    inStock: true,
    currentStock: 40,
    images: ["/placeholder.svg"]
  },
  {
    id: "3",
    name: "Ground Chakkar Set",
    description: "Traditional spinning fireworks set of 10 pieces",
    categoryId: "ground",
    categoryName: "Ground Chakkars",
    brand: "Sathya", 
    sku: "GCS003",
    mrp: 300,
    sellingPrice: 250,
    inStock: true,
    currentStock: 60,
    images: ["/placeholder.svg"]
  },
  {
    id: "4",
    name: "Sparkler Box",
    description: "Safe and bright sparklers for kids and family",
    categoryId: "sparklers",
    categoryName: "Sparklers",
    brand: "Sathya",
    sku: "SPK004", 
    mrp: 200,
    sellingPrice: 175,
    inStock: true,
    currentStock: 100,
    images: ["/placeholder.svg"]
  }
];

const bannerImages = [diwaliBanner, traditionalBanner, bulkBanner];

const Index = () => {
  const { addItem } = useCart();
  const { openProductModal } = useModal();
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % storeConfig.banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = (action?: string) => {
    switch (action) {
      case 'scroll-to-products':
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scroll-to-about':
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'whatsapp-contact':
        window.open(getWhatsAppContactUrl(), '_blank');
        break;
      default:
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        {storeConfig.banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={bannerImages[index]}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero"></div>
          </div>
        ))}
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-celebration-glow">
              {storeConfig.storeName}
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-white/90">
              {storeConfig.tagline}
            </p>
            <div className="animate-slide-in-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {storeConfig.banners[currentBanner].title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/80">
                {storeConfig.banners[currentBanner].subtitle}
              </p>
              <Button
                variant="hero"
                size="xl"
                onClick={() => handleCTAClick(storeConfig.banners[currentBanner].ctaAction)}
                className="animate-float"
              >
                {storeConfig.banners[currentBanner].cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {storeConfig.banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentBanner
                  ? 'bg-white shadow-glow-accent'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Premium Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our wide range of authentic Sivakasi fireworks, crafted with tradition and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer bg-card hover:shadow-celebration transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-0"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openProductModal(product)}
              >
                <CardContent className="p-6">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-gradient-primary">
                      ₹{product.sellingPrice}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-card-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{product.sellingPrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.mrp}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="celebration"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About {storeConfig.storeName}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {storeConfig.about.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-card rounded-lg shadow-card">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {storeConfig.about.foundedYear}
                  </div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow-card">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {storeConfig.about.experience}
                  </div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Our Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {storeConfig.about.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <img
                src={traditionalBanner}
                alt="Traditional craftsmanship"
                className="rounded-2xl shadow-celebration w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-celebration">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-celebration-glow">
            Get in Touch
          </h2>
          <p className="text-xl mb-12 text-white/90">
            Ready to light up your celebrations? Contact us for bulk orders and custom requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Phone className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="text-white/80">{storeConfig.contact.phone}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <MessageCircle className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-white/80">+91 {storeConfig.contact.whatsapp}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <Mail className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-white/80">{storeConfig.contact.email}</div>
              </div>
            </div>
          </div>

          <Button
            variant="hero"
            size="xl"
            onClick={() => window.open(getWhatsAppContactUrl(), '_blank')}
            className="animate-float"
          >
            <MessageCircle className="w-5 h-5" />
            Contact via WhatsApp
          </Button>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="cta"
          size="icon"
          className="rounded-full w-14 h-14 animate-float shadow-celebration"
          onClick={() => window.open(getWhatsAppContactUrl(), '_blank')}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
