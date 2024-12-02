import { Tragamonedas } from "./Tragamonedas";
import { InstruccionesJuego } from './InstruccionesJuego';
import * as fs from 'fs';

export class JokersJewels extends Tragamonedas implements InstruccionesJuego {
    private instruccionesPath: string;

    constructor() {
        super("Diamantes Slot", 20);
        this.instruccionesPath = './instrucciones/frutasSlot.txt'; 

    }

    jugar(apuesta: number): string {
        if (apuesta < this.valorMinimoApuesta) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        const resultado = Math.random();
        if (resultado > 0.7) {
            const ganancia = apuesta * 3;
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
