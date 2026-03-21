import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Home, CheckCircle, Users, Coins,
  ExternalLink, Calendar, Shield, CreditCard, Sprout,
  Droplets, ArrowRight, Info, MapPin, Landmark, Zap
} from 'lucide-react';
import GlassCard from '../../components/UI/GlassCard';

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const states = [
    'All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const categories = ['All', 'Income Support', 'Crop Insurance', 'Credit', 'Soil Health', 'Irrigation', 'Subsidy', 'Livestock'];

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      category: 'Income Support',
      state: 'All India',
      description: '₹6,000 per year to all landholding farmer families in three installments.',
      eligibility: 'Small and marginal farmers',
      benefits: 'Direct cash transfer to bank accounts',
      link: 'https://pmkisan.gov.in',
      icon: <Coins className="text-emerald-500" />
    },
    {
      id: 2,
      name: 'PM Fasal Bima Yojana',
      category: 'Crop Insurance',
      state: 'All India',
      description: 'Comprehensive risk insurance for crops against natural calamities.',
      eligibility: 'All farmers (loanee & non-loanee)',
      benefits: 'Low premium, quick claim settlement',
      link: 'https://pmfby.gov.in',
      icon: <Shield className="text-blue-500" />
    },
    {
      id: 3,
      name: 'Kisan Credit Card (KCC)',
      category: 'Credit',
      state: 'All India',
      description: 'Short-term credit for cultivation, post-harvest expenses, and consumption.',
      eligibility: 'All farmers, SHGs, JLGs',
      benefits: 'Low interest rates (4%), flexible repayment',
      link: 'https://www.nabard.org',
      icon: <CreditCard className="text-amber-500" />
    },
    {
      id: 4,
      name: 'Soil Health Card Scheme',
      category: 'Soil Health',
      state: 'All India',
      description: 'Helping farmers to understand the nutrient status of their soil.',
      eligibility: 'All farmers',
      benefits: 'Customized fertilizer recommendations',
      link: 'https://soilhealth.dac.gov.in',
      icon: <Sprout className="text-green-500" />
    },
    {
      id: 5,
      name: 'Rythu Bandhu',
      category: 'Income Support',
      state: 'Telangana',
      description: 'Investment support of ₹5,000 per acre per season.',
      eligibility: 'Land-owning farmers',
      benefits: 'Financial assistance for seeds, fertilizers, etc.',
      link: 'http://rythubandhu.telangana.gov.in/',
      icon: <Landmark className="text-rose-500" />
    },
    {
      id: 6,
      name: 'Krushak Assistance for Livelihood (KALIA)',
      category: 'Income Support',
      state: 'Odisha',
      description: 'Financial assistance for small farmers, sharecroppers and landless laborers.',
      eligibility: 'Small/marginal farmers, landless workers',
      benefits: '₹10,000 per year per family',
      link: 'https://kalia.odisha.gov.in/',
      icon: <Users className="text-indigo-500" />
    },
    {
      id: 7,
      name: 'Mukhyamantri Kisan Sahay Yojana',
      category: 'Crop Insurance',
      state: 'Gujarat',
      description: 'Compensation for crop loss due to drought or excess rain.',
      eligibility: 'All farmers in the state',
      benefits: 'Zero premium, direct assistance',
      link: 'https://ikhedut.gujarat.gov.in/',
      icon: <Shield className="text-orange-500" />
    },
    {
      id: 8,
      name: 'Kalaignar Magalir Urimai Thogai',
      category: 'Income Support',
      state: 'Tamil Nadu',
      description: 'Financial aid for women heads of households, including farm families.',
      eligibility: 'Women heads of families',
      benefits: '₹1,000 per month scholarship',
      link: 'https://www.tn.gov.in/',
      icon: <Coins className="text-pink-500" />
    },
    {
      id: 9,
      name: 'Mukhya Mantri Krishi Ashirwad Yojana',
      category: 'Income Support',
      state: 'Jharkhand',
      description: 'Financial grant for purchase of seeds and fertilizers.',
      eligibility: 'Farmers holding land up to 5 acres',
      benefits: '₹5,000 per acre per year',
      link: 'https://mmkay.jharkhand.gov.in/',
      icon: <Zap className="text-yellow-600" />
    },
    {
      id: 10,
      name: 'Bhavantar Bhugtan Yojana',
      category: 'Subsidy',
      state: 'Madhya Pradesh',
      description: 'Price deficit financing scheme for farmers.',
      eligibility: 'Farmers growing notified crops',
      benefits: 'Payment of difference between MSP and selling price',
      link: 'http://mpeuparjan.nic.in/',
      icon: <Coins className="text-purple-500" />
    }
  ];

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All India' || scheme.state === selectedState || scheme.state === 'All India';
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      return matchesSearch && matchesState && matchesCategory;
    });
  }, [searchQuery, selectedState, selectedCategory]);

  // Mock data for state-specific highlights
  const stateHighlights = {
    'Punjab': 'Free electricity for agriculture, direct subsidy on farm machinery, and 100% procurement support.',
    'Maharashtra': 'Magel Tyala Shettale (Pond on demand) scheme and extensive micro-irrigation subsidies.',
    'Uttar Pradesh': 'Pardhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (KUSUM) focus with high solar pump subsidies.',
    'Karnataka': 'Raitha Siri scheme for millet promotion and specialized support for organic clusters.',
    'Kerala': 'Subhiksha Keralam for food self-sufficiency and high insurance coverage for plantation crops.',
    'All India': 'Central government schemes focusing on technology integration and direct benefit transfers.'
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-3">
          <Landmark className="w-10 h-10 text-emerald-600" /> Government Schemes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Comprehensive portal for Central and State agricultural assistance programs.
        </p>
      </div>

      {/* Filters and Search */}
      <GlassCard className="mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by scheme name or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-white transition-all shadow-inner"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-white appearance-none cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-white appearance-none cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* State Highlights Alert */}
      <AnimatePresence mode="wait">
        {selectedState !== 'All India' && stateHighlights[selectedState] && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="mb-8 p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-2xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Info className="text-emerald-600 w-5 h-5 flex-shrink-0" />
              <p className="text-emerald-800 dark:text-emerald-400 font-medium italic">
                <strong>{selectedState} Update:</strong> {stateHighlights[selectedState]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schemes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSchemes.map((scheme) => (
          <GlassCard key={scheme.id} className="group flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-emerald-100/30 overflow-hidden">
            <div className="p-6 flex-1 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-emerald-500 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:rotate-6">
                  {React.cloneElement(scheme.icon, { size: 32, className: "group-hover:text-white transition-colors" })}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${scheme.state === 'All India' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                  {scheme.state === 'All India' ? 'National' : 'State Focus'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{scheme.name}</h3>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-300" /> {scheme.state}
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {scheme.description}
              </p>

              <div className="space-y-4 bg-slate-50/80 dark:bg-slate-900/60 p-5 rounded-3xl mb-4 border border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-500" /> Benefits
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">{scheme.benefits}</p>
                </div>
                <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-blue-500" /> Eligibility
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">{scheme.eligibility}</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 dark:shadow-none active:scale-[0.98] group-hover:shadow-emerald-300/50"
              >
                Apply Now <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-[40px] border-4 border-dashed border-slate-200 dark:border-slate-700">
          <div className="bg-white dark:bg-slate-800 w-24 h-24 rounded-[30px] shadow-2xl flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Search className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3">No assistance found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">Try broadening your filters or checking "All India" for national programs.</p>
        </div>
      )}

      {/* Application Guidelines */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 p-10 border-l-8 border-l-amber-500">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <Info className="text-amber-500 w-8 h-8" /> Required Documentation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Aadhaar Card', desc: 'Valid identity proof with linked mobile number.' },
              { title: 'Land Records', desc: 'Updated 7/12 extract or 8A land holding document.' },
              { title: 'Bank Passbook', desc: 'Scanned copy of the first page for direct transfers.' },
              { title: 'Local Certificate', desc: 'Domicile or residence proof for state-specific aid.' }
            ].map((doc, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-[24px] shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-emerald-600 w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-800 dark:text-white text-lg">{doc.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="p-8 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg backdrop-blur-md">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2 leading-tight">National <br />Helpdesk</h3>
              <p className="text-indigo-50/80 mb-8 font-medium leading-relaxed">
                Get instant support for application tracking or document verification.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Line-1</span>
                  <span className="font-black tracking-wider text-lg">1800-180-1551</span>
                </div>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
          </GlassCard>

          <GlassCard className="p-8 border-none bg-slate-900 text-white group cursor-pointer hover:bg-slate-800 transition-colors">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-6 group-hover:translate-x-1 transition-transform">Digital Agri Mission</h4>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Track Application Status</span>
              <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;