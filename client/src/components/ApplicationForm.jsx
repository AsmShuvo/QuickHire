import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../api/apiClient';

const ApplicationForm = ({ jobTitle, jobId, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    cover_note: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await apiClient.post('/applications', {
        ...formData,
        job_id: jobId
      });
      if (response.data.success) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          navigate('/');
        }, 2500);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden relative shadow-2xl my-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-300 hover:text-gray-600 transition-colors"
        >
          <X size={28} />
        </button>
        
        <div className="p-10 lg:p-14">
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold text-[#0D0D0D] mb-3">Apply Now</h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              Joining <span className="text-[#3B49DF] font-bold">{jobTitle}</span> starts here. Fill out your details below.
            </p>
          </header>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50/50 text-green-600 p-12 rounded-[32px] text-center border border-green-100"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-100">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Sent Successfully!</h3>
              <p className="font-medium opacity-80 leading-relaxed">Your professional profile is now with the hiring team. Good luck!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Johnson"
                  className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-medium text-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@example.com"
                  className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-medium text-gray-700"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Resume URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="Portfolio or Cloud Storage link"
                  className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-medium text-gray-700"
                  value={formData.resume_link}
                  onChange={(e) => setFormData({...formData, resume_link: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Professional Note</label>
                <textarea 
                  rows="4"
                  placeholder="What makes you the unique candidate for this role?"
                  className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-medium text-gray-700 resize-none"
                  value={formData.cover_note}
                  onChange={(e) => setFormData({...formData, cover_note: e.target.value})}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">Submission failed. Check your network and try again.</p>
              )}
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#3B49DF] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl shadow-blue-200 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : 'Submit Application'}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationForm;
