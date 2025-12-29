
import React from 'react';
import { ROOMS, BRAND } from '../constants';
import { Check, Airplay as Fan, Bath } from 'lucide-react';

const Rooms: React.FC = () => {
  return (
    <section id="quartos" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Acomodações</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Escolha o seu refúgio</h2>
          <p className="text-slate-600">Casa espaçosa com 5 quartos, 6 camas e 3 banheiros. Todos com ventilador e Wi-Fi de alta velocidade. Capacidade para até 13 hóspedes. Ou alugue a casa inteira!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ROOMS.map((room) => (
            <div key={room.id} className="group bg-villa-shell rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.imageUrl} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {room.isSuite && (
                  <span className="absolute top-4 left-4 bg-villa-deep text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Suíte Privativa
                  </span>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-villa-deep mb-3">{room.name}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{room.description}</p>
                <div className="space-y-2 mb-8">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check size={14} className="text-villa-sea" /> {feature}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <a 
                    href={BRAND.airbnbUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-villa-deep text-white py-3 rounded-xl font-bold hover:bg-villa-sea hover:scale-105 transition-all"
                  >
                    Ver no Airbnb
                  </a>
                  <a 
                    href={BRAND.bookingUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border-2 border-villa-deep text-villa-deep py-3 rounded-xl font-bold hover:bg-villa-deep hover:text-white transition-all"
                  >
                    Ver no Booking
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-villa-deep rounded-[3rem] p-10 md:p-16 text-white">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">A casa completa para você.</h3>
              <p className="text-white/80 text-lg mb-8">
                Planejando um evento familiar ou viagem em grupo? A Villa & Mar oferece locação completa: 5 quartos, 6 camas, 3 banheiros, sala de estar ampla integrada à cozinha, área gourmet com churrasqueira e garagem coberta. Perfeito para reunir a família!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Até 13 hóspedes</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">5 Quartos • 6 Camas</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Área Gourmet</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Garagem Coberta</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Pet Friendly</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={BRAND.airbnbUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-villa-deep px-8 py-4 rounded-xl font-bold hover:bg-villa-sea hover:text-white transition-all text-center"
                >
                  Reservar no Airbnb
                </a>
                <a 
                  href={BRAND.bookingUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-villa-gold text-villa-deep px-8 py-4 rounded-xl font-bold hover:bg-white transition-all text-center"
                >
                  Reservar no Booking
                </a>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-villa-sea/20 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold mb-2">5</div>
                  <div className="text-sm uppercase tracking-wider opacity-80">Quartos</div>
                  <div className="text-xs opacity-60 mt-2">1 Suíte + 4 Quartos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
