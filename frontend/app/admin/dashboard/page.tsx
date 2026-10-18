'use client';

import { useState, useEffect } from 'react';
import { Users, TrendingUp, Clock } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminGetLeads } from '@/lib/api';
import type { Lead } from '@/lib/types';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetLeads()
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayLeads = leads.filter(l => l.created_at.startsWith(today));
  const thisWeek = leads.filter(l => {
    const d = new Date(l.created_at);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });

  return (
    <AdminLayout>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-card p-5 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">{leads.length}</div>
              <div className="text-xs text-muted">Total Leads</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-card p-5 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">{thisWeek.length}</div>
              <div className="text-xs text-muted">This Week</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-card p-5 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-terracotta-pale flex items-center justify-center">
              <Clock className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <div className="text-2xl font-bold text-charcoal">{todayLeads.length}</div>
              <div className="text-xs text-muted">Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <div className="bg-white rounded-card shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-line">
          <h2 className="font-heading font-bold text-lg text-charcoal">Recent Leads</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-muted">Loading…</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-muted">No leads yet. They&apos;ll appear here when customers submit the contact form.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Name</th>
                  <th className="px-4 py-3 font-medium text-muted">Phone</th>
                  <th className="px-4 py-3 font-medium text-muted">Service</th>
                  <th className="px-4 py-3 font-medium text-muted">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.slice(0, 10).map((lead) => (
                  <tr key={lead.id} className="hover:bg-cream/50">
                    <td className="px-4 py-3 font-medium text-charcoal">{lead.name}</td>
                    <td className="px-4 py-3 text-muted">{lead.phone}</td>
                    <td className="px-4 py-3 text-muted">{lead.service_interested || '—'}</td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
