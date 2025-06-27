import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { CustomerList } from '../components/Customer/CustomerList';
import { AddCustomerForm } from '../components/Customer/AddCustomerForm';
import { Customer, CustomerSubscription, Plan } from '../types';

interface CustomersPageProps {
  customers: Customer[];
  subscriptions: CustomerSubscription[];
  plans: Plan[];
  onAddCustomer: (customer: Customer, subscription: CustomerSubscription) => void;
}

export function CustomersPage({ customers, subscriptions, plans, onAddCustomer }: CustomersPageProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired'>('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;

    const activeSubscription = subscriptions.find(sub => 
      sub.userId === customer.id && sub.status === 'active'
    );

    if (filterStatus === 'active') return !!activeSubscription;
    if (filterStatus === 'expired') return !activeSubscription;

    return true;
  });

  const handleAddCustomer = (customer: Customer, subscription: CustomerSubscription) => {
    onAddCustomer(customer, subscription);
    setShowAddForm(false);
  };

  const stats = {
    total: customers.length,
    active: subscriptions.filter(sub => sub.status === 'active').length,
    expired: customers.length - subscriptions.filter(sub => sub.status === 'active').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <p className="text-gray-600">Manage your bike rental customers</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus size={16} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Customers</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-success-600">{stats.active}</div>
          <div className="text-sm text-gray-600">Active Plans</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-error-600">{stats.expired}</div>
          <div className="text-sm text-gray-600">Expired Plans</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-3 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">All Customers</option>
              <option value="active">Active Plans</option>
              <option value="expired">Expired Plans</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <CustomerList
        customers={filteredCustomers}
        subscriptions={subscriptions}
      />

      {/* Add Customer Form Modal */}
      {showAddForm && (
        <AddCustomerForm
          plans={plans}
          onAddCustomer={handleAddCustomer}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}