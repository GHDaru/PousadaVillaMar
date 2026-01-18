
import React from 'react';
import { MapPin, Youtube, Clock, Activity, Accessibility, Sun, Compass } from 'lucide-react';

/**
 * Represents a tourist attraction with complete information for planning visits.
 * 
 * @property {string} name - Display name of the attraction
 * @property {string} timeOnSite - Duration spent at location (e.g., "2-3 horas", "30 minutos")
 * @property {string} totalTime - Total time including travel (e.g., "3-5h")
 * @property {1|2|3|4} effort - Physical effort required: 1 = Leve, 2 = Moderado, 3 = Moderado+, 4 = Difícil
 * @property {'Boa'|'Moderada'|'Difícil'} accessibility - Accessibility level
 * @property {string} bestWindow - Recommended time window to visit (e.g., "9h-12h")
 * @property {string} description - Brief description of the attraction
 * @property {string} mapsUrl - Google Maps link
 * @property {string} youtubeUrl - YouTube video link
 */
interface Attraction {
  name: string;
  timeOnSite: string;
  totalTime: string;
  effort: 1 | 2 | 3 | 4;
  accessibility: 'Boa' | 'Moderada' | 'Difícil';
  bestWindow: string;
  description: string;
  mapsUrl: string;
  youtubeUrl: string;
}

interface CategorySection {
  id: string;
  title: string;
  attractions: Attraction[];
  suggestedCombinations: string[];
}

// Constants for effort levels and accessibility colors
const EFFORT_LABELS: Record<number, string> = {
  1: 'Leve',
  2: 'Moderado',
  3: 'Moderado+',
  4: 'Difícil',
};

const ACCESSIBILITY_COLORS: Record<string, string> = {
  'Boa': 'text-green-600',
  'Moderada': 'text-yellow-600',
  'Difícil': 'text-red-600',
};

const Tourism: React.FC = () => {
  const categories: CategorySection[] = [
    {
      id: 'centro-museus',
      title: 'Centro Histórico e Museus',
      attractions: [
        {
          name: 'Centro Histórico de São Francisco do Sul',
          timeOnSite: '2–3 horas',
          totalTime: '2h30–4h',
          effort: 1,
          accessibility: 'Moderada',
          bestWindow: '9h–12h ou 14h–17h',
          description: 'O centro histórico de São Francisco do Sul, terceira cidade mais antiga do Brasil, reúne cerca de 150 prédios coloniais tombados pelo IPHAN. Passeio a pé permite apreciar a arquitetura preservada, casarios coloridos dos séculos XVIII-XIX, a Igreja Matriz, praças e o deck de madeira com vista panorâmica.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Centro%20Hist%C3%B3rico%20S%C3%A3o%20Francisco%20do%20Sul%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=TYezNht1GDc'
        },
        {
          name: 'Mercado Público Municipal',
          timeOnSite: '1 hora',
          totalTime: '1–2h',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '10h–12h ou 16h–18h',
          description: 'Prédio histórico de 1917 com vista privilegiada para o mar. Polo gastronômico e cultural com boxes de peixes frescos, frutos do mar, artesanato local e restaurantes típicos. Experimente o famoso pastel de camarão ou uma sequência de frutos do mar.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado%20P%C3%BAblico%20Municipal%20S%C3%A3o%20Francisco%20do%20Sul%20SC',
          youtubeUrl: 'https://www.youtube.com/shorts/cmd3YJnJzkM'
        },
        {
          name: 'Igreja Matriz Nossa Senhora da Graça',
          timeOnSite: '30 minutos',
          totalTime: '45m–1h30',
          effort: 1,
          accessibility: 'Moderada',
          bestWindow: '9h–12h',
          description: 'Construída em 1699, é a igreja mais antiga de Santa Catarina. Guarda a imagem centenária da padroeira trazida por espanhóis em 1553. Anexo funciona o Museu Diocesano de Arte Sacra com acervo de peças sacras e objetos litúrgicos antigos.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Igreja%20Matriz%20Nossa%20Senhora%20da%20Gra%C3%A7a%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=AtEfhz09rJY'
        },
        {
          name: 'Museu Nacional do Mar',
          timeOnSite: '1 hora',
          totalTime: '1h30–2h30',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '10h–16h',
          description: 'Instalado em antigos galpões portuários com 7.000 m², preserva a história náutica brasileira com embarcações tradicionais, instrumentos de navegação e a embarcação de Amyr Klink. Atualmente fechado para reforma.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museu%20Nacional%20do%20Mar%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=2xKvDDCmIGU'
        },
        {
          name: 'Museu Histórico Prefeito José Schmidt',
          timeOnSite: '30–45 minutos',
          totalTime: '1–2h',
          effort: 1,
          accessibility: 'Moderada',
          bestWindow: '10h–16h',
          description: 'Ocupa a antiga cadeia e Câmara Municipal de 1914. Abriga mais de 1000 peças contando a história da cidade através de mobiliário, objetos pessoais, armas, fotografias e documentos. Entrada: R$3 (gratuita para crianças até 12 anos e idosos).',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museu%20Hist%C3%B3rico%20Prefeito%20Jos%C3%A9%20Schmidt%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=zTD2u7qO0Yc'
        },
        {
          name: 'Museu Diocesano de Arte Sacra',
          timeOnSite: '30 minutos',
          totalTime: '1–1h45',
          effort: 1,
          accessibility: 'Moderada',
          bestWindow: '10h–16h',
          description: 'Localizado no anexo da Igreja Matriz, guarda importante patrimônio de arte sacra regional. Imagens religiosas dos séculos XVIII e XIX, altares, indumentárias litúrgicas. Destacam-se esculturas barrocas policromadas e peças centenárias em madeira.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museu%20de%20Arte%20Sacra%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=5dGRjSrLiUM'
        }
      ],
      suggestedCombinations: [
        'Centro Histórico + Mercado Público + Igreja Matriz (manhã completa)',
        'Museu Histórico + Museu de Arte Sacra + Almoço no Mercado',
        'Centro Histórico ao pôr do sol + Jantar no Mercado'
      ]
    },
    {
      id: 'trilhas-mirantes',
      title: 'Trilhas e Mirantes',
      attractions: [
        {
          name: 'Trilha Morro da Enseada (Morro da Esperança)',
          timeOnSite: '1 hora',
          totalTime: '2–3h',
          effort: 3,
          accessibility: 'Difícil',
          bestWindow: '8h–11h',
          description: 'Conecta o canto norte da Praia da Enseada à Prainha. Inicia na Escadaria da Petrobrás e segue por mata atlântica até mirante natural (~100m de elevação). Vista panorâmica incrível das praias e do oceano. Trilha bem demarcada, ~750m cada trecho.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Morro%20da%20Enseada%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=8g9y2Q6yG4A'
        },
        {
          name: 'Trilha do Forte Marechal Luz',
          timeOnSite: '30 minutos',
          totalTime: '2–3h',
          effort: 2,
          accessibility: 'Moderada',
          bestWindow: '9h–12h',
          description: 'Localizada no extremo norte da ilha. Caminho de terra batida (~1,5km) com inclinação suave até o forte histórico. Vista panorâmica deslumbrante da Praia do Forte e o encontro da Baía da Babitonga com o oceano. Entrada do forte: R$5.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Forte%20Marechal%20Luz%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=bicgQqwA9Es'
        },
        {
          name: 'Trilha do Sambaqui da Prainha',
          timeOnSite: '20 minutos',
          totalTime: '1h30–2h30',
          effort: 3,
          accessibility: 'Difícil',
          bestWindow: '8h–11h ou 15h–17h',
          description: 'Parte do canto direito da Prainha e segue pelo costão rochoso (~500m). Mirante natural com vista da Prainha e Praia Grande. Interesse arqueológico: sambaqui pré-histórico pelo caminho. Use calçado com boa aderência.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Trilha%20Prainha%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=UEk2kLkI9wE'
        }
      ],
      suggestedCombinations: [
        'Trilha Morro da Enseada + Banho na Prainha (manhã)',
        'Forte Marechal Luz + Praia do Forte (dia completo)',
        'Trilha do Sambaqui + Prainha + Almoço local'
      ]
    },
    {
      id: 'praias',
      title: 'Praias',
      attractions: [
        {
          name: 'Praia da Enseada',
          timeOnSite: '3–4 horas',
          totalTime: '3–5h',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '9h–12h',
          description: 'Principal praia urbana com ~3km de areia clara. Águas calmas e rasas, ideais para família e esportes aquáticos. Infraestrutura completa: quiosques, bares, restaurantes, duchas. Aluguel de caiaques e stand-up paddle. À noite, barzinhos e sorveterias animam a orla.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20da%20Enseada%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=dZ5vxIODcns'
        },
        {
          name: 'Prainha (Praia da Saudade)',
          timeOnSite: '2–3 horas',
          totalTime: '2–4h',
          effort: 2,
          accessibility: 'Moderada',
          bestWindow: '9h–12h',
          description: 'Charmosa praia de ~200m rodeada por morros verdes. Reduto dos surfistas com ondas constantes. Beleza cênica com costões rochosos, infraestrutura boa com bares e restaurantes. Sambaqui pré-histórico sinalizado no canto direito.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20da%20Saudade%20Prainha%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=1zqI3c4f3lU'
        },
        {
          name: 'Praia Grande',
          timeOnSite: '2–3 horas',
          totalTime: '3–5h',
          effort: 2,
          accessibility: 'Difícil',
          bestWindow: '9h–12h',
          description: '17km de litoral selvagem e praticamente deserto. Ondas fortes, sem edificações (Parque Estadual do Acaraí). Acesso por estrada de terra, veículos 4x4 ou a pé. Paisagens intocadas: dunas brancas, restinga, piscinas naturais. Leve água e lanche.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20Grande%20S%C3%A3o%20Francisco%20do%20Sul%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=O9GdT1iH1nM'
        },
        {
          name: 'Praia do Ervino',
          timeOnSite: '2 horas',
          totalTime: '3–5h',
          effort: 2,
          accessibility: 'Moderada',
          bestWindow: '9h–12h',
          description: '6km de costa entre mar aberto e Lagoa do Linguado. Ondas moderadas, boa para banho e esportes. Infraestrutura local: mercados, bares, salva-vidas. Acesso pavimentado via BR-280. Tranquila e bucólica.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20do%20Ervino%20S%C3%A3o%20Francisco%20do%20Sul%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=HayyNTZWZ4c'
        },
        {
          name: 'Praia do Forte',
          timeOnSite: '1–2 horas',
          totalTime: '2–4h',
          effort: 2,
          accessibility: 'Boa',
          bestWindow: '9h–12h ou 14h–17h',
          description: 'Situada ao pé do Forte Marechal Luz (~1,2km). Mar incrivelmente calmo, ótima para crianças e stand-up paddle. Piscinas naturais rasas. Estacionamento e algumas barracas na alta temporada. Recanto sossegado.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20do%20Forte%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=KfPq0KXQH2Q'
        },
        {
          name: 'Praia de Ubatuba',
          timeOnSite: '2 horas',
          totalTime: '3–5h',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '9h–12h',
          description: 'Quase 3km de extensão. Águas limpas, ondulação moderada, boa para banho e iniciantes no surfe. Larga faixa de areia firme. Infraestrutura com quiosques e posto de salva-vidas. ~16km do centro, menos movimentada que Enseada.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Praia%20de%20Ubatuba%20S%C3%A3o%20Francisco%20do%20Sul%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=dZ5vxIODcns'
        }
      ],
      suggestedCombinations: [
        'Praia da Enseada (manhã) + Prainha (tarde)',
        'Praia do Forte + Visita ao Forte Marechal Luz',
        'Ubatuba + Itaguaçu (praias vizinhas em sequência)'
      ]
    },
    {
      id: 'passeios-barco',
      title: 'Passeios de Barco',
      attractions: [
        {
          name: 'Escuna Pirata Capitão Jack - Baía da Babitonga',
          timeOnSite: '4 horas',
          totalTime: '4–7h',
          effort: 1,
          accessibility: 'Moderada',
          bestWindow: '9h–15h',
          description: 'Aventura divertida navegando pelas ilhas da Baía da Babitonga. Barco de 3 andares estilo galeão pirata. Sai às 11h do Centro Histórico, percorre 14 ilhas com guia narrando histórias. Parada para almoço na Vila da Glória. Golfinhos frequentemente acompanham! Valor médio: R$60.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ilha%20da%20Paz%20Ba%C3%ADa%20da%20Babitonga%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=huEztQJJ7n0'
        }
      ],
      suggestedCombinations: [
        'Passeio de Escuna (manhã e tarde) + Centro Histórico (fim de tarde)',
        'Barco + Almoço na Vila da Glória + Retorno pelo Centro'
      ]
    },
    {
      id: 'natureza-ecoturismo',
      title: 'Natureza e Ecoturismo',
      attractions: [
        {
          name: 'Parque Estadual do Acaraí',
          timeOnSite: '2–4 horas',
          totalTime: '3–6h',
          effort: 3,
          accessibility: 'Difícil',
          bestWindow: '8h–12h',
          description: 'Protege 7.600 hectares de ecossistemas nativos: dunas, restingas, manguezais, praias e matas. Mais de 200 espécies de aves, capivaras, macacos-prego, jacarés-de-papo-amarelo. Trilhas de interpretação ecológica e travessia das dunas. Recomenda-se visita guiada.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque%20Estadual%20do%20Acara%C3%AD%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/watch?v=3Wk2xwz7cH0'
        },
        {
          name: 'Parque Ecológico Municipal Celso Amorim',
          timeOnSite: '1 hora',
          totalTime: '1h30–2h30',
          effort: 2,
          accessibility: 'Moderada',
          bestWindow: '9h–12h ou 16h–18h',
          description: 'Refúgio verde de 16 mil m² no Morro do Pão de Açúcar. ~400m de trilhas calçadas e escadarias levam a mirantes com vista do casario histórico, porto e baía. Ruínas da Capela de São José (séc. XVII). Parquinho infantil e espaço piquenique. Funciona das 8h às 20h.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque%20Ecol%C3%B3gico%20Morro%20do%20Hosp%C3%ADcio%20S%C3%A3o%20Francisco%20do%20Sul',
          youtubeUrl: 'https://www.youtube.com/shorts/OkZdJRqNtSk'
        }
      ],
      suggestedCombinations: [
        'Parque Acaraí (manhã) + Praia Grande (tarde)',
        'Parque Municipal + Centro Histórico (meio dia)',
        'Ecoturismo + Vila da Glória (dia completo de natureza)'
      ]
    },
    {
      id: 'joinville',
      title: 'Alternativas em Joinville',
      attractions: [
        {
          name: 'Mirante de Joinville (Morro da Boa Vista)',
          timeOnSite: '1h30',
          totalTime: '2–4h',
          effort: 2,
          accessibility: 'Moderada',
          bestWindow: '9h–12h ou 16h–18h',
          description: 'Localizado a 250m de altitude. Vista panorâmica 360° da cidade, Baía da Babitonga a leste e Serra do Mar a oeste. Acesso a pé (~40min por trilha pavimentada) ou ônibus panorâmico "Zarco" aos fins de semana. Torre de observação e passarela suspensa.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mirante%20Morro%20da%20Boa%20Vista%20Joinville%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=V8REr3FUfPY'
        },
        {
          name: 'Escola do Teatro Bolshoi no Brasil',
          timeOnSite: '1 hora',
          totalTime: '3–5h',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '10h–16h',
          description: 'Única filial do Teatro Bolshoi de Moscou fora da Rússia. Visitas guiadas segunda a sexta às 10h ou 14h30. Conheça salas de aula, ateliê de figurinos, história da instituição e metodologia russa de dança. Ingresso: R$30 (R$15 meia).',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Escola%20do%20Teatro%20Bolshoi%20Joinville%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=SHE2YeZLjK0'
        },
        {
          name: 'Café Colonial Rudnick',
          timeOnSite: '1h30–2h',
          totalTime: '3–5h',
          effort: 1,
          accessibility: 'Boa',
          bestWindow: '9h–12h',
          description: 'Autêntico café colonial na tradição germânica. Buffet com mais de 90 itens caseiros: pães, cucas alemãs, bolos, tortas, geleias, embutidos, queijos, pratos quentes. Destaque para cucas de banana e farofa, e strudel de maçã. À vontade aos sábados, domingos e feriados a partir das 15h.',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante%20Rudnick%20Joinville%20SC',
          youtubeUrl: 'https://www.youtube.com/watch?v=3LWH-TAKFNA'
        }
      ],
      suggestedCombinations: [
        'Mirante + Parque Zoobotânico (dia em Joinville)',
        'Visita ao Bolshoi + Rua das Palmeiras + Café Colonial',
        'Mirante (manhã) + Café Colonial Rudnick (tarde)'
      ]
    }
  ];

  return (
    <section id="turismo" className="py-24 bg-gradient-to-b from-white to-villa-sand">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Section */}
        <header className="text-center max-w-4xl mx-auto mb-12">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block" aria-label="Seção">
            Guia Turístico
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">
            Monte seu Roteiro de 1 a 3 Dias
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Explore São Francisco do Sul e região com informações completas para planejar seu passeio perfeito. 
            Tudo o que você precisa saber em um só lugar: horários, esforço físico, acessibilidade e links diretos.
          </p>
          
          {/* Quick Navigation */}
          <nav aria-label="Navegação por categorias" className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center gap-2 bg-white text-villa-deep px-4 py-2 rounded-full font-semibold text-sm hover:bg-villa-gold hover:scale-105 transition-all shadow-md"
              >
                <Compass className="w-4 h-4" />
                {category.title}
              </a>
            ))}
          </nav>
        </header>

        {/* Category Sections */}
        {categories.map((category, categoryIndex) => (
          <section 
            key={category.id} 
            id={category.id}
            className={`mb-20 ${categoryIndex > 0 ? 'scroll-mt-24' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-villa-deep mb-8 flex items-center gap-3">
              <span className="bg-villa-sea text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">
                {categoryIndex + 1}
              </span>
              {category.title}
            </h2>

            {/* Attractions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {category.attractions.map((attraction, index) => (
                <article
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-100"
                >
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-villa-deep mb-4">
                      {attraction.name}
                    </h3>

                    {/* Info Grid */}
                    <dl className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-villa-sea mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-slate-700">Tempo no local:</dt>
                          <dd className="text-slate-600">{attraction.timeOnSite}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-villa-sea mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-slate-700">Tempo total:</dt>
                          <dd className="text-slate-600">{attraction.totalTime}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-villa-sea mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-slate-700">Esforço:</dt>
                          <dd className="text-slate-600">{EFFORT_LABELS[attraction.effort]}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Accessibility className={`w-4 h-4 mt-0.5 flex-shrink-0 ${ACCESSIBILITY_COLORS[attraction.accessibility]}`} aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-slate-700">Acessibilidade:</dt>
                          <dd className={ACCESSIBILITY_COLORS[attraction.accessibility]}>{attraction.accessibility}</dd>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 col-span-2">
                        <Sun className="w-4 h-4 text-villa-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold text-slate-700">Melhor janela:</dt>
                          <dd className="text-slate-600">{attraction.bestWindow}</dd>
                        </div>
                      </div>
                    </dl>

                    {/* Description */}
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {attraction.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={attraction.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-villa-sea text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-villa-deep transition-colors flex-1 justify-center min-w-[140px]"
                        aria-label={`Abrir ${attraction.name} no Google Maps`}
                      >
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        Abrir no Maps
                      </a>
                      <a
                        href={attraction.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors flex-1 justify-center min-w-[140px]"
                        aria-label={`Ver vídeo sobre ${attraction.name} no YouTube`}
                      >
                        <Youtube className="w-4 h-4" aria-hidden="true" />
                        Ver no YouTube
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Suggested Combinations */}
            {category.suggestedCombinations.length > 0 && (
              <div className="bg-villa-gold/10 border-2 border-villa-gold/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-villa-deep mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-villa-sea" aria-hidden="true" />
                  Combinações Sugeridas
                </h3>
                <ul className="space-y-2">
                  {category.suggestedCombinations.map((combo, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-villa-sea font-bold mt-1" aria-hidden="true">→</span>
                      <span className="text-slate-700">{combo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Contact CTA */}
        <aside className="mt-16 bg-villa-deep text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Precisa de Ajuda para Montar seu Roteiro?</h2>
          <p className="text-villa-sand text-lg mb-6 max-w-2xl mx-auto">
            Nossa equipe conhece cada canto de São Francisco do Sul e pode ajudar você a aproveitar ao máximo sua estadia. 
            Entre em contato para dicas personalizadas!
          </p>
          <a 
            href={`https://wa.me/5547997158173?text=${encodeURIComponent('Olá! Gostaria de ajuda para montar meu roteiro turístico.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-villa-deep px-8 py-4 rounded-full font-bold text-lg hover:bg-villa-gold transition-all hover:scale-105"
          >
            <MapPin className="w-5 h-5" aria-hidden="true" />
            Fale Conosco via WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Tourism;
