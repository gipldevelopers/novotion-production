// import * as React from "react";

// const buttonVariants = ({ variant = "default", size = "default", className = "" }) => {
//   const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     destructive: "bg-red-600 text-white hover:bg-red-700",
//     outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
//     secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
//     ghost: "hover:bg-gray-100 hover:text-gray-900",
//     link: "text-blue-600 underline-offset-4 hover:underline",
//   };
  
//   const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 rounded-md px-3",
//     lg: "h-11 rounded-md px-8",
//     icon: "h-10 w-10",
//   };
  
//   return `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
// };

// const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
//   return (
//     <button 
//       className={buttonVariants({ variant, size, className })} 
//       ref={ref} 
//       {...props} 
//     />
//   );
// });
// Button.displayName = "Button";

// export { Button, buttonVariants };

// // src/components/ui/button.js
// import Link from 'next/link';

// export const Button = ({ 
//   children, 
//   variant = 'primary', 
//   size = 'md', 
//   className = '', 
//   href,
//   onClick,
//   ...props 
// }) => {
//   const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 hover-lift';
  
//   const variants = {
//     primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800',
//     secondary: 'bg-white text-blue-600 border-2 border-blue-600 shadow-md hover:bg-blue-600 hover:text-white',
//     outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600',
//     ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//   };
  
//   const sizes = {
//     sm: 'px-4 py-2 text-sm',
//     md: 'px-6 py-3 text-base',
//     lg: 'px-8 py-4 text-lg'
//   };
  
//   const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
//   if (href) {
//     return (
//       <Link href={href} className={buttonClass} {...props}>
//         {children}
//       </Link>
//     );
//   }
  
//   return (
//     <button className={buttonClass} onClick={onClick} {...props}>
//       {children}
//     </button>
//   );
// };

// src/components/ui/button.js
import Link from 'next/link';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href,
  onClick,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 hover-lift';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 shadow-md hover:bg-blue-600 hover:text-white',
    outline: 'bg-white text-gray-700 border-2 border-gray-300 shadow-md hover:border-blue-600 hover:text-blue-600', // CHANGED THIS LINE
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};