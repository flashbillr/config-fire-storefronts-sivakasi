import { Phone, Mail, MapPin, Clock, Heart, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { storeConfig, getFormattedAddress } from '@/lib/storeConfig';
import { themeConfig } from '@/lib/themeConfig';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {storeConfig.logo && (
                <img 
                  src={storeConfig.logo} 
                  alt={storeConfig.storeName}
                  className="h-10 w-10 object-contain"
                />
              )}
              <h3 className="text-xl font-bold text-foreground">
                {storeConfig.storeName}
              </h3>
            </div>
            <p className="text-muted-foreground">
              {storeConfig.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              {storeConfig.about.description.substring(0, 150)}...
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Serving since {storeConfig.about.foundedYear}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground">{storeConfig.contact.phone}</p>
                  <p className="text-xs text-muted-foreground">Call for orders</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground">{storeConfig.contact.email}</p>
                  <p className="text-xs text-muted-foreground">Email support</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground">{getFormattedAddress()}</p>
                  <p className="text-xs text-muted-foreground">Visit our store</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground">{storeConfig.businessHours.weekdays}</p>
                  <p className="text-foreground">{storeConfig.businessHours.weekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href="#about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </a>
              <a 
                href="#products" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Our Products
              </a>
              <a 
                href="/track-order" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Track Order
              </a>
              <a 
                href="/cart" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shopping Cart
              </a>
              <a 
                href={`https://wa.me/${storeConfig.contact.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                WhatsApp Support
              </a>
            </div>
          </div>

          {/* Specialties & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Our Specialties</h4>
            <div className="space-y-2">
              {storeConfig.about.specialties.slice(0, 4).map((specialty, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  • {specialty}
                </p>
              ))}
            </div>
            
            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-foreground mb-3">Follow Us</h5>
              <div className="flex gap-3">
                {storeConfig.socialMedia.facebook && (
                  <a
                    href={storeConfig.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {storeConfig.socialMedia.instagram && (
                  <a
                    href={storeConfig.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {storeConfig.socialMedia.youtube && (
                  <a
                    href={storeConfig.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
                {storeConfig.socialMedia.twitter && (
                  <a
                    href={storeConfig.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} {storeConfig.storeName}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {storeConfig.legal.license} | GST: {storeConfig.legal.gstNumber}
              </p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <button className="hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-primary transition-colors">
                Terms of Service
              </button>
              <button className="hover:text-primary transition-colors">
                Shipping Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Footer Effect */}
      {themeConfig.effects.celebrationMode && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-primary opacity-30" />
      )}
    </footer>
  );
}