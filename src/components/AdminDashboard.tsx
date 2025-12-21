"use client";

import React from 'react';
import BillingDashboard from './BillingDashboard';

export default function AdminDashboard() {
  const [billingOpen, setBillingOpen] = React.useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="space-y-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setBillingOpen(true)}
        >
          Open Billing Dashboard
        </button>

        {/* TODO: Add user list, role management, audit logs */}
      </div>

      <BillingDashboard isOpen={billingOpen} onClose={() => setBillingOpen(false)} />
    </div>
  );
}
