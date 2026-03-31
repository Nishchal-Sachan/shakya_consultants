"use client";

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Star, Upload, X, CheckCircle2 } from 'lucide-react';

interface AddTestimonialFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddTestimonialForm({ onSuccess, onCancel }: AddTestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('company', formData.company);
      data.append('message', formData.message);
      data.append('rating', rating.toString());
      if (image) data.append('image', image);

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit testimonial');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[400px] animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-black text-text-primary tracking-tight">Received with Thanks!</h3>
        <p className="text-text-secondary max-w-sm">
          Your testimonial has been submitted. It will be visible on our site once our team reviews and approves it.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white max-w-lg mx-auto w-full max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[2rem]">
      <div className="mb-5 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-black text-text-primary tracking-tighter">Share Your Experience</h3>
          <p className="text-[11px] text-text-muted mt-0.5 font-bold uppercase tracking-wider">Your feedback drives our excellence.</p>
        </div>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} className="text-text-muted" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full bg-gray-50 border border-border-default px-3 py-2.5 rounded-xl font-bold text-text-primary text-sm focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Company</label>
            <input
              type="text"
              placeholder="Acme Inc."
              className="w-full bg-gray-50 border border-border-default px-3 py-2.5 rounded-xl font-bold text-text-primary text-sm focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary outline-none transition-all"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Your Role / Headline</label>
          <input
            type="text"
            placeholder="Director, Founder, Manager, etc."
            className="w-full bg-gray-50 border border-border-default px-3 py-2.5 rounded-xl font-bold text-text-primary text-sm focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary outline-none transition-all"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Your Message</label>
          <textarea
            required
            rows={3}
            placeholder="Tell us about your experience working with us..."
            className="w-full bg-gray-50 border border-border-default px-3 py-2.5 rounded-xl font-bold text-text-primary text-sm focus:ring-4 focus:ring-accent-primary/5 focus:border-accent-primary outline-none transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between py-1 border-y border-gray-50">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-text-muted uppercase tracking-[0.15em] ml-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={`transition-transform active:scale-90 ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}
                >
                  <Star size={18} fill={s <= rating ? "currentColor" : "none"} strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50/50 p-1.5 rounded-xl border border-dashed border-gray-200">
            <label className="relative shrink-0 w-9 h-9 rounded-full border-2 border-white shadow-sm hover:border-accent-primary transition-colors cursor-pointer flex items-center justify-center overflow-hidden bg-white">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload size={14} className="text-text-muted" />
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </label>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-text-primary leading-tight uppercase tracking-wider">{image ? "Photo Added" : "Add Photo"}</span>
              <span className="text-[8px] font-bold text-text-muted leading-tight">Optional</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-red-500 text-[9px] font-black uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <div className="pt-1">
          <Button 
            className="w-full py-3.5 rounded-xl shadow-premium bg-accent-primary hover:scale-[1.01] active:scale-95 text-[10px] tracking-widest font-black uppercase"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}
