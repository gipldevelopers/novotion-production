// // src/components/home/TrustedBySection.js
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const TrustedBySection = () => {
//   const [mounted, setMounted] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const scrollContainerRef = useRef(null);
//   const itemRefs = useRef([]);

//   const companies = [
//     { name: 'Amazon', logo: '/logos/amazon.png' },
//     { name: 'Meta', logo: '/logos/meta.png' },
//     { name: 'Google', logo: '/logos/google.png' },
//     { name: 'Microsoft', logo: '/logos/microsoft.png' },
//     { name: 'IBM', logo: '/logos/ibm.png' },
//     { name: 'Oracle', logo: '/logos/oracle.png' },
//     { name: 'Honeywell', logo: '/logos/honeywell.png' },
//     { name: 'Intel', logo: '/logos/intel.png' },
//   ];

//   // Auto-scroll functionality
//   useEffect(() => {
//     setMounted(true);

//     const interval = setInterval(() => {
//       if (!isPaused) {
//         setActiveIndex((prev) => (prev + 1) % companies.length);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [isPaused, companies.length]);

//   // Improved scroll to active item with boundary protection
//   useEffect(() => {
//     if (scrollContainerRef.current && itemRefs.current[activeIndex]) {
//       const container = scrollContainerRef.current;
//       const activeItem = itemRefs.current[activeIndex];
      
//       const containerWidth = container.offsetWidth;
//       const itemWidth = activeItem.offsetWidth;
//       const itemLeft = activeItem.offsetLeft;
//       const itemRight = itemLeft + itemWidth;
      
//       // Calculate the ideal scroll position to center the active item
//       const targetScrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
//       // Ensure we don't scroll past the boundaries
//       const maxScroll = container.scrollWidth - containerWidth;
//       const boundedScrollPosition = Math.max(0, Math.min(targetScrollPosition, maxScroll));
      
//       container.scrollTo({
//         left: boundedScrollPosition,
//         behavior: 'smooth'
//       });
//     }
//   }, [activeIndex]);

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + companies.length) % companies.length);
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % companies.length);
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   const handleCompanyClick = (index) => {
//     setActiveIndex(index);
//     setIsPaused(true);
//     setTimeout(() => setIsPaused(false), 3000);
//   };

//   // Initialize refs array
//   useEffect(() => {
//     itemRefs.current = itemRefs.current.slice(0, companies.length);
//   }, [companies.length]);

//   if (!mounted) {
//     return (
//       <section className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-gray-50 relative overflow-hidden py-8 md:py-12">
//         <div className="container mx-auto px-4 text-center">
//           <div className="animate-pulse">
//             <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4 md:mb-6"></div>
//             <div className="h-8 md:h-12 bg-gray-300 rounded w-64 md:w-96 mx-auto mb-8 md:mb-12"></div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
//               {companies.map((_, index) => (
//                 <div key={index} className="h-12 md:h-16 bg-gray-300 rounded-xl"></div>
//               ))}
//             </div>
//             <div className="h-16 md:h-20 bg-gray-300 rounded-xl w-5/6 md:w-2/3 mx-auto"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-gray-50 relative overflow-hidden py-8 md:py-12">
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"></div>
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
//       <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
//         {/* Header */}
//         <div className="mb-6 md:mb-10">
//           <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full bg-gray-200 text-gray-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
//             Trusted By Industry Leaders
//           </div>
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
//             Partnering with
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-1 md:mt-2">
//               Global Innovators
//             </span>
//           </h2>
//           <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
//             Our professionals and candidates thrive at industry-leading companies worldwide.
//           </p>
//         </div>

//         {/* Auto-scrolling Carousel */}
//         <div className="relative max-w-4xl lg:max-w-6xl mx-auto mb-6 md:mb-8">
//           {/* Navigation Buttons */}
//           <button
//             onClick={handlePrev}
//             className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white"
//             aria-label="Previous company"
//           >
//             <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white"
//             aria-label="Next company"
//           >
//             <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
//           </button>

//           {/* Scroll Container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto scrollbar-hide py-4 md:py-8 px-2 md:px-4"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             <div className="flex gap-4 md:gap-8 mx-auto items-center">
//               {companies.map((company, index) => (
//                 <div
//                   key={index}
//                   ref={el => itemRefs.current[index] = el}
//                   className={`flex-shrink-0 transition-all duration-500 transform ${
//                     activeIndex === index
//                       ? 'scale-110 grayscale-0 z-10'
//                       : 'scale-100 grayscale hover:grayscale-0'
//                   }`}
//                 >
//                   <button
//                     onClick={() => handleCompanyClick(index)}
//                     className={`group relative flex flex-col items-center p-3 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-500 ${
//                       activeIndex === index
//                         ? 'bg-white border-blue-500 shadow-xl md:shadow-2xl shadow-blue-500/20'
//                         : 'bg-white/80 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300'
//                     }`}
//                   >
//                     {/* Company Logo */}
//                     <div className="relative w-20 h-10 md:w-32 md:h-16 mb-2 md:mb-4 transition-all duration-500">
//                       <Image
//                         src={company.logo}
//                         alt={company.name}
//                         fill
//                         className="object-contain transition-all duration-500"
//                         sizes="(max-width: 768px) 80px, 128px"
//                       />
//                     </div>

//                     {/* Company Name */}
//                     <span
//                       className={`font-semibold transition-all duration-500 text-xs md:text-sm ${
//                         activeIndex === index
//                           ? 'text-blue-600 md:text-lg'
//                           : 'text-gray-600 group-hover:text-gray-800'
//                       }`}
//                     >
//                       {company.name}
//                     </span>

//                     {/* Active Indicator */}
//                     {activeIndex === index && (
//                       <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2">
//                         <div className="w-2 h-2 md:w-4 md:h-4 bg-blue-500 rounded-full shadow-lg animate-pulse"></div>
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Progress Dots */}
//           <div className="flex justify-center gap-1 md:gap-2 mt-4 md:mt-6">
//             {companies.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleCompanyClick(index)}
//                 className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
//                   activeIndex === index
//                     ? 'bg-blue-500 scale-125'
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`Go to ${companies[index].name}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Additional Trust Indicator */}
//         <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
//           <p className="text-gray-700 font-semibold text-sm md:text-base">
//             And <span className="text-blue-600">490+ more organizations</span> across UK and USA markets trust our recruitment expertise
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mt-6 md:mt-8">
//           <div className="text-center">
//             <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">99%</div>
//             <div className="text-xs md:text-sm text-gray-600">Client Retention</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
//             <div className="text-xs md:text-sm text-gray-600">Satisfaction Rating</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg md:text-2xl font-bold text-gray-900 mb-1">5+ Years</div>
//             <div className="text-xs md:text-sm text-gray-600">Average Partnership</div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TrustedBySection;


// src/components/home/TrustedBySection.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrustedBySection = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const companies = [
    { name: 'Amazon', logo: '/logos/amazon.png' },
    { name: 'Meta', logo: '/logos/meta.png' },
    { name: 'Google', logo: '/logos/google.png' },
    { name: 'Microsoft', logo: '/logos/microsoft.png' },
    { name: 'IBM', logo: '/logos/ibm.png' },
    { name: 'Oracle', logo: '/logos/oracle.png' },
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'Intel', logo: '/logos/intel.png' },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % companies.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, companies.length]);

  // Smooth scroll to active item
  useEffect(() => {
    if (scrollContainerRef.current && itemRefs.current[activeIndex]) {
      const container = scrollContainerRef.current;
      const activeItem = itemRefs.current[activeIndex];

      const containerWidth = container.offsetWidth;
      const itemWidth = activeItem.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      const targetScroll = itemLeft - containerWidth / 2 + itemWidth / 2;
      
      const maxScroll = container.scrollWidth - containerWidth;
      const boundedScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      container.scrollTo({
        left: boundedScroll,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + companies.length) % companies.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % companies.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleCompanyClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, companies.length);
  }, [companies.length]);

  if (!mounted) {
    return (
      <section className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-6"></div>
          <div className="h-12 bg-gray-300 rounded w-72 mx-auto mb-10"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {companies.map((_, index) => (
              <div key={index} className="h-16 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[40vh] md:min-h-[60vh] flex items-center bg-white relative py-12 overflow-hidden">
      
      {/* Brand Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">

        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-6">
            Trusted By Industry Leaders
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partnering with
            <span className="block text-primary mt-1">
              Global Innovators
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Our professionals and candidates thrive at industry-leading companies worldwide.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto mb-8">

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:shadow-md transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:shadow-md transition-all"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex overflow-x-auto scrollbar-hide py-6 px-2"
          >
            <div className="flex gap-6 mx-auto">
              {companies.map((company, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    activeIndex === index ? 'scale-110 grayscale-0' : 'grayscale hover:grayscale-0'
                  }`}
                >
                  <button
                    onClick={() => handleCompanyClick(index)}
                    className={`relative flex flex-col items-center p-4 rounded-xl transition-all border-2 ${
                      activeIndex === index
                        ? 'bg-white border-primary shadow-lg'
                        : 'bg-white/80 border-gray-200 hover:border-primary/40 shadow-sm'
                    }`}
                  >
                    <div className="relative w-28 h-14 mb-3">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span
                      className={`font-semibold text-sm transition-all ${
                        activeIndex === index ? 'text-primary' : 'text-gray-600'
                      }`}
                    >
                      {company.name}
                    </span>

                    {activeIndex === index && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {companies.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? 'bg-primary scale-110' : 'bg-gray-300'
                }`}
                onClick={() => handleCompanyClick(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Additional Trust Info */}
        <div className="bg-white rounded-xl p-6 shadow border border-gray-200 max-w-2xl mx-auto">
          <p className="text-gray-700 font-semibold text-sm md:text-base">
            And <span className="text-primary">500+ organizations</span> across USA and UK trust our recruitment expertise.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-10">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">99%</div>
            <div className="text-gray-600 text-sm">Client Retention</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
            <div className="text-gray-600 text-sm">Satisfaction Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">5+ Years</div>
            <div className="text-gray-600 text-sm">Average Partnership</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
