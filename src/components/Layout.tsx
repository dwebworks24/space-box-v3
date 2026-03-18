import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import PageTransition from './PageTransition';
import ScrollToTop from './ScrollToTop';
import { useLenis } from '@/hooks/useLenis';

export default function Layout() {
  useLenis();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
