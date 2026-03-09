import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, MoreVertical, Briefcase, Users, Zap } from 'lucide-react';
import apiClient from '../api/apiClient';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    category: 'Technology',
    description: '',
    type: 'Full Time',
    salary: '',
    logo: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiClient.get('/jobs');
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/jobs', newJob);
      if (response.data.success) {
        setJobs([response.data.data, ...jobs]);
        setShowAddModal(false);
        setNewJob({
          title: '',
          company: '',
          location: '',
          category: 'Technology',
          description: '',
          type: 'Full Time',
          salary: '',
          logo: ''
        });
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Delete this job listing?')) {
      try {
        const response = await apiClient.delete(`/jobs/${id}`);
        if (response.data.success) {
          setJobs(jobs.filter(job => job._id !== id));
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <div className="bg-[#F8FAFF] min-h-screen py-16">
      <div className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          <div>
            <h1 className="text-5xl font-extrabold text-[#0D0D0D] mb-4">Admin Dashboard</h1>
            <p className="text-gray-400 font-medium text-lg">Manage role acquisitions and active applications.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#3B49DF] text-white px-10 py-5 rounded-2xl font-extrabold flex items-center gap-3 hover:bg-[#2F3BB1] shadow-xl shadow-blue-100 transition-all"
          >
            <Plus size={24} />
            Post a New Job
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-8">
            <div className="w-16 h-16 bg-blue-50 text-[#3B49DF] rounded-2xl flex items-center justify-center">
              <Briefcase size={28} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Total Jobs</p>
              <p className="text-3xl font-extrabold text-[#0D0D0D]">{jobs.length}</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-8">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
              <Zap size={28} />
            </div>
            <div>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Active Roles</p>
                <p className="text-3xl font-extrabold text-[#0D0D0D]">{jobs.filter(j => j.type === 'Full Time').length}</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-8">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
                <Users size={28} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Candidates</p>
              <p className="text-3xl font-extrabold text-[#0D0D0D]">125+</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl font-bold">List of jobs</h3>
            <div className="bg-[#F8FAFF] px-6 py-3 rounded-xl flex items-center gap-4 w-full md:w-96 border border-gray-100">
               <Search size={20} className="text-gray-400" />
               <input type="text" placeholder="Search for jobs..." className="bg-transparent outline-none w-full font-medium" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Company & Role</th>
                  <th className="px-10 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Department</th>
                  <th className="px-10 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Schedule</th>
                  <th className="px-10 py-6 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-[#F8FAFF] transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                          <img src={job.logo || 'https://via.placeholder.com/100'} alt={job.company} className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                          <p className="font-extrabold text-[#0D0D0D] text-xl group-hover:text-[#3B49DF] transition-colors">{job.title}</p>
                          <p className="text-sm text-gray-400 font-bold tracking-tight uppercase">{job.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="text-gray-600 font-extrabold tracking-tight">{job.category}</span>
                    </td>
                    <td className="px-10 py-8">
                      <span className="bg-blue-50 text-[#3B49DF] px-5 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest">{job.type}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <button className="p-4 text-gray-300 hover:text-[#3B49DF] transition-colors rounded-2xl hover:bg-blue-50">
                            <MoreVertical size={20} />
                         </button>
                         <button 
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-4 text-red-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                         >
                          <Trash2 size={20} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Job Modal - Redesigned for clean look */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white rounded-[50px] w-full max-w-2xl overflow-hidden my-auto shadow-2xl">
            <div className="p-12 lg:p-16">
              <h2 className="text-4xl font-extrabold text-[#0D0D0D] mb-4">Post a Job</h2>
              <p className="text-gray-400 font-medium mb-12">Submit new opportunities to the global community.</p>
              
              <form onSubmit={handleAddJob} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Job Title</label>
                    <input 
                      type="text" required
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                      placeholder="e.g. Senior UI Designer"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Company</label>
                    <input 
                      type="text" required
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700"
                      value={newJob.company}
                      onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                      placeholder="e.g. Apple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                    <input 
                      type="text" required
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                      placeholder="e.g. Remote or London"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <select 
                      required
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700 appearance-none"
                      value={newJob.category}
                      onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                    >
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Human Resource">Human Resource</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Job Type</label>
                    <select 
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700 appearance-none"
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Salary</label>
                    <input 
                      type="text"
                      className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                      placeholder="e.g. $100k - $120k"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Logo URL</label>
                  <input 
                    type="text"
                    className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700"
                    value={newJob.logo}
                    onChange={(e) => setNewJob({...newJob, logo: e.target.value})}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    required
                    rows="4"
                    className="w-full bg-[#F8FAFF] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#3B49DF]/20 transition-all font-bold text-gray-700 resize-none"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Describe the role and requirements..."
                  ></textarea>
                </div>
                <div className="flex gap-6 pt-10">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-50 text-gray-400 py-5 rounded-2xl font-extrabold hover:bg-gray-100 transition-colors"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#3B49DF] text-white py-5 rounded-2xl font-extrabold hover:shadow-2xl shadow-blue-100 transition-all"
                  >
                    Confirm & Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
