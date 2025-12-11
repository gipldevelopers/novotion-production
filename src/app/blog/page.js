// // src/app/blog/page.js
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { 
//   Calendar, 
//   Clock, 
//   ArrowRight,
//   Search,
//   ChevronRight,
//   BookOpen,
//   Star,
//   Eye,
//   Share2,
//   Bookmark,
//   BookmarkCheck,
//   ThumbsUp,
//   MessageCircle,
//   Sparkles,
//   Rocket,
//   Target,
//   BarChart3,
//   Lightbulb,
//   Globe,
//   Users,
//   TrendingUp,
//   Zap,
//   Menu,
//   Building,
//   User,
//   TrendingUp as TrendingUpIcon,
//   Briefcase,
//   FileText,
//   Linkedin,
//   Award,
//   Users as UsersIcon
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // Enhanced Card components
// const Card = ({ children, className = "", ...props }) => (
//   <div 
//     className={`blog-card rounded-lg sm:rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
//     {...props}
//   >
//     {children}
//   </div>
// );

// const CardContent = ({ children, className = "", ...props }) => (
//   <div className={`p-4 sm:p-6 ${className}`} {...props}>
//     {children}
//   </div>
// );

// // Accordion Component
// const Accordion = ({ items }) => {
//   const [openItem, setOpenItem] = useState(null);

//   return (
//     <div className="space-y-3 sm:space-y-4">
//       {items.map((item, index) => (
//         <div key={index} className="border rounded-lg overflow-hidden">
//           <button
//             onClick={() => setOpenItem(openItem === index ? null : index)}
//             className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-800 hover:text-primary transition-colors flex justify-between items-center text-sm sm:text-base"
//           >
//             {item.question}
//             <svg className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${openItem === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>
//           {openItem === index && (
//             <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base animate-fadeIn">
//               {item.answer}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Blog = () => {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [savedPosts, setSavedPosts] = useState(new Set());
//   const [likedPosts, setLikedPosts] = useState(new Set());
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [visiblePosts, setVisiblePosts] = useState(6);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
  
//   const observerRef = useRef(null);
//   const allArticlesRef = useRef(null);

//   const categories = [
//     { name: 'All', icon: Globe, count: 32 },
//     { name: 'For Organizations', icon: Building, count: 15 },
//     { name: 'For Professionals', icon: User, count: 12 },
//     { name: 'Industry Insights', icon: TrendingUpIcon, count: 5 }
//   ];

//   const subCategories = {
//     'For Organizations': [
//       { name: 'RPO Best Practices', icon: Briefcase },
//       { name: 'Talent Acquisition Strategy', icon: Target },
//       { name: 'Cost Optimization in Recruitment', icon: BarChart3 },
//       { name: 'Employer Branding for Hiring', icon: Award },
//       { name: 'Recruitment Technology', icon: Zap }
//     ],
//     'For Professionals': [
//       { name: 'Career Development & Growth', icon: TrendingUp },
//       { name: 'Interview Tips & Techniques', icon: UsersIcon },
//       { name: 'Resume & LinkedIn Optimization', icon: FileText },
//       { name: 'U.S. IT Market Trends', icon: Rocket },
//       { name: 'Contract Negotiation Strategies', icon: Briefcase }
//     ],
//     'Industry Insights': [
//       { name: 'Recruitment Trends', icon: TrendingUpIcon },
//       { name: 'Talent Acquisition Market Analysis', icon: BarChart3 },
//       { name: 'Workforce Dynamics', icon: Users },
//       { name: 'Technology & Innovation in Hiring', icon: Lightbulb }
//     ]
//   };

//   const posts = [
//     {
//       id: 1,
//       title: 'The Future of RPO: Emerging Technologies & Workforce Dynamics',
//       excerpt: 'Discover how emerging technologies like AI and automation are revolutionizing recruitment process outsourcing and talent acquisition strategies.',
//       date: 'March 15, 2025',
//       readTime: '5 min read',
//       category: 'For Organizations',
//       subCategory: 'RPO Best Practices',
//       views: '1.2K',
//       likes: 89,
//       comments: 12,
//       featured: true,
//       author: {
//         name: 'Sarah Chen',
//         role: 'Head of RPO Strategy'
//       }
//     },
//     {
//       id: 2,
//       title: 'Stand Out in the U.S. IT Market: Essential Tips for Contract Professionals',
//       excerpt: 'Essential tips and career strategies for IT professionals looking to differentiate themselves and land high-value contracts through effective career support in the competitive U.S. IT market.',
//       date: 'March 10, 2025',
//       readTime: '7 min read',
//       category: 'For Professionals',
//       subCategory: 'U.S. IT Market Trends',
//       views: '2.4K',
//       likes: 156,
//       comments: 23,
//       featured: true,
//       author: {
//         name: 'Mike Rodriguez',
//         role: 'Career Advisor'
//       }
//     },
//     {
//       id: 3,
//       title: 'The Power of Global Talent Sourcing: Local Expertise Meets Global Reach',
//       excerpt: 'Learn about the strategic advantages of combining local recruitment expertise with global talent acquisition capabilities for faster, better hiring through RPO services.',
//       date: 'March 5, 2025',
//       readTime: '6 min read',
//       category: 'For Organizations',
//       subCategory: 'Talent Acquisition Strategy',
//       views: '1.8K',
//       likes: 67,
//       comments: 8,
//       featured: true,
//       author: {
//         name: 'Emily Watson',
//         role: 'Global Talent Director'
//       }
//     },
//     {
//       id: 4,
//       title: 'RPO Best Practices: Optimizing Your Talent Acquisition Pipeline',
//       excerpt: 'Learn how to streamline your recruitment process and improve hiring outcomes with proven RPO strategies and methodologies.',
//       date: 'February 28, 2025',
//       readTime: '8 min read',
//       category: 'For Organizations',
//       subCategory: 'RPO Best Practices',
//       views: '3.1K',
//       likes: 234,
//       comments: 31,
//       author: {
//         name: 'David Kim',
//         role: 'RPO Specialist'
//       }
//     },
//     {
//       id: 5,
//       title: 'Mastering Contract Negotiation: Strategies for IT Professionals',
//       excerpt: 'Essential negotiation tactics and strategies for IT contractors to secure better rates and contract terms in the competitive U.S. market.',
//       date: 'February 22, 2025',
//       readTime: '6 min read',
//       category: 'For Professionals',
//       subCategory: 'Contract Negotiation Strategies',
//       views: '1.5K',
//       likes: 78,
//       comments: 14,
//       author: {
//         name: 'Lisa Thompson',
//         role: 'Career Coach'
//       }
//     },
//     {
//       id: 6,
//       title: 'AI in Recruitment: Transforming Talent Acquisition',
//       excerpt: 'How artificial intelligence is revolutionizing the recruitment landscape and what it means for both organizations and job seekers.',
//       date: 'February 15, 2025',
//       readTime: '5 min read',
//       category: 'Industry Insights',
//       subCategory: 'Technology & Innovation in Hiring',
//       views: '2.2K',
//       likes: 145,
//       comments: 19,
//       author: {
//         name: 'Alex Turner',
//         role: 'Technology Analyst'
//       }
//     },
//     {
//       id: 7,
//       title: 'Building a Powerful Employer Brand for Talent Attraction',
//       excerpt: 'Strategies for creating an employer brand that attracts top talent and reduces time-to-hire in competitive markets.',
//       date: 'February 10, 2025',
//       readTime: '4 min read',
//       category: 'For Organizations',
//       subCategory: 'Employer Branding for Hiring',
//       views: '1.9K',
//       likes: 98,
//       comments: 11,
//       author: {
//         name: 'Rachel Green',
//         role: 'Employer Brand Strategist'
//       }
//     },
//     {
//       id: 8,
//       title: 'LinkedIn Optimization for IT Professionals',
//       excerpt: 'Complete guide to optimizing your LinkedIn profile to attract recruiters and land your next contract role in the U.S. market.',
//       date: 'February 5, 2025',
//       readTime: '5 min read',
//       category: 'For Professionals',
//       subCategory: 'Resume & LinkedIn Optimization',
//       views: '2.7K',
//       likes: 167,
//       comments: 22,
//       author: {
//         name: 'James Wilson',
//         role: 'Digital Presence Expert'
//       }
//     }
//   ];

//   // Interactive functions
//   const toggleSavePost = (postId) => {
//     setSavedPosts(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(postId)) {
//         newSet.delete(postId);
//       } else {
//         newSet.add(postId);
//       }
//       return newSet;
//     });
//   };

//   const toggleLikePost = (postId) => {
//     setLikedPosts(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(postId)) {
//         newSet.delete(postId);
//       } else {
//         newSet.add(postId);
//       }
//       return newSet;
//     });
//   };

//   // Function to handle category click with scroll
//   const handleCategoryClick = (categoryName) => {
//     setActiveCategory(categoryName);
//     setIsFilterOpen(false);
    
//     // Scroll to all articles section after a small delay to ensure state update
//     setTimeout(() => {
//       if (allArticlesRef.current) {
//         allArticlesRef.current.scrollIntoView({ 
//           behavior: 'smooth',
//           block: 'start'
//         });
//       }
//     }, 100);
//   };

//   const featuredPosts = posts.filter(post => post.featured);
//   const filteredPosts = activeCategory === 'All' 
//     ? posts.filter(post => 
//         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : posts.filter(post => 
//         post.category === activeCategory &&
//         (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//          post.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
//       );

//   const displayedPosts = filteredPosts.slice(0, visiblePosts);

//   // Scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Intersection Observer for animations
//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-in');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '-50px' }
//     );

//     const elements = document.querySelectorAll('.animate-on-scroll');
//     elements.forEach(el => observerRef.current.observe(el));

//     return () => observerRef.current?.disconnect();
//   }, [filteredPosts]);

//   const loadMore = () => {
//     setVisiblePosts(prev => prev + 6);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {/* Hero Section - Consistent with Other Pages */}
//       <section className="relative min-h-[80vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 md:pt-24">
        
//         {/* Background Elements - Mobile Optimized */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
//           <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
//         </div>

//         <div className="relative container mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10 z-10">
//           <div className="space-y-8 sm:space-y-10 py-4">
            
//             {/* Badge */}
//             <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-4 sm:mb-6 md:mb-8 shadow-2xl">
//               <div className="flex items-center gap-2">
//                 <span className="text-white/90 text-sm font-semibold tracking-wide">
//                   Expert Insights
//                 </span>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <div className="space-y-4 sm:space-y-6">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
//                 <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                   Novotion Insights
//                 </span>
//               </h1>

//               {/* Subtitle */}
//               <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
//                 Where recruitment innovation meets career transformation. Expert perspectives on talent acquisition that drive success in today's dynamic hiring landscape.
//               </p>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6">
//               {[
//                 { number: '32+', label: 'Articles' },
//                 { number: '50K+', label: 'Readers' },
//                 { number: '95%', label: 'Engagement' }
//               ].map((stat, index) => (
//                 <div key={stat.label} className="text-center animate-on-scroll" style={{ animationDelay: `${index * 200}ms` }}>
//                   <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
//                   <div className="text-blue-100 text-xs sm:text-sm">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="py-12 sm:py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto text-center animate-on-scroll">
//             <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
//               <BookOpen className="h-4 w-4" />
//               <span className="font-semibold text-sm">Welcome to Our Blog</span>
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
//               Your Go-To Resource for Recruitment & Career Excellence
//             </h2>
//             <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
//               Welcome to the Novotion blog - your comprehensive resource for insights, strategies, and thought leadership in recruitment and career development.
//             </p>
//             <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
//               Whether you're a hiring manager looking to optimize your talent acquisition strategy through RPO services or an IT professional navigating the U.S. contract market with our career support, we've got you covered.
//             </p>
//             <p className="text-gray-600 font-semibold mt-6 text-base sm:text-lg">
//               Stay ahead. Stay informed. Stay inspired in recruitment and career growth.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Featured Posts */}
//       {featuredPosts.length > 0 && (
//         <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
//           <div className="container mx-auto px-4 sm:px-6">

//             <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
              
//               <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4 sm:mb-6">
//                 <span className="font-semibold text-sm">Featured Articles</span>
//               </div>

//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
//                 Must-Read Insights
//               </h2>

//               <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
//                 Discover our most impactful articles on RPO services, career support, and talent acquisition innovation.
//               </p>
//             </div>

//             <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//               {featuredPosts.map((post, index) => (
//                 <Card 
//                   key={post.id} 
//                   className={`animate-on-scroll border-l-4 border-l-blue-600 hover-lift`}
//                   style={{ animationDelay: `${index * 200}ms` }}
//                 >
//                   <CardContent className="p-0 overflow-hidden">
//                     {/* Post Image */}
//                     <div className="relative h-48 bg-blue-600 overflow-hidden">
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

//                       <div className="absolute top-4 left-4">
//                         <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-xs font-semibold">
//                           {post.subCategory}
//                         </span>
//                       </div>

//                       {/* Author */}
//                       <div className="absolute bottom-4 left-4 flex items-center gap-2">
//                         <div className="w-8 h-8 bg-white/20 rounded-full border border-white/30"></div>
//                         <div>
//                           <div className="text-white font-semibold text-sm">
//                             {post.author.name}
//                           </div>
//                           <div className="text-white/70 text-xs">
//                             {post.author.role}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Content Block */}
//                     <div className="pt-6 space-y-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight mb-2 line-clamp-2">
//                           <Link href="#">
//                             {post.title}
//                           </Link>
//                         </h3>

//                         <p className="text-gray-600 leading-relaxed line-clamp-3">
//                           {post.excerpt}
//                         </p>
//                       </div>

//                       {/* Footer Meta */}
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                        
//                         {/* Left Meta */}
//                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4" />
//                             <span>{post.date.split(' ').slice(0, 2).join(' ')}</span>
//                           </div>

//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4" />
//                             <span>{post.readTime}</span>
//                           </div>
//                         </div>

//                         {/* Right CTA */}
//                         <Link href="#">
//                           <Button className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
//                             Read More
//                             <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
//                           </Button>
//                         </Link>

//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Blog Categories Section */}
//       <section className="py-12 sm:py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12 animate-on-scroll">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
//               Explore by Category
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
//               Dive into specialized content tailored for organizations, professionals, and industry insights.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {Object.entries(subCategories).map(([category, subCats], categoryIndex) => (
//               <div key={category} className="animate-on-scroll" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
//                 <Card className="h-full hover-lift border-t-4 border-t-blue-600">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="p-3 bg-blue-100 rounded-lg">
//                         {category === 'For Organizations' && <Building className="h-6 w-6 text-blue-600" />}
//                         {category === 'For Professionals' && <User className="h-6 w-6 text-blue-600" />}
//                         {category === 'Industry Insights' && <TrendingUpIcon className="h-6 w-6 text-blue-600" />}
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-900">{category}</h3>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {subCats.map((subCat, index) => {
//                         const IconComponent = subCat.icon;
//                         return (
//                           <div key={subCat.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
//                             <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
//                             <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{subCat.name}</span>
//                             <ChevronRight className="h-4 w-4 text-gray-300 ml-auto group-hover:text-blue-600 transition-colors" />
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/* Button with scroll functionality */}
//                     <Button 
//                       onClick={() => handleCategoryClick(category)}
//                       variant="ghost" 
//                       className="w-full mt-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//                     >
//                       View All {category} Articles
//                       <ArrowRight className="h-4 w-4 ml-2" />
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* All Articles Section */}
//       <section 
//         id="all-articles" 
//         ref={allArticlesRef}
//         className="py-12 sm:py-16 md:py-20 bg-gray-50"
//       >
//         <div className="container mx-auto px-4 sm:px-6">

//           {/* Section Header */}
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8 lg:mb-12 max-w-7xl mx-auto animate-on-scroll">
            
//             {/* Title */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
//                 All Articles
//               </h2>

//               <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
//                 Comprehensive collection of insights, guides, and thought leadership pieces covering recruitment, career support, and talent acquisition.
//               </p>
//             </div>

//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden w-full">
//               <Button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 variant="outline"
//                 className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
//               >
//                 <span className="flex items-center gap-2">
//                   <Menu className="h-4 w-4" />
//                   Filter Categories
//                 </span>
//                 <ChevronRight className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-90' : ''}`} />
//               </Button>
//             </div>

//             {/* Categories */}
//             <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((category, index) => {
//                   const IconComponent = category.icon;

//                   return (
//                     <button
//                       key={category.name}
//                       onClick={() => handleCategoryClick(category.name)}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all 
//                       ${activeCategory === category.name
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'} 
//                       animate-on-scroll`}
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       <IconComponent className="h-4 w-4" />
//                       <span>{category.name}</span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === category.name ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
//                         {category.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Posts Grid */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//             {displayedPosts.map((post, index) => (
//               <Card 
//                 key={post.id} 
//                 className={`animate-on-scroll group hover-lift border-l-4 border-l-blue-600`} 
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CardContent className="p-0 overflow-hidden">
//                   {/* Post Image */}
//                   <div className="relative h-40 bg-blue-600 overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

//                     <div className="absolute top-3 left-3">
//                       <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-xs font-semibold">
//                         {post.subCategory}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Blog Content Box */}
//                   <div className="pt-6 space-y-4">
                    
//                     {/* Category Badge */}
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
//                         {post.category}
//                       </span>
//                     </div>

//                     {/* Title */}
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
//                       <Link href="#">
//                         {post.title}
//                       </Link>
//                     </h3>

//                     {/* Excerpt */}
//                     <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
//                       {post.excerpt}
//                     </p>

//                     {/* Meta Info */}
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      
//                       {/* Left Meta */}
//                       <div className="flex items-center gap-3 text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4" />
//                           <span>{post.date.split(' ').slice(0, 2).join(' ')}</span>
//                         </div>

//                         <div className="flex items-center gap-1">
//                           <Clock className="h-4 w-4" />
//                           <span>{post.readTime}</span>
//                         </div>
//                       </div>

//                       {/* Read CTA */}
//                       <Link href="#">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="group/btn text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold hover:translate-x-1 transition-transform text-sm"
//                         >
//                           Read More
//                           <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Load More Button */}
//           {filteredPosts.length > visiblePosts && (
//             <div className="text-center mt-12 animate-on-scroll">
//               <Button
//                 onClick={loadMore}
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm"
//               >
//                 Load More Articles
//                 <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Newsletter CTA */}
//       <section className="py-12 sm:py-16 md:py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">

//           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 sm:p-8 text-white text-center max-w-4xl mx-auto relative overflow-hidden animate-on-scroll">
            
//             {/* Background Elements */}
//             <div className="absolute inset-0 pointer-events-none">
//               <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
//               <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"></div>
//             </div>

//             {/* Foreground Content */}
//             <div className="relative z-10">

//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
//                 <span className="text-white/90 text-sm font-semibold">
//                   Never Miss an Insight
//                 </span>
//               </div>

//               {/* Heading */}
//               <h2 className="text-2xl sm:text-3xl font-bold mb-4">
//                 Join 50,000+ Professionals
//               </h2>

//               {/* Description */}
//               <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
//                 Receive our expert insights on recruitment trends, career development, and talent acquisition innovations.
//               </p>

//               {/* Email Input + CTA */}
//               <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Enter your professional email"
//                   className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
//                 />

//                 <Button
//                   className="px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap bg-white text-blue-600 hover:bg-gray-100"
//                 >
//                   Subscribe Now
//                 </Button>
//               </div>

//               <p className="text-white/60 text-xs mt-4">
//                 No spam. Unsubscribe anytime. Professional recruitment and career content only.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Topic Suggestion CTA */}
//       <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto text-center animate-on-scroll">
//             <Card className="border border-blue-200 bg-white/50 backdrop-blur-sm">
//               <CardContent className="py-8 sm:py-12">
//                 <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
//                   <Lightbulb className="h-4 w-4" />
//                   <span className="font-semibold text-sm">Share Your Ideas</span>
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
//                   Have a Topic You'd Like Us to Cover?
//                 </h2>
//                 <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
//                   We're always looking for fresh perspectives on recruitment, RPO services, and career support. Let us know what you'd like to learn more about.
//                 </p>
//                 <Link href="/contact#contact-form">
//                   <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm">
//                     Suggest a Topic
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <Footer />

//       {/* Global Styles */}
//       <style jsx global>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.5; }
//         }

//         .animate-fadeIn {
//           animation: fadeInUp 0.4s ease-out forwards;
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 4s infinite;
//         }

//         .animate-on-scroll {
//           opacity: 0;
//           transform: translateY(30px);
//           transition: all 0.6s ease-out;
//         }

//         .animate-on-scroll.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         .blog-card:hover {
//           transform: translateY(-4px);
//         }

//         .hover-lift {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .hover-lift:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//         }

//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }

//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>

//     </div>
//   );
// };

// export default Blog;

'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  Search,
  ChevronRight,
  BookOpen,
  Star,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  Rocket,
  Target,
  BarChart3,
  Lightbulb,
  Globe,
  Users,
  TrendingUp,
  Zap,
  Menu,
  Building,
  User,
  TrendingUp as TrendingUpIcon,
  Briefcase,
  FileText,
  Linkedin,
  Award,
  Users as UsersIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicSuggestionForm from '@/components/blog/TopicSuggestionForm';

// Enhanced Card components
const Card = ({ children, className = "", ...props }) => (
  <div 
    className={`blog-card rounded-lg sm:rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

// Helper function to generate slugs
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isScrolled, setIsScrolled] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTopicFormOpen, setIsTopicFormOpen] = useState(false);
  
  const observerRef = useRef(null);
  const allArticlesRef = useRef(null);

  const categories = [
    { name: 'All', icon: Globe, count: 32 },
    { name: 'For Organizations', icon: Building, count: 15 },
    { name: 'For Professionals', icon: User, count: 12 },
    { name: 'Industry Insights', icon: TrendingUpIcon, count: 5 }
  ];

  const subCategories = {
    'For Organizations': [
      { name: 'RPO Best Practices', icon: Briefcase },
      { name: 'Talent Acquisition Strategy', icon: Target },
      { name: 'Cost Optimization in Recruitment', icon: BarChart3 },
      { name: 'Employer Branding for Hiring', icon: Award },
      { name: 'Recruitment Technology', icon: Zap }
    ],
    'For Professionals': [
      { name: 'Career Development & Growth', icon: TrendingUp },
      { name: 'Interview Tips & Techniques', icon: UsersIcon },
      { name: 'Resume & LinkedIn Optimization', icon: FileText },
      { name: 'U.S. IT Market Trends', icon: Rocket },
      { name: 'Contract Negotiation Strategies', icon: Briefcase }
    ],
    'Industry Insights': [
      { name: 'Recruitment Trends', icon: TrendingUpIcon },
      { name: 'Talent Acquisition Market Analysis', icon: BarChart3 },
      { name: 'Workforce Dynamics', icon: Users },
      { name: 'Technology & Innovation in Hiring', icon: Lightbulb }
    ]
  };

  const posts = [
    {
      id: 1,
      title: 'The Future of RPO: Emerging Technologies & Workforce Dynamics',
      slug: 'future-of-rpo-emerging-technologies-workforce-dynamics',
      excerpt: 'Discover how emerging technologies like AI and automation are revolutionizing recruitment process outsourcing and talent acquisition strategies.',
      date: 'March 15, 2025',
      readTime: '5 min read',
      category: 'For Organizations',
      subCategory: 'RPO Best Practices',
      views: '1.2K',
      likes: 89,
      comments: 12,
      featured: true,
      author: {
        name: 'Sarah Chen',
        role: 'Head of RPO Strategy'
      }
    },
    {
      id: 2,
      title: 'Stand Out in the U.S. IT Market: Essential Tips for Contract Professionals',
      slug: 'stand-out-us-it-market-essential-tips-contract-professionals',
      excerpt: 'Essential tips and career strategies for IT professionals looking to differentiate themselves and land high-value contracts through effective career support in the competitive U.S. IT market.',
      date: 'March 10, 2025',
      readTime: '7 min read',
      category: 'For Professionals',
      subCategory: 'U.S. IT Market Trends',
      views: '2.4K',
      likes: 156,
      comments: 23,
      featured: true,
      author: {
        name: 'Mike Rodriguez',
        role: 'Career Advisor'
      }
    },
    {
      id: 3,
      title: 'The Power of Global Talent Sourcing: Local Expertise Meets Global Reach',
      slug: 'power-global-talent-sourcing-local-expertise-global-reach',
      excerpt: 'Learn about the strategic advantages of combining local recruitment expertise with global talent acquisition capabilities for faster, better hiring through RPO services.',
      date: 'March 5, 2025',
      readTime: '6 min read',
      category: 'For Organizations',
      subCategory: 'Talent Acquisition Strategy',
      views: '1.8K',
      likes: 67,
      comments: 8,
      featured: true,
      author: {
        name: 'Emily Watson',
        role: 'Global Talent Director'
      }
    },
    {
      id: 4,
      title: 'RPO Best Practices: Optimizing Your Talent Acquisition Pipeline',
      slug: 'rpo-best-practices-optimizing-talent-acquisition-pipeline',
      excerpt: 'Learn how to streamline your recruitment process and improve hiring outcomes with proven RPO strategies and methodologies.',
      date: 'February 28, 2025',
      readTime: '8 min read',
      category: 'For Organizations',
      subCategory: 'RPO Best Practices',
      views: '3.1K',
      likes: 234,
      comments: 31,
      author: {
        name: 'David Kim',
        role: 'RPO Specialist'
      }
    },
    {
      id: 5,
      title: 'Mastering Contract Negotiation: Strategies for IT Professionals',
      slug: 'mastering-contract-negotiation-strategies-it-professionals',
      excerpt: 'Essential negotiation tactics and strategies for IT contractors to secure better rates and contract terms in the competitive U.S. market.',
      date: 'February 22, 2025',
      readTime: '6 min read',
      category: 'For Professionals',
      subCategory: 'Contract Negotiation Strategies',
      views: '1.5K',
      likes: 78,
      comments: 14,
      author: {
        name: 'Lisa Thompson',
        role: 'Career Coach'
      }
    },
    {
      id: 6,
      title: 'AI in Recruitment: Transforming Talent Acquisition',
      slug: 'ai-recruitment-transforming-talent-acquisition',
      excerpt: 'How artificial intelligence is revolutionizing the recruitment landscape and what it means for both organizations and job seekers.',
      date: 'February 15, 2025',
      readTime: '5 min read',
      category: 'Industry Insights',
      subCategory: 'Technology & Innovation in Hiring',
      views: '2.2K',
      likes: 145,
      comments: 19,
      author: {
        name: 'Alex Turner',
        role: 'Technology Analyst'
      }
    },
    {
      id: 7,
      title: 'Building a Powerful Employer Brand for Talent Attraction',
      slug: 'building-powerful-employer-brand-talent-attraction',
      excerpt: 'Strategies for creating an employer brand that attracts top talent and reduces time-to-hire in competitive markets.',
      date: 'February 10, 2025',
      readTime: '4 min read',
      category: 'For Organizations',
      subCategory: 'Employer Branding for Hiring',
      views: '1.9K',
      likes: 98,
      comments: 11,
      author: {
        name: 'Rachel Green',
        role: 'Employer Brand Strategist'
      }
    },
    {
      id: 8,
      title: 'LinkedIn Optimization for IT Professionals',
      slug: 'linkedin-optimization-it-professionals',
      excerpt: 'Complete guide to optimizing your LinkedIn profile to attract recruiters and land your next contract role in the U.S. market.',
      date: 'February 5, 2025',
      readTime: '5 min read',
      category: 'For Professionals',
      subCategory: 'Resume & LinkedIn Optimization',
      views: '2.7K',
      likes: 167,
      comments: 22,
      author: {
        name: 'James Wilson',
        role: 'Digital Presence Expert'
      }
    }
  ];

  // Interactive functions
  const toggleSavePost = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleLikePost = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Function to handle category click with scroll
  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setIsFilterOpen(false);
    
    // Scroll to all articles section after a small delay to ensure state update
    setTimeout(() => {
      if (allArticlesRef.current) {
        allArticlesRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const featuredPosts = posts.filter(post => post.featured);
  const filteredPosts = activeCategory === 'All' 
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts.filter(post => 
        post.category === activeCategory &&
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
         post.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, [filteredPosts]);

  const loadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Consistent with Other Pages */}
      <section className="relative min-h-[80vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 md:pt-24">
        
        {/* Background Elements - Mobile Optimized */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10 z-10">
          <div className="space-y-8 sm:space-y-10 py-4">
            
            {/* Badge */}
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 mb-4 sm:mb-6 md:mb-8 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm font-semibold tracking-wide">
                  Expert Insights
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Novotion Insights
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
                Where recruitment innovation meets career transformation. Expert perspectives on talent acquisition that drive success in today's dynamic hiring landscape.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6">
              {[
                { number: '32+', label: 'Articles' },
                { number: '50K+', label: 'Readers' },
                { number: '95%', label: 'Engagement' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center animate-on-scroll" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-blue-100 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="font-semibold text-sm">Welcome to Our Blog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Your Go-To Resource for Recruitment & Career Excellence
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Welcome to the Novotion blog - your comprehensive resource for insights, strategies, and thought leadership in recruitment and career development.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Whether you're a hiring manager looking to optimize your talent acquisition strategy through RPO services or an IT professional navigating the U.S. contract market with our career support, we've got you covered.
            </p>
            <p className="text-gray-600 font-semibold mt-6 text-base sm:text-lg">
              Stay ahead. Stay informed. Stay inspired in recruitment and career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">

            <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
              
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4 sm:mb-6">
                <span className="font-semibold text-sm">Featured Articles</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Must-Read Insights
              </h2>

              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Discover our most impactful articles on RPO services, career support, and talent acquisition innovation.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {featuredPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className={`animate-on-scroll border-l-4 border-l-blue-600 hover-lift`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-0 overflow-hidden">
                    {/* Post Image */}
                    <div className="relative h-48 bg-blue-600 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-xs font-semibold">
                          {post.subCategory}
                        </span>
                      </div>

                      {/* Author */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full border border-white/30"></div>
                        <div>
                          <div className="text-white font-semibold text-sm">
                            {post.author.name}
                          </div>
                          <div className="text-white/70 text-xs">
                            {post.author.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="pt-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight mb-2 line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer Meta */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                        
                        {/* Left Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date.split(' ').slice(0, 2).join(' ')}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        {/* Right CTA */}
                        <Link href={`/blog/${post.slug}`}>
                          <Button className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explore by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Dive into specialized content tailored for organizations, professionals, and industry insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(subCategories).map(([category, subCats], categoryIndex) => (
              <div key={category} className="animate-on-scroll" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                <Card className="h-full hover-lift border-t-4 border-t-blue-600">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {category === 'For Organizations' && <Building className="h-6 w-6 text-blue-600" />}
                        {category === 'For Professionals' && <User className="h-6 w-6 text-blue-600" />}
                        {category === 'Industry Insights' && <TrendingUpIcon className="h-6 w-6 text-blue-600" />}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {subCats.map((subCat, index) => {
                        const IconComponent = subCat.icon;
                        return (
                          <div key={subCat.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                            <IconComponent className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{subCat.name}</span>
                            <ChevronRight className="h-4 w-4 text-gray-300 ml-auto group-hover:text-blue-600 transition-colors" />
                          </div>
                        );
                      })}
                    </div>

                    {/* Button with scroll functionality */}
                    <Button 
                      onClick={() => handleCategoryClick(category)}
                      variant="ghost" 
                      className="w-full mt-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View All {category} Articles
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section 
        id="all-articles" 
        ref={allArticlesRef}
        className="py-12 sm:py-16 md:py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8 lg:mb-12 max-w-7xl mx-auto animate-on-scroll">
            
            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                All Articles
              </h2>

              <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
                Comprehensive collection of insights, guides, and thought leadership pieces covering recruitment, career support, and talent acquisition.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full">
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="outline"
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
              >
                <span className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  Filter Categories
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-90' : ''}`} />
              </Button>
            </div>

            {/* Categories */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;

                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all 
                      ${activeCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'} 
                      animate-on-scroll`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${activeCategory === category.name ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {displayedPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`animate-on-scroll group hover-lift border-l-4 border-l-blue-600`} 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0 overflow-hidden">
                  {/* Post Image */}
                  <div className="relative h-40 bg-blue-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-xs font-semibold">
                        {post.subCategory}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content Box */}
                  <div className="pt-6 space-y-4">
                    
                    {/* Category Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      
                      {/* Left Meta */}
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date.split(' ').slice(0, 2).join(' ')}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Read CTA */}
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group/btn text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold hover:translate-x-1 transition-transform text-sm"
                        >
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {filteredPosts.length > visiblePosts && (
            <div className="text-center mt-12 animate-on-scroll">
              <Button
                onClick={loadMore}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm"
              >
                Load More Articles
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 sm:p-8 text-white text-center max-w-4xl mx-auto relative overflow-hidden animate-on-scroll">
            
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"></div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="text-white/90 text-sm font-semibold">
                  Never Miss an Insight
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Join 50,000+ Professionals
              </h2>

              {/* Description */}
              <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
                Receive our expert insights on recruitment trends, career development, and talent acquisition innovations.
              </p>

              {/* Email Input + CTA */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                />

                <Button
                  className="px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap bg-white text-blue-600 hover:bg-gray-100"
                >
                  Subscribe Now
                </Button>
              </div>

              <p className="text-white/60 text-xs mt-4">
                No spam. Unsubscribe anytime. Professional recruitment and career content only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topic Suggestion CTA */}
      {/* <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <Card className="border border-blue-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="py-8 sm:py-12">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
                  <Lightbulb className="h-4 w-4" />
                  <span className="font-semibold text-sm">Share Your Ideas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Have a Topic You'd Like Us to Cover?
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  We're always looking for fresh perspectives on recruitment, RPO services, and career support. Let us know what you'd like to learn more about.
                </p>
                <Link href="/contact#contact-form">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm">
                    Suggest a Topic
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}
      {/* Topic Suggestion CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <Card className="border border-blue-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="py-8 sm:py-12">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-6">
                  <Lightbulb className="h-4 w-4" />
                  <span className="font-semibold text-sm">Share Your Ideas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Have a Topic You'd Like Us to Cover?
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  We're always looking for fresh perspectives on recruitment, RPO services, and career support. Let us know what you'd like to learn more about.
                </p>
                <Button 
                  onClick={() => setIsTopicFormOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-sm"
                >
                  Suggest a Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TopicSuggestionForm 
        isOpen={isTopicFormOpen}
        onClose={() => setIsTopicFormOpen(false)}
      />


      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .animate-fadeIn {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-card:hover {
          transform: translateY(-4px);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  );
};

export default Blog;