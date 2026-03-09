import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Design', count: '24 jobs available', icon: '🎨' },
  { name: 'Sales', count: '12 jobs available', icon: '📈' },
  { name: 'Marketing', count: '45 jobs available', icon: '📣' },
  { name: 'Finance', count: '18 jobs available', icon: '💰' },
  { name: 'Technology', count: '436 jobs available', icon: '💻' },
  { name: 'Engineering', count: '542 jobs available', icon: '⚙️' },
  { name: 'Business', count: '211 jobs available', icon: '📊' },
  { name: 'Human Resource', count: '346 jobs available', icon: '👥' },
];

const CategorySection = ({ onCategoryClick }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <h2 className="text-5xl font-extrabold text-[#0D0D0D]">
            Explore by <span className="text-[#3B49DF]">category</span>
          </h2>
          <div className="hidden md:flex items-center gap-2 text-[#3B49DF] font-bold group cursor-pointer transition-all hover:gap-3">
            Show all categories <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              onClick={() => onCategoryClick(cat.name)}
              className="p-10 border border-gray-100 rounded-xl hover:bg-[#3B49DF] hover:border-[#3B49DF] transition-all group cursor-pointer bg-white"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors text-3xl">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#0D0D0D] group-hover:text-white mb-2 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-400 group-hover:text-blue-100 font-medium transition-colors">
                {cat.count} →
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
