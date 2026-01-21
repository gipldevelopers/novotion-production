// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { 
//   Star, 
//   TrendingUp, 
//   Zap, 
//   Target, 
//   CheckCircle, 
//   ArrowRight,
//   Shield,
//   Clock,
//   Users,
//   Award,
//   Sparkles,
//   Rocket,
//   CreditCard,
//   Briefcase,
//   FileText,
//   MessageSquare,
//   BadgeCheck
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const PaidServicesSection = () => {
//   const [hoveredPackage, setHoveredPackage] = useState(null);

//   const careerPackages = [
//     {
//       id: 'application-boost',
//       name: 'Application Boost',
//       price: 1499,
//       originalPrice: 1999,
//       description: 'Kickstart your job search with optimized materials',
//       icon: FileText,
//       features: [
//         'Professional Resume Optimization',
//         'LinkedIn Profile Enhancement',
//         'Strategy Consultation Call',
//         'Cover Letter Template',
//         '30-day Support'
//       ],
//     //   badge: 'Most Popular',
//       color: 'blue'
//     },
//     {
//       id: 'interview-edge',
//       name: 'Interview Edge',
//       price: 2499,
//       originalPrice: 3299,
//       description: 'Master interviews and land your dream role',
//       icon: MessageSquare,
//       features: [
//         'Comprehensive Interview Prep',
//         'Premium Resume Upgrade',
//         'Role-Specific Mock Interviews',
//         'Salary Negotiation Strategy',
//         '60-day Support'
//       ],
//       badge: 'Best Value',
//       color: 'green'
//     },
//     {
//       id: 'all-in-one',
//       name: 'All-In-One Advance',
//       price: 6106,
//       originalPrice: 7999,
//       description: 'Complete career transformation package',
//       icon: Award,
//       features: [
//         'Full Career Strategy Development',
//         'Unlimited Resume Updates',
//         'Direct Recruiter Introductions',
//         'Priority Job Referrals',
//         '90-day Intensive Support'
//       ],
//       badge: 'Premium',
//       color: 'purple'
//     }
//   ];

//   const proServices = [
//     {
//       name: 'Resume Upgrade Pro',
//       price: 299,
//       icon: FileText,
//       description: 'Professional resume rewriting'
//     },
//     {
//       name: 'Profile Verification',
//       price: 149,
//       icon: BadgeCheck,
//       description: 'Complete profile validation'
//     },
//     {
//       name: 'LinkedIn Premium',
//       price: 199,
//       icon: Briefcase,
//       description: 'Executive LinkedIn optimization'
//     },
//     {
//       name: 'Interview Simulation',
//       price: 349,
//       icon: MessageSquare,
//       description: 'Real-time interview practice'
//     }
//   ];

//   const careerPlans = [
//     {
//       name: 'Basic Plan',
//       price: 2500,
//       placementFee: '15%',
//       features: '10 Interviews, Resume Optimization, AI Marketing',
//       installment: 625
//     },
//     {
//       name: 'Standard Plan',
//       price: 3500,
//       placementFee: '12%',
//       features: '15 Interviews, Mock Interviews, Priority Submissions',
//       installment: 875,
//       popular: true
//     },
//     {
//       name: 'Premium Plan',
//       price: 5000,
//       placementFee: '10%',
//       features: '22 Interviews, Technical Training, VIP Support',
//       installment: 1250
//     }
//   ];

//   const colorClasses = {
//     blue: 'bg-blue-600',
//     green: 'bg-green-600',
//     purple: 'bg-purple-600'
//   };

//   return (
//     <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
//         <div className="absolute bottom-0 left-0 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
//       </div>

//       <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
//         <div className="max-w-6xl mx-auto">
          
//           {/* Section Header */}
//           <div className="text-center mb-12 md:mb-16">
//             <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary font-medium mb-4">
//               <Star className="h-4 w-4 mr-2" />
//               Premium Career Services
//             </div>
//             <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Invest in Your
//               <span className="block text-primary">
//                 Career Success
//               </span>
//             </h2>
//             <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
//               Professional career services designed to accelerate your job search and maximize your earning potential
//             </p>
//           </div>

//           {/* Career Packages */}
//           <div className="mb-16 md:mb-20">
//             <div className="flex items-center justify-between mb-8">
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Career Growth Packages</h3>
//               <Link href="/services/career-packages">
//                 <Button variant="ghost" className="text-primary hover:text-primary-700">
//                   View All Packages
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//               {careerPackages.map((pkg) => {
//                 const Icon = pkg.icon;
//                 return (
//                   <div
//                     key={pkg.id}
//                     className="relative group"
//                     onMouseEnter={() => setHoveredPackage(pkg.id)}
//                     onMouseLeave={() => setHoveredPackage(null)}
//                   >
//                     <div className={`absolute inset-0 ${colorClasses[pkg.color]} rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
//                     <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                      
//                       {pkg.badge && (
//                         <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${colorClasses[pkg.color]} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
//                           {pkg.badge}
//                         </div>
//                       )}

//                       {/* Icon */}
//                       <div className="flex justify-center mb-6">
//                         <div className={`h-16 w-16 rounded-2xl ${colorClasses[pkg.color]} flex items-center justify-center shadow-lg`}>
//                           <Icon className="h-8 w-8 text-white" />
//                         </div>
//                       </div>

//                       {/* Title & Description */}
//                       <div className="text-center mb-6">
//                         <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
//                         <p className="text-gray-600">{pkg.description}</p>
//                       </div>

//                       {/* Price */}
//                       <div className="text-center mb-6">
//                         <div className="flex items-center justify-center gap-2 mb-1">
//                           <span className="text-3xl md:text-4xl font-bold text-gray-900">${pkg.price}</span>
//                           <span className="text-gray-400 line-through">${pkg.originalPrice}</span>
//                         </div>
//                         <p className="text-sm text-gray-500">One-time payment</p>
//                       </div>

//                       {/* Features */}
//                       <div className="space-y-3 mb-8">
//                         {pkg.features.map((feature, idx) => (
//                           <div key={idx} className="flex items-center gap-3">
//                             <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
//                             <span className="text-gray-700 font-medium text-sm md:text-base">
//                               {feature}
//                             </span>
//                           </div>
//                         ))}
//                       </div>

//                       {/* CTA */}
//                       <Link href={`/services/career-packages#${pkg.id}`}>
//                         <Button className={`w-full group/btn ${colorClasses[pkg.color]} hover:opacity-90 text-white`}>
//                           Get Started
//                           <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Career Plans */}
//           <div className="mb-16 md:mb-20">
//             <div className="text-center mb-10">
//               <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Career Attainment Program</h3>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Comprehensive career programs with guaranteed interview opportunities and flexible payment options
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6">
//               {careerPlans.map((plan) => (
//                 <div 
//                   key={plan.name}
//                   className={`bg-white rounded-2xl p-6 border ${plan.popular ? 'border-primary shadow-lg relative' : 'border-gray-200'}`}
//                 >
//                   {/* {plan.popular && (
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
//                       Most Chosen
//                     </div>
//                   )} */}

//                   <div className="text-center mb-6">
//                     <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
//                     <div className="space-y-2">
//                       <div>
//                         <div className="text-2xl font-bold text-gray-900">${plan.price}</div>
//                         <div className="text-sm text-gray-500">Enrollment Fee</div>
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         + {plan.placementFee} Placement Fee
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <p className="text-gray-700 text-sm text-center mb-3">{plan.features}</p>
//                     <div className="flex justify-between items-center text-sm">
//                       <span className="text-gray-600">Flexible Payment:</span>
//                       <span className="font-semibold">${plan.installment}/month</span>
//                     </div>
//                     <div className="text-xs text-gray-500 text-center">
//                       4 Easy Installments
//                     </div>
//                   </div>

//                   <Link href="/services/career-packages#career-plans">
//                     <Button 
//                       variant={plan.popular ? 'default' : 'outline'} 
//                       className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary-700' : 'border-primary text-primary hover:bg-primary-50'}`}
//                     >
//                       Learn More
//                     </Button>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Pro Services Quick View */}
//           <div className="mb-16">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900">À La Carte Pro Services</h3>
//                 <p className="text-gray-600 mt-2">Individual services for specific career needs</p>
//               </div>
//               <Link href="/services/pro-services">
//                 <Button className="bg-primary hover:bg-primary-700 text-white">
//                   Browse All Services
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {proServices.map((service, index) => {
//                 const Icon = service.icon;
//                 return (
//                   <div 
//                     key={index}
//                     className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-primary hover:shadow-md transition-all"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
//                         <Icon className="h-5 w-5 text-primary" />
//                       </div>
//                       <div className="text-lg font-bold text-gray-900">${service.price}</div>
//                     </div>
                    
//                     <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
//                     <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    
//                     <Link href="/services/pro-services">
//                       <Button 
//                         variant="ghost" 
//                         size="sm" 
//                         className="w-full text-primary hover:text-primary-700 hover:bg-primary-50"
//                       >
//                         Add Service
//                       </Button>
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Benefits & Guarantees */}
//           <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-white">
//             <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//               <div className="text-center md:text-left">
//                 <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
//                   <Shield className="h-6 w-6" />
//                 </div>
//                 <h4 className="text-xl text-gray-900  font-bold mb-2">30-Day Money Back Guarantee</h4>
//                 <p className="text-white/80 text-sm">If you're not satisfied with our services, get a full refund within 30 days.</p>
//               </div>

//               <div className="text-center md:text-left">
//                 <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
//                   <Target className="h-6 w-6" />
//                 </div>
//                 <h4 className="text-xl text-gray-900 font-bold mb-2">85% Placement Success Rate</h4>
//                 <p className="text-white/80 text-sm">Our proven methodology delivers results for professionals across industries.</p>
//               </div>

//               <div className="text-center md:text-left">
//                 <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
//                   <CreditCard className="h-6 w-6" />
//                 </div>
//                 <h4 className="text-xl text-gray-900 font-bold mb-2">Flexible Payment Options</h4>
//                 <p className="text-white/80 text-sm">Choose from one-time payments or installment plans to fit your budget.</p>
//               </div>
//             </div>

//             <div className="text-center mt-8 pt-8 border-t border-white/20">
//               <div className="inline-flex flex-wrap gap-3 justify-center mb-6">
//                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <CheckCircle className="h-3 w-3 text-secondary" />
//                   <span className="text-xs font-medium">Secure Payment Processing</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <CheckCircle className="h-3 w-3 text-secondary" />
//                   <span className="text-xs font-medium">24/7 Support</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                   <CheckCircle className="h-3 w-3 text-secondary" />
//                   <span className="text-xs font-medium">Certified Career Experts</span>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/services/career-packages">
//                   <Button size="lg" className="group bg-white text-foreground hover:bg-gray-100 px-4 md:px-6 py-3 text-sm md:text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto">
//                     Explore All Packages
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//                 <Link href="/contact#contact-form">
//                   <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-6 py-3">
//                     Book Free Consultation
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-10px) rotate(180deg);
//           }
//         }
//         @keyframes float-delayed {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-8px) rotate(180deg);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 8s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default PaidServicesSection;

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  TrendingUp, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
  Sparkles,
  Rocket,
  CreditCard,
  Briefcase,
  FileText,
  MessageSquare,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaidServicesSection = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const careerPackages = [
    {
      id: 'application-boost',
      name: 'Application Boost',
      price: 1499,
      originalPrice: 1999,
      description: 'Kickstart your job search with optimized materials',
      icon: FileText,
      features: [
        'Professional Resume Optimization',
        'LinkedIn Profile Enhancement',
        'Strategy Consultation Call',
        'Cover Letter Template',
        '30-day Support'
      ],
    //   badge: 'Most Popular',
      color: 'primary'  // Changed to 'primary'
    },
    {
      id: 'interview-edge',
      name: 'Interview Edge',
      price: 2499,
      originalPrice: 3299,
      description: 'Master interviews and land your dream role',
      icon: MessageSquare,
      features: [
        'Comprehensive Interview Prep',
        'Premium Resume Upgrade',
        'Role-Specific Mock Interviews',
        'Salary Negotiation Strategy',
        '60-day Support'
      ],
    //   badge: 'Best Value',
      color: 'primary'  // Changed to 'primary'
    },
    {
      id: 'all-in-one',
      name: 'All-In-One Advance',
      price: 6106,
      originalPrice: 7999,
      description: 'Complete career transformation package',
      icon: Award,
      features: [
        'Full Career Strategy Development',
        'Unlimited Resume Updates',
        'Direct Recruiter Introductions',
        'Priority Job Referrals',
        '90-day Intensive Support'
      ],
    //   badge: 'Premium',
      color: 'primary'  // Changed to 'primary'
    }
  ];

  const proServices = [
    {
      name: 'Resume Upgrade Pro',
      price: 299,
      icon: FileText,
      description: 'Professional resume rewriting'
    },
    {
      name: 'Profile Verification',
      price: 149,
      icon: BadgeCheck,
      description: 'Complete profile validation'
    },
    {
      name: 'LinkedIn Premium',
      price: 199,
      icon: Briefcase,
      description: 'Executive LinkedIn optimization'
    },
    {
      name: 'Interview Simulation',
      price: 349,
      icon: MessageSquare,
      description: 'Real-time interview practice'
    }
  ];

  const careerPlans = [
    {
      name: 'Basic Plan',
      price: 2500,
      placementFee: '15%',
      features: '10 Interviews, Resume Optimization, AI Marketing',
      installment: 625
    },
    {
      name: 'Standard Plan',
      price: 3500,
      placementFee: '12%',
      features: '15 Interviews, Mock Interviews, Priority Submissions',
      installment: 875,
      popular: true
    },
    {
      name: 'Premium Plan',
      price: 5000,
      placementFee: '10%',
      features: '22 Interviews, Technical Training, VIP Support',
      installment: 1250
    }
  ];

  const badgeColorClasses = {
    primary: 'bg-primary',
    green: 'bg-green-600',
    purple: 'bg-purple-600'
  };

  return (
    <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Premium Career Services
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Invest in Your
              <span className="block text-primary">
                Career Success
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Professional career services designed to accelerate your job search and maximize your earning potential
            </p>
          </div>

          {/* Career Packages */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Career Growth Packages</h3>
              <Link href="/services/career-packages">
                <Button variant="ghost" className="text-primary hover:text-primary-700">
                  View All Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {careerPackages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredPackage(pkg.id)}
                    onMouseLeave={() => setHoveredPackage(null)}
                  >
                    <div className={`absolute inset-0 bg-primary/5 rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                      
                      {pkg.badge && (
                        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${badgeColorClasses[pkg.color]} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                          {pkg.badge}
                        </div>
                      )}

                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="text-center mb-6">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                        <p className="text-gray-600">{pkg.description}</p>
                      </div>

                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-3xl md:text-4xl font-bold text-gray-900">${pkg.price}</span>
                          <span className="text-gray-400 line-through">${pkg.originalPrice}</span>
                        </div>
                        <p className="text-sm text-gray-500">One-time payment</p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700 font-medium text-sm md:text-base">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link href={`/services/career-packages#${pkg.id}`}>
                        <Button className="w-full group/btn bg-primary hover:bg-primary-700 text-white">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career Plans */}
          <div className="mb-16 md:mb-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Career Attainment Program</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive career programs with guaranteed interview opportunities and flexible payment options
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {careerPlans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`bg-white rounded-2xl p-6 border ${plan.popular ? 'border-primary shadow-lg relative' : 'border-gray-200'}`}
                >
                  {/* {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    </div>
                  )} */}

                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">${plan.price}</div>
                        <div className="text-sm text-gray-500">Enrollment Fee</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        + {plan.placementFee} Placement Fee
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 text-sm text-center mb-3">{plan.features}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Flexible Payment:</span>
                      <span className="font-semibold">${plan.installment}/month</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      4 Easy Installments
                    </div>
                  </div>

                  <Link href="/services/career-packages#career-plans">
                    <Button 
                      // variant={plan.popular ? 'default' : 'outline'} 
                      variant={'outline'} 
                      className={`w-full border-primary text-primary hover:bg-primary/10}`}
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Services Quick View */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                {/* <h3 className="text-2xl md:text-3xl font-bold text-gray-900">À La Carte Pro Services</h3> */}
                <p className="text-gray-600 mt-2">Individual services for specific career needs</p>
              </div>
              <Link href="/services/pro-services">
                <Button className="bg-primary hover:bg-primary-700 text-white mt-2">
                  Browse All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {proServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">${service.price}</div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    
                    <Link href="/services/pro-services">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Add Service
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits & Guarantees */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-gray">
            {/* <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-gray/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Shield className="h-6 w-6" />
                </div>
                <h4 className="text-xl text-gray-900  font-bold mb-2">30-Day Money Back Guarantee</h4>
                <p className="text-gray/80 text-sm">If you're not satisfied with our services, get a full refund within 30 days.</p>
              </div>

              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-gray/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Target className="h-6 w-6" />
                </div>
                <h4 className="text-xl text-gray-900 font-bold mb-2">85% Placement Success Rate</h4>
                <p className="text-gray/80 text-sm">Our proven methodology delivers results for professionals across industries.</p>
              </div>

              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-gray/20 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h4 className="text-xl text-gray-900 font-bold mb-2">Flexible Payment Options</h4>
                <p className="text-gray/80 text-sm">Choose from one-time payments or installment plans to fit your budget.</p>
              </div>
            </div> */}

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Award className="h-6 w-6 text-primary" /> {/* Changed icon */}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Certified Career Experts</h4>
                <p className="text-gray-600 text-sm">Our team includes certified career coaches and industry specialists with proven track records.</p>
              </div>

              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">85% Placement Success Rate</h4>
                <p className="text-gray-600 text-sm">Our proven methodology delivers results for professionals across industries.</p>
              </div>

              <div className="text-center md:text-left">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Flexible Payment Options</h4>
                <p className="text-gray-600 text-sm">Choose from one-time payments or installment plans to fit your budget.</p>
              </div>
            </div>

            <div className="text-center mt-8 pt-8 border-t border-gray/20">
              <div className="inline-flex flex-wrap gap-3 justify-center mb-6">
                <div className="flex items-center gap-2 bg-gray/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-gray" />
                  <span className="text-xs font-medium">Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-2 bg-gray/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-gray" />
                  <span className="text-xs font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 bg-gray/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 text-gray" />
                  <span className="text-xs font-medium">Certified Career Experts</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/career-packages">
                  <Button size="lg" className="bg-gray text-gray-900 hover:bg-gray-100 px-6 py-3 font-semibold">
                    Explore All Packages
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact#contact-form">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gray text-gray hover:bg-gray hover:text-gray-900 px-6 py-3 font-semibold"
                  >
                    Book Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PaidServicesSection;