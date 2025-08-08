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
              <a
                href="#cenik"
                onClick={(e) => handleMenuClick(e, '#cenik')}
                className={menuLinkClass}
              >
                CENÍK
              </a>
            </li>
            <li>
              <a
                href="#ecommerce"
                onClick={(e) => handleMenuClick(e, '#ecommerce')}
                className={menuLinkClass}
              >
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
            <div className="absolute top-full right-0 w-[85vw] bg-[#6D1B3B] text-white px-6 py-4 space-y-4 z-40 rounded shadow-lg uppercase tracking-wide">
              <a
                href="#home"
                onClick={(e) => handleMenuClick(e, '#home')}
                className="block"
              >
                ÚVOD
              </a>
              <a
                href="#services"
                onClick={(e) => handleMenuClick(e, '#services')}
                className="block"
              >
                SLUŽBY
              </a>
              <a
                href="#about"
                onClick={(e) => handleMenuClick(e, '#about')}
                className="block"
              >
                O MNĚ
              </a>
              <a
                href="#cenik"
                onClick={(e) => handleMenuClick(e, '#cenik')}
                className="block"
              >
                CENÍK
              </a>
              <a
                href="#ecommerce"
                onClick={(e) => handleMenuClick(e, '#ecommerce')}
                className="block"
              >
                E-COMMERCE
              </a>
              <a
                href="#contact"
                onClick={(e) => handleMenuClick(e, '#contact')}
                className="block"
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

      {/* Služby */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl mb-12 text-[#6D1B3B]">
            Služby
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Účetnictví', 'Daňová evidence', 'Mzdy'].map((service, i) => (
              <div
                key={i}
                className="border p-6 rounded shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-playfair text-xl mb-2">{service}</h3>
                <p className="text-gray-600">Popis služby – bude doplněn.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O mně */}
      <section id="about" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-playfair text-3xl mb-4 text-[#6D1B3B]">
              O mně
            </h2>
            <p className="text-gray-700 mb-4">
              Krátký text o Evě – vzdělání, zkušenosti, přístup k práci. Bude
              doplněn.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">[Foto / ilustrace]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-playfair text-3xl mb-8 text-[#6D1B3B] text-center">
            Kontakt
          </h2>
          <form className="max-w-2xl mx-auto grid gap-4">
            <input
              type="text"
              placeholder="Jméno"
              className="border p-3 rounded w-full"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="border p-3 rounded w-full"
            />
            <textarea
              placeholder="Zpráva"
              className="border p-3 rounded w-full h-32"
            />
            <button
              type="submit"
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              Odeslat
            </button>
          </form>
        </div>
      </section>

      {/* Patička */}
      <footer className="bg-[#6D1B3B] text-white py-4 text-center">
        Copyright © {new Date().getFullYear()} by{' '}
        <a
          href="https://www.linkedin.com/in/blanka-bartonova"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          BB arts
        </a>
        , Bc. Eva Codlová. All Rights Reserved
      </footer>
    </div>
  );
}
