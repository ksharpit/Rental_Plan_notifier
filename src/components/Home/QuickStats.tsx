import React from 'react';
import { Clock, MapPin, Zap } from 'lucide-react';

interface QuickStatsProps {
  totalRides: number;
  totalTime: string;
  favoriteStation: string;
}

export function QuickStats({ totalRides, totalTime, favoriteStation }: QuickStatsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Zap className="text-primary-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalRides}</div>
          <div className="text-xs text-gray-500">Total Rides</div>
        </div>
        
        <div className="text-center">
          <div className="bg-success-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <Clock className="text-success-600" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalTime}</div>
          <div className="text-xs text-gray-500">Total Time</div>
        </div>
        
        <div className="text-center">
          <div className="bg-warning-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <MapPin className="text-warning-600" size={20} />
          </div>
          <div className="text-sm font-bold text-gray-900 leading-tight">{favoriteStation}</div>
          <div className="text-xs text-gray-500">Favorite Station</div>
        </div>
      </div>
    </div>
  );
}