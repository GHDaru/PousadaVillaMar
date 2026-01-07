import React, { useState, useEffect } from 'react';
import { ROOMS } from '../constants';
import { Calendar } from 'lucide-react';
import { getRoomPrice, isWeekend, isSpecialDate } from '../pricing';
// @ts-ignore
import ICAL from 'ical.js';

interface RoomAvailability {
  roomId: string;
  roomName: string;
  availability: { [date: string]: boolean }; // true = available, false = booked
}

const Availability: React.FC = () => {
  const [availabilityData, setAvailabilityData] = useState<RoomAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError(null);

      // Generate next 30 days
      const today = new Date();
      const next30Days: string[] = [];
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        next30Days.push(date.toISOString().split('T')[0]);
      }
      setDates(next30Days);

      // Fetch availability for each room with calendar URL
      const roomsWithCalendars = ROOMS.filter(room => room.calendarUrl);
      const availabilityPromises = roomsWithCalendars.map(async (room) => {
        try {
          // Use a CORS proxy for fetching iCal data
          const proxyUrl = 'https://corsproxy.io/?';
          const response = await fetch(proxyUrl + encodeURIComponent(room.calendarUrl!));
          
          if (!response.ok) {
            console.warn(`Failed to fetch calendar for ${room.name}`);
            return {
              roomId: room.id,
              roomName: room.name,
              availability: Object.fromEntries(next30Days.map(date => [date, true]))
            };
          }

          const icalData = await response.text();
          const jcalData = ICAL.parse(icalData);
          const comp = new ICAL.Component(jcalData);
          const vevents = comp.getAllSubcomponents('vevent');

          // Initialize all dates as available
          const availability: { [date: string]: boolean } = {};
          next30Days.forEach(date => {
            availability[date] = true;
          });

          // Mark booked dates
          vevents.forEach((vevent: any) => {
            const event = new ICAL.Event(vevent);
            const startDate = event.startDate.toJSDate();
            const endDate = event.endDate.toJSDate();

            // Mark all dates in the range as booked
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
              const dateStr = currentDate.toISOString().split('T')[0];
              if (availability[dateStr] !== undefined) {
                availability[dateStr] = false;
              }
              // Create a new date object to avoid setDate() issues across months
              currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
            }
          });

          return {
            roomId: room.id,
            roomName: room.name,
            availability
          };
        } catch (err) {
          console.error(`Error fetching calendar for ${room.name}:`, err);
          return {
            roomId: room.id,
            roomName: room.name,
            availability: Object.fromEntries(next30Days.map(date => [date, true]))
          };
        }
      });

      const results = await Promise.all(availabilityPromises);
      setAvailabilityData(results);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching availability:', err);
      setError('Não foi possível carregar a disponibilidade. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  if (loading) {
    return (
      <section id="disponibilidade" className="py-24 bg-villa-shell">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Disponibilidade</span>
            <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Consulte a Disponibilidade</h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-villa-sea"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="disponibilidade" className="py-24 bg-villa-shell">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Disponibilidade</span>
            <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Consulte a Disponibilidade</h2>
          </div>
          <div className="text-center text-red-600 py-12">
            <p>{error}</p>
            <button 
              onClick={fetchAvailability}
              className="mt-4 bg-villa-sea text-white px-6 py-3 rounded-xl font-semibold hover:bg-villa-deep transition-all"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="disponibilidade" className="py-24 bg-villa-shell">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-villa-sea uppercase tracking-widest text-sm font-bold mb-4 block">Disponibilidade</span>
          <h2 className="text-4xl md:text-5xl font-bold text-villa-deep mb-6">Consulte a Disponibilidade</h2>
          <p className="text-slate-600">Verifique a disponibilidade dos próximos 30 dias para cada quarto.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-villa-deep text-white">
                  <th className="sticky left-0 bg-villa-deep z-10 px-4 py-4 text-left font-bold">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      Quarto
                    </div>
                  </th>
                  {dates.map((date) => {
                    const isWeekendDate = isWeekend(date);
                    const isSpecial = isSpecialDate(date);
                    const isHighlighted = isWeekendDate || isSpecial;
                    
                    return (
                      <th 
                        key={date} 
                        className={`px-2 py-4 text-center min-w-[70px] ${
                          isHighlighted ? 'bg-villa-gold/20' : ''
                        }`}
                      >
                        <div className={`text-xs font-bold ${isHighlighted ? 'text-villa-gold' : ''}`}>
                          {getDayOfWeek(date)}
                        </div>
                        <div className="text-sm">{formatDate(date)}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {availabilityData.map((room, idx) => (
                  <tr key={room.roomId} className={idx % 2 === 0 ? 'bg-white' : 'bg-villa-shell/30'}>
                    <td className="sticky left-0 z-10 px-4 py-4 font-semibold text-villa-deep border-r-2 border-villa-shell" 
                        style={{ backgroundColor: idx % 2 === 0 ? 'white' : 'rgba(243, 244, 246, 0.3)' }}>
                      {room.roomName}
                    </td>
                    {dates.map((date) => {
                      const isAvailable = room.availability[date];
                      const price = getRoomPrice(room.roomId, date);
                      const isWeekendDate = isWeekend(date);
                      const isSpecial = isSpecialDate(date);
                      const isHighlighted = isWeekendDate || isSpecial;
                      
                      return (
                        <td 
                          key={date} 
                          className={`px-2 py-3 text-center ${
                            isHighlighted ? 'bg-villa-gold/10' : ''
                          }`}
                        >
                          <div 
                            className={`w-full h-auto rounded-lg mx-auto flex flex-col items-center justify-center p-2 ${
                              isAvailable 
                                ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                                : 'bg-red-100 text-red-700 border-2 border-red-300'
                            }`}
                            title={isAvailable ? `Disponível - R$ ${price}` : 'Reservado'}
                          >
                            <span className="font-bold text-xs">
                              {isAvailable ? '✓' : '✗'}
                            </span>
                            {isAvailable && price && (
                              <span className="text-[10px] mt-1 font-semibold opacity-70">
                                R$ {price}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-6 bg-villa-shell/50 border-t-2 border-villa-shell">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-green-100 border-2 border-green-300 flex items-center justify-center text-green-700 font-bold text-xs">✓</div>
              <span className="text-sm text-slate-600">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-100 border-2 border-red-300 flex items-center justify-center text-red-700 font-bold text-xs">✗</div>
              <span className="text-sm text-slate-600">Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-villa-gold/20 border-2 border-villa-gold/50"></div>
              <span className="text-sm text-slate-600">Final de semana / Data especial</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            A disponibilidade é atualizada em tempo real a partir dos calendários do Booking.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Availability;
