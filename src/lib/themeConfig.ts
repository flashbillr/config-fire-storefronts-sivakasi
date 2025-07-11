export interface ThemeConfig {
  // Color Palette
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };

  // Typography
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
    };
    fontSize: {
      hero: string;
      heading: string;
      body: string;
      caption: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
  };

  // Spacing & Layout
  spacing: {
    containerPadding: string;
    sectionGap: string;
    cardGap: string;
    elementSpacing: string;
  };

  // Border Radius
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    card: string;
    button: string;
    image: string;
  };

  // Effects & Animations
  effects: {
    stickyCart: boolean;
    hoverAnimations: boolean;
    ctaGlow: boolean;
    floatingElements: boolean;
    parallaxScroll: boolean;
    celebrationMode: boolean;
  };

  // Animation timings
  animations: {
    bannerAutoPlayDuration: number;
  };

  // UI settings  
  ui: {
    borderRadius: string;
    imageStyle: string;
    videoSupport: boolean;
  };

  // Layout Preferences
  layout: {
    productGridColumns: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    categoryDisplayStyle: 'grid' | 'list' | 'carousel';
    heroStyle: 'banner' | 'video' | 'carousel';
    buttonShape: 'rounded' | 'pill' | 'square';
    imageStyle: 'square' | 'rounded' | 'circle';
  };

  // Modal Behavior
  modal: {
    transitionType: 'slide' | 'fade' | 'scale';
    videoSupport: boolean;
    imageZoom: boolean;
    backdropBlur: boolean;
  };

  // Component Variants
  components: {
    cardStyle: 'elevated' | 'outlined' | 'filled';
    buttonStyle: 'solid' | 'outline' | 'ghost';
    inputStyle: 'filled' | 'outlined' | 'underlined';
  };
}

// Sathya Crackers Theme Configuration - Sivakasi Celebration Mode
export const themeConfig: ThemeConfig = {
  colors: {
    primary: 'hsl(18 95% 55%)', // Deep Orange
    secondary: 'hsl(0 85% 60%)', // Royal Red
    accent: 'hsl(45 95% 60%)', // Golden Yellow
    background: 'hsl(45 100% 98%)', // Warm White
    surface: 'hsl(45 40% 96%)', // Light Cream
    text: 'hsl(0 15% 15%)', // Dark Brown
  },

  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Poppins, system-ui, sans-serif'
    },
    fontSize: {
      hero: '3.5rem',
      heading: '2.25rem',
      body: '1rem',
      caption: '0.875rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700
    }
  },

  spacing: {
    containerPadding: '1.5rem',
    sectionGap: '4rem',
    cardGap: '1.5rem',
    elementSpacing: '1rem'
  },

  borderRadius: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem',
    card: '1.5rem',
    button: '0.75rem',
    image: '1rem'
  },

  effects: {
    stickyCart: true,
    hoverAnimations: true,
    ctaGlow: true,
    floatingElements: true,
    parallaxScroll: false,
    celebrationMode: true
  },

  layout: {
    productGridColumns: {
      mobile: 2,
      tablet: 3,
      desktop: 4
    },
    categoryDisplayStyle: 'grid',
    heroStyle: 'carousel',
    buttonShape: 'rounded',
    imageStyle: 'rounded'
  },

  modal: {
    transitionType: 'slide',
    videoSupport: true,
    imageZoom: true,
    backdropBlur: true
  },

  // Animation timings
  animations: {
    bannerAutoPlayDuration: 5000
  },

  // UI settings  
  ui: {
    borderRadius: 'lg',
    imageStyle: 'rounded',
    videoSupport: true
  },

  components: {
    cardStyle: 'elevated',
    buttonStyle: 'solid',
    inputStyle: 'filled'
  }
};

// Helper function to inject theme variables into CSS
export const injectThemeVariables = (theme: ThemeConfig) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Inject color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });

  // Inject spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--theme-spacing-${key}`, value);
  });

  // Inject border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--theme-radius-${key}`, value);
  });
};

// Export theme CSS classes generator
export const getThemeClasses = (theme: ThemeConfig) => {
  return {
    // Button variants based on theme
    primaryButton: `bg-gradient-primary text-primary-foreground rounded-${theme.layout.buttonShape} ${
      theme.effects.ctaGlow ? 'shadow-glow-primary hover:shadow-celebration' : ''
    } ${theme.effects.hoverAnimations ? 'hover:scale-105 transition-celebration' : ''}`,
    
    secondaryButton: `bg-gradient-secondary text-secondary-foreground rounded-${theme.layout.buttonShape} ${
      theme.effects.hoverAnimations ? 'hover:scale-105 transition-celebration' : ''
    }`,
    
    // Card variants
    productCard: `bg-card rounded-${theme.borderRadius.card} ${
      theme.components.cardStyle === 'elevated' ? 'shadow-card hover:shadow-celebration' : ''
    } ${theme.effects.hoverAnimations ? 'hover:-translate-y-2 transition-celebration' : ''}`,
    
    // Image styles
    productImage: `rounded-${theme.borderRadius.image} ${
      theme.layout.imageStyle === 'circle' ? 'rounded-full' : ''
    }`,
    
    // Animation classes
    floating: theme.effects.floatingElements ? 'animate-float' : '',
    glow: theme.effects.ctaGlow ? 'animate-celebration-glow' : '',
    fadeInUp: 'animate-fade-in-up',
    slideInRight: 'animate-slide-in-right'
  };
};