
import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { BRAND } from '../constants';

const MonthlyRental: React.FC = () => {
  return (
    <section id="aluguel-mensal" className="py-24 bg-villa-shell">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-villa-deep text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              <Sparkles size={16} />
              Novidade
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6 font-serif">
            Quartos Mensalistas na Pousada
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-4">
            Sua nova casa longe de casa! Conforto, tranquilidade e economia para quem busca uma estadia prolongada em um ambiente acolhedor.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            Para quartos mensais, entre em contato para ver as disponibilidades e condições.
          </p>
          <a
            href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}?text=Olá! Gostaria de saber mais sobre o aluguel mensal de quartos na pousada.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-villa-deep text-white py-4 px-10 rounded-full font-bold hover:bg-villa-sea transition-colors"
          >
            <MessageCircle size={20} />
            Consultar Disponibilidade
          </a>
        </div>
      </div>
    </section>
  );
};

export default MonthlyRental;
