import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        {/* Účetnictví pro e-shopy */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="font-playfair text-3xl md:text-4xl mb-4 text-[#6D1B3B]">
                Účetnictví pro e-commerce
              </h1>
              <p className="text-gray-700 mb-4">
                Eva má více než 5 let praxe s účtováním e-shopů a IT služeb.
                Postará se o kompletní vedení účetnictví včetně specifik online
                podnikání.
              </p>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>napojení na WooCommerce/Shoptet a jiné systémy</li>
                <li>automatizovaná fakturace a evidence skladů</li>
                <li>kontrola platebních bran a párování plateb</li>
                <li>evidování zahraničních plnění a DPH OSS</li>
                <li>přehledné reporty a ukazatele pro vaše podnikání</li>
              </ul>
              <a
                href="/#contact"
                className="inline-block mt-6 bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
              >
                Chci účetnictví na míru
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center md:justify-end"
            >
              <img
                src="/ecommerce.jpg"
                alt="Účetnictví pro e-shopy"
                className="w-full h-80 object-cover rounded shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Vytvoříme vám e-shop */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="order-2 md:order-1"
            >
              <h2 className="font-playfair text-2xl md:text-3xl mb-4 text-[#6D1B3B]">
                Vytvoříme vám e-shop
              </h2>
              <p className="text-gray-700 mb-4">
                Pomůžeme vám nejen s účetnictvím, ale i se startem vašeho
                podnikání v online prostředí. Zajistíme doménu, hosting a
                vytvoříme e-shop na krabicovém řešení vhodném pro začátečníky.
              </p>
              <p className="text-gray-700 mb-4">
                Pokud potřebujete jen jednoduchou prezentační stránku nebo
                poradit s výběrem platformy, vše s vámi projdeme.
              </p>
              <a
                href="/#contact"
                className="inline-block mt-6 bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
              >
                To chci
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="order-1 md:order-2 flex justify-center md:justify-end"
            >
              <img
                src="/eshop.jpg"
                alt="Tvorba e-shopu"
                className="w-full h-80 object-cover rounded shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* NOVÁ sekce: E-commerce služby */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-playfair text-2xl md:text-3xl mb-6 text-[#6D1B3B] text-center">
            E-commerce služby pro váš e-shop
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-10">
            Zkušenosti s provozem a správou e-shopů od roku 2019, v e-commerce
            6+ let. Pomůžeme vám se startem i růstem — od obsahu a nastavení,
            přes analytiku a SEO až po sociální sítě. WooCommerce, Shoptet i
            další platformy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Správa obsahu */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Správa a plnění obsahu
              </h3>
              <p className="text-gray-700">
                Produktové popisy, blog, landing pages, kontrola povinných
                dokumentů, doporučení klíčových slov. Obsah pro lidi i
                vyhledávače.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>

            {/* Funkční nastavení */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Funkční nastavení e-shopu
              </h3>
              <p className="text-gray-700">
                Dopravy, platby, měření konverzí, chatboti, integrace nástrojů.
                Hladký provoz bez slepých míst.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>

            {/* Analytika */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Analytika a reporting
              </h3>
              <p className="text-gray-700">
                Google Analytics / Matomo, čistá data a přehledné reporty.
                Rozhodujte se podle čísel.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>

            {/* SEO */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                SEO a linkbuilding
              </h3>
              <p className="text-gray-700">
                Klíčová slova, meta tagy, interní prolinkování, obsahová
                strategie — lepší viditelnost ve vyhledávání.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>

            {/* Sociální sítě */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">📣</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Sociální sítě
              </h3>
              <p className="text-gray-700">
                Založení profilů, plánování obsahu, grafika a správa komunity.
                Pomůžeme oslovit a udržet zákazníky.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>

            {/* Volná dlaždice pro budoucí rozšíření / nebo nech prázdné místo na md */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-3">🧩</div>
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Konzultace a audit
              </h3>
              <p className="text-gray-700">
                Rychlé konzultace k nastavení, UX doporučení, audit měření a
                základní roadmapa zlepšení.
              </p>
              <p className="text-gray-600 mt-3 italic">od 600 Kč / hod.</p>
            </div>
          </div>

          {/* Další služby na vyžádání */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm mt-8">
            <h3 className="font-playfair text-xl mb-3 text-[#6D1B3B]">
              Další služby na vyžádání
            </h3>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>nastavení DNS záznamů domény</li>
              <li>školení práce v administraci e-shopových platforem</li>
              <li>překlady systémových a vlastních textů do angličtiny</li>
            </ul>
          </div>

          {/* CTA pod službami */}
          <div className="text-center mt-10">
            <a
              href="/#contact"
              className="inline-block bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
            >
              Chci pomoct s e-shopem
            </a>
          </div>
        </section>

        {/* CTA pruh dole */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div>
              <h2 className="font-playfair text-2xl text-[#6D1B3B] mb-2">
                Potřebujete řešit účetnictví e-shopu?
              </h2>
              <p className="text-gray-700">
                Krátká nezávazná konzultace zdarma – ozvu se vám co nejdřív.
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
