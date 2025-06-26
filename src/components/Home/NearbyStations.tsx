import React from 'react';
import { MapPin, Bike, Battery } from 'lucide-react';
import { BikeStation } from '../../types';

interface NearbyStationsProps {
  stations: BikeStation[];
  onStationSelect: (station: BikeStation) => void;
}

export function NearbyStations({ stations, onStationSelect }: NearbyStationsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Stations</h3>
      
      <div className="space-y-3">
        {stations.slice(0, 3).map((station) => (
          <button
            key={station.id}
            onClick={() => onStationSelect(station)}
            className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{station.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{station.distance} km away</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm">
                    <Bike size={14} className="mr-1 text-success-600" />
                    <span className="text-success-600 font-medium">{station.availableBikes}</span>
                    <span className="text-gray-500">/{station.totalBikes}</span>
                  </div>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                station.availableBikes > 5 
                  ? 'bg-success-100 text-success-700'
                  : station.availableBikes > 0
                  ? 'bg-warning-100 text-warning-700'
                  : 'bg-error-100 text-error-700'
              }`}>
                {station.availableBikes > 5 ? 'Available' : 
                 station.availableBikes > 0 ? 'Low Stock' : 'Empty'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}