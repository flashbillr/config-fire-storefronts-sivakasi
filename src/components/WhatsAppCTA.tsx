import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storeConfig } from '@/lib/storeConfig';
import { themeConfig } from '@/lib/themeConfig';

export function WhatsAppCTA() {
  const handleWhatsAppClick = () => {
    const message = `Hi ${storeConfig.storeName}! I'm interested in your fireworks. Can you help me with pricing and availability?`;
    const whatsappUrl = `https://wa.me/${storeConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!storeConfig.features.whatsappIntegration) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        size="lg"
        onClick={handleWhatsAppClick}
        className={`rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          themeConfig.effects.hoverAnimations ? 'hover:scale-110' : ''
        } bg-green-500 hover:bg-green-600 text-white border-2 border-green-400`}
        style={{
          background: 'linear-gradient(45deg, #25D366, #128C7E)',
        }}
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        WhatsApp
      </Button>
      
      {/* Floating animation ring */}
      {themeConfig.effects.celebrationMode && (
        <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20" />
      )}
    </div>
  );
}