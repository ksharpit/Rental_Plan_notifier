import React, { useState } from 'react';
import { StationMap } from '../components/Map/StationMap';
import { BikeStation } from '../types';

interface MapPageProps {
  stations: BikeStation[];
}

export function MapPage({ stations }: MapPageProps) {
  const [selectedStation, setSelectedStation] = useState<BikeStation>();

  return (
    <div className="space-y-6">
      <StationMap
        stations={stations}
        selectedStation={selectedStation}
        onStationSelect={setSelectedStation}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Stations</h3>
        
        <div className="space-y-3">
          {stations.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedStation?.id === station.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{station.name}</h4>
                  <p className="text-sm text-gray-600">{station.distance} km away</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {station.availableBikes}/{station.totalBikes}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    station.availableBikes > 5 
                      ? 'bg-success-100 text-success-700'
                      : station.availableBikes > 0
                      ? 'bg-warning-100 text-warning-700'
                      : 'bg-error-100 text-error-700'
                  }`}>
                    {station.availableBikes > 5 ? 'Available' : 
                     station.availableBikes > 0 ? 'Low' : 'Empty'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}