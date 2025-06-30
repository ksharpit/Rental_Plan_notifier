import React, { useState } from 'react';
import { User, Calendar, Phone, MapPin, X, IndianRupee, Upload, FileText } from 'lucide-react';
import { Customer, Plan, CustomerSubscription } from '../../types';
import { addDays } from 'date-fns';

interface AddCustomerFormProps {
  plans: Plan[];
  onAddCustomer: (customer: Customer, subscription: CustomerSubscription) => void;
  onClose: () => void;
}

const ONETIME_FEE = 500; // INR 500 onetime fee

export function AddCustomerForm({ plans, onAddCustomer, onClose }: AddCustomerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    selectedPlanId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    paymentProof: null as File | null,
    paymentAmount: '',
    paymentNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.selectedPlanId) newErrors.selectedPlanId = 'Please select a plan';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.paymentAmount.trim()) newErrors.paymentAmount = 'Payment amount is required';
    
    // Validate that end date is after start date
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const selectedPlan = plans.find(p => p.id === formData.selectedPlanId)!;
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    const customerId = `customer-${Date.now()}`;
    const subscriptionId = `sub-${Date.now()}`;

    const customer: Customer = {
      id: customerId,
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@customer.com`, // Auto-generate email
      phone: formData.phone,
      address: formData.address || undefined,
      createdAt: new Date()
    };

    const subscription: CustomerSubscription = {
      id: subscriptionId,
      userId: customerId,
      planId: selectedPlan.id,
      startDate,
      endDate,
      status: 'active',
      autoRenew: false,
      customerName: formData.name,
      planName: selectedPlan.name,
      planPrice: selectedPlan.price
    };

    onAddCustomer(customer, subscription);
  };

  const selectedPlan = plans.find(p => p.id === formData.selectedPlanId);
  const totalAmount = selectedPlan ? selectedPlan.price + ONETIME_FEE : ONETIME_FEE;

  // Auto-suggest end date based on plan duration when plan is selected
  const handlePlanChange = (planId: string) => {
    setFormData(prev => {
      const plan = plans.find(p => p.id === planId);
      const suggestedEndDate = plan && prev.startDate 
        ? addDays(new Date(prev.startDate), plan.duration).toISOString().split('T')[0]
        : prev.endDate;
      
      return {
        ...prev,
        selectedPlanId: planId,
        endDate: suggestedEndDate,
        paymentAmount: plan ? totalAmount.toString() : ''
      };
    });
  };

  // Update suggested end date when start date changes
  const handleStartDateChange = (startDate: string) => {
    setFormData(prev => {
      const plan = selectedPlan;
      const suggestedEndDate = plan && startDate
        ? addDays(new Date(startDate), plan.duration).toISOString().split('T')[0]
        : prev.endDate;
      
      return {
        ...prev,
        startDate,
        endDate: prev.endDate || suggestedEndDate
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentProof: file }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.name ? 'border-error-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && <p className="text-sm text-error-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? 'border-error-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="text-sm text-error-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address (Optional)
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Plan</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a subscription plan *
              </label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.selectedPlanId === plan.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.selectedPlanId === plan.id}
                      onChange={(e) => handlePlanChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{plan.name}</h4>
                        <div className="flex items-center text-lg font-bold text-gray-900">
                          <IndianRupee size={16} />
                          <span>{plan.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {plan.duration} days • Unlimited minutes & kms
                      </p>
                      {plan.popular && (
                        <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {errors.selectedPlanId && <p className="text-sm text-error-600 mt-1">{errors.selectedPlanId}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.startDate ? 'border-error-500' : 'border-gray-300'
                  }`}
                />
                {errors.startDate && <p className="text-sm text-error-600 mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.endDate ? 'border-error-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && <p className="text-sm text-error-600 mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid *
              </label>
              <div className="relative">
                <IndianRupee size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  value={formData.paymentAmount}
                  onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.paymentAmount ? 'border-error-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount paid"
                />
              </div>
              {errors.paymentAmount && <p className="text-sm text-error-600 mt-1">{errors.paymentAmount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Proof (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                  id="payment-proof"
                />
                <label
                  htmlFor="payment-proof"
                  className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload size={16} className="mr-2 text-gray-400" />
                  <span className="text-gray-600">
                    {formData.paymentProof ? formData.paymentProof.name : 'Upload receipt/screenshot'}
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Notes (Optional)
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  value={formData.paymentNotes}
                  onChange={(e) => setFormData({ ...formData, paymentNotes: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Add payment notes (method, reference, etc.)"
                  rows={2}
                />
              </div>
            </div>

            {selectedPlan && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-900">Payment Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedPlan.name}</span>
                    <div className="flex items-center">
                      <IndianRupee size={14} />
                      <span>{selectedPlan.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">One-time setup fee</span>
                    <div className="flex items-center">
                      <IndianRupee size={14} />
                      <span>{ONETIME_FEE.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-1 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Expected</span>
                      <div className="flex items-center">
                        <IndianRupee size={16} />
                        <span>{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}