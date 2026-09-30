import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from "uuid";
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
// Endpoint de verificación inicial
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Servidor SnailPay activo' });
});
// Endpoint para simular el cobro mediante SnailPay
app.post('/api/snailpay/charge', (req, res) => {
    const { cardNumber, expirationDate, cvv, fullName, amount, payerId, payerEmail } = req.body;
    const date_created = new Date().toISOString();
    // Simulación de respuesta de SnailPay según los datos recibidos
    const baseResponse = {
        id: uuidv4(),
        transaction_amount: amount,
        date_created,
        reference: `REF-${Date.now()}`,
        payer_id: payerId,
        payer_email: payerEmail,
        card_number: cardNumber,
        cvv: cvv,
    };
    // 1. SIMULACIÓN DE ERROR DEL SISTEMA (Requisito documentado)
    // Si se intenta recargar exactamente 9999, simulamos caída del servidor SnailPay
    if (amount === 9999) {
        return res.status(500).json({
            ...baseResponse,
            status: 'system_error',
            status_detail: 'Error interno en los servidores de SnailPay. Intente más tarde.',
            authorization_code: null
        });
    }
    // 2. SIMULACIÓN DE COBRO EXITOSO[cite: 1]
    if (cardNumber === '1234123412341234' &&
        expirationDate === '12/26' &&
        cvv === '543' &&
        fullName && fullName.trim() !== '' &&
        amount > 0) {
        return res.status(200).json({
            ...baseResponse,
            status: 'approved',
            status_detail: 'Cobro procesado exitosamente.',
            authorization_code: Math.floor(100000 + Math.random() * 900000).toString() // Código de 6 dígitos
        });
    }
    // 3. SIMULACIÓN DE ERROR DE TRANSACCIÓN (Datos inválidos o rechazados)[cite: 1]
    return res.status(400).json({
        ...baseResponse,
        status: 'rejected',
        status_detail: 'Transacción declinada. Verifique los datos de su tarjeta o consulte con su banco.',
        authorization_code: null
    });
});
// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor SnailPay corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map