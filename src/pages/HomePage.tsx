import React from 'react';
import { QuickStats } from '../components/Home/QuickStats';
import { SubscriptionCard } from '../components/Home/SubscriptionCard';
import { NearbyStations } from '../components/Home/NearbyStations';
import { BikeStation, Subscription, Plan } from '../types';

interface HomePageProps {
  subscription?: Subscription;
  plan?: Plan;
  stations: BikeStation[];
  onStationSelect: (station: BikeStation) => void;
  onRenewPlan: () => void;
}

export function HomePage({ subscription, plan, stations, onStationSelect, onRenewPlan }: HomePageProps) {
  return (
    <div className="space-y-6">
      <QuickStats
        totalRides={12}
        totalTime="4.2h"
        favoriteStation="Central Park"
      />

      {subscription && plan && (
        <SubscriptionCard
          subscription={subscription}
          plan={plan}
          onRenew={onRenewPlan}
        />
      )}

      <NearbyStations
        stations={stations}
        onStationSelect={onStationSelect}
      />
    </div>
  );
}