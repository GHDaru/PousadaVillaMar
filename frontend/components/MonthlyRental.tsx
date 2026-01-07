
import React from 'react';
import { Calendar, Coffee, Home, Sparkles, Users, Check, MessageCircle, BedSingle } from 'lucide-react';
import { BRAND } from '../constants';

const MonthlyRental: React.FC = () => {
  return (
    <section id="aluguel-mensal" className="py-24 bg-gradient-to-br from-villa-shell via-white to-villa-shell/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header with Badge */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-villa-gold to-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg animate-pulse">
              <Sparkles size={18} className="animate-spin" style={{ animationDuration: '3s' }} />
              Novidade
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6 font-serif">
            Quartos Mensalistas na Pousada
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Sua nova casa longe de casa! Conforto, tranquilidade e economia para quem busca uma estadia prolongada em um ambiente acolhedor.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Image and Badge */}
              <div className="relative h-96 md:h-auto">
                <img 
                  src="/fotos/foto07suite.jpeg" 
                  alt="Quarto Mensalista" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-villa-deep/80 via-villa-deep/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-villa-sea" size={24} />
                      <span className="text-sm font-bold text-villa-deep uppercase tracking-wide">Disponível</span>
                    </div>
                    <p className="text-2xl font-bold text-villa-deep">Março a Novembro</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-villa-deep mb-6">
                  Seu Lar Temporário à Beira-Mar
                </h3>
                
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Perfeito para profissionais em trabalho temporário, estudantes, ou quem deseja uma temporada relaxante na praia. Viva com conforto e praticidade em um ambiente familiar e seguro.
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check size={24} className="text-villa-sea flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-villa-deep">Opções Flexíveis</p>
                      <p className="text-sm text-slate-500">Quarto completo mensal/semanal ou cama individual mensal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={24} className="text-villa-sea flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-villa-deep">Café da Manhã Incluído</p>
                      <p className="text-sm text-slate-500">Simples para quartos completos, americano para opção cama</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={24} className="text-villa-sea flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-villa-deep">Todas as Despesas Inclusas</p>
                      <p className="text-sm text-slate-500">Água, luz, internet - tudo incluído no valor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={24} className="text-villa-sea flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-villa-deep">Troca de Roupa de Cama e Toalhas</p>
                      <p className="text-sm text-slate-500">Limpeza regular para seu conforto</p>
                    </div>
                  </div>
                </div>

                {/* Pricing Section Title */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-villa-deep mb-2">Quarto Completo - Mensal</h4>
                  <p className="text-sm text-slate-500">Inclui café da manhã simples e todas as despesas</p>
                </div>

                {/* Monthly Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Single Person Monthly */}
                  <div className="bg-villa-shell border-2 border-villa-deep/10 rounded-2xl p-6 hover:border-villa-sea hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={20} className="text-villa-sea" />
                      <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">1 Pessoa</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-villa-deep">R$ 2.000</span>
                      <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-xs text-slate-500">Quarto completo • Tudo incluído</p>
                  </div>

                  {/* Couple Monthly */}
                  <div className="bg-gradient-to-br from-villa-deep to-villa-sea border-2 border-villa-deep rounded-2xl p-6 text-white hover:shadow-xl transition-all relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <span className="bg-villa-gold text-villa-deep text-xs font-bold px-2 py-1 rounded-full">Melhor Custo</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={20} />
                      <span className="text-sm font-semibold uppercase tracking-wide">Casal</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">R$ 2.500</span>
                      <span className="text-white/80">/mês</span>
                    </div>
                    <p className="text-xs text-white/70">Quarto completo • Tudo incluído</p>
                  </div>
                </div>

                {/* Weekly Pricing Section */}
                <div className="mb-6 mt-8">
                  <h4 className="text-xl font-bold text-villa-deep mb-2">Quarto Completo - Semanal</h4>
                  <p className="text-sm text-slate-500">Ideal para estadias mais curtas</p>
                </div>

                {/* Weekly Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Single Person Weekly */}
                  <div className="bg-villa-shell border-2 border-villa-deep/10 rounded-2xl p-6 hover:border-villa-sea hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={20} className="text-villa-sea" />
                      <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">1 Pessoa</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-villa-deep">R$ 700</span>
                      <span className="text-slate-500">/semana</span>
                    </div>
                    <p className="text-xs text-slate-500">Quarto completo • 7 dias</p>
                  </div>

                  {/* Two People Weekly */}
                  <div className="bg-villa-shell border-2 border-villa-deep/10 rounded-2xl p-6 hover:border-villa-sea hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={20} className="text-villa-sea" />
                      <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">2 Pessoas</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-villa-deep">R$ 900</span>
                      <span className="text-slate-500">/semana</span>
                    </div>
                    <p className="text-xs text-slate-500">Quarto completo • 7 dias</p>
                  </div>
                </div>

                {/* Bed Only Option Section */}
                <div className="mb-6 mt-8">
                  <h4 className="text-xl font-bold text-villa-deep mb-2">Opção CAMA - Mensal</h4>
                  <p className="text-sm text-slate-500">Compartilhamento de quarto com café da manhã americano</p>
                </div>

                {/* Bed Option Card */}
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-villa-shell border-2 border-villa-gold/30 rounded-2xl p-6 hover:border-villa-gold hover:shadow-xl transition-all relative">
                    <div className="absolute top-2 right-2">
                      <span className="bg-villa-gold text-white text-xs font-bold px-2 py-1 rounded-full">Mais Econômico</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <BedSingle size={20} className="text-villa-deep" />
                      <span className="text-sm font-semibold text-villa-deep uppercase tracking-wide">Cama Individual</span>
                    </div>
                    <div className="mb-3">
                      <span className="text-4xl font-bold text-villa-deep">R$ 1.000</span>
                      <span className="text-slate-600">/mês</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-villa-sea flex-shrink-0" />
                        <p className="text-sm text-slate-600">Café da manhã americano incluído</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-villa-sea flex-shrink-0" />
                        <p className="text-sm text-slate-600">Todas as despesas inclusas</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-villa-sea flex-shrink-0" />
                        <p className="text-sm text-slate-600">Acesso às áreas comuns</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/${BRAND.phoneFormatted.replace(/\D/g, '')}?text=Olá! Gostaria de saber mais sobre o aluguel mensal de quartos na pousada.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#128C7E] hover:scale-105 transition-all shadow-lg"
                  >
                    <MessageCircle size={20} />
                    Consultar Disponibilidade
                  </a>
                  <p className="text-center text-xs text-slate-500">
                    Entre em contato para verificar quartos disponíveis e condições especiais
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Benefits Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-villa-shell rounded-full mb-4">
                <Home className="text-villa-deep" size={32} />
              </div>
              <h4 className="font-bold text-villa-deep mb-2">Ambiente Familiar</h4>
              <p className="text-sm text-slate-600">Convivência agradável em um espaço acolhedor e seguro</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-villa-shell rounded-full mb-4">
                <Coffee className="text-villa-deep" size={32} />
              </div>
              <h4 className="font-bold text-villa-deep mb-2">Sem Preocupações</h4>
              <p className="text-sm text-slate-600">Todas as contas inclusas - você só precisa aproveitar</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-villa-shell rounded-full mb-4">
                <Calendar className="text-villa-deep" size={32} />
              </div>
              <h4 className="font-bold text-villa-deep mb-2">Flexibilidade</h4>
              <p className="text-sm text-slate-600">Disponível de março a novembro - escolha seu período</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyRental;
