import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-8 border border-gray-100 rounded-[32px] hover:shadow-2xl hover:shadow-blue-50 transition-all group flex flex-col items-center text-center cursor-pointer"
    >
      <div className="w-16 h-16 bg-white border border-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
        <img src={job.logo || 'https://via.placeholder.com/100'} alt={job.company} className="w-10 h-10 object-contain" />
      </div>
      
      <div className="mb-4">
        <span className="text-[#3B49DF] border border-[#3B49DF] bg-white group-hover:bg-[#3B49DF] group-hover:text-white px-4 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider transition-colors">{job.type}</span>
      </div>
      
      <h3 className="text-xl font-bold text-[#0D0D0D] mb-2 group-hover:text-[#3B49DF] transition-colors line-clamp-1">{job.title}</h3>
      <p className="text-gray-400 font-medium mb-6 text-sm">{job.company} • {job.location}</p>
      
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        <span className="bg-[#FFF4E8] text-[#FF9800] px-3 py-1 rounded-full text-[10px] font-bold uppercase">{job.category}</span>
        {job.salary && <span className="bg-[#E8F5E9] text-[#4CAF50] px-3 py-1 rounded-full text-[10px] font-bold uppercase">{job.salary}</span>}
      </div>
      
      <Link 
        to={`/jobs/${job._id}`}
        className="mt-8 text-[#3B49DF] font-bold text-sm border-b-2 border-transparent hover:border-[#3B49DF] transition-all flex items-center gap-1"
      >
        View Details <span>→</span>
      </Link>
    </motion.div>
  );
};

export default JobCard;
