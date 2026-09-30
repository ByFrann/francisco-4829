import React,{ useState } from "react";
import type { User } from "../types";

//
interface SnailPayModalProps {
    user: User;
    onClose: () => void;
    onSuccess: (amount: number) => void;
}

// Componente modal para recargar saldo mediante SnailPay
export const SnailPayModal: React.FC<SnailPayModalProps> = ({ user, onClose, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [fullName, setFullName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Función para manejar el envío del formulario de recarga
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    // Manejo de la llamada a la API de SnailPay
    // localhost:3001 es el puerto donde corre el backend de SnailPay
    // http://localhost:3001/api/snailpay/charge

    try {
      const response = await fetch('https://francisco-backend2.onrender.com/api/snailpay/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber,
          expirationDate,
          cvv,
          fullName,
          amount: Number(amount),
          payerId: 'USER-' + user.email,
          payerEmail: user.email
        })
      });

      const data = await response.json();

      // Validación de la respuesta de SnailPay
      if (response.ok && data.status === 'approved') {
        // Regla: Guardar tarjeta y CVV en localStorage con datos ficticios
        localStorage.setItem('snailpay_last_card', data.cardNumber);
        localStorage.setItem('snailpay_last_cvv', data.cvv);

        setSuccessMsg(data.status_detail);
        
        setTimeout(() => {
          onSuccess(Number(amount)); // Notificamos al componente padre
        }, 2000);
      } else {
        setError(data.status_detail || 'Error en la transacción');
      }
    } catch (err) {
      setError('Error de conexión con SnailPay. Intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Renderizamos el modal de recarga de saldo
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '100%', maxWidth: '400px', fontFamily: 'sans-serif' }}>
        <h3 style={{ marginTop: 0 }}>Recargar Saldo - SnailPay</h3>
        
        {error && <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '10px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
        {successMsg && <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '10px', marginBottom: '15px', fontSize: '14px' }}>{successMsg}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="text" placeholder="Número de Tarjeta (16 dígitos)" required maxLength={16} value={cardNumber} onChange={e => setCardNumber(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="MM/AA" required maxLength={5} value={expirationDate} onChange={e => setExpirationDate(e.target.value)} style={{ padding: '8px', width: '50%', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
            <input type="text" placeholder="CVV" required maxLength={3} value={cvv} onChange={e => setCvv(e.target.value)} style={{ padding: '8px', width: '50%', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
          </div>
          
          <input type="text" placeholder="Nombre completo del titular" required value={fullName} onChange={e => setFullName(e.target.value)} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />
          <input type="number" placeholder="Monto a recargar ($)" required min="1" value={amount} onChange={e => setAmount(Number(e.target.value))} style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f0f2f4'}} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {loading ? 'Procesando...' : 'Pagar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}