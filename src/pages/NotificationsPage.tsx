import React from 'react';
import { NotificationItem } from '../components/Notifications/NotificationItem';
import { Notification } from '../types';
import { Bell } from 'lucide-react';

interface NotificationsPageProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationsPage({ notifications, onMarkAsRead, onClearAll }: NotificationsPageProps) {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="space-y-6">
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up! We'll notify you about important updates.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Notifications {unreadNotifications.length > 0 && (
                <span className="ml-2 bg-primary-600 text-white text-sm px-2 py-1 rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </h2>
            
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {unreadNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">New</h3>
              {unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>
          )}

          {readNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Earlier</h3>
              {readNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}