import * as fs from 'fs';
import { InstruccionesJuego } from './InstruccionesJuego';

export class Dados implements InstruccionesJuego{
    private valorMinimoApuesta: number;
    private nombre: string;
    private totalGanado: number;
    instruccionesPath: string;

    constructor() {
        this.nombre = "Dados";
        this.valorMinimoApuesta = 50;
        this.totalGanado = 0;
        this.instruccionesPath = './instrucciones/Dados.txt';
    }

    getNombre(): string {
        return this.nombre;
    }

    getValorMinimoApuesta(): number {
        return this.valorMinimoApuesta;
    }

    getTotalGanado(): number {
        return this.totalGanado;
    }

    leerInstrucciones(): string {
        try {
            return fs.readFileSync(this.instruccionesPath, 'utf-8');
        } catch {
            return "No se pudieron cargar las instrucciones.";
        }
    }

    jugar(apuesta: number, prediccion: string): string {
        const dado1 = Math.ceil(Math.random() * 6); 
        const dado2 = Math.ceil(Math.random() * 6);
        const suma = dado1 + dado2;

        if (prediccion === suma.toString()) {
            return `¡Ganaste! Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}). Ganaste ${apuesta * 2}.`;
        } else {
            return `Perdiste. Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}).`;
        }
    }
}
