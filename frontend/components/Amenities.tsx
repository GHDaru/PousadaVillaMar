
import React from 'react';
import { AMENITIES } from '../constants';

const Amenities: React.FC = () => {
  return (
    <section className="py-24 bg-villa-shell">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-villa-deep mb-4">Tudo pensado no seu conforto</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Simplicidade sofisticada e praticidade para tornar sua estadia leve e relaxante.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {AMENITIES.map((item, index) => (
            <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-villa-sea/10 text-villa-sea rounded-2xl flex items-center justify-center mb-6 group-hover:bg-villa-sea group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-villa-deep mb-3">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
