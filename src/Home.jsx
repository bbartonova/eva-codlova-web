import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showToTop, setShowToTop] = useState(false);

  // Sticky menu + šipka nahoru
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowToTop(y > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoscroll podle hashe: /#services, /#about, /#contact, /#home
  // + zpětně kompatibilní: /#/?to=services|about|contact|home
  useEffect(() => {
    const scrollFromHash = () => {
      const { hash } = window.location; // "#services" nebo "#/?to=services"
      if (!hash) return;

      // nová forma: "#services"
      if (hash && !hash.includes('?')) {
        const section = hash.replace('#', '').trim();
        if (!section) return;
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
      }

      // stará forma: "#/?to=services"
      const qs = hash.includes('?') ? hash.split('?')[1] : '';
      if (!qs) return;
      const params = new URLSearchParams(qs);
      const to = params.get('to');
      if (!to) return;
      setTimeout(() => {
        const el = document.getElementById(to);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);
    return () => window.removeEventListener('hashchange', scrollFromHash);
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
    <div className="font-roboto overflow-x-hidden">
      {/* Menu */}
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
              <a
                href="/#home"
                onClick={(e) => handleMenuClick(e, '#home')}
                className={menuLinkClass}
              >
                ÚVOD
              </a>
            </li>
            <li>
              <a
                href="/#services"
                onClick={(e) => handleMenuClick(e, '#services')}
                className={menuLinkClass}
              >
                SLUŽBY
              </a>
            </li>
            <li>
              <a
                href="/#about"
                onClick={(e) => handleMenuClick(e, '#about')}
                className={menuLinkClass}
              >
                O MNĚ
              </a>
            </li>

            {/* samostatné stránky */}
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
              <a
                href="/#contact"
                onClick={(e) => handleMenuClick(e, '#contact')}
                className={menuLinkClass}
              >
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
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                ÚVOD
              </a>
              <a
                href="/#services"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                SLUŽBY
              </a>
              <a
                href="/#about"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                O MNĚ
              </a>
              <a
                href="/cenik"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                CENÍK
              </a>
              <a
                href="/ecommerce"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                E-COMMERCE
              </a>
              <a
                href="/doucovani"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                DOUČOVÁNÍ ÚČETNICTVÍ
              </a>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                KONTAKT
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero sekce */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-[#F5F5F5] pt-24 pb-16"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-playfair text-4xl mb-4 text-[#6D1B3B]">
              Vaše spolehlivá účetní partnerka
            </h1>
            <p className="mb-4 text-gray-700">
              Přehledné účetnictví, bez starostí, s lidským přístupem.
            </p>
            <p className="mb-6 text-gray-700">
              K dispozici online i osobně v Českých Budějovicích. Více než 5 let
              účetnictví v IT a e-commerce, přes 9 let praxe v oboru.
            </p>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              Domluvte si konzultaci zdarma
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex items-end justify-center md:justify-start gap-3 md:gap-4"
          >
            {/* LinkedIn vlevo od fotky (jen desktop) */}
            <a
              href="https://www.linkedin.com/in/eva-codlova"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#6D1B3B] shadow-lg ring-1 ring-black/10 hover:ring-white/50 hover:scale-105 transition transform duration-200"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.28 108 0 83.7 0 53.64A53.64 53.64 0 0 1 53.64 0C83.7 0 108 24.28 108 53.64c0 30.06-24.3 54.36-54.16 54.36zM447.9 448h-92.58V302.4c0-34.7-.7-79.2-48.26-79.2-48.3 0-55.7 37.7-55.7 76.6V448h-92.6V148.9h88.94v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </a>

            <img
              src="/eva.jpg"
              alt="Bc. Eva Codlová"
              className="w-full h-80 object-cover rounded shadow-lg"
            />
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
            {/* Účetnictví */}
            <div className="border p-6 rounded shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">📑</div>
              <h3 className="font-playfair text-xl mb-2">Účetnictví</h3>
              <p className="text-gray-600">
                Kompletní vedení účetnictví a srozumitelné měsíční reporty.
                <br />
                <a
                  href="#ucetnictvi-detail"
                  className="text-[#6D1B3B] underline hover:text-[#8a2b52]"
                >
                  Klikněte pro více informací níže.
                </a>
              </p>
            </div>

            {/* Mzdy */}
            <div className="border p-6 rounded shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-playfair text-xl mb-2">Mzdy</h3>
              <p className="text-gray-600">
                Mzdy a personalistika od 240 Kč měsíčně za jednoho zaměstnance…
                <br />
                <a
                  href="#mzdy-detail"
                  className="text-[#6D1B3B] underline hover:text-[#8a2b52]"
                >
                  Klikněte pro více informací níže.
                </a>
              </p>
            </div>

            {/* Tvorba e-shopu */}
            <div className="border p-6 rounded shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="font-playfair text-xl mb-2">Tvorba e-shopu</h3>
              <p className="text-gray-600">
                Mohu pomoci s vedením účetnictví a můj tým s tvorbou e-shopu.
                <br />
                <a
                  href="/ecommerce"
                  className="text-[#6D1B3B] underline hover:text-[#8a2b52]"
                >
                  Bližší popis služeb ZDE.
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Detailní informace o účetnictví */}
      <section
        id="ucetnictvi-detail"
        className="py-16 bg-white scroll-mt-24 md:scroll-mt-28 border-t border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-playfair text-2xl mb-6 text-[#6D1B3B] text-center">
            Účetnictví – co pro vás zajistíme
          </h3>

          <ul className="text-gray-700 list-disc list-inside space-y-2 text-left">
            <li>
              Kompletní vedení podvojného účetnictví (s.r.o., spolky, OSVČ s
              účetnictvím).
            </li>
            <li>
              Evidence a párování přijatých/vydaných faktur, bankovních výpisů a
              pokladny.
            </li>
            <li>
              DPH měsíčně/kvartálně včetně kontrolního a souhrnného hlášení.
            </li>
            <li>
              Měsíční a roční uzávěrky, inventarizace, účetní závěrka a podklady
              pro audit.
            </li>
            <li>
              Přehledné reporty (výsledovka, rozvaha, cash flow, marže) se
              srozumitelným komentářem.
            </li>
            <li>
              Zastupování a komunikace s FÚ/ČSSZ/ZP přes datovou schránku.
            </li>
            <li>
              E-commerce specializace: exporty z e-shopů, párování plateb
              (GoPay/Comgate aj.), práce se skladem.
            </li>
            <li>
              Automatický sběr dokladů (sdílené složky/e-mail), kontrola dokladů
              a připomínky termínů.
            </li>
          </ul>
          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              To chci
            </a>
          </div>
        </div>
      </section>

      {/* Detailní informace o mzdách */}
      <section
        id="mzdy-detail"
        className="py-16 bg-white scroll-mt-24 md:scroll-mt-28 border-t border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-playfair text-2xl mb-6 text-[#6D1B3B] text-center">
            Mzdy a personalistika
          </h3>
          <ul className="text-gray-700 list-disc list-inside space-y-2 text-left">
            <li>zasíláme elektronické výplatnice</li>
            <li>poskytujeme vzorové smlouvy</li>
            <li>mzdy zpracujeme do 2 dnů</li>
            <li>zpracujeme přihlášky a odhlášky zaměstnanců na úřadech</li>
            <li>
              vystavení mezd, odeslání přehledů pro SSZ a ZP, ELDP datovou
              schránkou
            </li>
            <li>
              zpracujeme i roční vyúčtování daně za zaměstnanců (pokud o to
              požádají)
            </li>
          </ul>
          <div className="mt-8 flex justify-center">
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/#contact';
                }
              }}
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              To chci
            </a>
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
              Vyrůstala jsem v Českém Krumlově, kde bylo vhodné prostředí pro
              podnikání, a už od dětství mě bavilo počítání i peníze.
            </p>

            <p className="text-gray-700 mb-4">
              Vystudovala jsem Obchodní akademii (Husova 1) a na VŠTE Podnikovou
              ekonomiku. Mám více než 9 let praxe v účetnictví, od malých firem
              až po středně velké společnosti, včetně projektů v oblasti
              e-commerce a IT.
            </p>

            <p className="text-gray-700 mb-6">
              Jsem k dispozici online, nebo se můžeme potkat v Českých
              Budějovicích.
            </p>

            <a
              href="/eva-codlova-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              Stáhnout CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/o-mne.jpg"
              alt="Pracovní stůl"
              className="w-full h-64 object-cover rounded shadow-lg"
            />
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

      {/* Šipka nahoru */}
      {showToTop && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Zpět nahoru"
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 bg-[#6D1B3B] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-[#8a2b52] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#6D1B3B] transition z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6 fill-current"
          >
            <path d="M12 5l7 7-1.41 1.41L13 9.83V20h-2V9.83l-4.59 4.58L5 12z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
