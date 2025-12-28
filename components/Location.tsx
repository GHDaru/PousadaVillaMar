
import React from 'react';
import { BRAND } from '../constants';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Onde Estamos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-10">Enseada, São Francisco do Sul <br/><span className="font-serif italic font-normal text-villa-sea">Sua casa na praia.</span></h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-villa-sand p-4 rounded-2xl text-villa-deep">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-villa-deep mb-2">Endereço</h4>
                  <p className="text-slate-600">{BRAND.address}</p>
                  <p className="text-slate-500 text-sm mt-1">Bairro Enseada - Próximo à praia</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-villa-sand p-4 rounded-2xl text-villa-deep">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-villa-deep mb-2">Reservas & Contato</h4>
                  <p className="text-slate-600">Susana Moreira</p>
                  <a href={`tel:${BRAND.phoneFormatted}`} className="text-villa-sea font-bold text-lg hover:underline transition-all">
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="bg-villa-sand p-4 rounded-2xl text-villa-deep">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-villa-deep mb-2">Atendimento</h4>
                  <p className="text-slate-600">Estamos à disposição 24 horas para melhor atender você e sua família.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <a 
                href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}`} 
                target="_blank"
                className="inline-block bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all"
               >
                 Chamar no WhatsApp
               </a>
            </div>
          </div>

          <div className="lg:w-1/2 h-[450px] md:h-auto rounded-[3rem] overflow-hidden shadow-2xl relative">
            {/* Embedded Google Map Placeholder - In a real app we'd use the actual API or iframe */}
            <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-center p-8">
               <div className="w-20 h-20 bg-villa-deep rounded-full flex items-center justify-center text-white mb-6 animate-bounce">
                  <MapPin size={40} />
               </div>
               <p className="text-villa-deep font-bold text-xl mb-2">Villa & Mar</p>
               <p className="text-slate-500 mb-6 max-w-xs">{BRAND.address}</p>
               <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`}
                target="_blank"
                className="bg-villa-deep text-white px-8 py-3 rounded-xl font-bold hover:bg-villa-sea transition-all"
               >
                 Abrir no Google Maps
               </a>
            </div>
            
            {/* Visual Flare */}
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Localização Privilegiada</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 italic">Próximo aos melhores restaurantes e praias.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
