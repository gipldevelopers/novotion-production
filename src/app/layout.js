// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/CartContext';
import { Toaster } from 'sonner';
import WhatsAppWidget from '@/components/WhatsAppWidget';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Novotion - Strategic Recruitment Solutions & IT Career Support',
  description: 'Empowering businesses across USA & UK markets with strategic recruitment solutions and IT career support services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <WhatsAppWidget />
          <Toaster position="top-right" richColors closeButton />
        </CartProvider>
      </body>
    </html>
  );
}