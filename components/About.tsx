
import React from 'react';
import { BRAND } from '../constants';
import { Bed, Users, Shield, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-villa-shell relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* TODO: SUBSTITUIR POR FOTOS REAIS DO ESTABELECIMENTO
                  Sugestões:
                  - Foto 1: Fachada ou área externa da pousada
                  - Foto 2: Vista da praia próxima ou área interna aconchegante
                  Usar fotos em alta qualidade (mínimo 600x800) */}
              <img src="https://picsum.photos/id/1018/600/800" alt="Área externa da Pousada Villa & Mar" className="rounded-2xl shadow-lg mt-8" />
              <img src="https://picsum.photos/id/1019/600/800" alt="Vista da Praia da Enseada" className="rounded-2xl shadow-lg" />
            </div>
            {/* Decoration Element */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-villa-sea/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Nossa Essência</span>
            <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-8 leading-tight">
              Uma casa bem cuidada, <br/>
              <span className="font-serif italic font-normal">feita com carinho para você.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              A Pousada Villa & Mar nasceu do sonho de um casal em oferecer um refúgio que une a hospitalidade genuína de um lar com a tranquilidade revigorante do mar da Enseada. Localizada em São Francisco do Sul, oferecemos um espaço acolhedor e bem cuidado, onde o tempo anda mais devagar.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-villa-sea">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-villa-deep mb-1">Para Famílias</h4>
                  <p className="text-sm text-slate-500">Espaço e diversão garantida para criar memórias inesquecíveis nas férias.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-villa-sea">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-villa-deep mb-1">Para Executivos</h4>
                  <p className="text-sm text-slate-500">Fora de temporada, oferecemos o silêncio e a estrutura necessária para seu trabalho.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-villa-sand/50 rounded-2xl border border-villa-sand flex items-center gap-6">
              <div className="text-center">
                <p className="text-villa-deep font-serif italic text-xl">"{BRAND.slogan}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
