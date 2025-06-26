import { useState, useEffect } from 'react';
import { Notification, Subscription } from '../types';
import { differenceInDays, isAfter, addDays } from 'date-fns';

export function useNotifications(subscriptions: Subscription[]) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const checkSubscriptionExpiry = () => {
      const newNotifications: Notification[] = [];
      const now = new Date();

      subscriptions.forEach(subscription => {
        if (subscription.status === 'active') {
          const daysUntilExpiry = differenceInDays(subscription.endDate, now);
          
          // Notify 3 days before expiry
          if (daysUntilExpiry === 3) {
            newNotifications.push({
              id: `expiry-warning-${subscription.id}`,
              userId: subscription.userId,
              title: 'Plan Expiring Soon',
              message: `Your ${subscription.planId} plan expires in 3 days. Renew now to continue enjoying unlimited rides!`,
              type: 'warning',
              read: false,
              createdAt: now
            });
          }
          
          // Notify 1 day before expiry
          if (daysUntilExpiry === 1) {
            newNotifications.push({
              id: `expiry-urgent-${subscription.id}`,
              userId: subscription.userId,
              title: 'Plan Expires Tomorrow',
              message: `Your ${subscription.planId} plan expires tomorrow. Don't miss out on your rides!`,
              type: 'error',
              read: false,
              createdAt: now
            });
          }
          
          // Notify when expired
          if (daysUntilExpiry === 0 && isAfter(now, subscription.endDate)) {
            newNotifications.push({
              id: `expired-${subscription.id}`,
              userId: subscription.userId,
              title: 'Plan Expired',
              message: `Your ${subscription.planId} plan has expired. Subscribe to a new plan to continue riding.`,
              type: 'error',
              read: false,
              createdAt: now
            });
          }
        }
      });

      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev]);
      }
    };

    checkSubscriptionExpiry();
    const interval = setInterval(checkSubscriptionExpiry, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(interval);
  }, [subscriptions]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    clearAll
  };
}