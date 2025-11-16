import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';

interface PaymentData {
  documentos: number[];
  total: number;
  descripciones: string[];
}

type PaymentStep = 'summary' | 'method' | 'card' | 'processing' | 'success' | 'error';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<PaymentStep>('summary');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    // Obtener datos del estado de navegación
    const state = location.state as PaymentData;
    if (state) {
      setPaymentData(state);
    } else {
      // Si no hay datos, redirigir a la pantalla principal
      const isLoggedIn = localStorage.getItem('usm_loggedIn') === 'true';
      navigate(isLoggedIn ? '/system' : '/');
    }
  }, [location, navigate]);

  const handleMethodSelect = (method: 'card' | 'transfer') => {
    if (method === 'card') {
      setStep('card');
    } else {
      // Para transferencia, simular procesamiento directo
      setStep('processing');
      setTimeout(() => {
        setStep('success');
      }, 2000);
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simular procesamiento del pago
    setTimeout(() => {
      // Simular éxito (90% probabilidad) o error (10%)
      const success = Math.random() > 0.1;
      setStep(success ? 'success' : 'error');
    }, 2500);
  };

  const handleCardInputChange = (field: keyof typeof cardData, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Formatear número de tarjeta con espacios cada 4 dígitos
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (field === 'expiry') {
      // Formatear MM/YY
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleFinish = () => {
    navigate('/system');
  };

  if (!paymentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header WebPay style */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">WebPay Plus</h1>
              <p className="text-blue-100 text-sm mt-1">Transbank - Pago Seguro</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>1</div>
              <div className={`w-20 h-1 ${step !== 'summary' ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                ['method', 'card', 'processing'].includes(step) ? 'bg-blue-600 text-white' : 
                ['success', 'error'].includes(step) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>2</div>
              <div className={`w-20 h-1 ${['card', 'processing', 'success', 'error'].includes(step) ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                ['processing', 'success', 'error'].includes(step) ? 
                  (step === 'success' ? 'bg-green-500 text-white' : step === 'error' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white') : 
                  'bg-gray-200 text-gray-600'
              }`}>3</div>
            </div>
          </div>

          {/* Summary Step */}
          {step === 'summary' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de Pago</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2">
                  {paymentData.descripciones.map((desc, idx) => (
                    <div key={idx} className="flex justify-between text-gray-700">
                      <span>{desc}</span>
                      <span className="font-medium">Documento #{paymentData.documentos[idx]}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total a Pagar:</span>
                    <span className="text-2xl font-bold text-usm-red">
                      ${paymentData.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Comercio:</strong> Universidad Técnica Federico Santa María
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Orden de compra:</strong> {Date.now().toString().slice(-8)}
                </p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => navigate('/system')} className="bg-gray-500 hover:bg-gray-600">
                  Cancelar
                </Button>
                <Button onClick={() => setStep('method')} className="flex-1">
                  Continuar con el Pago
                </Button>
              </div>
            </div>
          )}

          {/* Method Selection Step */}
          {step === 'method' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona Método de Pago</h2>
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => handleMethodSelect('card')}
                  className="w-full border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded p-3">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Tarjeta de Crédito o Débito</h3>
                        <p className="text-sm text-gray-600">Visa, Mastercard, RedCompra</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => handleMethodSelect('transfer')}
                  className="w-full border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 rounded p-3">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Transferencia Bancaria</h3>
                        <p className="text-sm text-gray-600">Pago directo desde tu banco</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
              <Button onClick={() => setStep('summary')} className="bg-gray-500 hover:bg-gray-600 w-full">
                Volver
              </Button>
            </div>
          )}

          {/* Card Input Step */}
          {step === 'card' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos de la Tarjeta</h2>
              <form onSubmit={handleCardSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => handleCardInputChange('number', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value.toUpperCase())}
                      placeholder="JUAN PEREZ"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                        placeholder="MM/AA"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-yellow-800">
                    🔒 Tus datos están protegidos con encriptación SSL. Esta es una simulación de pago.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button type="button" onClick={() => setStep('method')} className="bg-gray-500 hover:bg-gray-600">
                    Volver
                  </Button>
                  <Button type="submit" className="flex-1">
                    Pagar ${paymentData.total.toLocaleString()}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Procesando Pago...</h2>
              <p className="text-gray-600">Por favor espera, estamos procesando tu transacción</p>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-600 mb-4">Tu transacción ha sido procesada correctamente</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Monto:</strong> ${paymentData.total.toLocaleString()}</p>
                  <p><strong>Número de transacción:</strong> {Date.now().toString().slice(-10)}</p>
                  <p><strong>Fecha:</strong> {new Date().toLocaleString('es-CL')}</p>
                </div>
              </div>
              <Button onClick={handleFinish} className="w-full">
                Volver a Cargos
              </Button>
            </div>
          )}

          {/* Error Step */}
          {step === 'error' && (
            <div className="text-center py-8">
              <div className="inline-block bg-red-100 rounded-full p-4 mb-4">
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pago Rechazado</h2>
              <p className="text-gray-600 mb-4">No se pudo procesar tu transacción. Por favor intenta nuevamente.</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  Posibles causas: Fondos insuficientes, tarjeta bloqueada o datos incorrectos.
                </p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => setStep('method')} className="flex-1 bg-gray-500 hover:bg-gray-600">
                  Intentar Nuevamente
                </Button>
                <Button onClick={() => navigate('/system')} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

