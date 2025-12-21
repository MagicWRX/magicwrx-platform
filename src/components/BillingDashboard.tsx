'use client';

import React, { useState, useEffect } from 'react';
// Note: You may need to adjust imports based on MagicWRX project structure
// This file was moved from MXN.CHAT
import { 
  CreditCard, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Database, 
  HardDrive, 
  Zap, 
  Wifi,
  Shield,
  X
} from 'lucide-react';

// Mock types/functions if they don't exist in MagicWRX yet
interface UserBillingStatus {
  accountType: string;
  usageMetrics: any;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}

interface BillingDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BillingDashboard({ isOpen, onClose }: BillingDashboardProps) {
  // Mock state for now
  const [billingStatus, setBillingStatus] = useState<UserBillingStatus | null>({
      accountType: 'pro',
      usageMetrics: {
          readPercentage: 45,
          writePercentage: 30,
          storagePercentage: 60,
          functionPercentage: 10
      },
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  // Mock formatted metrics
  const formattedMetrics = {
      cost: '$24.99',
      projected: '$24.99',
      reads: '450k / 1M',
      writes: '300k / 1M',
      storage: '6GB / 10GB',
      functions: '10k / 100k'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            💰 Billing Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading billing information...</p>
          </div>
        )}

        {billingStatus && !isLoading && (
          <div className="space-y-6">
            {/* Account Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-white font-semibold">Account Type</span>
                </div>
                <p className="text-green-400 text-lg">
                  {billingStatus.accountType.toUpperCase()}
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-semibold">Current Cost</span>
                </div>
                <p className="text-yellow-400 text-lg">
                  {formattedMetrics?.cost}
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                  <span className="text-white font-semibold">Projected</span>
                </div>
                <p className="text-orange-400 text-lg">
                  {formattedMetrics?.projected}
                </p>
              </div>
            </div>

            {/* Usage Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-semibold">Database Reads</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">{formattedMetrics?.reads}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(billingStatus.usageMetrics.readPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Database className="h-5 w-5 text-green-400" />
                  <span className="text-white font-semibold">Database Writes</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">{formattedMetrics?.writes}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(billingStatus.usageMetrics.writePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <HardDrive className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-semibold">Storage</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">{formattedMetrics?.storage}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(billingStatus.usageMetrics.storagePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-semibold">Cloud Functions</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">{formattedMetrics?.functions}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(billingStatus.usageMetrics.functionPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Period */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Current Billing Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Period Start</p>
                  <p className="text-white">{billingStatus.currentPeriodStart.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Period End</p>
                  <p className="text-white">{billingStatus.currentPeriodEnd.toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button 
                className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <CreditCard className="h-4 w-4 inline mr-2" />
                Upgrade Plan
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors">
                <Wifi className="h-4 w-4 inline mr-2" />
                Usage History
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors">
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
