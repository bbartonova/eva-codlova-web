import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const menuLinkClass =
    "relative uppercase tracking-wide after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left";

  return (
    <div className="font-roboto">
      {/* Menu */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#6D1B3B]/90 backdrop-blur shadow' : 'bg-[#6D1B3B]'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative border-b border-white/20">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-white font-medium text-base">
              Bc. Eva Codlová
            </span>
          </div>
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li>
              <a
                href="#home"
                onClick={(e) => handleMenuClick(e, '#home')}
                className={menuLinkClass}
              >
                ÚVOD
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleMenuClick(e, '#services')}
                className={menuLinkClass}
              >
                SLUŽBY
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleMenuClick(e, '#about')}
                className={menuLinkClass}
              >
                O MNĚ
              </a>
            </li>
            <li>
              <a href="/cenik" className={menuLinkClass}>
                CENÍK
              </a>
            </li>
            <li>
              <a href="/ecommerce" className={menuLinkClass}>
                E-COMMERCE
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleMenuClick(e, '#contact')}
                className={menuLinkClass}
              >
                KONTAKT
              </a>
            </li>
          </ul>
          <button
            className="md:hidden text-white text-3xl z-50 mr-8"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute top-full right-0 w-[85vw] bg-[#6D1B3B] text-white px-6 pb-4 space-y-2 z-40 rounded shadow-lg uppercase tracking-wide">
              <a href="#home" onClick={(e) => handleMenuClick(e, '#home')}>
                ÚVOD
              </a>
              <br />
              <a
                href="#services"
                onClick={(e) => handleMenuClick(e, '#services')}
              >
                SLUŽBY
              </a>
              <br />
              <a href="#about" onClick={(e) => handleMenuClick(e, '#about')}>
                O MNĚ
              </a>
              <br />
              <a href="/cenik" onClick={() => setMenuOpen(false)}>
                CENÍK
              </a>
              <br />
              <a href="/ecommerce" onClick={() => setMenuOpen(false)}>
                E-COMMERCE
              </a>
              <br />
              <a
                href="#contact"
                onClick={(e) => handleMenuClick(e, '#contact')}
              >
                KONTAKT
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero sekce */}
      <section id="home" className="bg-[#F5F5F5] pt-[88px]">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-playfair text-4xl mb-4 text-[#6D1B3B]">
              Vaše spolehlivá účetní partnerka
            </h1>
            <p className="mb-6 text-gray-700">
              Přehledné účetnictví, bez starostí, s lidským přístupem.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleMenuClick(e, '#contact')}
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              Domluvte si konzultaci
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-80">
              <img
                src="/eva.jpg"
                alt="Eva Codlová"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ostatní sekce beze změny */}
    </div>
  );
}
