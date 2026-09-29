export interface User {
    name: string;
    email: string;
    password?: string;
    balance: number; // El saldo que inicia en $0
}