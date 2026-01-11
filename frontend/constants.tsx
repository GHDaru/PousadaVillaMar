
import { Wifi, Wind, Home, ShieldCheck, MapPin, Utensils, PawPrint, Car } from 'lucide-react';
import { Amenity, Room } from './types';

export const BRAND = {
  name: 'Pousada Villa & Mar',
  slogan: 'Aconchego de casa, a poucos passos do mar.',
  tagline: 'Seu lugar de descanso entre o mar e a rotina.',
  address: 'Rua Jaguaruna, 244, Ubatuba, São Francisco do Sul - SC',
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
    id: 'quarto-01',
    name: 'Quarto 01',
    description: 'Quarto triplo confortável com ventilador e boa ventilação.',
    isSuite: false,
    features: ['3 Camas', 'Ventilador de Teto', 'Wi-Fi de Alta Velocidade'],
    imageUrl: '/fotos/foto05Quarto 5.jpeg',
    images: ['/fotos/foto05Quarto 5.jpeg'],
    price: 'R$ 250 (semana) | R$ 300 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/pousada-villa-amp-mar.html',
    airbnbUrl: 'http://airbnb.com.br/h/pousadavillamarquarto01',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1577701985478063999.ics?t=597bab833fa347ed9127801a6476e98e',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export/t/5d7051ab-b226-4e57-8042-a2a95cbc8173.ics'
  },
  {
    id: 'quarto-02',
    name: 'Suíte',
    description: 'Suíte privativa com ventilador e boa ventilação.',
    isSuite: true,
    features: ['Ventilador de Teto', 'Janela Ampla', 'Wi-Fi de Alta Velocidade', 'Banheiro Privativo'],
    imageUrl: '/fotos/foto07suite.jpeg',
    images: ['/fotos/foto07suite.jpeg', '/fotos/foto09banheiro inferior.jpeg'],
    price: 'R$ 400 (semana) | R$ 500 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/pousada-villa-amp-mar.html',
    airbnbUrl: 'http://airbnb.com.br/h/pousadavillamarquarto02',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1577496625832142262.ics?t=b7bca0b4b48e46d690d0c35ca9eb1863',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export/t/6088b75e-dfef-424c-a2da-87532f072500.ics'
  },
  {
    id: 'quarto-03',
    name: 'Quarto 03',
    description: 'Quarto triplo ideal para família ou amigos.',
    isSuite: false,
    features: ['3 Camas', 'Ventilador de Teto', 'Acesso à Sacada', 'Wi-Fi'],
    imageUrl: '/fotos/foto04Quarto 3.jpeg',
    images: ['/fotos/foto04Quarto 3.jpeg', '/fotos/foto06sala de tv.jpeg'],
    price: 'R$ 250 (semana) | R$ 300 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/pousada-villa-amp-mar-sao-francisco-do-sul.html',
    airbnbUrl: 'http://airbnb.com.br/h/pousadavillamarquarto03',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1577709261261094364.ics?t=d80783b6954c43bfa9b468ea75ccb62a',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export/t/d1e4f8de-3767-4266-aa37-d09b88aaafd2.ics'
  },
  {
    id: 'quarto-04',
    name: 'Quarto 04',
    description: 'Quarto triplo com ventilador de teto e acesso à sacada.',
    isSuite: false,
    features: ['3 Camas', 'Ventilador de Teto', 'Acesso à Sacada', 'Wi-Fi'],
    imageUrl: '/fotos/foto05Quarto 5.jpeg',
    images: ['/fotos/foto05Quarto 5.jpeg', '/fotos/foto10banheiro superior.jpeg'],
    price: 'R$ 250 (semana) | R$ 300 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/pousada-villa-amp-mar-sao-francisco-do-sul1.html',
    airbnbUrl: 'http://airbnb.com.br/h/pousadavillamarquarto04',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1577719684425718870.ics?t=e1a97193262b4f6f8b3f7b71e4c1efb0',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export?t=ad77d862-1714-4393-96ae-13631b97b4cb'
  },
  {
    id: 'quarto-05',
    name: 'Quarto 05',
    description: 'Quarto triplo simples e confortável.',
    isSuite: false,
    features: ['3 Camas', 'Ventilador de Teto', 'Wi-Fi de Alta Velocidade'],
    imageUrl: '/fotos/foto04Quarto 3.jpeg',
    images: ['/fotos/foto04Quarto 3.jpeg'],
    price: 'R$ 250 (semana) | R$ 300 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/pousada-villa-amp-mar-sao-francisco-do-sul.html',
    airbnbUrl: 'http://airbnb.com.br/h/pousadavillamarquarto05',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1577524765430860187.ics?t=a564442d42254112b1f05ac5fe58d381',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export/t/b84506ba-e419-4889-9954-ee8ef44d81fc.ics'
  },
  {
    id: 'pousada-festas',
    name: 'Pousada Inteira para Festas',
    description: 'Toda a pousada para você e seus convidados celebrarem.',
    isSuite: false,
    features: ['5 Quartos', '6 Camas', '3 Banheiros', 'Área Gourmet', 'Garagem Coberta', 'Ideal para Eventos'],
    imageUrl: '/fotos/foto01sala estar.jpeg',
    images: ['/fotos/foto01sala estar.jpeg'],
    price: 'R$ 1.200 (semana) | R$ 1.500 (fim de semana)',
    bookingUrl: 'http://www.booking.com/hotel/br/casa-de-praia-ubatuba-e-enseada-300m-da-praia.html',
    airbnbUrl: 'http://airbnb.com.br/h/casapraiaubatubaenseada',
    calendarUrl: 'https://www.airbnb.com.br/calendar/ical/1574971972320007707.ics?t=b1598b7d86534da2b819293cdd1456f9',
    bookingCalendarUrl: 'https://ical.booking.com/v1/export/t/c9bdd689-d2ce-4a8a-a390-11867aa6b349.ics'
  }
];
