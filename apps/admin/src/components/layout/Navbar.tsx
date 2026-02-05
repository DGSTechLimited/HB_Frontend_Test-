import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  path: string;
};

type NavbarProps = {
  items?: NavItem[];
};

const defaultItems: NavItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Search Parts", path: "/search-parts" },
  { label: "Exclusive Parts", path: "/exclusive-parts" },
  { label: "News & Offers", path: "/news-offers" },
  { label: "Resources", path: "/resources" },
];

const Navbar = ({ items = defaultItems }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap items-center gap-6">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            type="button"
            className={`group relative inline-flex items-center justify-center rounded-[16px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition duration-200 ${
              isActive
                ? "text-white"
                : "text-white/70 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-navy-900)]`}
            aria-current={isActive ? "page" : undefined}
          >
            <motion.span
              layoutId="dashboard-nav-pill"
              className={`absolute inset-0 rounded-[16px] border transition duration-200 ${
                isActive
                  ? "border-[rgba(47,107,255,0.4)] bg-[rgba(47,107,255,0.16)] shadow-[0_8px_22px_-16px_rgba(47,107,255,0.6)]"
                  : "border-transparent bg-transparent group-hover:border-[rgba(47,107,255,0.25)] group-hover:bg-[rgba(47,107,255,0.1)] group-hover:shadow-[0_8px_22px_-16px_rgba(47,107,255,0.45)]"
              }`}
              aria-hidden="true"
            />
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export { Navbar };
