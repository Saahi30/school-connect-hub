import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const MarketingFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="m-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
                <img src="/dashboard-logo.png" alt="Logo" className="h-5 w-5 object-contain" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                knctED
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
              One platform for your entire school — admissions to alumni.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/#features" className="hover:text-slate-900">Features</Link></li>
              <li><Link to="/for-schools" className="hover:text-slate-900">Schools</Link></li>
              <li><Link to="/integrations" className="hover:text-slate-900">Integrations</Link></li>
              <li><Link to="/book-demo" className="hover:text-slate-900">Book a Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/blog" className="hover:text-slate-900">Blog</Link></li>
              <li><Link to="/about" className="hover:text-slate-900">About</Link></li>
              <li><Link to="/login" className="hover:text-slate-900">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="mailto:info@knctED.app" className="hover:text-slate-900">info@knctED.app</a></li>
              <li className="text-slate-500">Made for schools, by schools</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KnctED. All rights reserved.</p>
          <p>Built with care for educators.</p>
        </div>
      </div>
    </footer>
  );
};
