import { BikeStation, Bike, Plan, User, Subscription, Rental } from '../types';
import { addDays, subDays } from 'date-fns';

export const mockUser: User = {
  id: '1',
  name: 'Provider Admin',
  email: 'provider@electica.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};

export const mockStations: BikeStation[] = [
  {
    id: '5',
    name: 'Electica LIG Battery Swap',
    address: 'LIG Colony, Indore, MP',
    latitude: 22.7196,
    longitude: 75.8577,
    availableBikes: 6,
    totalBikes: 8,
    distance: 2.1
  },
  {
    id: '6',
    name: 'Electica Niranjanpur Battery Swap',
    address: 'Niranjanpur, Indore, MP',
    latitude: 22.7532,
    longitude: 75.8937,
    availableBikes: 4,
    totalBikes: 6,
    distance: 3.2
  }
];

export const mockBikes: Bike[] = [
  {
    id: '1',
    model: 'Urban Cruiser',
    type: 'standard',
    stationId: '5',
    isAvailable: true
  },
  {
    id: '2',
    model: 'E-Bike Pro',
    type: 'electric',
    batteryLevel: 85,
    stationId: '5',
    isAvailable: true
  },
  {
    id: '3',
    model: 'City Rider',
    type: 'standard',
    stationId: '6',
    isAvailable: true
  },
  {
    id: '4',
    model: 'Thunder Bolt',
    type: 'electric',
    batteryLevel: 92,
    stationId: '6',
    isAvailable: false
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'weekly-basic',
    name: 'Weekly Plan',
    type: 'weekly',
    price: 1857,
    duration: 7,
    features: [
      'Unlimited minutes',
      'Unlimited kilometers',
      'Access to all stations',
      'Standard bikes included',
      'Mobile app support',
      '24/7 customer support'
    ]
  },
  {
    id: 'monthly-basic',
    name: 'Monthly Plan',
    type: 'monthly',
    price: 7000,
    duration: 30,
    features: [
      'Unlimited minutes',
      'Unlimited kilometers',
      'Access to all stations',
      'Standard & electric bikes',
      'Priority bike reservation',
      'Mobile app support',
      '24/7 customer support',
      'Battery swap stations access'
    ],
    popular: true
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    userId: '1',
    planId: 'weekly-basic',
    startDate: subDays(new Date(), 5),
    endDate: addDays(new Date(), 2),
    status: 'active',
    autoRenew: true
  }
];

export const mockRentals: Rental[] = [
  {
    id: 'rental-1',
    userId: '1',
    bikeId: '2',
    startTime: subDays(new Date(), 2),
    endTime: subDays(new Date(), 2),
    startStation: 'Electica LIG Battery Swap',
    endStation: 'Electica Niranjanpur Battery Swap',
    cost: 0,
    status: 'completed'
  },
  {
    id: 'rental-2',
    userId: '1',
    bikeId: '1',
    startTime: subDays(new Date(), 1),
    endTime: subDays(new Date(), 1),
    startStation: 'Electica Niranjanpur Battery Swap',
    endStation: 'Electica LIG Battery Swap',
    cost: 0,
    status: 'completed'
  }
];