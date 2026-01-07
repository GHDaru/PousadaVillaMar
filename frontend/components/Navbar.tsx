
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Phone } from 'lucide-react';
import { BRAND } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'A Pousada', href: '#sobre' },
    { name: 'Acomodações', href: '#quartos' },
    { name: 'Preços', href: '#precos' },
    { name: 'Disponibilidade', href: '#disponibilidade', badge: true },
    { name: 'Aluguel Mensal', href: '#aluguel-mensal' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Localização', href: '#localizacao' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#inicio">
          <Logo 
            className="h-10 md:h-12" 
            textColorClass={scrolled ? 'text-villa-deep' : 'text-villa-deep'} 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`relative text-sm font-medium tracking-wide hover:text-villa-sea transition-colors ${scrolled ? 'text-slate-700' : 'text-villa-deep'}`}
            >
              {link.name}
              {link.badge && (
                <span className="absolute -top-2 -right-2 bg-villa-gold text-villa-deep text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  Novo
                </span>
              )}
            </a>
          ))}
          <a 
            href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}`} 
            target="_blank"
            className="bg-villa-deep text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-villa-sea transition-all"
          >
            <Phone size={16} /> Reservar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-villa-deep" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full top-full left-0 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="relative text-lg font-medium text-slate-700 hover:text-villa-sea"
              >
                {link.name}
                {link.badge && (
                  <span className="absolute -top-2 -right-8 bg-villa-gold text-villa-deep text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                    Novo
                  </span>
                )}
              </a>
            ))}
            <a 
              href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}`} 
              className="bg-villa-deep text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2"
            >
              <Phone size={20} /> Contato WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
