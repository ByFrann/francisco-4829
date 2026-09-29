import React, { useState } from 'react';
import type { User } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Wallet, LogOut, Trophy, PieChart as PieIcon, CreditCard } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onOpenRecharge: () => void;
}

// Datos simulados para la gráfica Donut (Apuestas ganadas vs Perdidas)
const betsData = [
  { name: 'Apuestas ganadas', value: 4, color: '#28a745' },
  { name: 'Apuestas perdidas', value: 2, color: '#dc3545' },
];

// Datos simulados para las victorias de 6 caracoles en 6 carreras del día (Suma total = 6)
const snailRacesData = [
  { name: 'Turbo', victorias: 2 },
  { name: 'Flash', victorias: 1 },
  { name: 'Rayo', victorias: 1 },
  { name: 'Speedy', victorias: 1 },
  { name: 'Snailzilla', victorias: 1 },
  { name: 'Lento', victorias: 0 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onOpenRecharge }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      
        {/* Encabezado con información del usuario y saldo */}
        <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '15px 25px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '25px'
            }}>
            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '5px'}}>
                <h2 style={{ margin: 0, color: '#333' }}>¡Bienvenido, {user.name}!</h2>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>{user.email}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Tarjeta de saldo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#e9ecef', padding: '8px 16px', borderRadius: '6px' }}>
                    <Wallet size={20} color="#28a745" />
                    <div>
                    <span style={{ fontSize: '12px', color: '#6c757d', display: 'block' }}>Saldo actual</span>
                    <strong style={{ fontSize: '18px', color: '#28a745' }}>${user.balance.toFixed(2)}</strong>
                    </div>
                </div>

                {/* Botón de cargar saldo SnailPay */}
                <button 
                    onClick={onOpenRecharge}
                    style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '10px 16px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                    }}
                >
                    <CreditCard size={18} /> Cargar saldo
                </button>

                {/* Botón de cerrar sesión */}
                <button 
                    onClick={onLogout}
                    style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    padding: '10px 14px', 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer' 
                    }}
                >
                    <LogOut size={16} /> Salir
                </button>
            </div>
        </header>

      {/* Rejilla de gráficas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Gráfica donut: Apuestas ganadas / Perdidas */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, color: '#495057' }}>
            <PieIcon size={20} /> Resumen de apuestas
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={betsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {betsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de barras: Victorias de caracoles */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, color: '#495057' }}>
            <Trophy size={20} /> Victorias por caracol (6 carreras hoy)
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={snailRacesData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} domain={[0, 'dataMax + 1']} />
                <Tooltip />
                <Bar dataKey="victorias" fill="#17a2b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};