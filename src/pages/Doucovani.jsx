import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Doucovani() {
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
            aria-label="Menu"
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

      {/* Hero-like blok */}
      <main className="pt-24 bg-[#F5F5F5] min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="font-playfair text-3xl md:text-4xl mb-4 text-[#6D1B3B]">
                Doučování účetnictví – osobně i online
              </h1>
              <p className="text-gray-700 mb-4">
                Doučování osobně v&nbsp;Českých Budějovicích i online za{' '}
                <strong>300&nbsp;Kč / hod.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                Zaměřuji se na učivo <strong>obchodní akademie</strong> i{' '}
                <strong>vysokoškolské předměty</strong> – účetnictví a{' '}
                <strong>daňový systém</strong>. Vysvětlím srozumitelně,
                procvičíme příklady a připravím vás na testy i zkoušky.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="/#contact"
                  className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition"
                >
                  To chci
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center md:justify-end"
            >
              {/* Obrázek pro doučování – /public*/}
              <img
                src="/doucovani.jpg"
                alt="Doučování účetnictví – individuálně i online"
                className="w-full h-80 object-cover rounded shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Info bloky */}
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Co se naučíte
              </h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>podvojné účetnictví od základů</li>
                <li>účtování DPH, majetku, zásob, mezd</li>
                <li>
                  výkazy a ukazatele (rozvaha, výkaz zisku a ztráty, cash flow)
                </li>
                <li>daňový systém a principy zdanění</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Jak probíhá výuka
              </h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>individuálně 1:1 – tempo přizpůsobím vám</li>
                <li>osobně v&nbsp;Českých Budějovicích nebo online (Meet)</li>
                <li>materiály a příklady na míru učivu</li>
                <li>domácí procvičování a zpětná vazba</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-playfair text-xl mb-2 text-[#6D1B3B]">
                Cena a dostupnost
              </h3>
              <p className="text-gray-700">
                <strong>300&nbsp;Kč / hod.</strong> – platí pro osobní i online
                výuku.
              </p>
              <p className="text-gray-700 mt-2">
                Napište termíny, které vám vyhovují – ozvu se co nejdřív.
              </p>
              <a
                href="/#contact"
                className="inline-block mt-4 bg-[#6D1B3B] text-white px-5 py-2.5 rounded hover:bg-[#8a2b52] transition"
              >
                To chci
              </a>
            </div>
          </div>
        </section>

        {/* CTA pruh dole – stejný styl jako jinde */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div>
              <h2 className="font-playfair text-2xl text-[#6D1B3B] mb-2">
                Nejste si jistí, zda je doučování pro vás?
              </h2>
              <p className="text-gray-700">
                Krátká nezávazná konzultace zdarma – řekneme si, co přesně
                potřebujete.
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
