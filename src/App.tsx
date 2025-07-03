import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { BottomNavigation } from './components/Layout/BottomNavigation';
import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { CustomersPage } from './pages/CustomersPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { 
  mockUser, 
  mockPlans, 
  mockSubscriptions, 
  mockRentals 
} from './data/mockData';
import { Plan, Customer, CustomerSubscription } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subscriptions] = useLocalStorage('subscriptions', mockSubscriptions);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [customerSubscriptions, setCustomerSubscriptions] = useLocalStorage<CustomerSubscription[]>('customerSubscriptions', []);
  const [user, setUser] = useLocalStorage('user', mockUser);
  const [plans] = useLocalStorage('plans', mockPlans);
  const [rentals] = useLocalStorage('rentals', mockRentals);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const activeSubscription = subscriptions.find(sub => sub.status === 'active');

  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications(customerSubscriptions);

  const handleLogin = (username: string, password: string) => {
    if (username === 'provider123' && password === 'Electica123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handlePlanSelect = (plan: Plan) => {
    console.log('Selected plan:', plan);
    // In a real app, this would navigate to payment flow
  };

  const handleAddCustomer = (customer: Customer, subscription: CustomerSubscription) => {
    setCustomers(prev => [...prev, customer]);
    setCustomerSubscriptions(prev => [...prev, subscription]);
  };

  const handleUpdateProfile = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return 'Dashboard';
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
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            darkMode={darkMode}
            onToggleDarkMode={setDarkMode}
          />
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        title={getPageTitle()}
        showNotifications={activeTab !== 'notifications'}
        notificationCount={unreadCount}
        onNotificationClick={() => setActiveTab('notifications')}
        darkMode={darkMode}
      />
      
      <main className="px-4 py-6 pb-24 max-w-md mx-auto">
        {renderPage()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={unreadCount}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;