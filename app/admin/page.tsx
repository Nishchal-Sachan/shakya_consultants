'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'clients'>('projects');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  // Form states - Projects
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    projectLink: '',
    image: null as File | null,
  });

  // Form states - Clients
  const [clientForm, setClientForm] = useState({
    name: '',
    logo: null as File | null,
  });

  // Helper to get token
  const getAuthToken = () => localStorage.getItem('adminToken');

  // Check Auth on Mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchProjects();
      fetchClients();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.success) setClients(data.data);
    } catch (err) {
      console.error('Failed to fetch clients');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('projectLink', projectForm.projectLink);
      if (projectForm.image) formData.append('image', projectForm.image);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Project added successfully!');
        setProjectForm({ title: '', description: '', projectLink: '', image: null });
        fetchProjects();
      } else {
        setError(data.error || 'Failed to add project');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const formData = new FormData();
      formData.append('name', clientForm.name);
      if (clientForm.logo) formData.append('logo', clientForm.logo);

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Client added successfully!');
        setClientForm({ name: '', logo: null });
        fetchClients();
      } else {
        setError(data.error || 'Failed to add client');
        if (res.status === 401) handleLogout();
      }
    } catch (err) {
      setError('Form submission failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/projects/${id}`, { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if (data.success) {
          fetchProjects();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Deletion failed');
    }
  };

  const deleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    const token = getAuthToken();
    if (!token) return router.push('/admin/login');

    try {
      const res = await fetch(`/api/clients/${id}`, { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if (data.success) {
          fetchClients();
      } else {
          if (res.status === 401) handleLogout();
      }
    } catch (err) {
      alert('Deletion failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Manage your projects and clients effortlessly.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
            Logout
          </Button>
        </header>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'projects' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </Button>
          <Button
            variant={activeTab === 'clients' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('clients')}
          >
            Clients
          </Button>
        </div>

        {/* Feedback Messages */}
        {success && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {activeTab === 'projects' ? 'Add New Project' : 'Add New Client'}
              </h2>
              
              {activeTab === 'projects' ? (
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="project-title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                      id="project-title"
                      type="text"
                      placeholder="Project Title"
                      className="w-full p-2 border border-border-default rounded focus:ring-accent-primary"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-desc" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      id="project-desc"
                      placeholder="Brief project description..."
                      className="w-full p-2 border border-border-default rounded"
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-link" className="block text-sm font-medium mb-1">Project Link</label>
                    <input
                      id="project-link"
                      type="url"
                      placeholder="https://example.com"
                      className="w-full p-2 border border-border-default rounded"
                      value={projectForm.projectLink}
                      onChange={(e) => setProjectForm({ ...projectForm, projectLink: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="project-image" className="block text-sm font-medium mb-1">Image Upload</label>
                    <input
                      id="project-image"
                      type="file"
                      title="Select project image"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })}
                      required
                    />
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Add Project'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="client-name" className="block text-sm font-medium mb-1">Client Name</label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Client or Company Name"
                      className="w-full p-2 border border-border-default rounded"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="client-logo" className="block text-sm font-medium mb-1">Logo Upload</label>
                    <input
                      id="client-logo"
                      type="file"
                      title="Select client logo"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => setClientForm({ ...clientForm, logo: e.target.files?.[0] || null })}
                      required
                    />
                  </div>
                  <Button className="w-full" disabled={loading}>
                    {loading ? 'Uploading...' : 'Add Client'}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTab === 'projects' ? (
                projects.length > 0 ? (
                  projects.map((p) => (
                    <Card key={p._id} className="p-4 flex flex-col overflow-hidden">
                      <div className="h-40 bg-gray-100 rounded mb-4 overflow-hidden">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">{p.description}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <a href={p.projectLink} target="_blank" rel="noopener noreferrer" className="text-accent-primary text-sm font-semibold">View Link</a>
                        <button 
                          onClick={() => deleteProject(p._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-10 text-text-secondary">No projects found.</p>
                )
              ) : (
                clients.length > 0 ? (
                  clients.map((c) => (
                    <Card key={c._id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center border p-1">
                          <img src={c.logoUrl} alt={c.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <span className="font-semibold">{c.name}</span>
                      </div>
                      <button 
                        onClick={() => deleteClient(c._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-2 text-center py-10 text-text-secondary">No clients found.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
