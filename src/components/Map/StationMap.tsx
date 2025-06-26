import React from 'react';
import { MapPin, Bike, Navigation } from 'lucide-react';
import { BikeStation } from '../../types';

interface StationMapProps {
  stations: BikeStation[];
  selectedStation?: BikeStation;
  onStationSelect: (station: BikeStation) => void;
}

export function StationMap({ stations, selectedStation, onStationSelect }: StationMapProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Map placeholder - In a real app, this would be an actual map */}
      <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 relative flex items-center justify-center">
        <div className="text-center">
          <MapPin size={48} className="text-primary-600 mx-auto mb-2" />
          <p className="text-gray-600">Interactive Map</p>
          <p className="text-sm text-gray-500">Tap stations below to view details</p>
        </div>
        
        {/* Station markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8">
            {stations.slice(0, 4).map((station, index) => (
              <button
                key={station.id}
                onClick={() => onStationSelect(station)}
                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  selectedStation?.id === station.id
                    ? 'bg-primary-600'
                    : station.availableBikes > 0
                    ? 'bg-success-500'
                    : 'bg-error-500'
                }`}
              >
                <Bike size={16} className="text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Station details */}
      {selectedStation && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedStation.name}</h3>
              <p className="text-sm text-gray-600">{selectedStation.address}</p>
            </div>
            <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
              <Navigation size={16} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <Bike size={16} className="mr-1 text-success-600" />
                <span className="font-medium">{selectedStation.availableBikes}</span>
                <span className="text-gray-500">/{selectedStation.totalBikes} available</span>
              </div>
              <div className="text-sm text-gray-600">
                {selectedStation.distance} km away
              </div>
            </div>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Reserve Bike
            </button>
          </div>
        </div>
      )}
    </div>
  );
}