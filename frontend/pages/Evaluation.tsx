
import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface EvaluationData {
  overallRating: number;
  cleanlinessRating: number;
  comfortRating: number;
  locationRating: number;
  valueRating: number;
  comment: string;
}

const Evaluation: React.FC = () => {
  const [evaluation, setEvaluation] = useState<EvaluationData>({
    overallRating: 0,
    cleanlinessRating: 0,
    comfortRating: 0,
    locationRating: 0,
    valueRating: 0,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const StarRating: React.FC<{
    rating: number;
    onRate: (rating: number) => void;
    label: string;
  }> = ({ rating, onRate, label }) => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          {label}
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRate(star)}
              className="transition-all transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? 'fill-villa-gold text-villa-gold'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least overall rating
    if (evaluation.overallRating === 0) {
      alert('Por favor, forneça uma avaliação geral.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/evaluations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...evaluation,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after a delay
        setTimeout(() => {
          setEvaluation({
            overallRating: 0,
            cleanlinessRating: 0,
            comfortRating: 0,
            locationRating: 0,
            valueRating: 0,
            comment: '',
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        alert('Erro ao enviar avaliação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('Erro ao enviar avaliação. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-villa-shell via-white to-villa-sand flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-villa-deep mb-4">
            Obrigado!
          </h2>
          <p className="text-slate-600 text-lg">
            Sua avaliação foi enviada com sucesso.
            <br />
            Agradecemos seu feedback!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-villa-shell via-white to-villa-sand py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-villa-gold/20 p-3 rounded-full">
              <Star className="w-8 h-8 text-villa-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-villa-deep">
                Avaliação Anônima
              </h1>
              <p className="text-slate-600 mt-1">
                Sua opinião é muito importante para nós!
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-villa-sea/10 rounded-lg border border-villa-sea/30">
            <p className="text-sm text-slate-600">
              Esta avaliação é completamente anônima. Suas respostas nos ajudarão a melhorar nossos serviços.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Overall Rating */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-villa-deep mb-6">
              Avaliação Geral
            </h3>
            <StarRating
              rating={evaluation.overallRating}
              onRate={(rating) => setEvaluation({ ...evaluation, overallRating: rating })}
              label="Como você avalia sua experiência geral?"
            />
          </div>

          {/* Detailed Ratings */}
          <div className="mb-8 pb-8 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-villa-deep mb-6">
              Avaliações Detalhadas
            </h3>
            
            <StarRating
              rating={evaluation.cleanlinessRating}
              onRate={(rating) => setEvaluation({ ...evaluation, cleanlinessRating: rating })}
              label="Limpeza"
            />
            
            <StarRating
              rating={evaluation.comfortRating}
              onRate={(rating) => setEvaluation({ ...evaluation, comfortRating: rating })}
              label="Conforto"
            />
            
            <StarRating
              rating={evaluation.locationRating}
              onRate={(rating) => setEvaluation({ ...evaluation, locationRating: rating })}
              label="Localização"
            />
            
            <StarRating
              rating={evaluation.valueRating}
              onRate={(rating) => setEvaluation({ ...evaluation, valueRating: rating })}
              label="Custo-Benefício"
            />
          </div>

          {/* Comment */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
              <MessageSquare className="w-4 h-4" />
              Comentários (opcional)
            </label>
            <textarea
              value={evaluation.comment}
              onChange={(e) => setEvaluation({ ...evaluation, comment: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-villa-sea focus:border-transparent outline-none transition-all resize-none"
              placeholder="Conte-nos mais sobre sua experiência..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-villa-deep text-white py-4 rounded-lg font-semibold hover:bg-villa-sea hover:text-villa-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </button>
        </form>

        {/* Privacy Note */}
        <div className="mt-8 bg-villa-sea/10 rounded-lg p-6 border border-villa-sea/30">
          <p className="text-sm text-slate-600 text-center">
            🔒 Sua avaliação é completamente anônima e confidencial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
