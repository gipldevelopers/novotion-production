// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import {
//   Calendar,
//   Clock,
//   ArrowLeft,
//   Share2,
//   Bookmark,
//   BookmarkCheck,
//   ThumbsUp,
//   MessageCircle,
//   Eye,
//   User,
//   Building,
//   TrendingUp,
//   Briefcase,
//   Target,
//   BarChart3,
//   Award,
//   Zap,
//   Rocket,
//   Users,
//   Linkedin,
//   Twitter,
//   Facebook,
//   Copy,
//   CheckCircle,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// // Mock blog data - In real app, this would come from CMS/API
// const blogPosts = {
//   'future-of-rpo-emerging-technologies': {
//     id: 1,
//     title: 'The Future of RPO: Emerging Technologies & Workforce Dynamics',
//     excerpt: 'Discover how emerging technologies like AI and automation are revolutionizing recruitment process outsourcing and talent acquisition strategies.',
//     content: `
//       <h2>Introduction: The Evolving Landscape of Recruitment</h2>
//       <p>The recruitment industry is undergoing a significant transformation, driven by technological advancements and changing workforce dynamics. As organizations strive to attract and retain top talent, Recruitment Process Outsourcing (RPO) has emerged as a strategic solution.</p>

//       <h2>The Rise of AI in Talent Acquisition</h2>
//       <p>Artificial Intelligence is no longer a buzzword but a practical tool reshaping how we approach recruitment. From automated resume screening to AI-powered candidate matching, the technology is making recruitment more efficient and data-driven.</p>

//       <h3>Key AI Applications in RPO:</h3>
//       <ul>
//         <li><strong>Intelligent Candidate Sourcing:</strong> AI algorithms can scan multiple platforms to identify potential candidates based on specific criteria</li>
//         <li><strong>Automated Screening:</strong> Natural Language Processing (NLP) helps in quickly assessing candidate qualifications and experience</li>
//         <li><strong>Predictive Analytics:</strong> Machine learning models can predict candidate success and cultural fit</li>
//         <li><strong>Chatbot Integration:</strong> 24/7 candidate engagement and initial screening</li>
//       </ul>

//       <h2>Automation and Its Impact on Recruitment Efficiency</h2>
//       <p>Automation technologies are streamlining repetitive tasks, allowing recruitment professionals to focus on strategic activities. This includes automated interview scheduling, candidate communication, and onboarding processes.</p>

//       <blockquote>
//         "The future of RPO lies in the perfect blend of technology and human expertise. While AI handles efficiency, human recruiters bring empathy and strategic thinking to the table."
//       </blockquote>

//       <h2>Changing Workforce Dynamics</h2>
//       <p>The post-pandemic era has brought significant changes in workforce expectations:</p>
//       <ul>
//         <li>Increased demand for remote and hybrid work options</li>
//         <li>Greater emphasis on work-life balance</li>
//         <li>Focus on diversity, equity, and inclusion</li>
//         <li>Rise of the gig economy and contract work</li>
//       </ul>

//       <h2>Data-Driven Decision Making</h2>
//       <p>Modern RPO providers leverage data analytics to provide insights into:</p>
//       <ul>
//         <li>Time-to-hire metrics and optimization</li>
//         <li>Quality of hire and retention rates</li>
//         <li>Candidate experience feedback</li>
//         <li>Market salary trends and benchmarks</li>
//       </ul>

//       <h2>The Human Touch in Digital Recruitment</h2>
//       <p>Despite technological advancements, the human element remains crucial. Successful RPO partnerships combine technology with:</p>
//       <ul>
//         <li>Strategic consulting and advisory services</li>
//         <li>Employer branding expertise</li>
//         <li>Candidate relationship management</li>
//         <li>Cultural assessment and fit analysis</li>
//       </ul>

//       <h2>Future Trends to Watch</h2>
//       <p>As we look ahead, several trends are shaping the future of RPO:</p>
//       <ol>
//         <li><strong>Hyper-personalization:</strong> Tailored candidate experiences based on individual preferences</li>
//         <li><strong>Skills-based hiring:</strong> Focusing on capabilities rather than traditional qualifications</li>
//         <li><strong>Global talent pools:</strong> Leveraging remote work to access worldwide talent</li>
//         <li><strong>Continuous recruitment:</strong> Building talent pipelines for future needs</li>
//       </ol>

//       <h2>Conclusion: Embracing the Change</h2>
//       <p>The future of RPO is bright and dynamic. Organizations that embrace these technological advancements while maintaining the human touch will be best positioned to succeed in the competitive talent landscape. The key is to view technology as an enabler rather than a replacement for human expertise.</p>

//       <p>At Novotion, we're committed to staying at the forefront of these changes, ensuring our clients benefit from the latest innovations while receiving the personalized service that sets us apart.</p>
//     `,
//     date: 'March 15, 2025',
//     readTime: '5 min read',
//     category: 'For Organizations',
//     subCategory: 'RPO Best Practices',
//     views: '1.2K',
//     likes: 89,
//     comments: 12,
//     featured: true,
//     author: {
//       name: 'Sarah Chen',
//       role: 'Head of RPO Strategy',
//       bio: 'Sarah has over 15 years of experience in talent acquisition and RPO strategy. She specializes in helping organizations optimize their recruitment processes through technology and data-driven approaches.'
//     },
//     tags: ['RPO', 'AI', 'Automation', 'Talent Acquisition', 'Future of Work']
//   },
//   'stand-out-us-it-market-tips': {
//     id: 2,
//     title: 'Stand Out in the U.S. IT Market: Essential Tips for Contract Professionals',
//     excerpt: 'Essential tips and career strategies for IT professionals looking to differentiate themselves and land high-value contracts through effective career support in the competitive U.S. IT market.',
//     content: `
//       <h2>Navigating the Competitive U.S. IT Contract Market</h2>
//       <p>The U.S. IT contract market offers tremendous opportunities for skilled professionals, but standing out requires strategic planning and execution. Here's how you can position yourself for success.</p>

//       <h2>Building a Strong Professional Brand</h2>
//       <p>Your personal brand is your most valuable asset in the contract market. It's what sets you apart from thousands of other IT professionals.</p>

//       <h3>Key Elements of a Strong IT Professional Brand:</h3>
//       <ul>
//         <li><strong>Specialized Expertise:</strong> Develop deep knowledge in specific technologies or domains</li>
//         <li><strong>Online Presence:</strong> Optimize your LinkedIn profile and professional networks</li>
//         <li><strong>Portfolio Development:</strong> Showcase your projects and achievements</li>
//         <li><strong>Thought Leadership:</strong> Share insights and contribute to technical discussions</li>
//       </ul>

//       <h2>Mastering the Art of Resume Optimization</h2>
//       <p>Your resume is often the first impression you make. Make it count with these strategies:</p>

//       <blockquote>
//         "A well-crafted resume doesn't just list your experience—it tells a story of your professional journey and the value you bring to organizations."
//       </blockquote>

//       <h2>Effective Interview Preparation</h2>
//       <p>Technical skills alone aren't enough. Successful contract professionals excel in interviews by:</p>
//       <ul>
//         <li>Demonstrating problem-solving abilities</li>
//         <li>Showcasing communication skills</li>
//         <li>Providing specific examples of past successes</li>
//         <li>Asking insightful questions about the project and team</li>
//       </ul>

//       <h2>Networking Strategies That Work</h2>
//       <p>Building meaningful professional relationships is crucial for long-term success in the contract market.</p>

//       <h2>Contract Negotiation Best Practices</h2>
//       <p>Learn to negotiate contracts that reflect your true value while maintaining positive client relationships.</p>

//       <h2>Continuous Skill Development</h2>
//       <p>The IT landscape evolves rapidly. Stay ahead by continuously updating your skills and knowledge.</p>

//       <h2>Conclusion: Your Path to Contract Success</h2>
//       <p>Standing out in the U.S. IT contract market requires a combination of technical excellence, strategic positioning, and continuous improvement. By implementing these strategies, you can build a rewarding and sustainable contract career.</p>
//     `,
//     date: 'March 10, 2025',
//     readTime: '7 min read',
//     category: 'For Professionals',
//     subCategory: 'U.S. IT Market Trends',
//     views: '2.4K',
//     likes: 156,
//     comments: 23,
//     featured: true,
//     author: {
//       name: 'Mike Rodriguez',
//       role: 'Career Advisor',
//       bio: 'Mike specializes in helping IT professionals navigate the U.S. contract market. With over a decade of experience, he has guided hundreds of professionals to successful contract placements.'
//     },
//     tags: ['IT Contracts', 'Career Development', 'US Market', 'Contract Negotiation']
//   }
//   // Add more posts as needed
// };

// // Card components (reuse from your existing code)
// const Card = ({ children, className = "", ...props }) => (
//   <div 
//     className={`rounded-lg sm:rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
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

// export default function BlogPost() {
//   const params = useParams();
//   const slug = params.slug;
//   const post = blogPosts[slug];
  
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [showShareTooltip, setShowShareTooltip] = useState(false);
//   const [copySuccess, setCopySuccess] = useState('');

//   if (!post) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-32 text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
//           <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
//           <Link href="/blog">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Blog
//             </Button>
//           </Link>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleShare = async (platform = 'copy') => {
//     const url = window.location.href;
//     const title = post.title;

//     switch (platform) {
//       case 'linkedin':
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'twitter':
//         window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'facebook':
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
//         break;
//       case 'copy':
//         await navigator.clipboard.writeText(url);
//         setCopySuccess('Copied!');
//         setTimeout(() => setCopySuccess(''), 2000);
//         break;
//     }
//     setShowShareTooltip(false);
//   };

//   const relatedPosts = Object.values(blogPosts)
//     .filter(p => p.id !== post.id && p.category === post.category)
//     .slice(0, 3);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       {/* Article Header */}
//       <section className="relative bg-white border-b border-gray-200 pt-24 md:pt-28">
//         <div className="container mx-auto px-4 sm:px-6">
          
//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
//             <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
//             <ChevronRight className="h-4 w-4" />
//             <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-gray-900 font-medium">{post.category}</span>
//           </nav>

//           <div className="max-w-4xl mx-auto">
            
//             {/* Category Badge */}
//             <div className="flex items-center gap-3 mb-6">
//               <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
//                 {post.category}
//               </span>
//               <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
//                 {post.subCategory}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//               {post.title}
//             </h1>

//             {/* Excerpt */}
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//               {post.excerpt}
//             </p>

//             {/* Meta Information */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-b border-gray-200">
              
//               {/* Author Info */}
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <User className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">{post.author.name}</div>
//                   <div className="text-gray-500 text-sm">{post.author.role}</div>
//                 </div>
//               </div>

//               {/* Post Stats */}
//               <div className="flex items-center gap-6 text-sm text-gray-500">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4" />
//                   <span>{post.date}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   <span>{post.readTime}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Eye className="h-4 w-4" />
//                   <span>{post.views}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-4 py-6">
//               <Button
//                 onClick={() => setIsLiked(!isLiked)}
//                 variant="outline"
//                 className={`flex items-center gap-2 ${isLiked ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
//               >
//                 <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
//                 <span>{post.likes + (isLiked ? 1 : 0)}</span>
//               </Button>

//               <Button
//                 onClick={() => setIsSaved(!isSaved)}
//                 variant="outline"
//                 className={`flex items-center gap-2 ${isSaved ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}`}
//               >
//                 {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
//                 <span>{isSaved ? 'Saved' : 'Save'}</span>
//               </Button>

//               <div className="relative">
//                 <Button
//                   onClick={() => setShowShareTooltip(!showShareTooltip)}
//                   variant="outline"
//                   className="flex items-center gap-2"
//                 >
//                   <Share2 className="h-4 w-4" />
//                   <span>Share</span>
//                 </Button>

//                 {showShareTooltip && (
//                   <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
//                     <div className="space-y-1">
//                       <button
//                         onClick={() => handleShare('linkedin')}
//                         className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                       >
//                         <Linkedin className="h-4 w-4 text-blue-600" />
//                         Share on LinkedIn
//                       </button>
//                       <button
//                         onClick={() => handleShare('twitter')}
//                         className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                       >
//                         <Twitter className="h-4 w-4 text-blue-400" />
//                         Share on Twitter
//                       </button>
//                       <button
//                         onClick={() => handleShare('facebook')}
//                         className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                       >
//                         <Facebook className="h-4 w-4 text-blue-600" />
//                         Share on Facebook
//                       </button>
//                       <button
//                         onClick={() => handleShare('copy')}
//                         className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
//                       >
//                         {copySuccess ? (
//                           <CheckCircle className="h-4 w-4 text-green-600" />
//                         ) : (
//                           <Copy className="h-4 w-4 text-gray-600" />
//                         )}
//                         {copySuccess || 'Copy Link'}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Article Content */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
            
//             {/* Featured Image */}
//             <div className="relative h-64 sm:h-80 bg-blue-600 rounded-xl mb-8 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
//               <div className="absolute bottom-6 left-6 text-white">
//                 <div className="text-sm font-semibold">Featured Image</div>
//               </div>
//             </div>

//             {/* Article Body */}
//             <article 
//               className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
//               {post.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Author Bio */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex flex-col sm:flex-row gap-6 items-start">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <User className="h-8 w-8 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">About the Author</h3>
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="font-semibold text-gray-900">{post.author.name}</div>
//                       <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                       <div className="text-blue-600 text-sm">{post.author.role}</div>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed">
//                       {post.author.bio}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Related Posts */}
//       {relatedPosts.length > 0 && (
//         <section className="py-12 bg-white">
//           <div className="container mx-auto px-4 sm:px-6">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {relatedPosts.map((relatedPost, index) => (
//                   <Card key={relatedPost.id} className="hover-lift">
//                     <CardContent className="p-0 overflow-hidden">
//                       <div className="h-40 bg-blue-600 relative">
//                         <div className="absolute top-3 left-3">
//                           <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
//                             {relatedPost.subCategory}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
//                           <Link href={`/blog/${Object.keys(blogPosts).find(slug => blogPosts[slug].id === relatedPost.id)}`}>
//                             {relatedPost.title}
//                           </Link>
//                         </h3>
//                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             <span>{relatedPost.date.split(' ').slice(0, 2).join(' ')}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             <span>{relatedPost.readTime}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Navigation */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex justify-between items-center">
//               <Link href="/blog">
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <ArrowLeft className="h-4 w-4" />
//                   Back to Blog
//                 </Button>
//               </Link>
              
//               <Link href="/contact">
//                 <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                   Contact Us
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />

//       <style jsx global>{`
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
//       `}</style>
//     </div>
//   );
// }
// src\app\blog\[slug]\page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  MessageCircle,
  Eye,
  User,
  Building,
  TrendingUp,
  Briefcase,
  Target,
  BarChart3,
  Award,
  Zap,
  Rocket,
  Users,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Complete blog posts data matching the slugs from blog page
const blogPosts = {
  'future-of-rpo-emerging-technologies-workforce-dynamics': {
    id: 1,
    title: 'The Future of RPO: Emerging Technologies & Workforce Dynamics',
    excerpt: 'Discover how emerging technologies like AI and automation are revolutionizing recruitment process outsourcing and talent acquisition strategies.',
    content: `
      <h2>Introduction: The Evolving Landscape of Recruitment</h2>
      <p>The recruitment industry is undergoing a significant transformation, driven by technological advancements and changing workforce dynamics. As organizations strive to attract and retain top talent, Recruitment Process Outsourcing (RPO) has emerged as a strategic solution.</p>

      <h2>The Rise of AI in Talent Acquisition</h2>
      <p>Artificial Intelligence is no longer a buzzword but a practical tool reshaping how we approach recruitment. From automated resume screening to AI-powered candidate matching, the technology is making recruitment more efficient and data-driven.</p>

      <h3>Key AI Applications in RPO:</h3>
      <ul>
        <li><strong>Intelligent Candidate Sourcing:</strong> AI algorithms can scan multiple platforms to identify potential candidates based on specific criteria</li>
        <li><strong>Automated Screening:</strong> Natural Language Processing (NLP) helps in quickly assessing candidate qualifications and experience</li>
        <li><strong>Predictive Analytics:</strong> Machine learning models can predict candidate success and cultural fit</li>
        <li><strong>Chatbot Integration:</strong> 24/7 candidate engagement and initial screening</li>
      </ul>

      <h2>Automation and Its Impact on Recruitment Efficiency</h2>
      <p>Automation technologies are streamlining repetitive tasks, allowing recruitment professionals to focus on strategic activities. This includes automated interview scheduling, candidate communication, and onboarding processes.</p>

      <blockquote>
        "The future of RPO lies in the perfect blend of technology and human expertise. While AI handles efficiency, human recruiters bring empathy and strategic thinking to the table."
      </blockquote>

      <h2>Changing Workforce Dynamics</h2>
      <p>The post-pandemic era has brought significant changes in workforce expectations:</p>
      <ul>
        <li>Increased demand for remote and hybrid work options</li>
        <li>Greater emphasis on work-life balance</li>
        <li>Focus on diversity, equity, and inclusion</li>
        <li>Rise of the gig economy and contract work</li>
      </ul>

      <h2>Data-Driven Decision Making</h2>
      <p>Modern RPO providers leverage data analytics to provide insights into:</p>
      <ul>
        <li>Time-to-hire metrics and optimization</li>
        <li>Quality of hire and retention rates</li>
        <li>Candidate experience feedback</li>
        <li>Market salary trends and benchmarks</li>
      </ul>

      <h2>The Human Touch in Digital Recruitment</h2>
      <p>Despite technological advancements, the human element remains crucial. Successful RPO partnerships combine technology with:</p>
      <ul>
        <li>Strategic consulting and advisory services</li>
        <li>Employer branding expertise</li>
        <li>Candidate relationship management</li>
        <li>Cultural assessment and fit analysis</li>
      </ul>

      <h2>Future Trends to Watch</h2>
      <p>As we look ahead, several trends are shaping the future of RPO:</p>
      <ol>
        <li><strong>Hyper-personalization:</strong> Tailored candidate experiences based on individual preferences</li>
        <li><strong>Skills-based hiring:</strong> Focusing on capabilities rather than traditional qualifications</li>
        <li><strong>Global talent pools:</strong> Leveraging remote work to access worldwide talent</li>
        <li><strong>Continuous recruitment:</strong> Building talent pipelines for future needs</li>
      </ol>

      <h2>Conclusion: Embracing the Change</h2>
      <p>The future of RPO is bright and dynamic. Organizations that embrace these technological advancements while maintaining the human touch will be best positioned to succeed in the competitive talent landscape. The key is to view technology as an enabler rather than a replacement for human expertise.</p>

      <p>At Novotion, we're committed to staying at the forefront of these changes, ensuring our clients benefit from the latest innovations while receiving the personalized service that sets us apart.</p>
    `,
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
      role: 'Head of RPO Strategy',
      bio: 'Sarah has over 15 years of experience in talent acquisition and RPO strategy. She specializes in helping organizations optimize their recruitment processes through technology and data-driven approaches.'
    },
    tags: ['RPO', 'AI', 'Automation', 'Talent Acquisition', 'Future of Work']
  },
  'stand-out-us-it-market-essential-tips-contract-professionals': {
    id: 2,
    title: 'Stand Out in the U.S. IT Market: Essential Tips for Contract Professionals',
    excerpt: 'Essential tips and career strategies for IT professionals looking to differentiate themselves and land high-value contracts through effective career support in the competitive U.S. IT market.',
    content: `
      <h2>Navigating the Competitive U.S. IT Contract Market</h2>
      <p>The U.S. IT contract market offers tremendous opportunities for skilled professionals, but standing out requires strategic planning and execution. Here's how you can position yourself for success.</p>

      <h2>Building a Strong Professional Brand</h2>
      <p>Your personal brand is your most valuable asset in the contract market. It's what sets you apart from thousands of other IT professionals.</p>

      <h3>Key Elements of a Strong IT Professional Brand:</h3>
      <ul>
        <li><strong>Specialized Expertise:</strong> Develop deep knowledge in specific technologies or domains</li>
        <li><strong>Online Presence:</strong> Optimize your LinkedIn profile and professional networks</li>
        <li><strong>Portfolio Development:</strong> Showcase your projects and achievements</li>
        <li><strong>Thought Leadership:</strong> Share insights and contribute to technical discussions</li>
      </ul>

      <h2>Mastering the Art of Resume Optimization</h2>
      <p>Your resume is often the first impression you make. Make it count with these strategies:</p>

      <blockquote>
        "A well-crafted resume doesn't just list your experience—it tells a story of your professional journey and the value you bring to organizations."
      </blockquote>

      <h2>Effective Interview Preparation</h2>
      <p>Technical skills alone aren't enough. Successful contract professionals excel in interviews by:</p>
      <ul>
        <li>Demonstrating problem-solving abilities</li>
        <li>Showcasing communication skills</li>
        <li>Providing specific examples of past successes</li>
        <li>Asking insightful questions about the project and team</li>
      </ul>

      <h2>Networking Strategies That Work</h2>
      <p>Building meaningful professional relationships is crucial for long-term success in the contract market.</p>

      <h2>Contract Negotiation Best Practices</h2>
      <p>Learn to negotiate contracts that reflect your true value while maintaining positive client relationships.</p>

      <h2>Continuous Skill Development</h2>
      <p>The IT landscape evolves rapidly. Stay ahead by continuously updating your skills and knowledge.</p>

      <h2>Conclusion: Your Path to Contract Success</h2>
      <p>Standing out in the U.S. IT contract market requires a combination of technical excellence, strategic positioning, and continuous improvement. By implementing these strategies, you can build a rewarding and sustainable contract career.</p>
    `,
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
      role: 'Career Advisor',
      bio: 'Mike specializes in helping IT professionals navigate the U.S. contract market. With over a decade of experience, he has guided hundreds of professionals to successful contract placements.'
    },
    tags: ['IT Contracts', 'Career Development', 'US Market', 'Contract Negotiation']
  },
  'power-global-talent-sourcing-local-expertise-global-reach': {
    id: 3,
    title: 'The Power of Global Talent Sourcing: Local Expertise Meets Global Reach',
    excerpt: 'Learn about the strategic advantages of combining local recruitment expertise with global talent acquisition capabilities for faster, better hiring through RPO services.',
    content: `
      <h2>Introduction: The Global Talent Landscape</h2>
      <p>In today's interconnected world, the ability to source talent globally while maintaining local expertise has become a competitive advantage for organizations of all sizes.</p>

      <h2>The Hybrid Approach: Global Reach, Local Touch</h2>
      <p>Successful talent acquisition strategies now combine the breadth of global sourcing with the depth of local market understanding.</p>

      <h2>Benefits of Global Talent Sourcing</h2>
      <p>Access to diverse skill sets, cost optimization, and round-the-clock productivity are just some of the advantages.</p>

      <h2>Conclusion: Building Your Global Talent Strategy</h2>
      <p>Embrace the power of global talent sourcing to build stronger, more diverse teams that drive business success.</p>
    `,
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
      role: 'Global Talent Director',
      bio: 'Emily leads global talent acquisition strategies for multinational organizations, specializing in cross-border recruitment and cultural integration.'
    },
    tags: ['Global Talent', 'Local Expertise', 'Talent Sourcing', 'RPO']
  }
  // Add other posts with their respective slugs...
};

// Card components
const Card = ({ children, className = "", ...props }) => (
  <div 
    className={`rounded-lg sm:rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
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

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = blogPosts[slug];
  
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = async (platform = 'copy') => {
    const url = window.location.href;
    const title = post.title;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
        break;
    }
    setShowShareTooltip(false);
  };

  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Article Header */}
      <section className="relative bg-white border-b border-gray-200 pt-24 md:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          {/* <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{post.category}</span>
            </nav> */}

          <div className="max-w-4xl mx-auto">
            
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                {post.subCategory}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-b border-gray-200">
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-gray-500 text-sm">{post.author.role}</div>
                </div>
              </div>

              {/* Post Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 py-6">
              <Button
                onClick={() => setIsLiked(!isLiked)}
                variant="outline"
                className={`flex items-center gap-2 ${isLiked ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </Button>

              <Button
                onClick={() => setIsSaved(!isSaved)}
                variant="outline"
                className={`flex items-center gap-2 ${isSaved ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}`}
              >
                {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setShowShareTooltip(!showShareTooltip)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>

                {showShareTooltip && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                    <div className="space-y-1">
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        Share on LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Twitter className="h-4 w-4 text-blue-400" />
                        Share on Twitter
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Share on Facebook
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        {copySuccess ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-600" />
                        )}
                        {copySuccess || 'Copy Link'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 bg-blue-600 rounded-xl mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm font-semibold">Featured Image</div>
              </div>
            </div>

            {/* Article Body */}
            <article 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">About the Author</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="font-semibold text-gray-900">{post.author.name}</div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="text-blue-600 text-sm">{post.author.role}</div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {/* {relatedPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover-lift">
                    <CardContent className="p-0 overflow-hidden">
                      <div className="h-40 bg-blue-600 relative">
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                            {relatedPost.subCategory}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          <Link href={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{relatedPost.date.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              <Link href="/blog">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              
              <Link href="/contact#contact-form">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
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
      `}</style>
    </div>
  );
}