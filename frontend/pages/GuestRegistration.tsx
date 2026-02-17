
import React, { useState } from 'react';
import { UserPlus, Phone, MapPin, Calendar, Trash2, Save } from 'lucide-react';

interface Guest {
  name: string;
  phone: string;
  origin: string;
  birthDate: string;
}

const GuestRegistration: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([
    { name: '', phone: '', origin: '', birthDate: '' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const addGuest = () => {
    setGuests([...guests, { name: '', phone: '', origin: '', birthDate: '' }]);
  };

  const removeGuest = (index: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    }
  };

  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index][field] = value;
    setGuests(updatedGuests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one guest has all required fields
    const validGuests = guests.filter(g => g.name && g.phone && g.origin && g.birthDate);
    
    if (validGuests.length === 0) {
      setSubmitMessage({ type: 'error', text: 'Por favor, preencha todos os campos de pelo menos um hóspede.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/guests/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guests: validGuests }),
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Cadastro realizado com sucesso!' });
        // Reset form
        setGuests([{ name: '', phone: '', origin: '', birthDate: '' }]);
      } else {
        setSubmitMessage({ type: 'error', text: 'Erro ao enviar cadastro. Tente novamente.' });
      }
    } catch (error) {
      console.error('Error submitting guests:', error);
      setSubmitMessage({ type: 'error', text: 'Erro ao enviar cadastro. Verifique sua conexão.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-villa-shell via-white to-villa-sand py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-villa-sea/20 p-3 rounded-full">
              <UserPlus className="w-8 h-8 text-villa-deep" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-villa-deep">
                Cadastro de Hóspedes
              </h1>
              <p className="text-slate-600 mt-1">
                Preencha os dados de todos os hóspedes que irão se hospedar.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {guests.map((guest, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-villa-deep">
                  Hóspede {index + 1}
                </h3>
                {guests.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGuest(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <UserPlus className="w-4 h-4" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => updateGuest(index, 'name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-villa-sea focus:border-transparent outline-none transition-all"
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={guest.phone}
                    onChange={(e) => updateGuest(index, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-villa-sea focus:border-transparent outline-none transition-all"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                {/* Origin */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    Local de Origem
                  </label>
                  <input
                    type="text"
                    value={guest.origin}
                    onChange={(e) => updateGuest(index, 'origin', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-villa-sea focus:border-transparent outline-none transition-all"
                    placeholder="Cidade - Estado"
                    required
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={guest.birthDate}
                    onChange={(e) => updateGuest(index, 'birthDate', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-villa-sea focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Guest Button */}
          <button
            type="button"
            onClick={addGuest}
            className="w-full py-4 border-2 border-dashed border-villa-sea text-villa-deep font-semibold rounded-lg hover:bg-villa-sea/10 transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Adicionar Outro Hóspede
          </button>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-4 rounded-lg ${
              submitMessage.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitMessage.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-villa-deep text-white py-4 rounded-lg font-semibold hover:bg-villa-sea hover:text-villa-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
          </button>
        </form>

        {/* Info Footer */}
        <div className="mt-8 bg-villa-sea/10 rounded-lg p-6 border border-villa-sea/30">
          <p className="text-sm text-slate-600 text-center">
            Os dados fornecidos serão utilizados apenas para fins de cadastro e hospedagem.
            <br />
            Seus dados estão protegidos e não serão compartilhados com terceiros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestRegistration;
