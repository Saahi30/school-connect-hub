import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { AskKnctEDModal } from "@/components/landing/AskKnctEDModal";

type MarketingNavItem = {
  name: string;
  href: string;
  isRoute?: boolean;
};

export const marketingNavItems: MarketingNavItem[] = [
  { name: "Features", href: "/#features" },
  { name: "Schools", href: "/for-schools", isRoute: true },
  { name: "Integrations", href: "/integrations", isRoute: true },
  { name: "Blog", href: "/blog", isRoute: true },
  { name: "About", href: "/about", isRoute: true },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 shadow-sm">
      <GraduationCap className="h-4 w-4 text-white" strokeWidth={2.5} />
    </div>
    <span className="text-lg font-bold tracking-tight">
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
        knct
      </span>
      <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        ED
      </span>
    </span>
  </div>
);

interface MarketingNavProps {
  variant?: "light" | "dark"; // dark = on white bg, light = on gradient hero
}

export const MarketingNav: React.FC<MarketingNavProps> = ({ variant = "dark" }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLight = variant === "light";

  const handleClick = (item: MarketingNavItem) => {
    setMenuOpen(false);
    if (item.isRoute) {
      navigate(item.href);
    } else if (item.href.startsWith("/#")) {
      const hash = item.href.slice(1);
      if (location.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(item.href);
      }
    }
  };

  const defaultSelected = React.useMemo(() => {
    const idx = marketingNavItems.findIndex(
      (item) => item.isRoute && location.pathname.startsWith(item.href)
    );
    return idx >= 0 ? idx : 0;
  }, [location.pathname]);

  const slideTabItems = marketingNavItems.map((item) => ({
    label: item.name,
    onClick: () => handleClick(item),
  }));

  return (
    <>
      <header
        className={cn(
          "relative z-30 w-full",
          isLight ? "bg-transparent" : "bg-white border-b border-slate-200"
        )}
      >
        <div className="m-auto max-w-6xl px-6">
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            <Link to="/" aria-label="KnctED home" className="flex items-center">
              <Logo />
            </Link>

            {/* Center: SlideTabs */}
            <SlideTabs
              key={defaultSelected}
              items={slideTabItems}
              defaultSelected={defaultSelected}
              className="absolute left-1/2 -translate-x-1/2 hidden lg:flex"
            />

            {/* Right: compact CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChatOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full h-7 px-3 text-xs font-medium transition border",
                  isLight
                    ? "bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-sm"
                    : "bg-slate-900 hover:bg-slate-800 text-white border-slate-900"
                )}
              >
                <MessageCircle className="h-3 w-3" />
                <span>Ask KnctED</span>
              </button>
              <Link
                to="/book-demo"
                className={cn(
                  "inline-flex items-center rounded-full h-7 px-3 text-xs font-medium transition shadow-md",
                  isLight
                    ? "bg-white text-indigo-600 hover:bg-white/95 hover:text-indigo-700 shadow-indigo-900/20"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/20"
                )}
              >
                Book a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md",
                isLight ? "text-white" : "text-slate-700"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className={cn(
              "lg:hidden pb-4 space-y-2",
              isLight ? "text-white" : "text-slate-700"
            )}>
              {marketingNavItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleClick(item)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium",
                    isLight ? "hover:bg-white/10" : "hover:bg-slate-100"
                  )}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); setChatOpen(true); }}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-1 rounded-full h-8 px-3 text-xs font-medium transition border",
                    isLight
                      ? "bg-white/15 text-white border-white/30"
                      : "bg-slate-100 text-slate-900 border-slate-200"
                  )}
                >
                  <MessageCircle className="h-3 w-3" /> Ask KnctED
                </button>
                <Link
                  to="/book-demo"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 inline-flex items-center justify-center rounded-full h-8 px-3 text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <AskKnctEDModal open={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};
