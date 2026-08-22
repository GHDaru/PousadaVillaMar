
import React from 'react';
import { BRAND } from '../constants';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/fotos/foto00capa.jpeg"
          alt="Pôr do sol na praia da Enseada, com o mar refletindo o sol e pessoas na areia"
          className="w-full h-full object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/90"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block text-white uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          Enseada • São Francisco do Sul • SC
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4 drop-shadow-lg leading-snug animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Descanso de casa, <span className="italic font-normal">com o charme do mar.</span>
        </h1>
        <p className="text-white text-base md:text-lg font-light mb-8 max-w-2xl mx-auto drop-shadow-md animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {BRAND.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <a 
            href="#quartos" 
            className="bg-villa-deep text-white px-8 py-3 rounded-full font-bold text-base hover:bg-villa-sea hover:scale-105 transition-all shadow-xl"
          >
            Ver Quartos
          </a>
          <a 
            href="#sobre" 
            className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-bold text-base hover:bg-white/30 transition-all"
          >
            Conheça a Vila
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
