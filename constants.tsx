
import { Wifi, Wind, Home, ShieldCheck, MapPin, Utensils, PawPrint, Car } from 'lucide-react';
import { Amenity, Room } from './types';

export const BRAND = {
  name: 'Pousada Villa & Mar',
  slogan: 'Aconchego de casa, a poucos passos do mar.',
  tagline: 'Seu lugar de descanso entre o mar e a rotina.',
  address: 'São Francisco do Sul - SC',
  contact: 'Susana Moreira',
  phone: '(47) 99715-8173',
  phoneFormatted: '+5547997158173',
  airbnbUrl: 'http://airbnb.com.br/h/casapraiaubatubaenseada',
  bookingUrl: 'https://www.booking.com',
  email: 'contato@villamarenseada.com.br',
  capacity: '13 hóspedes',
  rooms: '5 quartos',
  beds: '6 camas',
  bathrooms: '3 banheiros',
  checkIn: '13:00',
  checkOut: '11:00',
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
    title: 'Wi-Fi Rápido',
    description: 'Conexão estável e rápida em toda a propriedade, ideal para trabalho remoto.'
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: 'Ventiladores em Todos os Quartos',
    description: 'Todos os dormitórios equipados com ventiladores para seu conforto.'
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: 'Área Gourmet',
    description: 'Churrasqueira de alvenaria com bancada e espaço coberto para reunir o grupo.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Segurança Privada',
    description: 'Rondas noturnas e ambiente monitorado para sua tranquilidade.'
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: 'Garagem Segura',
    description: 'Garagem coberta e ampla no térreo com espaço para manobra.'
  },
  {
    icon: <PawPrint className="w-6 h-6" />,
    title: 'Pet Friendly',
    description: 'Seu pet é bem-vindo! Traga toda a família para aproveitar.'
  }
];

export const ROOMS: Room[] = [
  {
    id: 'suite-premium',
    name: 'Suíte',
    description: 'Quarto confortável com ventilador e boa ventilação.',
    isSuite: true,
    features: ['Ventilador de Teto', 'Janela Ampla', 'Wi-Fi de Alta Velocidade', 'Banheiro Privativo'],
    imageUrl: '/fotos/foto07suite.jpeg',
    images: ['/fotos/foto07suite.jpeg', '/fotos/foto09banheiro inferior.jpeg'],
    price: 'Consulte disponibilidade'
  },
  {
    id: 'quarto-familia',
    name: 'Quarto Família',
    description: 'Ideal para família: cama de casal + solteiro com ventilador de teto e acesso à sacada.',
    isSuite: false,
    features: ['Cama de Casal + Solteiro', 'Ventilador de Teto', 'Acesso à Sacada', 'Wi-Fi'],
    imageUrl: '/fotos/foto04Quarto 3.jpeg',
    images: ['/fotos/foto04Quarto 3.jpeg', '/fotos/foto06sala de tv.jpeg'],
    price: 'Consulte disponibilidade'
  },
  {
    id: 'quarto-duplo',
    name: 'Quarto com Duas Camas',
    description: 'Quarto com duas camas de solteiro, ótimo para amigos ou crianças.',
    isSuite: false,
    features: ['2 Camas de Solteiro', 'Ventilador de Teto', 'Acesso à Sacada', 'Wi-Fi'],
    imageUrl: '/fotos/foto05Quarto 5.jpeg',
    images: ['/fotos/foto05Quarto 5.jpeg', '/fotos/foto10banheiro superior.jpeg'],
    price: 'Consulte disponibilidade'
  },
  {
    id: 'quarto-casal',
    name: 'Quarto Casal',
    description: 'Quarto aconchegante com cama de casal, perfeito para casais.',
    isSuite: false,
    features: ['Cama de Casal', 'Ventilador de Teto', 'Janela Ampla', 'Wi-Fi'],
    imageUrl: '/fotos/foto04Quarto 3.jpeg',
    images: ['/fotos/foto04Quarto 3.jpeg'],
    price: 'Consulte disponibilidade'
  },
  {
    id: 'quarto-standard',
    name: 'Quarto Standard',
    description: 'Quarto simples e confortável com cama de solteiro.',
    isSuite: false,
    features: ['Cama de Solteiro', 'Ventilador de Teto', 'Wi-Fi de Alta Velocidade'],
    imageUrl: '/fotos/foto05Quarto 5.jpeg',
    images: ['/fotos/foto05Quarto 5.jpeg'],
    price: 'Consulte disponibilidade'
  }
];
