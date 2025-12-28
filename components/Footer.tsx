
import React from 'react';
import Logo from './Logo';
import { BRAND } from '../constants';
import { Instagram, Facebook, Globe } from 'lucide-react';

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
