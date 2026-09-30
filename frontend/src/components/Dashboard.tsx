import React from 'react';
import type { User } from '../types';
import './Dashboard.css'
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Wallet, LogOut, Trophy, PieChart as PieIcon, CreditCard } from 'lucide-react';

// Props del componente Dashboard
interface DashboardProps {
  user: User;
  onLogout: () => void;
  onOpenRecharge: () => void;
}

// Datos simulados para la gráfica Donut (Apuestas ganadas vs Perdidas)
const betsData = [
  { name: 'Ganadas', value: 4},
  { name: 'Perdidas', value: 2},
];

// Datos simulados para las victorias de 6 caracoles en 6 carreras del día (Suma total = 6)
const snailRacesData = [
  { name: 'Turbo', victorias: 2 },
  { name: 'Flash', victorias: 1 },
  { name: 'Rayo', victorias: 1 },
  { name: 'Speedy', victorias: 1 },
  { name: 'Zilla', victorias: 1 },
  { name: 'Lento', victorias: 0 },
];

// Colores de la paleta Skote
const SKOTE_COLORS = ['#34c38f', '#f46a6a']; // Verde (Éxito) y Rojo (Peligro)
const BAR_COLOR = '#556ee6'; // Azul Primario Skote

// Componente principal del Dashboard
export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onOpenRecharge }) => {
  return (
    <div className="skote-layout">
      
        {/* Encabezado con información del usuario y saldo */}
        <header className="skote-topbar">
          <div className="skote-logo-title">
            <Trophy size={20} color="#556ee6" />
            BetCaracol
          </div>
          <button onClick={onLogout} className="skote-logout">
            <LogOut size={16} /> Salir
          </button>
        </header>

        {/* Contenido Principal */}
        <main className="skote-container">

          <div className="skote-welcome-card">
              <div className="skote-welcome-banner">
                <h3>¡Bienvenido de nuevo!</h3>
                <p>Dashboard de Jugador</p>
              </div>
              
            {/* Sección de información del jugador */}
            <div className="skote-balance-section">
              <div className="skote-balance-info">
                <p>Jugador Activo</p>
                <h4 style={{ fontSize: '16px' }}>{user.name}</h4>
              </div>

              {/* Tarjeta de saldo */}
              <div className="skote-balance-info">
                  <Wallet size={16} /><p>Saldo SnailPay</p>
                <h4>${user.balance.toFixed(2)}</h4>
              </div>

              {/* Botón de cargar saldo SnailPay */}
              <button onClick={onOpenRecharge} className="skote-btn-primary">
                <CreditCard size={16} />Recargar Saldo
              </button>
            </div>
          </div>

          {/* Rejilla de gráficas */}
          <div className="skote-grid">
              
            {/* Gráfica donut: Apuestas ganadas / Perdidas */}
            <div className="skote-card">
              <h3 className="skote-card-title">
                <PieIcon size={16} /> Resumen de apuestas
              </h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={betsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {betsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SKOTE_COLORS[index % SKOTE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 0.75rem 1.5rem rgba(18, 38, 63, 0.05)' }}/>
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfica de barras: Victorias de caracoles */}
            <div className="skote-card">
              <h3 className="skote-card-title">
                <Trophy size={16} /> Victorias por caracol (6 carreras hoy)
              </h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={snailRacesData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#f8f8fb' />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#74788d', fontSize: 12}} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#74788d', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8f8fb'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 0.75rem 1.5rem rgba(18, 38, 63, 0.05)' }} />
                    <Bar dataKey="victorias" fill={BAR_COLOR} radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};