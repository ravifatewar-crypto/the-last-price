'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Lock, 
  LogOut, 
  CheckCircle2,
  AlertCircle,
  Key
} from 'lucide-react';
import { CategoryBadge } from '@/components/ui/Badge';
import { OpportunityItem, BuilderItem, AreaItem } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [newPassphrase, setNewPassphrase] = useState<string>('');
  const [confirmPassphrase, setConfirmPassphrase] = useState<string>('');
  const [passphraseSuccess, setPassphraseSuccess] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'opportunities' | 'builders' | 'areas'>('opportunities');

  // Data states
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [builders, setBuilders] = useState<BuilderItem[]>([]);
  const [areas, setAreas] = useState<AreaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal & Edit states
  const [showOpModal, setShowOpModal] = useState<boolean>(false);
  const [editingOp, setEditingOp] = useState<OpportunityItem | null>(null);

  const [showBuilderModal, setShowBuilderModal] = useState<boolean>(false);
  const [editingBuilder, setEditingBuilder] = useState<BuilderItem | null>(null);

  const [showAreaModal, setShowAreaModal] = useState<boolean>(false);
  const [editingArea, setEditingArea] = useState<AreaItem | null>(null);

  // Form inputs for Opportunity
  const [opFormData, setOpFormData] = useState({
    title: '',
    slug: '',
    category: 'NEW',
    propertyType: 'RESIDENTIAL',
    city: '',
    country: 'India',
    priceBand: '',
    thesis: '',
    summary: '',
    imagesStr: '',
    status: 'PUBLISHED',
    featured: false,
    areaId: '',
    builderId: '',
  });

  // Form inputs for Builder
  const [builderFormData, setBuilderFormData] = useState({
    name: '',
    slug: '',
    history: '',
    trackRecord: '',
    logo: '',
    pastProjectsStr: '',
  });

  // Form inputs for Area
  const [areaFormData, setAreaFormData] = useState({
    name: '',
    slug: '',
    overview: '',
    infraHighlightsStr: '',
    priceTrendNotes: '',
  });

  // Check auth session
  useEffect(() => {
    const auth = localStorage.getItem('tlp_admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassphrase = localStorage.getItem('tlp_admin_custom_password') || 'adminpassword123';
    if (passwordInput === storedPassphrase || passwordInput.trim() === storedPassphrase) {
      localStorage.setItem('tlp_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      fetchData();
    } else {
      setLoginError('Invalid admin passphrase. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tlp_admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleSavePassphrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassphrase.length < 4) {
      alert('Passphrase must be at least 4 characters long');
      return;
    }
    if (newPassphrase !== confirmPassphrase) {
      alert('Passphrases do not match');
      return;
    }
    localStorage.setItem('tlp_admin_custom_password', newPassphrase);
    setPassphraseSuccess('Passphrase updated successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPassphraseSuccess('');
      setNewPassphrase('');
      setConfirmPassphrase('');
    }, 1200);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [opRes, builderRes, areaRes] = await Promise.all([
        fetch('/api/opportunities?status=ALL'),
        fetch('/api/builders'),
        fetch('/api/areas'),
      ]);

      if (opRes.ok) setOpportunities(await opRes.json());
      if (builderRes.ok) setBuilders(await builderRes.json());
      if (areaRes.ok) setAreas(await areaRes.json());
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Featured status directly
  const toggleFeatured = async (op: OpportunityItem) => {
    try {
      const res = await fetch(`/api/opportunities/${op.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !op.featured }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete opportunity
  const deleteOpportunity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    try {
      const res = await fetch(`/api/opportunities/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Open Op modal
  const openOpModal = (op?: OpportunityItem) => {
    if (op) {
      setEditingOp(op);
      setOpFormData({
        title: op.title,
        slug: op.slug,
        category: op.category,
        propertyType: op.propertyType,
        city: op.city,
        country: op.country,
        priceBand: op.priceBand,
        thesis: op.thesis,
        summary: op.summary,
        imagesStr: Array.isArray(op.images) ? op.images.join(', ') : '',
        status: op.status,
        featured: op.featured,
        areaId: op.areaId || '',
        builderId: op.builderId || '',
      });
    } else {
      setEditingOp(null);
      setOpFormData({
        title: '',
        slug: '',
        category: 'NEW',
        propertyType: 'RESIDENTIAL',
        city: 'Ghaziabad',
        country: 'India',
        priceBand: '₹1.2Cr – 1.8Cr',
        thesis: '',
        summary: '',
        imagesStr: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        status: 'PUBLISHED',
        featured: false,
        areaId: areas[0]?.id || '',
        builderId: builders[0]?.id || '',
      });
    }
    setShowOpModal(true);
  };

  // Save Opportunity
  const saveOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArr = opFormData.imagesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...opFormData,
      images: imagesArr,
      slug: opFormData.slug || opFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    try {
      if (editingOp) {
        await fetch(`/api/opportunities/${editingOp.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/opportunities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setShowOpModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Builder
  const saveBuilder = async (e: React.FormEvent) => {
    e.preventDefault();
    const pastProjectsArr = builderFormData.pastProjectsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...builderFormData,
      pastProjects: pastProjectsArr,
      slug: builderFormData.slug || builderFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      await fetch('/api/builders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setShowBuilderModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Area
  const saveArea = async (e: React.FormEvent) => {
    e.preventDefault();
    const infraArr = areaFormData.infraHighlightsStr.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...areaFormData,
      infraHighlights: infraArr,
      slug: areaFormData.slug || areaFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    try {
      await fetch('/api/areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setShowAreaModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-[#0A0A0A] bg-white p-8 space-y-6 shadow-md">
          <div className="space-y-2 border-b border-[#E5E5E5] pb-4">
            <span className="brand-wordmark text-2xl font-bold tracking-tight block">
              the last price.
            </span>
            <span className="text-xs font-mono uppercase text-[#6B6B6B] block">
              internal administration portal
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] mb-1">
                Admin Security Passphrase
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password (demo: adminpassword123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-xs text-[#0A0A0A] bg-[#F9F9F9] border border-[#E5E5E5] p-3 focus:border-[#0A0A0A] focus:outline-none"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3 hover:bg-[#262626] transition-colors"
            >
              authenticate admin portal
            </button>
          </form>

          <p className="text-[10px] text-[#737373] text-center">
            Weekly research update workflow tool. Zero code required to edit content.
          </p>
        </div>
      </div>
    );
  }

  // Dashboard Stats
  const countNew = opportunities.filter((o) => o.category === 'NEW').length;
  const countReinvest = opportunities.filter((o) => o.category === 'RE_INVESTMENT').length;
  const countMissed = opportunities.filter((o) => o.category === 'MISSED').length;
  const countFeatured = opportunities.filter((o) => o.featured).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E5E5] pb-6 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6B6B6B]">
            internal content management
          </span>
          <h1 className="text-3xl font-extrabold text-[#0A0A0A] tracking-tight lowercase">
            weekly research update dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] bg-[#F9F9F9] hover:bg-[#E5E5E5] border border-[#E5E5E5] px-4 py-2"
          >
            <Key className="w-3.5 h-3.5 mr-1.5" />
            change passphrase
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] border border-[#E5E5E5] px-4 py-2 bg-white"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            lock session
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-[#F9F9F9] border border-[#E5E5E5] space-y-2">
          <span className="block text-[10px] font-mono uppercase text-[#6B6B6B]">New Opportunities</span>
          <span className="text-3xl font-extrabold text-[#1F5C3D] font-data">{countNew}</span>
        </div>
        <div className="p-6 bg-[#F9F9F9] border border-[#E5E5E5] space-y-2">
          <span className="block text-[10px] font-mono uppercase text-[#6B6B6B]">Re-Investments</span>
          <span className="text-3xl font-extrabold text-[#B08D3F] font-data">{countReinvest}</span>
        </div>
        <div className="p-6 bg-[#F9F9F9] border border-[#E5E5E5] space-y-2">
          <span className="block text-[10px] font-mono uppercase text-[#6B6B6B]">Missed Proof Points</span>
          <span className="text-3xl font-extrabold text-[#6B6B6B] font-data">{countMissed}</span>
        </div>
        <div className="p-6 bg-[#0A0A0A] text-white space-y-2">
          <span className="block text-[10px] font-mono uppercase text-[#A3A3A3]">Featured Hero Carousel</span>
          <span className="text-3xl font-extrabold text-white font-data">{countFeatured} / 3</span>
        </div>
      </div>

      {/* Tabs Bar & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E5E5] gap-4">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider border-b-2 ${
              activeTab === 'opportunities' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B]'
            }`}
          >
            Opportunities ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('builders')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider border-b-2 ${
              activeTab === 'builders' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B]'
            }`}
          >
            Builders ({builders.length})
          </button>
          <button
            onClick={() => setActiveTab('areas')}
            className={`pb-4 text-xs font-semibold uppercase tracking-wider border-b-2 ${
              activeTab === 'areas' ? 'border-[#0A0A0A] text-[#0A0A0A]' : 'border-transparent text-[#6B6B6B]'
            }`}
          >
            Areas ({areas.length})
          </button>
        </div>

        <div>
          {activeTab === 'opportunities' && (
            <button
              onClick={() => openOpModal()}
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white px-4 py-2.5 hover:bg-[#262626]"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              create new opportunity
            </button>
          )}
          {activeTab === 'builders' && (
            <button
              onClick={() => setShowBuilderModal(true)}
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white px-4 py-2.5 hover:bg-[#262626]"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              create new builder
            </button>
          )}
          {activeTab === 'areas' && (
            <button
              onClick={() => setShowAreaModal(true)}
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white px-4 py-2.5 hover:bg-[#262626]"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              create new area profile
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Opportunities Management Table */}
      {activeTab === 'opportunities' && (
        <div className="border border-[#E5E5E5] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] font-mono uppercase text-[#6B6B6B]">
              <tr>
                <th className="p-4">Opportunity Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">City / Country</th>
                <th className="p-4">Price Band</th>
                <th className="p-4">Carousel Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {opportunities.map((op) => (
                <tr key={op.id} className="hover:bg-[#F9F9F9]">
                  <td className="p-4 font-bold text-[#0A0A0A] max-w-xs truncate">
                    {op.title}
                  </td>
                  <td className="p-4">
                    <CategoryBadge category={op.category} size="sm" />
                  </td>
                  <td className="p-4 text-[#6B6B6B]">
                    {op.city}, {op.country}
                  </td>
                  <td className="p-4 font-data font-medium text-[#0A0A0A]">
                    {op.priceBand}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(op)}
                      className={`inline-flex items-center px-2.5 py-1 border text-[10px] font-mono uppercase ${
                        op.featured
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                          : 'bg-white text-[#6B6B6B] border-[#E5E5E5]'
                      }`}
                    >
                      <Star className={`w-3 h-3 mr-1 ${op.featured ? 'fill-white' : ''}`} />
                      {op.featured ? 'Featured Hero' : 'Off Carousel'}
                    </button>
                  </td>
                  <td className="p-4 uppercase font-mono text-[10px] font-bold text-[#0A0A0A]">
                    {op.status}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openOpModal(op)}
                      className="p-1.5 border border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]"
                      title="Edit Opportunity"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteOpportunity(op.id)}
                      className="p-1.5 border border-[#E5E5E5] text-red-600 hover:border-red-600"
                      title="Delete Opportunity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Builders Table */}
      {activeTab === 'builders' && (
        <div className="border border-[#E5E5E5] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] font-mono uppercase text-[#6B6B6B]">
              <tr>
                <th className="p-4">Developer Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Track Record</th>
                <th className="p-4">Covered Projects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {builders.map((builder) => (
                <tr key={builder.id} className="hover:bg-[#F9F9F9]">
                  <td className="p-4 font-bold text-[#0A0A0A]">{builder.name}</td>
                  <td className="p-4 font-mono text-[#6B6B6B]">{builder.slug}</td>
                  <td className="p-4 text-[#262626] max-w-sm truncate">{builder.trackRecord}</td>
                  <td className="p-4 font-mono">{builder.pastProjects.length} Delivered</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Areas Table */}
      {activeTab === 'areas' && (
        <div className="border border-[#E5E5E5] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F9F9] border-b border-[#E5E5E5] font-mono uppercase text-[#6B6B6B]">
              <tr>
                <th className="p-4">Micro-Market Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Price Trend Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-[#F9F9F9]">
                  <td className="p-4 font-bold text-[#0A0A0A]">{area.name}</td>
                  <td className="p-4 font-mono text-[#6B6B6B]">{area.slug}</td>
                  <td className="p-4 text-[#262626] max-w-md truncate">{area.priceTrendNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Opportunity Edit Modal */}
      {showOpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#0A0A0A] max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">
                {editingOp ? 'Edit Opportunity Note' : 'Create New Opportunity Note'}
              </h3>
              <button onClick={() => setShowOpModal(false)} className="text-xs uppercase font-mono text-[#6B6B6B]">
                Close [X]
              </button>
            </div>

            <form onSubmit={saveOpportunity} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Title *</label>
                  <input
                    type="text"
                    required
                    value={opFormData.title}
                    onChange={(e) => setOpFormData({ ...opFormData, title: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Slug (URL)</label>
                  <input
                    type="text"
                    placeholder="e.g. noida-extension-project"
                    value={opFormData.slug}
                    onChange={(e) => setOpFormData({ ...opFormData, slug: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Category *</label>
                  <select
                    value={opFormData.category}
                    onChange={(e) => setOpFormData({ ...opFormData, category: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  >
                    <option value="NEW">New Investment Opportunity</option>
                    <option value="RE_INVESTMENT">Re-Investment</option>
                    <option value="MISSED">Missed Opportunity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Property Type</label>
                  <select
                    value={opFormData.propertyType}
                    onChange={(e) => setOpFormData({ ...opFormData, propertyType: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  >
                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Price Band *</label>
                  <input
                    type="text"
                    required
                    placeholder="₹1.2Cr – 1.8Cr"
                    value={opFormData.priceBand}
                    onChange={(e) => setOpFormData({ ...opFormData, priceBand: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">City *</label>
                  <input
                    type="text"
                    required
                    value={opFormData.city}
                    onChange={(e) => setOpFormData({ ...opFormData, city: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Country</label>
                  <input
                    type="text"
                    value={opFormData.country}
                    onChange={(e) => setOpFormData({ ...opFormData, country: e.target.value })}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">1-2 Sentence Thesis *</label>
                <textarea
                  required
                  rows={2}
                  value={opFormData.thesis}
                  onChange={(e) => setOpFormData({ ...opFormData, thesis: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Full Research Breakdown (Markdown)</label>
                <textarea
                  rows={5}
                  value={opFormData.summary}
                  onChange={(e) => setOpFormData({ ...opFormData, summary: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Image URLs (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1..., https://..."
                  value={opFormData.imagesStr}
                  onChange={(e) => setOpFormData({ ...opFormData, imagesStr: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={opFormData.featured}
                    onChange={(e) => setOpFormData({ ...opFormData, featured: e.target.checked })}
                  />
                  <span>Feature on Homepage Hero Carousel</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowOpModal(false)}
                  className="text-xs uppercase px-4 py-2 border border-[#E5E5E5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white px-6 py-2"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Builder Modal */}
      {showBuilderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#0A0A0A] max-w-lg w-full p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">create developer profile</h3>
              <button onClick={() => setShowBuilderModal(false)} className="text-xs font-mono uppercase">Close [X]</button>
            </div>
            <form onSubmit={saveBuilder} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Developer Name *</label>
                <input
                  type="text"
                  required
                  value={builderFormData.name}
                  onChange={(e) => setBuilderFormData({ ...builderFormData, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">History & Overview</label>
                <textarea
                  rows={3}
                  value={builderFormData.history}
                  onChange={(e) => setBuilderFormData({ ...builderFormData, history: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Track Record Summary</label>
                <input
                  type="text"
                  placeholder="e.g. Delivered 12M sq.ft."
                  value={builderFormData.trackRecord}
                  onChange={(e) => setBuilderFormData({ ...builderFormData, trackRecord: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Past Projects (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Project A, Project B, Project C"
                  value={builderFormData.pastProjectsStr}
                  onChange={(e) => setBuilderFormData({ ...builderFormData, pastProjectsStr: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <button
                type="submit"
                className="w-full text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3"
              >
                Save Developer Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Area Modal */}
      {showAreaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#0A0A0A] max-w-lg w-full p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">create micro-market area profile</h3>
              <button onClick={() => setShowAreaModal(false)} className="text-xs font-mono uppercase">Close [X]</button>
            </div>
            <form onSubmit={saveArea} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Micro-Market Name *</label>
                <input
                  type="text"
                  required
                  value={areaFormData.name}
                  onChange={(e) => setAreaFormData({ ...areaFormData, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Corridor Overview</label>
                <textarea
                  rows={3}
                  value={areaFormData.overview}
                  onChange={(e) => setAreaFormData({ ...areaFormData, overview: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Price Trend Notes</label>
                <input
                  type="text"
                  value={areaFormData.priceTrendNotes}
                  onChange={(e) => setAreaFormData({ ...areaFormData, priceTrendNotes: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Infra Highlights (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="RRTS Station, Elevated Expressway, Metro Link"
                  value={areaFormData.infraHighlightsStr}
                  onChange={(e) => setAreaFormData({ ...areaFormData, infraHighlightsStr: e.target.value })}
                  className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                />
              </div>
              <button
                type="submit"
                className="w-full text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3"
              >
                Save Micro-Market Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Passphrase Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#0A0A0A] max-w-md w-full p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="text-xl font-bold text-[#0A0A0A] lowercase">change admin passphrase</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-xs font-mono uppercase">Close [X]</button>
            </div>
            {passphraseSuccess ? (
              <div className="p-4 bg-[#F9F9F9] border border-[#1F5C3D] text-xs font-bold text-[#1F5C3D] flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {passphraseSuccess}
              </div>
            ) : (
              <form onSubmit={handleSavePassphrase} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">New Passphrase *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new admin passphrase"
                    value={newPassphrase}
                    onChange={(e) => setNewPassphrase(e.target.value)}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#6B6B6B]">Confirm New Passphrase *</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new admin passphrase"
                    value={confirmPassphrase}
                    onChange={(e) => setConfirmPassphrase(e.target.value)}
                    className="w-full text-xs p-2.5 border border-[#E5E5E5] bg-[#F9F9F9]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-xs font-semibold uppercase tracking-wider bg-[#0A0A0A] text-white py-3"
                >
                  Update Passphrase
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
