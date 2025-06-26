import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { Rental } from '../../types';
import { format, differenceInMinutes } from 'date-fns';

interface RideHistoryProps {
  rentals: Rental[];
}

export function RideHistory({ rentals }: RideHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
      
      {rentals.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No rides yet</p>
          <p className="text-sm text-gray-400">Start your first ride to see history here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental) => {
            const duration = rental.endTime 
              ? differenceInMinutes(rental.endTime, rental.startTime)
              : 0;
            
            return (
              <div key={rental.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock size={14} className="mr-1" />
                      <span>{format(rental.startTime, 'MMM dd, yyyy • h:mm a')}</span>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center text-sm">
                        <MapPin size={14} className="mr-1 text-success-600" />
                        <span className="text-gray-700">{rental.startStation}</span>
                      </div>
                      {rental.endStation && (
                        <>
                          <span className="text-gray-400">→</span>
                          <div className="flex items-center text-sm">
                            <MapPin size={14} className="mr-1 text-error-600" />
                            <span className="text-gray-700">{rental.endStation}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {duration} min
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign size={12} className="mr-1" />
                      <span>{rental.cost === 0 ? 'Free' : `$${rental.cost}`}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  rental.status === 'completed'
                    ? 'bg-success-100 text-success-700'
                    : 'bg-primary-100 text-primary-700'
                }`}>
                  {rental.status === 'completed' ? 'Completed' : 'Active'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}