
import React from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const Gallery: React.FC = () => {
  const images: GalleryImage[] = [
    {
      src: '/fotos/foto01exterior.jpeg',
      alt: 'Fachada de sobrado com sacada longa, grade frontal e garagem coberta',
      caption: 'Fachada e Entrada'
    },
    {
      src: '/fotos/foto02churrasqueira.jpeg',
      alt: 'Área coberta com churrasqueira de alvenaria e bancada revestida',
      caption: 'Área Gourmet com Churrasqueira'
    },
    {
      src: '/fotos/foto03copa.jpeg',
      alt: 'Salão amplo com mesa grande, banco e porta para área externa',
      caption: 'Copa/Salão de Refeições'
    },
    {
      src: '/fotos/foto04Quarto 3.jpeg',
      alt: 'Quarto com cama de casal e cama de solteiro, ventilador de teto',
      caption: 'Quarto Família'
    },
    {
      src: '/fotos/foto05Quarto 5.jpeg',
      alt: 'Quarto com duas camas de solteiro, ventilador de teto',
      caption: 'Quarto com Duas Camas'
    },
    {
      src: '/fotos/foto06sala de tv.jpeg',
      alt: 'Sala com sofá grande integrada à cozinha com balcão',
      caption: 'Sala de Estar Integrada'
    },
    {
      src: '/fotos/foto07suite.jpeg',
      alt: 'Quarto com cama de solteiro, janela ampla e ventilador de teto',
      caption: 'Suíte'
    },
    {
      src: '/fotos/foto09banheiro inferior.jpeg',
      alt: 'Banheiro com box fechado, vaso sanitário e paredes revestidas',
      caption: 'Banheiro Inferior'
    },
    {
      src: '/fotos/foto10banheiro superior.jpeg',
      alt: 'Banheiro com box de vidro, janela alta e revestimento cerâmico',
      caption: 'Banheiro Superior'
    },
    {
      src: '/fotos/foto11garagem.jpeg',
      alt: 'Garagem coberta com colunas e piso estampado',
      caption: 'Garagem Coberta'
    }
  ];

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Galeria</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Conheça Cada Detalhe</h2>
          <p className="text-slate-600">Explore todos os espaços da nossa casa. De quartos confortáveis à área gourmet, cada ambiente foi pensado para seu conforto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/3]"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-semibold text-lg">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
