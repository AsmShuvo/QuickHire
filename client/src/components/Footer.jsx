import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Dribbble } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#3B49DF"/>
                <circle cx="48" cy="46" r="22" fill="white"/>
                <path d="M 34 70 Q 50 85 66 70" stroke="white" stroke-width="7" stroke-linecap="round" fill="none"/>
                <path d="M 68 34 L 76 24" stroke="white" stroke-width="7" stroke-linecap="round"/>
              </svg>
              <span className="text-2xl font-bold tracking-tight">QuickHire</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-xl font-bold mb-8">About</h4>
              <ul className="space-y-4 font-medium text-gray-400">
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Companies</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Advice</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-8">Resources</h4>
              <ul className="space-y-4 font-medium text-gray-400">
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Help Docs</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Guide</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Updates</a></li>
                <li><a href="#" className="hover:text-[#3B49DF] transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8">Get job notifications</h4>
            <p className="text-gray-400 font-medium mb-8">The latest job news, articles, sent to your inbox weekly.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-[#1A1A1A] border-none text-white px-6 py-4 rounded-xl flex-1 outline-none focus:ring-2 focus:ring-[#3B49DF]/50 transition-all"
              />
              <button className="bg-[#3B49DF] text-white px-8 py-4 rounded-xl font-extrabold hover:bg-[#2F3BB1] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 font-medium">2021 © QuickHire. All rights reserved.</p>
          <div className="flex gap-6">
            <Facebook size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Twitter size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Instagram size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Linkedin size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            <Dribbble size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
