import { Tragamonedas } from "./Tragamonedas";
import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { InstruccionesJuego } from "./InstruccionesJuego";

export class JokersJewels extends Tragamonedas implements InstruccionesJuego{
    private totalGanado: number = 0;
    instruccionesPath: string;

    constructor() {
        super("Jokers Jewels", 20, "Elección de Color");
        this.instruccionesPath = "./instrucciones/JokersJewels.txt"
    }

    jugar(apuesta: number): string {
        if (apuesta < this.valorMinimoApuesta) {
            return "La apuesta es menor al valor mínimo permitido.";
        }

        const multiplicador = Math.floor(Math.random() * 5) + 1;
        const ganancia = apuesta * multiplicador;
        this.totalGanado += ganancia - apuesta;

        if (ganancia === 300) {
            console.log("¡Felicidades! Activaste el bono.");
            return this.aplicarBono();
        }

        return `Resultado: Ganaste ${ganancia}. Total acumulado: ${this.totalGanado}`;
    }

    aplicarBono(): string {
        const colores = ["rojo", "verde", "azul"];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        const colorElegido = readlineSync.question("Elige un color (rojo, verde, azul): ").toLowerCase();

        if (colorElegido === colorAleatorio) {
            const bono = 300 * (Math.floor(Math.random() * 4) + 5);
            this.totalGanado += bono;
            console.log(`¡Acertaste el color! Ganaste un bono de ${bono}. Total acumulado: ${this.totalGanado}`)
            return "GANASTE";
        } else {
            return `No acertaste el color. Color: ${colorAleatorio}. Total acumulado: ${this.totalGanado}.`;
        }
    }

    leerInstrucciones(): string {
        try {
            return fs.readFileSync(this.instruccionesPath, 'utf-8');
        } catch {
            return "No se pudieron cargar las instrucciones.";
        }
    }
    
}
