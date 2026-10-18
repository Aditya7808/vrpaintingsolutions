'use client';

import { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminGetLeads, adminExportLeads } from '@/lib/api';
import type { Lead } from '@/lib/types';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminGetLeads()
      .then(setLeads)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.service_interested || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = async () => {
    try {
      const blob = await adminExportLeads();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Leads</h1>
        <button onClick={handleExport} className="btn btn-secondary text-sm py-2 px-4">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search by name, phone, or service…"
          className="form-field pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-card shadow-subtle overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Name</th>
                  <th className="px-4 py-3 font-medium text-muted">Phone</th>
                  <th className="px-4 py-3 font-medium text-muted">Email</th>
                  <th className="px-4 py-3 font-medium text-muted">Service</th>
                  <th className="px-4 py-3 font-medium text-muted">Message</th>
                  <th className="px-4 py-3 font-medium text-muted">Source</th>
                  <th className="px-4 py-3 font-medium text-muted">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-cream/50">
                    <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">{lead.phone}</td>
                    <td className="px-4 py-3 text-muted">{lead.email || '—'}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">{lead.service_interested || '—'}</td>
                    <td className="px-4 py-3 text-muted max-w-[200px] truncate">{lead.message || '—'}</td>
                    <td className="px-4 py-3 text-muted text-xs">{lead.utm_source || '—'}</td>
                    <td className="px-4 py-3 text-muted text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-xs text-muted mt-3">{filtered.length} lead{filtered.length !== 1 ? 's' : ''}</div>
    </AdminLayout>
  );
}
