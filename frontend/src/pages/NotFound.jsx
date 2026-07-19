import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, MapPin } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[160px] font-black gradient-text leading-none select-none" aria-hidden="true">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-32 h-32 rounded-full bg-brand-500/10 blur-2xl" />
            </div>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-hairline flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-ink-muted/70" aria-hidden="true" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-ink mb-3">Page Not Found</h1>
          <p className="text-ink-muted mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" aria-hidden="true" />Return Home
            </Link>
            <Link to="/track" className="btn-secondary">
              <Search className="w-4 h-4" aria-hidden="true" />Track Transfer
            </Link>
          </div>

          <button onClick={() => window.history.back()}
            className="flex items-center gap-2 text-ink-muted hover:text-ink-muted text-sm mx-auto mt-6 transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />Go back
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
