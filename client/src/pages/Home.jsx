import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPalette,
  FaBullhorn,
  FaCode,
  FaBriefcase,
  FaChartLine,
  FaMicrochip,
  FaUsers,
  FaCoins,
} from "react-icons/fa";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import CategorySection from "../components/CategorySection";
import apiClient from "../api/apiClient";

const Home = () => {
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

  const handleSearch = ({ search, location }) => {
    setFilters((prev) => ({ ...prev, search, location }));
  };

  return (
    <div className="bg-white">
      <Hero onSearch={handleSearch} />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-10 opacity-30 flex justify-between grayscale"
      >
        <div className="flex flex-wrap justify-between w-full gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            className="h-8"
          />
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-Tesla.svg"
            alt="Tesla"
            className="h-8"
          /> */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8"
          />
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <CategorySection
          onCategoryClick={(category) =>
            setFilters((prev) => ({ ...prev, category }))
          }
        />
      </motion.div>

      {/* Blue CTA Banner in middle as per Figma */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-16"
      >
        <div className="bg-[#3B49DF] rounded-[48px] p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          {/* Animated Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

          <div className="md:w-1/2 text-white relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Start posting jobs today
            </h2>
            <p className="text-blue-100 text-lg mb-8 opacity-80">
              Start recruitment with us for better team
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#3B49DF] px-10 py-4 rounded-xl font-extrabold hover:bg-gray-50 transition-all shadow-xl shadow-blue-900/20"
            >
              Sign Up for Free
            </motion.button>
          </div>
          <div className="md:w-1/2 relative z-10">
            <motion.img
              initial={{ rotate: 10, y: 20 }}
              whileInView={{ rotate: 2, y: 0 }}
              viewport={{ once: true }}
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dashboard"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </motion.section>

      {/* Featured Jobs */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-extrabold text-[#0D0D0D]">
              Featured <span className="text-[#3B49DF]">jobs</span>
            </h2>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-[#3B49DF] font-bold group cursor-pointer"
            >
              Show all jobs{" "}
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="relative min-h-[400px]">
            {loading ? (
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm rounded-3xl">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#3B49DF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : null}

            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${loading ? "opacity-20" : "opacity-100"}`}
            >
              {jobs.slice(0, 8).map((job, idx) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-100 p-6 rounded-[24px] hover:shadow-xl hover:shadow-blue-50 transition-all flex flex-col h-full group cursor-pointer"
                >
                  {/* Top Row: Logo and Type */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-gray-50 shadow-sm">
                      <img
                        src={
                          job.logo || "https://i.ibb.co.com/Dgk3T1rq/image.png"
                        }
                        alt={job.company}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-[#3B49DF] bg-[#F0F2FF] px-4 py-1.5 rounded-lg text-xs font-bold border border-[#E0E4FF]">
                      {job.type || "Full Time"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0D0D0D] mb-1 group-hover:text-[#3B49DF] transition-colors leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mb-4">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Bottom: Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="bg-[#FFF8ED] text-[#FFB347] px-4 py-1.5 rounded-full text-xs font-bold">
                      {job.category || "Marketing"}
                    </span>
                    <span className="bg-[#F0FFF9] text-[#2ECC71] px-4 py-1.5 rounded-full text-xs font-bold">
                      Design
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs - List layout like Figma */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-extrabold text-[#0D0D0D]">
              Latest <span className="text-[#3B49DF]">jobs open</span>
            </h2>
            <div className="hidden md:flex items-center gap-2 text-[#3B49DF] font-bold group cursor-pointer">
              Show all{" "}
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.slice(0, 8).map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-6 p-8 border border-gray-100 rounded-[32px] hover:shadow-xl hover:shadow-blue-50/50 transition-all group bg-white cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#F8FAFF]  flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-50 uppercase font-bold text-[#3B49DF]">
                  <img
                    src={"https://i.ibb.co.com/Dgk3T1rq/image.png"}
                    alt={job.company}
                    className="w-10 h-10 object-contain rounded-4xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0D0D0D] mb-1 group-hover:text-[#3B49DF] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 font-medium mb-4">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-[#E8F5E9] text-[#4CAF50] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {job.type}
                    </span>
                    <span className="bg-[#FFF3E0] text-[#FF9800] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      Marketing
                    </span>
                  </div>
                </div>
                <Link
                  to={`/jobs/${job._id}`}
                  className="bg-[#3B49DF] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2F3BB1] transition-all shadow-md shadow-blue-100"
                >
                  Apply
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
