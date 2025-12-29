
import React from 'react';
import Logo from './Logo';
import { BRAND } from '../constants';
import { Instagram, Facebook, Globe, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-villa-deep text-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-10 mb-6" textColorClass="text-white" />
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed italic">
              "Pousada Villa & Mar – Aconchego de casa, a poucos passos do mar."
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-villa-deep transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-villa-deep transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-villa-deep transition-all"><Globe size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-villa-gold">Navegação</h4>
            <ul className="space-y-4 text-white/70">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">A Pousada</a></li>
              <li><a href="#quartos" className="hover:text-white transition-colors">Acomodações</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria</a></li>
              <li><a href="#localizacao" className="hover:text-white transition-colors">Localização</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-villa-gold">Contatos</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex flex-col">
                <span className="text-xs uppercase opacity-50">Telefone</span>
                <span className="font-bold text-white">{BRAND.phone}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase opacity-50">E-mail</span>
                <span className="font-bold text-white">{BRAND.email}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs uppercase opacity-50">Atendimento</span>
                <span className="text-white">24 horas / 7 dias</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Booking Platforms Connection Section */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <h4 className="font-bold text-lg mb-6 text-villa-gold text-center">Também estamos em</h4>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={BRAND.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl border border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm5.2-13.5c-.4-.8-1.2-1.4-2.1-1.5-.4 0-.8.1-1.1.3-.3.2-.6.5-.8.9-.2-.4-.5-.7-.8-.9-.3-.2-.7-.3-1.1-.3-.9.1-1.7.7-2.1 1.5-.5 1-.3 2.2.4 3.1L12 15.5l3.4-3.9c.7-.9.9-2.1.4-3.1z"/>
                </svg>
                <span className="font-semibold text-lg">Airbnb</span>
              </div>
              <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl border border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 9.4c0-.5-.4-.9-.9-.9h-4.2c-.5 0-.9.4-.9.9v12.7c0 .5.4.9.9.9h4.2c.5 0 .9-.4.9-.9V9.4zM13.5 1.9c0-.5-.4-.9-.9-.9H8.4c-.5 0-.9.4-.9.9v20.2c0 .5.4.9.9.9h4.2c.5 0 .9-.4.9-.9V1.9zM4.5 5.6c0-.5-.4-.9-.9-.9H-.6c-.5 0-.9.4-.9.9v16.5c0 .5.4.9.9.9h4.2c.5 0 .9-.4.9-.9V5.6z"/>
                </svg>
                <span className="font-semibold text-lg">Booking.com</span>
              </div>
              <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <p className="text-center text-white/50 text-sm mt-6 italic">
            Para visualizar nossa pousada nestas plataformas
          </p>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-4">
          <p>© {new Date().getFullYear()} Pousada Villa & Mar. Todos os direitos reservados.</p>
          <p>Enseada, São Francisco do Sul - SC</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Políticas de Reserva</a>
            <a href="#" className="hover:underline">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
