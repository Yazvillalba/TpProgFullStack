import { Tragamonedas } from "./Tragamonedas";
import { InstruccionesJuego } from './InstruccionesJuego';
import * as fs from 'fs';

export class CongoCash extends Tragamonedas implements InstruccionesJuego {
    private instruccionesPath: string;

    constructor() {
        super("Frutas Slot", 10);
        this.instruccionesPath = './instrucciones/CongoCash.txt'; 
    }

    jugar(apuesta: number): string {
        if (apuesta < this.valorMinimoApuesta) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        const resultado = Math.random();
        if (resultado > 0.5) {
            const ganancia = apuesta * 2;
            return `¡Ganaste ${ganancia} en ${this.nombre}!`;
        }
        return "¡Perdiste! Mejor suerte la próxima vez.";
    }

    leerInstrucciones(): string {
        try {
            const instrucciones = fs.readFileSync(this.instruccionesPath, 'utf-8');
            return instrucciones;
        } catch (error) {
            return "No se pudieron cargar las instrucciones.";
        }
    }
}
