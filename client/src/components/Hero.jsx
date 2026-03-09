import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearchClick = async () => {
    setIsSearching(true);
    // Artificial 1.5s delay to be VERY visible
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSearch({ search: searchTerm, location });
    setIsSearching(false);
  };

  return (
    <section className="bg-white pt-16 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-6xl lg:text-7xl font-extrabold text-[#0D0D0D] leading-[1.1] mb-6">
              Discover <br />
              more than <br />
              <span className="text-[#3B49DF] relative inline-block">
                5000+ Jobs
                <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#46B6FF] rounded-full"></div>
              </span>
            </h1>
            <p className="text-gray-400 text-xl mb-10 leading-relaxed max-w-lg font-medium">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center gap-2 max-w-3xl">
              <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full md:border-r border-gray-100">
                <Search className="text-[#3B49DF]" size={22} />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="outline-none w-full text-gray-700 font-medium placeholder:text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 flex-1 w-full relative">
                <MapPin className="text-[#3B49DF]" size={22} />
                <select 
                  className="outline-none w-full text-gray-700 font-bold bg-transparent cursor-pointer appearance-none pr-8"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  <option value="Remote">Remote</option>
                  <option value="London">London</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Berlin">Berlin</option>
                  <option value="Florence">Florence</option>
                </select>
                <div className="pointer-events-none text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <button 
                className="bg-[#3B49DF] text-white px-10 py-4 rounded-lg font-bold hover:bg-[#2F3BB1] transition-all w-full md:w-auto shadow-lg shadow-blue-100 flex items-center justify-center min-w-[200px]"
                onClick={handleSearchClick}
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Search my job"
                )}
              </button>
            </div>
            
            <p className="mt-8 text-gray-400 text-sm font-medium">
              Popular: <span className="text-gray-600">UI Designer, UX Researcher, Android, Admin</span>
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
             <div className="relative z-10 w-full max-w-lg">
                <img 
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Man pointing" 
                    className="w-full object-cover rounded-[40px]" 
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
