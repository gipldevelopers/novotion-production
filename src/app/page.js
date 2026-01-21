// // src/app/page.js
// "use client";
// import { useEffect, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import HeroSection from "@/components/home/HeroSection";
// import ServicesSection from "@/components/home/ServicesSection";
// import WhyChooseUs from "@/components/home/WhyChooseUs";
// import { ArrowRight, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import StatsSection from "@/components/home/StatsSection";
// import TrustedBySection from "@/components/home/TrustedBySection";
// import TestimonialsSection from "@/components/home/TestimonialsSection";

// const Home = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in-up");
//             entry.target.classList.remove("opacity-0", "translate-y-8");
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "50px",
//       }
//     );

//     const animatedElements = document.querySelectorAll(".observe");
//     animatedElements.forEach((el) => {
//       el.classList.add(
//         "opacity-0",
//         "translate-y-8",
//         "transition-all",
//         "duration-700"
//       );
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 overflow-hidden">
//       <Header />

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Who We Are Section */}
//       <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-white relative overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
//         <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>

//         <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
//           <div className="max-w-6xl mx-auto">
//             {/* Section Header */}
//             <div className="text-center mb-12 md:mb-16">
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
//                 Who We Are
//               </div>
//               <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//                 More Than Recruitment.
//                 <span className="block text-primary">
//                   We're Your Growth Partner.
//                 </span>
//               </h2>
//               <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
//                 Transforming talent acquisition through strategic partnerships
//                 and personalized solutions
//               </p>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
//               {/* Left Content */}
//               <div className="space-y-4 md:space-y-6 observe text-center lg:text-left">
//                 <div className="space-y-4">
//                   <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                     At Novotion, we don't just fill positions, we deliver
//                     comprehensive recruitment process outsourcing that
//                     transforms how you hire. Whether you're a growing company
//                     searching for strategic talent acquisition solutions or a
//                     skilled IT professional ready for your next contract
//                     opportunity, we're here to make it happen.
//                   </p>
//                 </div>

//                 {/* Key Points */}
//                 <div className="grid gap-3 md:gap-4 pt-4">
//                   {[
//                     "Strategic talent acquisition solutions",
//                     "Global recruitment expertise",
//                     "Personalized career support",
//                     "Round-the-clock support",
//                   ].map((point, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
//                       <span className="text-gray-700 font-medium text-sm md:text-base">
//                         {point}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Content */}
//               <div
//                 className="space-y-4 md:space-y-6 observe"
//                 style={{ animationDelay: "200ms" }}
//               >
//                 <div className="space-y-3 md:space-y-4 text-gray-600">
//                   <p className="text-base md:text-lg leading-relaxed text-center lg:text-left">
//                     With offices in India and the USA, our global recruitment
//                     solutions combine deep local market expertise with
//                     round-the-clock support. Since 2021, we've been reshaping
//                     how organizations approach workforce management and how
//                     professionals advance their careers.
//                   </p>

//                   {/* Highlight Box */}
//                   <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary/30 bg-primary/10 shadow-sm">
//                     <p className="text-base md:text-lg font-semibold text-gray-900 text-center leading-relaxed">
//                       What makes our RPO services different? We genuinely care.
//                       Every hire matters. Every career counts. Every recruitment
//                       process is personal.
//                     </p>
//                   </div>

//                   {/* Stats Mini */}
//                   <div className="grid grid-cols-3 gap-4 pt-4">
//                     {[
//                       { number: "500+", label: "Clients" },
//                       { number: "7K+", label: "Placements" },
//                       { number: "2", label: "Countries" },
//                     ].map((stat, index) => (
//                       <div key={index} className="text-center">
//                         <div className="text-xl md:text-2xl font-bold text-primary">
//                           {stat.number}
//                         </div>
//                         <div className="text-xs md:text-sm text-gray-600">
//                           {stat.label}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trusted By Section */}
//       <TrustedBySection />

//       {/* Services Section */}
//       <ServicesSection />

//       {/* Why Choose Us Section */}
//       <WhyChooseUs />

//       {/* Stats Section */}
//       <StatsSection />

//       {/* Testimonials Section */}
//       <TestimonialsSection />

//       <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-primary text-white relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
//           <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-delayed"></div>
//         </div>

//         <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-16 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
//               Ready to Make Your
//               <span className="block text-secondary mt-1 md:mt-2">
//                 Next Move?
//               </span>
//             </h2>

//             <p className="text-base md:text-lg mb-6 md:mb-8 text-white/80 leading-relaxed px-4">
//               Whether you're looking to transform your recruitment process
//               outsourcing strategy or accelerate your IT career with proven
//               career support services, Novotion is here to help you succeed.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8 px-4">
//                <Link href="/contact/#contact-form" className="w-full sm:w-auto">
//                 <Button
//                   size="lg"
//                   className="group bg-white text-foreground hover:bg-gray-100 px-4 md:px-6 py-3 text-sm md:text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//                 >
//                   Schedule a Consultation
//                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>

//               <Link
//                 href="/contact#contact-form"
//                 className="w-full sm:w-auto"
//               >
//                 <Button
//                   size="lg"
//                   className="group border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary px-4 md:px-6 py-3 text-sm md:text-base font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 shadow-md w-full sm:w-auto"
//                 >
//                   Get Started Today
//                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-white/80 px-4">
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
//                 <span className="text-xs md:text-sm font-medium">
//                   No hidden fees
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
//                 <span className="text-xs md:text-sm font-medium">
//                   24/7 Global Support
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
//                 <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
//                 <span className="text-xs md:text-sm font-medium">
//                   Proven Results
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />

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
//     </div>
//   );
// };

// export default Home;


"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatsSection from "@/components/home/StatsSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PaidServicesSection from "@/components/home/PaidServicesSection"; // Add this import

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const animatedElements = document.querySelectorAll(".observe");
    animatedElements.forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-8",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Who We Are Section */}
      <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                Who We Are
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                More Than Recruitment.
                <span className="block text-primary">
                  We're Your Growth Partner.
                </span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                Transforming talent acquisition through strategic partnerships
                and personalized solutions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-4 md:space-y-6 observe text-center lg:text-left">
                <div className="space-y-4">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    At Novotion, we don't just fill positions, we deliver
                    comprehensive recruitment process outsourcing that
                    transforms how you hire. Whether you're a growing company
                    searching for strategic talent acquisition solutions or a
                    skilled IT professional ready for your next contract
                    opportunity, we're here to make it happen.
                  </p>
                </div>

                {/* Key Points */}
                <div className="grid gap-3 md:gap-4 pt-4">
                  {[
                    "Strategic talent acquisition solutions",
                    "Global recruitment expertise",
                    "Personalized career support",
                    "Round-the-clock support",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium text-sm md:text-base">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content */}
              <div
                className="space-y-4 md:space-y-6 observe"
                style={{ animationDelay: "200ms" }}
              >
                <div className="space-y-3 md:space-y-4 text-gray-600">
                  <p className="text-base md:text-lg leading-relaxed text-center lg:text-left">
                    With offices in India and the USA, our global recruitment
                    solutions combine deep local market expertise with
                    round-the-clock support. Since 2021, we've been reshaping
                    how organizations approach workforce management and how
                    professionals advance their careers.
                  </p>

                  {/* Highlight Box */}
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary/30 bg-primary/10 shadow-sm">
                    <p className="text-base md:text-lg font-semibold text-gray-900 text-center leading-relaxed">
                      What makes our RPO services different? We genuinely care.
                      Every hire matters. Every career counts. Every recruitment
                      process is personal.
                    </p>
                  </div>

                  {/* Stats Mini */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[
                      { number: "500+", label: "Clients" },
                      { number: "7K+", label: "Placements" },
                      { number: "2", label: "Countries" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-primary">
                          {stat.number}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Paid Services Section - NEW ADDITION */}
      <PaidServicesSection />

      <section className="py-12 md:py-20 lg:min-h-[80vh] flex items-center bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-8 md:py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
              Ready to Make Your
              <span className="block text-secondary mt-1 md:mt-2">
                Next Move?
              </span>
            </h2>

            <p className="text-base md:text-lg mb-6 md:mb-8 text-white/80 leading-relaxed px-4">
              Whether you're looking to transform your recruitment process
              outsourcing strategy or accelerate your IT career with proven
              career support services, Novotion is here to help you succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8 px-4">
               <Link href="/contact/#contact-form" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group bg-white text-foreground hover:bg-gray-100 px-4 md:px-6 py-3 text-sm md:text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link
                href="/services/career-packages"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="group border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary px-4 md:px-6 py-3 text-sm md:text-base font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 shadow-md w-full sm:w-auto"
                >
                  Explore Paid Services
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-white/80 px-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                <span className="text-xs md:text-sm font-medium">
                  No hidden fees
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                <span className="text-xs md:text-sm font-medium">
                  24/7 Global Support
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                <span className="text-xs md:text-sm font-medium">
                  Proven Results
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
    </div>
  );
};

export default Home;