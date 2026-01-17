import React, { useState } from 'react';
import { X, RefreshCw, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ROOMS } from '../constants';
import { CORS_PROXY_URL } from '../config';
// @ts-ignore
import ICAL from 'ical.js';

interface SourceData {
  source_name: string;
  url: string | null;
  raw_ics: string | null;
  error: string | null;
  fetched_at: string | null;
  events_count: number | null;
  parsed_events: Array<{
    start: string;
    end: string;
    source: string;
  }> | null;
}

interface AuditData {
  unit_id: string;
  unit_name: string;
  sources: Record<string, SourceData>;
  fetched_at: string;
}

interface CalendarAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
}

const CalendarAuditModal: React.FC<CalendarAuditModalProps> = ({ isOpen, onClose, roomId, roomName }) => {
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parsed' | 'raw'>('parsed');
  const [selectedSource, setSelectedSource] = useState<string>('');

  React.useEffect(() => {
    if (isOpen && !auditData) {
      fetchAuditData();
    }
  }, [isOpen, roomId]);

  const fetchAuditData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Find the room by ID
      const room = ROOMS.find(r => r.id === roomId);
      if (!room) {
        throw new Error('Quarto não encontrado');
      }

      const fetchedAt = new Date().toISOString();
      const sources: Record<string, SourceData> = {};

      // Fetch Airbnb calendar if available
      if (room.calendarUrl) {
        try {
          const response = await fetch(CORS_PROXY_URL + encodeURIComponent(room.calendarUrl));
          
          if (response.ok) {
            const icalData = await response.text();
            const jcalData = ICAL.parse(icalData);
            const comp = new ICAL.Component(jcalData);
            const vevents = comp.getAllSubcomponents('vevent');

            const parsedEvents = vevents.map((vevent: any) => {
              const event = new ICAL.Event(vevent);
              return {
                start: event.startDate.toJSDate().toISOString().split('T')[0],
                end: event.endDate.toJSDate().toISOString().split('T')[0],
                source: 'airbnb'
              };
            });

            sources.airbnb = {
              source_name: 'airbnb',
              url: room.calendarUrl,
              raw_ics: icalData,
              error: null,
              fetched_at: fetchedAt,
              events_count: parsedEvents.length,
              parsed_events: parsedEvents
            };
          } else {
            sources.airbnb = {
              source_name: 'airbnb',
              url: room.calendarUrl,
              raw_ics: null,
              error: `Erro ao buscar calendário: ${response.status}`,
              fetched_at: fetchedAt,
              events_count: null,
              parsed_events: null
            };
          }
        } catch (err) {
          sources.airbnb = {
            source_name: 'airbnb',
            url: room.calendarUrl,
            raw_ics: null,
            error: err instanceof Error ? err.message : 'Erro desconhecido',
            fetched_at: fetchedAt,
            events_count: null,
            parsed_events: null
          };
        }
      }

      // Fetch Booking.com calendar if available
      if (room.bookingCalendarUrl) {
        try {
          const response = await fetch(CORS_PROXY_URL + encodeURIComponent(room.bookingCalendarUrl));
          
          if (response.ok) {
            const icalData = await response.text();
            const jcalData = ICAL.parse(icalData);
            const comp = new ICAL.Component(jcalData);
            const vevents = comp.getAllSubcomponents('vevent');

            const parsedEvents = vevents.map((vevent: any) => {
              const event = new ICAL.Event(vevent);
              return {
                start: event.startDate.toJSDate().toISOString().split('T')[0],
                end: event.endDate.toJSDate().toISOString().split('T')[0],
                source: 'booking'
              };
            });

            sources.booking = {
              source_name: 'booking',
              url: room.bookingCalendarUrl,
              raw_ics: icalData,
              error: null,
              fetched_at: fetchedAt,
              events_count: parsedEvents.length,
              parsed_events: parsedEvents
            };
          } else {
            sources.booking = {
              source_name: 'booking',
              url: room.bookingCalendarUrl,
              raw_ics: null,
              error: `Erro ao buscar calendário: ${response.status}`,
              fetched_at: fetchedAt,
              events_count: null,
              parsed_events: null
            };
          }
        } catch (err) {
          sources.booking = {
            source_name: 'booking',
            url: room.bookingCalendarUrl,
            raw_ics: null,
            error: err instanceof Error ? err.message : 'Erro desconhecido',
            fetched_at: fetchedAt,
            events_count: null,
            parsed_events: null
          };
        }
      }

      // Create audit data
      const data: AuditData = {
        unit_id: roomId,
        unit_name: roomName,
        sources: sources,
        fetched_at: fetchedAt
      };

      setAuditData(data);
      
      // Set first available source as selected
      const sourceKeys = Object.keys(sources);
      if (sourceKeys.length > 0) {
        setSelectedSource(sourceKeys[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('pt-BR', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (!isOpen) return null;

  const selectedSourceData = auditData && selectedSource ? auditData.sources[selectedSource] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-villa-deep text-white">
          <div className="flex items-center gap-3">
            <Calendar size={24} />
            <div>
              <h2 className="text-2xl font-bold">Auditoria de Calendário</h2>
              <p className="text-sm opacity-90">{roomName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-villa-sea"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-red-900">Erro ao carregar dados</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {auditData && !loading && (
            <div className="space-y-6">
              {/* Sync Info */}
              <div className="bg-villa-shell rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-villa-sea" />
                  <span className="text-sm text-slate-600">
                    Última atualização: <span className="font-semibold">{formatDate(auditData.fetched_at)}</span>
                  </span>
                </div>
                <button
                  onClick={fetchAuditData}
                  disabled={loading}
                  className="flex items-center gap-2 bg-villa-sea text-white px-4 py-2 rounded-lg hover:bg-villa-deep transition-all disabled:opacity-50"
                >
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                  Atualizar
                </button>
              </div>

              {/* Source Tabs */}
              <div className="flex gap-2 border-b border-slate-200">
                {Object.keys(auditData.sources).map((sourceName) => {
                  const source = auditData.sources[sourceName];
                  const isActive = selectedSource === sourceName;
                  const hasError = !!source.error;
                  
                  return (
                    <button
                      key={sourceName}
                      onClick={() => setSelectedSource(sourceName)}
                      className={`px-4 py-3 font-semibold flex items-center gap-2 border-b-2 transition-all ${
                        isActive 
                          ? 'border-villa-sea text-villa-sea' 
                          : 'border-transparent text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {sourceName.charAt(0).toUpperCase() + sourceName.slice(1)}
                      {hasError ? (
                        <AlertCircle size={16} className="text-red-500" />
                      ) : (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Source Details */}
              {selectedSourceData && (
                <div className="space-y-4">
                  {/* Source Status */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">
                          {selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          URL: <span className="font-mono text-xs">{selectedSourceData.url || 'N/A'}</span>
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedSourceData.error 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {selectedSourceData.error ? (
                          <>
                            <AlertCircle size={14} />
                            Erro
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} />
                            OK
                          </>
                        )}
                      </div>
                    </div>
                    
                    {selectedSourceData.error && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">{selectedSourceData.error}</p>
                      </div>
                    )}
                    
                    {!selectedSourceData.error && (
                      <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200">
                        <div>
                          <p className="text-xs text-slate-500">Eventos encontrados</p>
                          <p className="text-lg font-bold text-villa-deep">{selectedSourceData.events_count || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Última busca</p>
                          <p className="text-sm font-semibold text-slate-700">{formatDate(selectedSourceData.fetched_at)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Tabs */}
                  {!selectedSourceData.error && (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveTab('parsed')}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            activeTab === 'parsed'
                              ? 'bg-villa-sea text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Dados Interpretados
                        </button>
                        <button
                          onClick={() => setActiveTab('raw')}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            activeTab === 'raw'
                              ? 'bg-villa-sea text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Dados Originais (ICS)
                        </button>
                      </div>

                      {/* Parsed View */}
                      {activeTab === 'parsed' && selectedSourceData.parsed_events && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-900 mb-3">
                            Períodos Bloqueados ({selectedSourceData.parsed_events.length})
                          </h4>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {selectedSourceData.parsed_events.map((event, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-slate-900">Período #{idx + 1}</p>
                                  <p className="text-sm text-slate-600 mt-1">
                                    {formatDateShort(event.start)} até {formatDateShort(event.end)}
                                  </p>
                                </div>
                                <span className="text-xs px-2 py-1 bg-villa-sea/10 text-villa-sea rounded font-mono">
                                  {event.source}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Raw View */}
                      {activeTab === 'raw' && selectedSourceData.raw_ics && (
                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                            {selectedSourceData.raw_ics}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarAuditModal;
