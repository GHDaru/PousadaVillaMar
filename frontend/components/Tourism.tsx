
import React from 'react';
import { MapPin, Youtube, ExternalLink, Calendar, Sun } from 'lucide-react';

interface TouristSpot {
  name: string;
  description: string;
  youtubeUrl?: string;
  mapsUrl?: string;
  image?: string;
}

interface DayItinerary {
  day: number;
  title: string;
  spots: TouristSpot[];
}

const Tourism: React.FC = () => {
  const itinerary: DayItinerary[] = [
    {
      day: 1,
      title: 'Praias Paradisíacas',
      spots: [
        {
          name: 'Praia do Capri',
          description: 'Uma das praias mais charmosas de São Francisco do Sul, ideal para relaxar e curtir o sol.',
          image: 'https://picsum.photos/id/1015/800/600'
        },
        {
          name: 'Praia do Forte',
          description: 'Praia histórica próxima ao Forte Marechal Luz, com águas calmas perfeitas para toda a família.',
          youtubeUrl: 'https://www.youtube.com/watch?v=UZzKW3D2j7k',
          image: 'https://picsum.photos/id/1016/800/600'
        },
        {
          name: 'Praia do Molhe',
          description: 'Praia urbana com excelente infraestrutura e vista privilegiada do molhe.',
          youtubeUrl: 'https://www.youtube.com/watch?v=5aA7MB5GLt0',
          mapsUrl: 'https://share.google/kBar6UH9PWDAXxW6K',
          image: 'https://picsum.photos/id/1018/800/600'
        },
        {
          name: 'Trilha do Morro da Enseada',
          description: 'Trilha de nível moderado com vista panorâmica espetacular da Enseada e região.',
          youtubeUrl: 'https://www.youtube.com/watch?v=joWHqlys000',
          mapsUrl: 'https://share.google/ubt5qwwXw2nz7W498',
          image: 'https://picsum.photos/id/1019/800/600'
        }
      ]
    }
  ];

  return (
    <section id="turismo" className="py-24 bg-gradient-to-b from-white to-villa-sand">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Explore a Ilha</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">
            Turismo em São Francisco do Sul
          </h2>
          <p className="text-slate-600 text-lg">
            Descubra os encantos da nossa ilha! A Pousada Villa & Mar oferece roteiros exclusivos 
            para nossos hóspedes conhecerem os principais pontos turísticos da região.
          </p>
        </div>

        {/* Itinerary */}
        {itinerary.map((dayPlan) => (
          <div key={dayPlan.day} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-villa-deep text-white px-6 py-3 rounded-full">
                <Calendar className="w-5 h-5" />
                <span className="font-bold text-lg">Dia {dayPlan.day}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-villa-deep">{dayPlan.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dayPlan.spots.map((spot, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={spot.image} 
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-villa-gold/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-villa-deep font-bold text-sm flex items-center gap-1">
                        <Sun className="w-4 h-4" />
                        Imperdível
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-villa-deep mb-3">{spot.name}</h4>
                    <p className="text-slate-600 mb-4">{spot.description}</p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {spot.youtubeUrl && (
                        <a
                          href={spot.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                          Vídeo
                        </a>
                      )}
                      {spot.mapsUrl && (
                        <a
                          href={spot.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-villa-sea text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-villa-deep transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          Ver Mapa
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Box */}
        <div className="mt-16 bg-villa-deep text-white rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Roteiro Exclusivo para Hóspedes</h3>
          <p className="text-villa-sand text-lg mb-6 max-w-2xl mx-auto">
            Nossos roteiros são cuidadosamente planejados pela equipe da Pousada Villa & Mar. 
            Oferecemos transporte e acompanhamento para que você aproveite o melhor da ilha com total conforto e segurança.
          </p>
          <a 
            href={`https://wa.me/5547997158173?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os roteiros turísticos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-villa-deep px-8 py-4 rounded-full font-bold text-lg hover:bg-villa-gold transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Saiba Mais Sobre os Roteiros
          </a>
        </div>

        {/* Additional Days Teaser */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 italic">
            Roteiro de 3 dias disponível. Entre em contato para conhecer os dias 2 e 3 do nosso roteiro completo!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tourism;
