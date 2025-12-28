
import React from 'react';
import { Wifi, Wind, Coffee, ShieldCheck, MapPin, Phone, Clock, Home, Bed, User } from 'lucide-react';
import { Amenity, Room } from './types';

export const BRAND = {
  name: 'Pousada Villa & Mar',
  slogan: 'Aconchego de casa, a poucos passos do mar.',
  tagline: 'Seu lugar de descanso entre o mar e a rotina.',
  address: 'Rua Jaguaruna, 244 - Ubatuba, São Francisco do Sul - SC',
  contact: 'Susana Moreira',
  phone: '47 997158173',
  phoneFormatted: '+5547997158173',
  airbnbUrl: 'http://airbnb.com.br/h/casapraiaubatubaenseada',
};

export const LOGO_SVG = (className?: string) => (
  <svg viewBox="0 0 200 100" className={className || "w-full h-full"} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized House */}
    <path d="M40 70V45L70 30L100 45V70H40Z" className="fill-villa-deep" />
    <rect x="62" y="55" width="16" height="15" className="fill-white" />
    {/* Waves */}
    <path d="M20 75C40 65 60 85 80 75C100 65 120 85 140 75" className="stroke-villa-sea" strokeWidth="4" strokeLinecap="round" />
    <path d="M30 82C50 72 70 92 90 82C110 72 130 92 150 82" className="stroke-villa-sea opacity-60" strokeWidth="4" strokeLinecap="round" />
    {/* Minimal Sun */}
    <circle cx="110" cy="25" r="10" className="fill-villa-gold opacity-80" />
    <line x1="110" y1="10" x2="110" y2="5" className="stroke-villa-gold" strokeWidth="2" />
    <line x1="125" y1="25" x2="130" y2="25" className="stroke-villa-gold" strokeWidth="2" />
    <line x1="120" y1="15" x2="124" y2="11" className="stroke-villa-gold" strokeWidth="2" />
  </svg>
);

export const AMENITIES: Amenity[] = [
  {
    icon: <Wifi className="w-6 h-6" />,
    title: 'Wi-Fi de Alta Qualidade',
    description: 'Conexão estável ideal para trabalho remoto e streaming.'
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: 'Ventilação',
    description: 'Todos os quartos equipados com ventiladores potentes.'
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'Café da Manhã',
    description: 'Aconchego com sabores caseiros feitos com carinho.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Segurança e Conforto',
    description: 'Atendimento 24 horas e ambiente familiar monitorado.'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Localização Privilegiada',
    description: 'Situada em Ubatuba (Enseada), a poucos passos da praia.'
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: 'Casa Completa',
    description: 'Opção de locação da casa inteira para famílias grandes.'
  }
];

export const ROOMS: Room[] = [
  {
    id: 'suite-premium',
    name: 'Suíte Master',
    description: 'O máximo de privacidade e conforto com banheiro exclusivo.',
    isSuite: true,
    features: ['Banheiro Privativo', 'Ventilador', 'Cama de Casal', 'Mesa de Trabalho'],
    imageUrl: 'https://picsum.photos/id/274/800/600'
  },
  {
    id: 'quarto-familia',
    name: 'Quarto Família',
    description: 'Espaçoso, ideal para quem viaja com filhos.',
    isSuite: false,
    features: ['Banheiro Compartilhado', 'Ventilador', 'Cama de Casal + Solteiro'],
    imageUrl: 'https://picsum.photos/id/296/800/600'
  },
  {
    id: 'quarto-executivo',
    name: 'Quarto Executivo',
    description: 'Silencioso e prático, perfeito para quem busca foco.',
    isSuite: false,
    features: ['Banheiro Compartilhado', 'Ventilador', 'Mesa de Trabalho', 'Silencioso'],
    imageUrl: 'https://picsum.photos/id/164/800/600'
  }
];
