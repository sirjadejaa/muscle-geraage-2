'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Grid,
  FileText,
  MessageSquare,
  LogOut,
  Trash2,
  Check,
  Clock,
  Archive,
  RefreshCw,
  Search,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'leads' | 'content'>('leads');

  // Fetch leads and check auth status
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/leads');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'PENDING' | 'CONTACTED' | 'ARCHIVED') => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.program.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === 'PENDING').length;
  const contactedLeads = leads.filter((l) => l.status === 'CONTACTED').length;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 z-30 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-accent text-[10px] font-semibold tracking-[0.4em] uppercase block">
              MANAGEMENT CONTROL
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl uppercase tracking-wider text-white">
              ADMIN <span className="text-accent">DASHBOARD</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-950/20 border border-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-black hover:border-red-500 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Leads */}
          <div className="glass-panel p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                Total Leads
              </span>
              <span className="font-heading text-4xl text-white">{totalLeads}</span>
            </div>
            <Users className="w-8 h-8 text-accent opacity-30" />
          </div>

          {/* Pending */}
          <div className="glass-panel p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                Pending Actions
              </span>
              <span className="font-heading text-4xl text-accent">{pendingLeads}</span>
            </div>
            <Clock className="w-8 h-8 text-accent opacity-30 animate-pulse" />
          </div>

          {/* Contacted */}
          <div className="glass-panel p-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                Leads Contacted
              </span>
              <span className="font-heading text-4xl text-green-500">{contactedLeads}</span>
            </div>
            <Check className="w-8 h-8 text-green-500 opacity-30" />
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 gap-6">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'leads'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            Leads Management
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'content'
                ? 'border-b-2 border-accent text-accent'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            Static Database Inclusions
          </button>
        </div>

        {/* Tab 1: Leads list */}
        {activeTab === 'leads' && (
          <div className="flex flex-col gap-6">
            
            {/* Filter Row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone, program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary border border-white/15 pl-12 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {['All', 'PENDING', 'CONTACTED', 'ARCHIVED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      statusFilter === status
                        ? 'bg-accent text-black border-accent'
                        : 'border-white/10 text-gray-400 hover:border-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="glass-panel overflow-hidden">
              {loading ? (
                <div className="py-20 text-center text-gray-500 text-xs uppercase tracking-widest">
                  Loading leads...
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-20 text-center text-gray-500 text-xs uppercase tracking-widest">
                  No leads found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-[10px] uppercase tracking-widest">
                        <th className="py-4 px-6">Name</th>
                        <th className="py-4 px-6">Contact Info</th>
                        <th className="py-4 px-6">Program</th>
                        <th className="py-4 px-6">Message</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-b border-white/5 hover:bg-white/[0.01] transition-colors text-xs"
                        >
                          <td className="py-4 px-6 font-semibold text-white">{lead.name}</td>
                          <td className="py-4 px-6 flex flex-col gap-1">
                            <span className="text-gray-300">{lead.phone}</span>
                            <span className="text-gray-500">{lead.email}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-accent/10 border border-accent/20 px-2.5 py-1 text-[10px] font-semibold text-accent uppercase tracking-wider">
                              {lead.program}
                            </span>
                          </td>
                          <td className="py-4 px-6 max-w-xs truncate text-gray-400">
                            {lead.message || '—'}
                          </td>
                          <td className="py-4 px-6 text-gray-500">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: '2-digit',
                            })}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border ${
                                lead.status === 'PENDING'
                                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                  : lead.status === 'CONTACTED'
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                  : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {lead.status !== 'CONTACTED' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'CONTACTED')}
                                  title="Mark as Contacted"
                                  className="w-8 h-8 flex items-center justify-center border border-white/5 hover:border-green-500 hover:text-green-500 transition-colors"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {lead.status !== 'ARCHIVED' && (
                                <button
                                  onClick={() => handleUpdateStatus(lead.id, 'ARCHIVED')}
                                  title="Archive Lead"
                                  className="w-8 h-8 flex items-center justify-center border border-white/5 hover:border-amber-500 hover:text-amber-500 transition-colors"
                                >
                                  <Archive className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Delete Lead"
                                className="w-8 h-8 flex items-center justify-center border border-white/5 hover:border-red-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Content database review */}
        {activeTab === 'content' && (
          <div className="glass-panel p-8 flex flex-col gap-6">
            <h3 className="font-heading text-2xl uppercase tracking-wider text-white mb-2">
              Database Seeding Status
            </h3>
            <p className="font-body text-sm text-gray-400 leading-relaxed max-w-2xl">
              All content elements (FAQ accordions, Pinterest gallery items, coach profiles, programs list, blog posts, and testimonials) are retrieved dynamically from your local SQLite database seed.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              <div className="border border-white/5 p-6 flex flex-col justify-between min-h-[140px] bg-secondary">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Active Programs</span>
                <span className="font-heading text-4xl text-accent">8 Selections</span>
              </div>
              <div className="border border-white/5 p-6 flex flex-col justify-between min-h-[140px] bg-secondary">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Elite Coaches</span>
                <span className="font-heading text-4xl text-accent">4 Profiles</span>
              </div>
              <div className="border border-white/5 p-6 flex flex-col justify-between min-h-[140px] bg-secondary">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Gallery items</span>
                <span className="font-heading text-4xl text-accent">11 Media Items</span>
              </div>
              <div className="border border-white/5 p-6 flex flex-col justify-between min-h-[140px] bg-secondary">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Published Blogs</span>
                <span className="font-heading text-4xl text-accent">3 Articles</span>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}
