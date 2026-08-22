
import React, { useState, useEffect } from 'react';
import { ROOMS, BRAND } from '../constants';
import { Check, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';

const Rooms: React.FC = () => {
  const [openRoom, setOpenRoom] = useState<typeof ROOMS[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRoomOpen = (room: typeof ROOMS[0]) => {
    setOpenRoom(room);
    setCurrentImageIndex(0);
  };

  const handleClose = () => setOpenRoom(null);

  useEffect(() => {
    if (!openRoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenRoom(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openRoom]);

  const currentImages = openRoom ? (openRoom.images || [openRoom.imageUrl]) : [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);

  return (
    <section id="quartos" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Acomodações</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Escolha o seu refúgio</h2>
          <p className="text-slate-600">Casa espaçosa com 5 quartos, 6 camas e 3 banheiros. Todos com ventilador e Wi-Fi de alta velocidade. Capacidade para até 15 hóspedes. Ou alugue a casa inteira! Toque em um quarto para ver os detalhes e reservar.</p>
        </div>

        {/* Natureza Local */}
        <div className="mb-16">
          <p className="text-center font-serif italic text-2xl md:text-3xl text-villa-deep mb-2">A natureza da Enseada</p>
          <p className="text-center text-slate-600 mb-8">A poucos passos da pousada</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { src: '/fotos/foto00capa.jpeg', alt: 'Pôr do sol na praia da Enseada, com o mar refletindo o sol', caption: 'Pôr do sol na praia' },
              { src: '/fotos/foto14coqueiro.jpeg', alt: 'Coqueiro e banco rústico de frente para o mar ao entardecer', caption: 'Recanto à beira-mar' },
              { src: '/fotos/foto15praia.jpeg', alt: 'Entardecer na praia com pessoas na areia e vegetação nativa', caption: 'Entardecer na praia' },
            ].map((photo) => (
              <div key={photo.src} className="relative rounded-2xl overflow-hidden h-72 md:h-96">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white text-sm md:text-base font-semibold drop-shadow">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All Rooms Grid */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-villa-deep mb-8 text-center">Todos os Quartos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                className="group text-left bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => handleRoomOpen(room)}
                aria-label={`Ver detalhes de ${room.name}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                      <span className="text-xs text-villa-sea font-semibold underline mt-1 inline-block">
                        Ver detalhes e reservar
                      </span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Room Details Modal */}
        {openRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Detalhes de ${openRoom.name}`}>
            <div className="absolute inset-0 bg-black/60" onClick={handleClose}></div>
            <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Image Carousel */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden">
                <img
                  src={currentImages[currentImageIndex]}
                  alt={`${openRoom.name} - Imagem ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {openRoom.isSuite && (
                  <span className="absolute top-4 left-4 bg-villa-deep text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                    Suíte Privativa
                  </span>
                )}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  aria-label="Fechar detalhes"
                >
                  <X className="w-5 h-5 text-villa-deep" />
                </button>

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
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-villa-deep mb-3">{openRoom.name}</h3>
                <p className="text-slate-600 mb-5 leading-relaxed">{openRoom.description}</p>

                {openRoom.price && (
                  <div className="mb-5 p-4 bg-villa-shell rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Valor</p>
                    <p className="text-xl md:text-2xl font-bold text-villa-deep">{openRoom.price}</p>
                    <a
                      href="#disponibilidade"
                      onClick={handleClose}
                      className="text-sm text-villa-sea hover:text-villa-deep font-semibold underline mt-2 inline-block"
                      aria-label="Ver tabela de disponibilidade completa de todos os quartos"
                    >
                      Ver disponibilidade completa
                    </a>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  {openRoom.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-700">
                      <Check size={18} className="text-villa-sea flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}?text=Olá! Gostaria de fazer uma reserva para ${openRoom.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-villa-deep text-white py-4 rounded-full font-bold hover:bg-villa-sea transition-colors"
                  >
                    <MessageCircle size={20} />
                    Reservar pelo WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    {openRoom.bookingUrl && (
                      <a
                        href={openRoom.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-white text-villa-deep border border-slate-300 py-3 rounded-full font-semibold hover:border-villa-deep transition-colors text-sm"
                      >
                        Ver no Booking
                      </a>
                    )}
                    {openRoom.airbnbUrl && (
                      <a
                        href={openRoom.airbnbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-white text-villa-deep border border-slate-300 py-3 rounded-full font-semibold hover:border-villa-deep transition-colors text-sm"
                      >
                        Ver no Airbnb
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pousada Inteira para Festas Section */}
        <div className="bg-villa-deep rounded-3xl p-10 md:p-16 text-white">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Pousada Inteira para Festas</h3>
              <p className="text-white/80 text-lg mb-8">
                Planejando um aniversário, casamento ou celebração especial? A Villa & Mar oferece a pousada completa para seu evento: 5 quartos, 6 camas, 3 banheiros, sala de estar ampla integrada à cozinha, área gourmet com churrasqueira e garagem coberta. O espaço ideal para reunir amigos e família em uma celebração inesquecível!
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm">Até 15 hóspedes</span>
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
                  className="flex items-center justify-center gap-3 bg-white text-villa-deep px-8 py-4 rounded-full font-bold hover:bg-villa-sand transition-colors"
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
