export interface StoreConfig {
  // Store Identity
  storeName: string;
  tagline: string;
  logo?: string;

  // Hero Banners (3 banners for carousel)
  banners: {
    title: string;
    subtitle: string;
    image: string;
    cta: string;
    ctaAction?: string;
  }[];

  // Contact Information
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
  };

  // Business Hours
  businessHours: {
    weekdays: string;
    weekend: string;
  };

  // About Information
  about: {
    description: string;
    foundedYear: number;
    experience: string;
    specialties: string[];
    certifications: string[];
    mission: string;
    vision: string;
  };

  // Payment Details
  payment: {
    bankAccount: {
      accountName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
    };
    upiId: string;
    qrCodeUrl: string;
  };

  // SEO & Meta
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Legal & Compliance
  legal: {
    license: string;
    certification: string;
    establishedYear: number;
    gstNumber: string;
    terms: string[];
    privacyPolicy: string[];
  };

  // Features
  features: {
    googleAuth: boolean;
    whatsappIntegration: boolean;
    bulkOrdering: boolean;
    homeDelivery: boolean;
    customOrders: boolean;
  };

  // Social Media
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };

  // Business Settings
  minimumOrderValue: number;
}

// Default store configuration for Sathya Crackers
export const storeConfig: StoreConfig = {
  storeName: "Sathya Crackers",
  tagline: "Premium Sivakasi Fireworks",

  banners: [
    {
      title: "Diwali Special Offers",
      subtitle: "Up to 30% OFF on Premium Gift Boxes",
      image: "/images/diwali-banner.jpg",
      cta: "Shop Now",
      ctaAction: "scroll-to-products"
    },
    {
      title: "Sivakasi's Finest",
      subtitle: "Authentic Quality Crackers Since 1985",
      image: "/images/traditional-banner.jpg",
      cta: "Explore",
      ctaAction: "scroll-to-about"
    },
    {
      title: "Bulk Orders Welcome",
      subtitle: "Special Prices for Corporate & Events",
      image: "/images/bulk-banner.jpg",
      cta: "Enquire",
      ctaAction: "whatsapp-contact"
    }
  ],

  contact: {
    phone: "+91 97509 62426",
    email: "support@sathyacrackers.com",
    whatsapp: "9750962426",
    address: {
      street: "RSR Petrol bunk backside",
      city: "Sivakasi",
      state: "Tamil Nadu",
      pincode: "626123"
    }
  },

  businessHours: {
    weekdays: "Mon-Sat: 9 AM - 8 PM",
    weekend: "Sunday: 10 AM - 6 PM"
  },

  about: {
    description: "Sathya Crackers has been a trusted name in Sivakasi's fireworks industry for over three decades. We specialize in manufacturing and supplying premium quality fireworks that bring joy and celebration to your special moments.",
    foundedYear: 1985,
    experience: "35+ years",
    specialties: [
      "Premium Gift Boxes",
      "Aerial Fireworks",
      "Ground Chakkars",
      "Sound Crackers",
      "Flower Pots",
      "Sparklers & Fountains"
    ],
    certifications: [
      "ISO 9001:2015 Certified",
      "BIS Quality Mark",
      "Tamil Nadu Govt. Licensed",
      "Export Quality Assurance"
    ],
    mission: "To provide safe, high-quality fireworks that create memorable celebrations while maintaining the highest safety standards.",
    vision: "To be the leading fireworks manufacturer in South India, known for innovation, quality, and customer satisfaction."
  },

  payment: {
    bankAccount: {
      accountName: "Sathya Crackers",
      accountNumber: "1234567890123456",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India"
    },
    upiId: "sathyacrackers@paytm",
    qrCodeUrl: "/images/payment-qr.png"
  },

  seo: {
    title: "Sathya Crackers - Premium Sivakasi Fireworks",
    description: "Premium quality fireworks from Sivakasi since 1985. Best prices, safe delivery, and authentic crackers for all celebrations.",
    keywords: ["fireworks", "crackers", "sivakasi", "diwali", "celebration", "firecrackers"]
  },

  legal: {
    license: "Licensed by Tamil Nadu Govt.",
    certification: "ISO Certified Quality",
    establishedYear: 1985,
    gstNumber: "33ABCDE1234F1Z5",
    terms: [
      "All sales are final unless products are defective",
      "Minimum order value of ₹500 for home delivery",
      "Delivery within 7-10 working days",
      "Customer must check products upon delivery",
      "Age restriction: 18+ for fireworks purchase",
      "Follow all local laws and regulations for fireworks usage"
    ],
    privacyPolicy: [
      "We collect personal information only for order processing",
      "Your data is secure and never shared with third parties",
      "We use cookies to improve your browsing experience",
      "You can request data deletion at any time",
      "We comply with all data protection regulations"
    ]
  },

  features: {
    googleAuth: true,
    whatsappIntegration: true,
    bulkOrdering: true,
    homeDelivery: true,
    customOrders: true
  },

  socialMedia: {
    facebook: "https://facebook.com/sathyacrackers",
    instagram: "https://instagram.com/sathyacrackers",
    youtube: "https://youtube.com/@sathyacrackers",
    twitter: "https://twitter.com/sathyacrackers"
  },

  minimumOrderValue: 500
};

// Store slug for API calls
export const storeSlug = "sathya-crackers";

// Helper function to get WhatsApp URL for orders
export const getWhatsAppOrderUrl = (message: string) => {
  return `https://wa.me/${storeConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
};

// Helper function to get formatted address
export const getFormattedAddress = () => {
  const { street, city, state, pincode } = storeConfig.contact.address;
  return `${street}, ${city}, ${state} - ${pincode}`;
};

// Helper function to get WhatsApp contact URL
export const getWhatsAppContactUrl = () => {
  const message = `Hi ${storeConfig.storeName}! I'm interested in your fireworks. Can you help me with bulk pricing?`;
  return getWhatsAppOrderUrl(message);
};