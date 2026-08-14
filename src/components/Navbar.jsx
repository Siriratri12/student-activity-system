import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListChecks, BookOpenText, Info, Menu, X } from "lucide-react";

import "./Navbar.css";
import logoImage from "../assets/logo.png";

const NavLinkItem = ({ to, icon: Icon, children, onClick }) => {
  const location = useLocation();

  const isActive =
    location.pathname === to ||
    (to === "/activities" && location.pathname === "/");

  return (
    <Link
      to={to}
      className={`menu-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon size={18} className="menu-icon" />
      <span>{children}</span>
    </Link>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* BRAND */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
          aria-label="หน้าหลักระบบกิจกรรม"
        >
          <img src={logoImage} alt="PSU Logo" className="navbar-logo" />

          <div className="brand-text-group">
            <span className="brand-title">ระบบกิจกรรมนักศึกษา</span>

            <span className="brand-subtitle">มหาวิทยาลัยสงขลานครินทร์</span>
          </div>
        </Link>

        {/* HAMBURGER */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="เปิดเมนู"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MENU */}
        <ul className={`navbar-menu ${menuOpen ? "navbar-menu--open" : ""}`}>
          <li>
            <NavLinkItem to="/activities" icon={ListChecks} onClick={closeMenu}>
              กิจกรรม
            </NavLinkItem>
          </li>

          <li>
            <NavLinkItem to="/manual" icon={BookOpenText} onClick={closeMenu}>
              คู่มือการใช้งาน
            </NavLinkItem>
          </li>

          <li>
            <NavLinkItem to="/contact" icon={Info} onClick={closeMenu}>
              ติดต่อเรา
            </NavLinkItem>
          </li>
        </ul>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <button
          type="button"
          className="navbar-mobile-overlay"
          onClick={closeMenu}
          aria-label="ปิดเมนู"
        />
      )}
    </nav>
  );
};

export default Navbar;
