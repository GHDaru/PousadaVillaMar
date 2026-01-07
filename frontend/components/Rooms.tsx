
import React, { useState } from 'react';
import { ROOMS, BRAND } from '../constants';
import { Check, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

const Rooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRoomSelect = (room: typeof ROOMS[0]) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const images = selectedRoom.images || [selectedRoom.imageUrl];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = selectedRoom.images || [selectedRoom.imageUrl];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImages = selectedRoom.images || [selectedRoom.imageUrl];

  return (
    <section id="quartos" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Acomodações</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Escolha o seu refúgio</h2>
          <p className="text-slate-600">Casa espaçosa com 5 quartos, 6 camas e 3 banheiros. Todos com ventilador e Wi-Fi de alta velocidade. Capacidade para até 13 hóspedes. Ou alugue a casa inteira!</p>
        </div>

        {/* Room Selector Menu */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedRoom.id === room.id
                    ? 'bg-villa-deep text-white shadow-lg scale-105'
                    : 'bg-villa-shell text-villa-deep hover:bg-villa-sea hover:text-white'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Room Details with Carousel */}
        <div className="bg-villa-shell rounded-3xl overflow-hidden shadow-xl mb-16">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Carousel */}
            <div className="relative h-96 md:h-auto">
              <img 
                src={currentImages[currentImageIndex]} 
                alt={`${selectedRoom.name} - Imagem ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover"
              />
              {selectedRoom.isSuite && (
                <span className="absolute top-4 left-4 bg-villa-deep text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                  Suíte Privativa
                </span>
              )}
              
              {/* Carousel Controls */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6 text-villa-deep" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-6 h-6 text-villa-deep" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {currentImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                        aria-label={`Ir para imagem ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Room Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-villa-deep mb-4">{selectedRoom.name}</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">{selectedRoom.description}</p>
              
              {/* Price */}
              {selectedRoom.price && (
                <div className="mb-6 p-4 bg-villa-gold/10 rounded-xl border-2 border-villa-gold/30">
                  <p className="text-sm text-slate-600 mb-1">Valor</p>
                  <p className="text-2xl font-bold text-villa-deep">{selectedRoom.price}</p>
                  <a 
                    href="#disponibilidade" 
                    className="text-sm text-villa-sea hover:text-villa-deep font-semibold underline mt-2 inline-block"
                    aria-label="Ver tabela de disponibilidade completa de todos os quartos"
                  >
                    Ver disponibilidade completa
                  </a>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3 mb-8">
                {selectedRoom.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700">
                    <Check size={18} className="text-villa-sea flex-shrink-0" /> 
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp Reservation Button */}
              <div className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}?text=Olá! Gostaria de fazer uma reserva para ${selectedRoom.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#128C7E] hover:scale-105 transition-all"
                >
                  <MessageCircle size={20} />
                  Reservar pelo WhatsApp
                </a>
                
                {/* Booking and Airbnb Links */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.bookingUrl && (
                    <a 
                      href={selectedRoom.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-villa-sea text-white py-3 rounded-xl font-semibold hover:bg-villa-deep hover:scale-105 transition-all text-sm"
                    >
                      Ver no Booking
                    </a>
                  )}
                  {selectedRoom.airbnbUrl && (
                    <a 
                      href={selectedRoom.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#FF5A5F] text-white py-3 rounded-xl font-semibold hover:bg-[#E04E53] hover:scale-105 transition-all text-sm"
                    >
                      Ver no Airbnb
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Rooms Grid */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-villa-deep mb-8 text-center">Todos os Quartos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <div 
                key={room.id} 
                className="group bg-villa-shell rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => handleRoomSelect(room)}
              >
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
                <div className="p-6">
                  <h4 className="text-xl font-bold text-villa-deep mb-2">{room.name}</h4>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{room.description}</p>
                  {room.price && (
                    <>
                      <p className="text-villa-deep font-semibold text-sm">{room.price}</p>
                      <a 
                        href="#disponibilidade" 
                        className="text-xs text-villa-sea hover:text-villa-deep font-semibold underline mt-1 inline-block"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Ver disponibilidade para ${room.name}`}
                      >
                        Ver disponibilidade
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pousada Inteira para Festas Section */}
        <div className="bg-villa-deep rounded-[3rem] p-10 md:p-16 text-white">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Pousada Inteira para Festas</h3>
              <p className="text-white/80 text-lg mb-8">
                Planejando um aniversário, casamento ou celebração especial? A Villa & Mar oferece a pousada completa para seu evento: 5 quartos, 6 camas, 3 banheiros, sala de estar ampla integrada à cozinha, área gourmet com churrasqueira e garagem coberta. O espaço ideal para reunir amigos e família em uma celebração inesquecível!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Até 13 hóspedes</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">5 Quartos • 6 Camas</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Área Gourmet</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Garagem Coberta</span>
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Ideal para Eventos</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}?text=Olá! Gostaria de fazer uma reserva da pousada inteira para uma festa ou evento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-all"
                >
                  <MessageCircle size={20} />
                  Reservar pelo WhatsApp
                </a>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-villa-sea/20 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold mb-2">5</div>
                  <div className="text-sm uppercase tracking-wider opacity-80">Quartos</div>
                  <div className="text-xs opacity-60 mt-2">Ideal para Festas</div>
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
