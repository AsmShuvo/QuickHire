import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B49DF] rounded-lg"></div>
            <span className="text-2xl font-bold text-[#0D0D0D] tracking-tight">QuickHire</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-500 hover:text-[#3B49DF] font-semibold transition-colors">Find Jobs</Link>
            <Link to="/browse" className="text-gray-500 hover:text-[#3B49DF] font-semibold transition-colors">Browse Companies</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[#3B49DF] font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition-all">Login</button>
          <button className="bg-[#3B49DF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2F3BB1] transition-all shadow-sm shadow-blue-100">Sign Up</button>
          <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 font-medium">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
