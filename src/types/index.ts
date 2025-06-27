export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface BikeStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  availableBikes: number;
  totalBikes: number;
  distance?: number;
}

export interface Bike {
  id: string;
  model: string;
  type: 'electric' | 'standard';
  batteryLevel?: number;
  stationId: string;
  isAvailable: boolean;
}

export interface Plan {
  id: string;
  name: string;
  type: 'weekly' | 'monthly';
  price: number;
  duration: number; // in days
  features: string[];
  popular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
}

export interface Rental {
  id: string;
  userId: string;
  bikeId: string;
  startTime: Date;
  endTime?: Date;
  startStation: string;
  endStation?: string;
  cost: number;
  status: 'active' | 'completed';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: Date;
  createdAt: Date;
}

export interface CustomerSubscription extends Subscription {
  customerName: string;
  planName: string;
  planPrice: number;
}