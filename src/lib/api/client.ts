const storeId = import.meta.env.VITE_STORE_ID || 'demo-store';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  sku: string;
  mrp: number;
  sellingPrice: number;
  youtubeUrl?: string;
  inStock: boolean;
  currentStock: number;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Address {
  id?: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  address: Address;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  emailVerified: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Client Class
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Products API
  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; pagination: any }> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return this.request(`/api/public/store/${storeId}/products${query}`);
  }

  async getCategories(): Promise<{ categories: Category[] }> {
    return this.request(`/api/public/store/${storeId}/categories`);
  }

  // Orders API
  async placeOrder(orderData: {
    items: OrderItem[];
    paymentMethod: string;
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
    address?: Address;
    addressId?: string;
  }): Promise<{ orderNumber: string; message: string }> {
    return this.request(`/api/public/store/${storeId}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async trackOrder(params: {
    orderNumber: string;
    email?: string;
    phone?: string;
  }): Promise<Order> {
    const searchParams = new URLSearchParams();
    searchParams.append('orderNumber', params.orderNumber);
    if (params.email) searchParams.append('email', params.email);
    if (params.phone) searchParams.append('phone', params.phone);

    return this.request(`/api/public/store/${storeId}/orders/track?${searchParams.toString()}`);
  }

  async getGuestOrderHistory(params: {
    email?: string;
    phone?: string;
  }): Promise<{ orders: Order[] }> {
    const searchParams = new URLSearchParams();
    if (params.email) searchParams.append('email', params.email);
    if (params.phone) searchParams.append('phone', params.phone);

    return this.request(`/api/public/store/${storeId}/orders/guest-history?${searchParams.toString()}`);
  }

  // Customer Authentication
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<{ message: string }> {
    return this.request(`/api/public/store/${storeId}/customers/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ token: string; customer: Customer }> {
    const result = await this.request<{ token: string; customer: Customer }>(`/api/public/store/${storeId}/customers/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    this.setToken(result.token);
    return result;
  }

  async logout(): Promise<void> {
    this.clearToken();
  }

  async getProfile(): Promise<{ customer: Customer }> {
    return this.request(`/api/public/store/${storeId}/customers/profile`);
  }

  async updateProfile(data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): Promise<{ customer: Customer }> {
    return this.request(`/api/public/store/${storeId}/customers/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getOrderHistory(): Promise<{ orders: Order[] }> {
    return this.request(`/api/public/store/${storeId}/customers/orders`);
  }

  async forgotPassword(data: {
    email: string;
  }): Promise<{ message: string }> {
    return this.request(`/api/public/store/${storeId}/customers/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<{ message: string }> {
    return this.request(`/api/public/store/${storeId}/customers/reset-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Address Management
  async getAddresses(): Promise<{ addresses: Address[] }> {
    return this.request(`/api/public/store/${storeId}/customers/addresses`);
  }

  async addAddress(address: Omit<Address, 'id'>): Promise<{ address: Address }> {
    return this.request(`/api/public/store/${storeId}/customers/addresses`, {
      method: 'POST',
      body: JSON.stringify(address),
    });
  }

  async updateAddress(id: string, address: Partial<Address>): Promise<{ address: Address }> {
    return this.request(`/api/public/customers/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(address),
    });
  }

  async deleteAddress(id: string): Promise<{ success: boolean }> {
    return this.request(`/api/public/customers/addresses/${id}`, {
      method: 'DELETE',
    });
  }

  async getAddress(id: string): Promise<{ address: Address }> {
    return this.request(`/api/public/store/${storeId}/customers/addresses/${id}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);