'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Save, X, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getServices, adminUpdateService, adminDeleteService } from '@/lib/api';
import type { ServiceSummary } from '@/lib/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', short_description: '' });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    setLoading(true);
    getServices()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const startEdit = (svc: ServiceSummary) => {
    setEditing(svc.id);
    setEditForm({ title: svc.title, short_description: svc.short_description });
  };

  const saveEdit = async (id: string) => {
    try {
      await adminUpdateService(id, editForm);
      setEditing(null);
      loadServices();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await adminDeleteService(id);
      loadServices();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-charcoal">Services</h1>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="skeleton h-20 rounded-card" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc.id} className="bg-white rounded-card p-5 shadow-subtle">
              {editing === svc.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    className="form-field"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Service title"
                  />
                  <textarea
                    className="form-field resize-none"
                    rows={2}
                    value={editForm.short_description}
                    onChange={(e) => setEditForm({ ...editForm, short_description: e.target.value })}
                    placeholder="Short description"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(svc.id)} className="btn btn-primary text-sm py-1.5 px-3">
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                    <button onClick={() => setEditing(null)} className="btn btn-secondary text-sm py-1.5 px-3">
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-base text-charcoal">{svc.title}</h3>
                    <p className="text-sm text-muted mt-1">{svc.short_description}</p>
                    <span className="text-xs text-muted mt-2 inline-block bg-cream rounded px-2 py-0.5">/{svc.slug}</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => startEdit(svc)} className="p-2 text-muted hover:text-charcoal hover:bg-cream rounded-btn transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteService(svc.id)} className="p-2 text-muted hover:text-red-600 hover:bg-red-50 rounded-btn transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
