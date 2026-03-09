import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 border-b border-gray-100 relative z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#3B49DF"/>
              <circle cx="48" cy="46" r="22" fill="white"/>
              <path d="M 34 70 Q 50 85 66 70" stroke="white" stroke-width="7" stroke-linecap="round" fill="none"/>
              <path d="M 68 34 L 76 24" stroke="white" stroke-width="7" stroke-linecap="round"/>
            </svg>
            <span className="text-2xl font-bold text-[#0D0D0D] tracking-tight">QuickHire</span>
          </Link>
          <div className="hidden lg:flex gap-8">
            <Link to="/jobs" className="text-gray-500 hover:text-[#3B49DF] font-semibold transition-colors">Find Jobs</Link>
            <Link to="/browse" className="text-gray-500 hover:text-[#3B49DF] font-semibold transition-colors">Browse Companies</Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-[#3B49DF] font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition-all">Login</button>
          <button className="bg-[#3B49DF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2F3BB1] transition-all shadow-sm shadow-blue-100">Sign Up</button>
          <Link to="/admin" className="text-xs text-gray-400 hover:text-gray-600 font-medium">Admin</Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden text-[#0D0D0D] hover:text-[#3B49DF] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4">
          <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-[#3B49DF] font-bold text-lg transition-colors py-2">Find Jobs</Link>
          <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-[#3B49DF] font-bold text-lg transition-colors py-2">Browse Companies</Link>
          <div className="h-px bg-gray-100 my-2 w-full"></div>
          <button className="text-[#3B49DF] font-bold py-3 hover:bg-blue-50 rounded-xl transition-all border border-[#3B49DF]">Login</button>
          <button className="bg-[#3B49DF] text-white py-3 rounded-xl font-bold hover:bg-[#2F3BB1] transition-all shadow-sm shadow-blue-100">Sign Up</button>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-sm text-center text-gray-400 hover:text-gray-600 font-medium py-2 mt-2">Admin Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
