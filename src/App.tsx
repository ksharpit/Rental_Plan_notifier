import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { PlansPage } from './pages/PlansPage';
import { CustomersPage } from './pages/CustomersPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { 
  mockUser, 
  mockStations, 
  mockPlans, 
  mockSubscriptions, 
  mockRentals 
} from './data/mockData';
import { BikeStation, Plan, Customer, CustomerSubscription } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subscriptions] = useLocalStorage('subscriptions', mockSubscriptions);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [customerSubscriptions, setCustomerSubscriptions] = useLocalStorage<CustomerSubscription[]>('customerSubscriptions', []);
  const [user] = useLocalStorage('user', mockUser);
  const [stations] = useLocalStorage('stations', mockStations);
  const [plans] = useLocalStorage('plans', mockPlans);
  const [rentals] = useLocalStorage('rentals', mockRentals);

  const activeSubscription = subscriptions.find(sub => sub.status === 'active');
  const activePlan = activeSubscription ? plans.find(plan => plan.id === activeSubscription.planId) : undefined;

  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications(customerSubscriptions);

  const handleStationSelect = (station: BikeStation) => {
    console.log('Selected station:', station);
    // In a real app, this would navigate to station details or bike selection
  };

  const handlePlanSelect = (plan: Plan) => {
    console.log('Selected plan:', plan);
    // In a real app, this would navigate to payment flow
  };

  const handleRenewPlan = () => {
    setActiveTab('plans');
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // In a real app, this would open edit profile modal
  };

  const handleAddCustomer = (customer: Customer, subscription: CustomerSubscription) => {
    setCustomers(prev => [...prev, customer]);
    setCustomerSubscriptions(prev => [...prev, subscription]);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return 'Dashboard';
      case 'map': return 'Battery Stations';
      case 'plans': return 'Plans';
      case 'customers': return 'Customers';
      case 'notifications': return 'Alerts';
      case 'profile': return 'Profile';
      default: return 'BikeShare';
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            customers={customers}
            subscriptions={customerSubscriptions}
            plans={plans}
          />
        );
      case 'map':
        return <MapPage stations={stations} />;
      case 'plans':
        return (
          <PlansPage
            plans={plans}
            activeSubscription={activeSubscription}
            onSelectPlan={handlePlanSelect}
          />
        );
      case 'customers':
        return (
          <CustomersPage
            customers={customers}
            subscriptions={customerSubscriptions}
            plans={plans}
            onAddCustomer={handleAddCustomer}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage
            customers={customers}
            subscriptions={customerSubscriptions}
            onMarkAsRead={markAsRead}
            onClearAll={clearAll}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user}
            rentals={rentals}
            onEditProfile={handleEditProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={getPageTitle()}
        showNotifications={activeTab !== 'notifications'}
        notificationCount={unreadCount}
        onNotificationClick={() => setActiveTab('notifications')}
      />
      
      <main className="px-4 py-6 pb-24 max-w-md mx-auto">
        {renderPage()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={unreadCount}
      />
    </div>
  );
}

export default App;