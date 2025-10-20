// ============================================================================
// File: Navbar.tsx — Modern, Accessible, Responsive (2025)
// Optimized to match Navbar.module.css
// ============================================================================

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

// ============================================================================
// TYPES
// ============================================================================
interface DropdownItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

// ============================================================================
// CONSTANTS
// ============================================================================
const MOBILE_BREAKPOINT = 992;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Our Products", path: "/shop" },
  {
    label: "Pharmacy",
    path: "/pharmacy",
    hasDropdown: true,
    dropdownItems: [
      { label: "Prescription Medicine", path: "/pharmacy/care" },
      { label: "Over-the-Counter (OTC)", path: "/pharmacy/otc" },
      { label: "Supplements & Vitamins", path: "/pharmacy/vitamins" },
      { label: "Medical Equipment", path: "/pharmacy/equipment" },
    ],
  },
  {
    label: "Shop By Condition",
    path: "/condition",
    hasDropdown: true,
    dropdownItems: [
      { label: "Diabetes Care", path: "/condition/diabetes" },
      { label: "Hypertension Care", path: "/condition/cvs" },
      { label: "Women's Health", path: "/condition/women" },
      { label: "Men's Health", path: "/condition/men" },
    ],
  },
  {
    label: "Other Services",
    path: "/services",
    hasDropdown: true,
    dropdownItems: [
      { label: "Radiology Services", path: "/services/radiology" },
      { label: "Laboratory Services", path: "/services/lab" },
      { label: "VCT Services", path: "/services/vct" },
      { label: "MCH Clinic", path: "/services/mch" },
    ],
  },
  {
    label: "Prescription Assistance",
    path: "/prescription",
    hasDropdown: true,
    dropdownItems: [
      { label: "Upload Prescription", path: "/prescription/upload" },
      { label: "Request Refill", path: "/prescription/refill" },
      { label: "Talk to a Pharmacist", path: "/prescription/talk" },
    ],
  },
  {
    label: "About Us",
    path: "/about",
    hasDropdown: true,
    dropdownItems: [
      { label: "Our Story", path: "/about/story" },
      { label: "Our Team", path: "/about/team" },
      { label: "Careers", path: "/about/careers" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
] as const;

// ============================================================================
// CUSTOM HOOKS
// ============================================================================
const useMediaQuery = (breakpoint: number): boolean => {
  const [matches, setMatches] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return matches;
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, enabled]);
};


// ============================================================================
// NAVBAR COMPONENT
// ============================================================================
const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    }, [location.pathname]);

  // Prevent background scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside (desktop only)
  useClickOutside(
    navRef,
    () => {
      if (!isMobile) setActiveDropdown(null);
    },
    !isMobile
  );

  // ESC key closes menus
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
       }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  }, []);

  const handleMouseEnter = useCallback(
    (label: string) => {
      if (!isMobile) {
         setActiveDropdown(label);
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  }, [isMobile]);

  const closeAllMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  // Dropdown rendering
  const renderDropdown = (item: NavItem) => {
    const isOpen = activeDropdown === item.label;
    return (
      <div
        key={item.label}
        className={styles.dropdownWrapper}
        onMouseEnter={() => handleMouseEnter(item.label)}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`${styles.navLink} ${
            isOpen ? styles.activeLink : ""
          }`}
          onClick={() => isMobile && toggleDropdown(item.label)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`${styles.dropdownIcon} ${
              isOpen ? styles.iconOpen : ""
            }`}
            size={16}
            aria-hidden="true"
          />
        </button>

        {isOpen && item.dropdownItems && (
          <ul className={styles.dropdownMenu} role="menu">
            {item.dropdownItems.map((sub) => (
              <li key={sub.path} role="none">
                <NavLink
                  to={sub.path}
                  onClick={closeAllMenus}
                  role="menuitem"
                  className={({ isActive }) =>
                    `${styles.dropdownLink} ${
                      isActive ? styles.activeLink : ""
                    }`
                  }
                >
                  {sub.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Nav links rendering
  const renderNavLinks = useMemo(
    () => (
      <ul className={styles.navList} role="menubar">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className={styles.navItem} role="none">
            {item.hasDropdown ? (
              renderDropdown(item)
            ) : (
              <NavLink
                to={item.path}
                onClick={closeAllMenus}
                role="menuitem"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    ),
    [activeDropdown, isMobile]
  );

  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to main content
      </a>

      <nav ref={navRef} className={styles.navbarContainer} aria-label="Main navigation">
        <div className={styles.navInner}>
          {/* Mobile Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            type="button"
            style={{
              backgroundColor: isMobileMenuOpen
                ? "rgba(0,128,128,0.15)"
                : "rgba(0,128,128,0.08)",
              color: "#045c63",
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Overlay */}
          {isMobile && isMobileMenuOpen && (
            <div className={styles.overlay} onClick={closeAllMenus} />
          )}

          {/* Mobile Drawer / Desktop Nav */}
          <div
            className={`${styles.mobileMenuWrapper}`}
            style={{
              transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {renderNavLinks}
          </div>

          {/* Desktop Menu */}
          {!isMobile && renderNavLinks}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
