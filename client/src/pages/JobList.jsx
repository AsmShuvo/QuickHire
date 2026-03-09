import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import apiClient from "../api/apiClient";
import JobCard from "../components/JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  const fetchJobs = async (currentFilters) => {
    setLoading(true);
    try {
      const { search, location, category } = currentFilters;
      let query = [];
      if (search) query.push(`search=${encodeURIComponent(search)}`);
      if (location) query.push(`location=${encodeURIComponent(location)}`);
      if (category) query.push(`category=${encodeURIComponent(category)}`);
      const queryString = query.length > 0 ? `?${query.join("&")}` : "";

      const response = await apiClient.get(`/jobs${queryString}`);
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFF] min-h-screen py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0D0D0D] mb-4">
            Browse All Jobs
          </h1>
          <p className="text-gray-400 font-medium text-lg">
            Find your next opportunity from our complete list of active roles.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full md:border-r border-gray-100">
            <Search className="text-[#3B49DF]" size={22} />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="outline-none w-full text-gray-700 font-medium placeholder:text-gray-300 bg-transparent"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full relative border-gray-100 md:border-r">
            <MapPin className="text-[#3B49DF]" size={22} />
            <select
              className="outline-none w-full text-gray-700 font-bold bg-transparent cursor-pointer appearance-none pr-8"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="">Any Location</option>
              <option value="Remote">Remote</option>
              <option value="London">London</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Berlin">Berlin</option>
              <option value="Florence">Florence</option>
            </select>
            <div className="pointer-events-none text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full relative">
            <select
              className="outline-none w-full text-gray-700 font-bold bg-transparent cursor-pointer appearance-none pr-8"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">Any Category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
            </select>
            <div className="pointer-events-none text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center bg-[#F8FAFF]/80 backdrop-blur-sm rounded-3xl">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#3B49DF] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300`}
            >
              {jobs.length > 0 ? (
                jobs.map((job, idx) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10 font-bold text-xl">
                  No jobs found matching your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
