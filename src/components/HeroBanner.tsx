import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storeConfig, getWhatsAppContactUrl } from '@/lib/storeConfig';
import { themeConfig } from '@/lib/themeConfig';

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { banners } = storeConfig;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, themeConfig.animations.bannerAutoPlayDuration);

    return () => clearInterval(timer);
  }, [banners.length]);

  const handleCTAAction = (action?: string) => {
    switch (action) {
      case 'scroll-to-products':
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'scroll-to-about':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'whatsapp-contact':
        window.open(getWhatsAppContactUrl(), '_blank');
        break;
      default:
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Banner Images */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl animate-fade-in">
                  {banner.title}
                </h1>
                <p className="mb-8 text-xl text-white/90 md:text-2xl animate-fade-in [animation-delay:0.2s]">
                  {banner.subtitle}
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => handleCTAAction(banner.ctaAction)}
                  className="animate-fade-in [animation-delay:0.4s]"
                >
                  {banner.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Next banner"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-2xl"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </section>
  );
}