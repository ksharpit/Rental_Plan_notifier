import { BikeStation, Bike, Plan, User, Subscription, Rental } from '../types';
import { addDays, subDays } from 'date-fns';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
};

export const mockStations: BikeStation[] = [
  {
    id: '1',
    name: 'Central Park Station',
    address: '123 Park Ave, New York, NY',
    latitude: 40.7829,
    longitude: -73.9654,
    availableBikes: 8,
    totalBikes: 12,
    distance: 0.2
  },
  {
    id: '2',
    name: 'Times Square Hub',
    address: '456 Broadway, New York, NY',
    latitude: 40.7580,
    longitude: -73.9855,
    availableBikes: 5,
    totalBikes: 15,
    distance: 0.8
  },
  {
    id: '3',
    name: 'Brooklyn Bridge Point',
    address: '789 Bridge St, Brooklyn, NY',
    latitude: 40.7061,
    longitude: -73.9969,
    availableBikes: 12,
    totalBikes: 18,
    distance: 1.2
  },
  {
    id: '4',
    name: 'University Campus',
    address: '321 College Ave, New York, NY',
    latitude: 40.7505,
    longitude: -73.9934,
    availableBikes: 3,
    totalBikes: 10,
    distance: 1.5
  }
];

export const mockBikes: Bike[] = [
  {
    id: '1',
    model: 'Urban Cruiser',
    type: 'standard',
    stationId: '1',
    isAvailable: true
  },
  {
    id: '2',
    model: 'E-Bike Pro',
    type: 'electric',
    batteryLevel: 85,
    stationId: '1',
    isAvailable: true
  },
  {
    id: '3',
    model: 'City Rider',
    type: 'standard',
    stationId: '2',
    isAvailable: true
  },
  {
    id: '4',
    model: 'Thunder Bolt',
    type: 'electric',
    batteryLevel: 92,
    stationId: '3',
    isAvailable: false
  }
];

export const mockPlans: Plan[] = [
  {
    id: 'weekly-basic',
    name: 'Weekly Explorer',
    type: 'weekly',
    price: 25,
    duration: 7,
    features: [
      'Unlimited 30-minute rides',
      'Access to all stations',
      'Standard bikes included',
      'Mobile app support'
    ]
  },
  {
    id: 'weekly-premium',
    name: 'Weekly Premium',
    type: 'weekly',
    price: 35,
    duration: 7,
    features: [
      'Unlimited 45-minute rides',
      'Access to all stations',
      'Electric bikes included',
      'Priority bike reservation',
      'Mobile app support'
    ],
    popular: true
  },
  {
    id: 'monthly-basic',
    name: 'Monthly Commuter',
    type: 'monthly',
    price: 80,
    duration: 30,
    features: [
      'Unlimited 30-minute rides',
      'Access to all stations',
      'Standard bikes included',
      'Mobile app support',
      '20% discount on extra time'
    ]
  },
  {
    id: 'monthly-premium',
    name: 'Monthly Unlimited',
    type: 'monthly',
    price: 120,
    duration: 30,
    features: [
      'Unlimited 60-minute rides',
      'Access to all stations',
      'Electric bikes included',
      'Priority bike reservation',
      'Mobile app support',
      'Free extra time up to 15 minutes'
    ],
    popular: true
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    userId: '1',
    planId: 'weekly-premium',
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
    startStation: 'Central Park Station',
    endStation: 'Times Square Hub',
    cost: 0,
    status: 'completed'
  },
  {
    id: 'rental-2',
    userId: '1',
    bikeId: '1',
    startTime: subDays(new Date(), 1),
    endTime: subDays(new Date(), 1),
    startStation: 'Times Square Hub',
    endStation: 'Brooklyn Bridge Point',
    cost: 0,
    status: 'completed'
  }
];