import React from 'react';
import { PRICING_CONFIG, formatPrice } from '../pricing';
import { Calendar, Star } from 'lucide-react';

const PricingTable: React.FC = () => {
  const regularRooms = ['quarto-01', 'quarto-03', 'quarto-04', 'quarto-05'];
  const suiteRoom = 'quarto-02';
  const pousadaInteira = 'pousada-festas';

  return (
    <section id="precos" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Tabela de Preços</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Valores das Diárias</h2>
          <p className="text-slate-600">Confira nossos valores para dias de semana e finais de semana.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Pricing Table */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-villa-shell">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-villa-deep text-white">
                    <th className="px-6 py-4 text-left font-bold text-lg">Acomodação</th>
                    <th className="px-6 py-4 text-center font-bold text-lg">
                      <div className="flex flex-col items-center">
                        <span>Dias de Semana</span>
                        <span className="text-sm font-normal opacity-80">(Dom a Qui)</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-bold text-lg">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-villa-gold text-villa-gold" />
                          <span>Finais de Semana</span>
                          <Star className="w-4 h-4 fill-villa-gold text-villa-gold" />
                        </div>
                        <span className="text-sm font-normal opacity-80">(6ª e Sáb)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Regular Rooms */}
                  <tr className="border-b border-villa-shell hover:bg-villa-shell/30 transition-colors">
                    <td className="px-6 py-6 font-semibold text-villa-deep">
                      <div className="flex flex-col">
                        <span className="text-lg">Quartos 1, 3, 4, 5</span>
                        <span className="text-sm text-slate-500 font-normal">Quarto triplo com ventilador</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[regularRooms[0]].weekdayPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                    <td className="px-6 py-6 text-center bg-villa-gold/10">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[regularRooms[0]].weekendPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                  </tr>

                  {/* Suite */}
                  <tr className="border-b border-villa-shell hover:bg-villa-shell/30 transition-colors">
                    <td className="px-6 py-6 font-semibold text-villa-deep">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">Suíte</span>
                          <span className="bg-villa-deep text-white px-2 py-1 rounded-full text-xs font-bold uppercase">Privativa</span>
                        </div>
                        <span className="text-sm text-slate-500 font-normal">Suíte com banheiro privativo</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[suiteRoom].weekdayPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                    <td className="px-6 py-6 text-center bg-villa-gold/10">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[suiteRoom].weekendPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                  </tr>

                  {/* Pousada Inteira para Festas */}
                  <tr className="border-b border-villa-shell hover:bg-villa-shell/30 transition-colors">
                    <td className="px-6 py-6 font-semibold text-villa-deep">
                      <div className="flex flex-col">
                        <span className="text-lg">Pousada Inteira para Festas</span>
                        <span className="text-sm text-slate-500 font-normal">Toda a pousada para seu evento</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[pousadaInteira].weekdayPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                    <td className="px-6 py-6 text-center bg-villa-gold/10">
                      <div className="text-2xl font-bold text-villa-deep">
                        {formatPrice(PRICING_CONFIG.rooms[pousadaInteira].weekendPrice)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">por noite</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Dates Info */}
          <div className="mt-8 bg-villa-shell rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-villa-sea" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-villa-deep mb-2">Datas Comemorativas e Pontes</h3>
                <p className="text-slate-600 mb-4">
                  Os valores de final de semana também se aplicam às seguintes datas especiais:
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <span className="font-semibold">Janeiro:</span>
                    <span>09, 10, 16, 17, 23, 24, 30, 31</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-semibold">Fevereiro:</span>
                    <span>06, 07, 13, 14, 15, 16, 17, 20, 21, 27, 28</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-semibold">Março:</span>
                    <span>06, 07, 13, 14, 20, 21, 27, 28</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-semibold">Abril:</span>
                    <span>03, 04, 10, 11, 17, 18, 19, 20, 21</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>* Finais de semana incluem sextas-feiras e sábados</p>
            <p className="mt-1">** Valores sujeitos a alteração em datas especiais e alta temporada</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
