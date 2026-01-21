// // src/components/home/ServicesSection.js
// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { 
//   ArrowRight, 
//   CheckCircle, 
//   Building,
//   Briefcase,
//   Users,
//   DollarSign,
//   Clock,
//   Target,
//   Zap
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const ServicesSection = () => {
//   const [activeTab, setActiveTab] = useState('rpo');

//   const services = {
//     rpo: {
//       title: 'RPO Services',
//       subtitle: 'For Organizations',
//       description: 'Simplify hiring and cut costs with our end-to-end recruitment process outsourcing. We act as an extension of your HR team managing everything from workforce planning to onboarding so you can stay focused on growth. ',
//       // longDescription: 'We become an extension of your HR team managing everything from strategic workforce planning to candidate onboarding so you can focus on growing your business.',
//       icon: Building,
//       color: 'primary',
//       features: [
//         'Reduce recruitment costs by 30-60%',
//         'Access specialized talent acquisition across 15+ industries',
//         'Scale your hiring process up or down instantly',
//         'Get 24/7 global recruitment support'
//       ],
//       stats: '500+ Clients • 40% Faster Hiring',
//       ctaText: 'Learn More About RPO',
//       ctaLink: '/services/rpo'
//     },
//     career: {
//       title: 'Career Support Services',
//       subtitle: 'For IT Professionals',
//       description: "Between projects or transitioning roles? We help you land your next IT contract faster by promoting your profile to our extensive U.S. client and vendor network",
//       // longDescription: 'Our Career Support Services team proactively promotes your profile to our broad network of U.S. clients and vendors, helping you secure your next IT contract faster through proven talent marketing and placement strategies.  ',
//       icon: Briefcase,
//       color: 'primary',
//       features: [
//         'Dramatically reduce bench time with targeted IT staffing solutions',
//         'Access thousands of live U.S. contract opportunities',
//         'Get expert interview preparation and technical coaching',
//         'Receive ongoing post-placement support and career guidance'
//       ],
//       stats: '7K+ Placed • 85% Success Rate',
//       ctaText: 'Explore Career Support',
//       ctaLink: '/services/career-support'
//     }
//   };

//   const currentService = services[activeTab];

//   return (
//     <section className="py-12 md:py-20 bg-white relative overflow-hidden">

//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full blur-xl"></div>
//         <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-secondary/10 rounded-full blur-xl"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 relative">

//         {/* Header */}
//         <div className="text-center mb-8 md:mb-12">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
//             Our Services
//           </div>

//           <h2 className="text-2xl md:4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Two Specialized Service Lines,
//             <span className="block text-primary mt-3">One Unified Mission</span>
//           </h2>

//           <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
//             Comprehensive recruitment services designed for both organizations and IT professionals
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-gray-100 rounded-xl p-2 inline-flex">
//             {Object.entries(services).map(([key, service]) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveTab(key)}
//                 className={`px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-300
//                   ${activeTab === key 
//                     ? 'bg-white text-primary shadow-md'
//                     : 'text-gray-600 hover:text-gray-900'
//                   }`}
//               >
//                 <service.icon className="h-4 w-4" />
//                 {service.subtitle}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">

//             <div className="grid md:grid-cols-12 gap-6 items-start">

//               {/* ICON PANEL */}
//               <div className="md:col-span-2 flex justify-center md:justify-start">
//                 <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-md">
//                   <currentService.icon className="h-8 w-8 text-white" />
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="md:col-span-10">

//                 {/* Title + Description + CTA */}
//                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">

//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                       {currentService.title}
//                     </h3>

//                     <p className="text-gray-600 mb-3">
//                       {currentService.description}
//                     </p>

//                     {currentService.longDescription && (
//                       <p className="text-gray-600 mb-3">
//                         {currentService.longDescription}
//                       </p>
//                     )}

//                     <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
//                       {currentService.stats}
//                     </div>
//                   </div>

//                   <Link href={currentService.ctaLink}>
//                     <Button className="btn-primary px-6 py-2 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap">
//                       {currentService.ctaText}
//                       <ArrowRight className="h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </div>

//                 {/* Feature List */}
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   {currentService.features.map((feature, index) => (
//                     <div 
//                       key={index}
//                       className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-primary/40 transition-colors"
//                     >
//                       <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
//                         <CheckCircle className="h-3 w-3 text-primary" />
//                       </div>
//                       <span className="text-gray-700 font-medium text-sm">
//                         {feature}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Building,
  Briefcase,
  Users,
  DollarSign,
  Clock,
  Target,
  Zap,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('rpo');

  const services = {
    rpo: {
      title: 'RPO Services',
      subtitle: 'For Organizations',
      description: 'Simplify hiring and cut costs with our end-to-end recruitment process outsourcing. We act as an extension of your HR team managing everything from workforce planning to onboarding so you can stay focused on growth. ',
      icon: Building,
      color: 'primary',
      features: [
        'Reduce recruitment costs by 30-60%',
        'Access specialized talent acquisition across 15+ industries',
        'Scale your hiring process up or down instantly',
        'Get 24/7 global recruitment support'
      ],
      stats: '500+ Clients • 40% Faster Hiring',
      ctaText: 'Learn More About RPO',
      ctaLink: '/services/rpo'
    },
    career: {
      title: 'Career Support Services',
      subtitle: 'For IT Professionals',
      description: "Between projects or transitioning roles? We help you land your next IT contract faster by promoting your profile to our extensive U.S. client and vendor network",
      icon: Briefcase,
      color: 'primary',
      features: [
        'Dramatically reduce bench time with targeted IT staffing solutions',
        'Access thousands of live U.S. contract opportunities',
        'Get expert interview preparation and technical coaching',
        'Receive ongoing post-placement support and career guidance'
      ],
      stats: '7K+ Placed • 85% Success Rate',
      ctaText: 'Explore Career Support',
      ctaLink: '/services/career-support'
    }
  };

  const currentService = services[activeTab];

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-secondary/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            Our Services
          </div>

          <h2 className="text-2xl md:4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Two Specialized Service Lines,
            <span className="block text-primary mt-3">One Unified Mission</span>
          </h2>

          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive recruitment services designed for both organizations and IT professionals
          </p>
        </div>

        {/* Tabs - Updated with better contrast */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-xl p-2 inline-flex">
            {Object.entries(services).map(([key, service]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-medium text-sm flex items-center gap-2 transition-all duration-300
                  ${activeTab === key
                    ? 'bg-primary text-white shadow-md'  // Changed to white text on primary background
                    : 'text-gray-700 hover:text-primary hover:bg-gray-200'
                  }`}
              >
                <service.icon className="h-4 w-4" />
                {service.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">

            <div className="grid md:grid-cols-12 gap-6 items-start">

              {/* ICON PANEL */}
              <div className="md:col-span-2 flex justify-center md:justify-start">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                  <currentService.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="md:col-span-10">

                {/* Title + Description + CTA */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentService.title}
                    </h3>

                    <p className="text-gray-600 mb-3">
                      {currentService.description}
                    </p>

                    <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {currentService.stats}
                    </div>
                  </div>

                  <Link href={currentService.ctaLink}>
                    <Button className="btn-primary px-6 py-2 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap">
                      {currentService.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Feature List - Updated with better contrast */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-primary transition-colors group"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Paid Services CTA - Redesigned for Premium Look */}
        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-3xl p-10 md:p-14 border border-white/10 relative overflow-hidden shadow-2xl">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
                  <Star className="h-3 w-3 fill-blue-400" />
                  Elevate Your Career
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  Maximize Your <span className="text-blue-400">Professional Potential</span>
                </h3>
                <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Join thousands of IT professionals who have accelerated their careers with our premium packages and elite recruitment network.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/services/career-packages" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl px-10 h-14 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-base">
                      View Packages
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services/pro-services" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 rounded-xl px-10 h-14 font-black text-base transition-all">
                      Browse Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;