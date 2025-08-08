import React from 'react';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className="font-roboto">
      {/* Menu */}
      <header className="fixed top-0 left-0 w-full bg-[#6D1B3B] text-white shadow-md z-50">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-playfair text-xl font-bold">Bc. Eva Codlová</div>
          <ul className="flex space-x-6">
            <li><a href="#home" className="hover:underline">Domů</a></li>
            <li><a href="#services" className="hover:underline">Služby</a></li>
            <li><a href="#about" className="hover:underline">O mně</a></li>
            <li><a href="#contact" className="hover:underline">Kontakt</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero sekce */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-[#F5F5F5] pt-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="font-playfair text-4xl mb-4 text-[#6D1B3B]">Vaše spolehlivá účetní partnerka</h1>
            <p className="mb-6 text-gray-700">Přehledné účetnictví, bez starostí, s lidským přístupem.</p>
            <a href="#contact" className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition">Domluvte si konzultaci</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">[Foto placeholder]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Služby */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl mb-12 text-[#6D1B3B]">Služby</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Účetnictví", "Daňová evidence", "Mzdy"].map((service, i) => (
              <div key={i} className="border p-6 rounded shadow hover:shadow-lg transition">
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
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h2 className="font-playfair text-3xl mb-4 text-[#6D1B3B]">O mně</h2>
            <p className="text-gray-700 mb-4">Krátký text o Evě – vzdělání, zkušenosti, přístup k práci. Bude doplněn.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">[Foto / ilustrace]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-playfair text-3xl mb-8 text-[#6D1B3B] text-center">Kontakt</h2>
          <form className="max-w-2xl mx-auto grid gap-4">
            <input type="text" placeholder="Jméno" className="border p-3 rounded w-full" />
            <input type="email" placeholder="E-mail" className="border p-3 rounded w-full" />
            <textarea placeholder="Zpráva" className="border p-3 rounded w-full h-32" />
            <button type="submit" className="bg-[#6D1B3B] text-white px-6 py-3 rounded hover:bg-[#8a2b52] transition">Odeslat</button>
          </form>
        </div>
      </section>

      {/* Patička */}
      <footer className="bg-[#6D1B3B] text-white py-4 text-center">
        © {new Date().getFullYear()} Bc. Eva Codlová – Všechna práva vyhrazena.
      </footer>
    </div>
  );
}
