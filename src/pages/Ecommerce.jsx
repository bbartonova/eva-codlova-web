import React, { useEffect, useState } from 'react';

export default function Ecommerce() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuLinkClass =
    "relative uppercase tracking-wide after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left";

  return (
    <div className="font-roboto overflow-x-hidden">
      {/* Sticky menu */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#6D1B3B]/90 backdrop-blur shadow' : 'bg-[#6D1B3B]'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center relative border-b border-white/20">
          <a
            href="/?to=home"
            aria-label="Úvod"
            className="flex items-center space-x-3"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-white font-medium text-base">
              Bc. Eva Codlová
            </span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li>
              <a href="/#home" className={menuLinkClass}>
                ÚVOD
              </a>
            </li>
            <li>
              <a href="/#services" className={menuLinkClass}>
                SLUŽBY
              </a>
            </li>
            <li>
              <a href="/#about" className={menuLinkClass}>
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
              <a href="/doucovani" className={menuLinkClass}>
                DOUČOVÁNÍ ÚČETNICTVÍ
              </a>
            </li>
            <li>
              <a href="/#contact" className={menuLinkClass}>
                KONTAKT
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden text-white text-3xl z-50 mr-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="absolute top-full left-4 right-4 bg-[#6D1B3B] text-white px-6 py-4 space-y-4 z-40 rounded shadow-lg uppercase tracking-wide">
              <a
                href="/#home"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                ÚVOD
              </a>
              <a
                href="/#services"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                SLUŽBY
              </a>
              <a
                href="/#about"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                O MNĚ
              </a>
              <a
                href="/cenik"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                CENÍK
              </a>
              <a
                href="/ecommerce"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                E-COMMERCE
              </a>
              <a
                href="/doucovani"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                DOUČOVÁNÍ ÚČETNICTVÍ
              </a>
              <a
                href="/#contact"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                KONTAKT
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Obsah stránky */}
      <main className="pt-24 bg-[#F5F5F5] min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-playfair text-3xl mb-6 text-[#6D1B3B]">
            Účetnictví pro e-commerce
          </h1>
          <p className="text-gray-700 mb-10">Obsah doplníme…</p>

          {/* CTA pruh */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div>
              <h2 className="font-playfair text-2xl text-[#6D1B3B] mb-2">
                Potřebujete řešit účetnictví e-shopu?
              </h2>
              <p className="text-gray-700">
                Krátká nezávazná konzultace zdarma – ozvu se Vám co nejdřív.
              </p>
            </div>
            <a
              href="/#contact"
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition shrink-0"
            >
              Domluvte si konzultaci zdarma
            </a>
          </div>
        </section>
      </main>

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
