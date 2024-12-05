import { Tragamonedas } from "./Tragamonedas";
import * as fs from 'fs';

export class CongoCash extends Tragamonedas {
    private tiradasGratis: number = 0;
    private totalGanado: number = 0;

    constructor() {
        super("Congo Cash", 10, "Tiradas Gratis", "./instrucciones/CongoCash.txt");
      
    }

    jugar(apuesta: number): string {
        if (apuesta < this.valorMinimoApuesta && this.tiradasGratis <= 0) {
            return "La apuesta es menor al valor mínimo permitido y no tienes tiradas gratis.";
        }

        do {
            let ganancia = 0;

            if (this.tiradasGratis > 0) {
                this.tiradasGratis--;
            } else {
                ganancia -= apuesta;
            }

            const multiplicador = Math.floor(Math.random() * 5) + 1;
            ganancia += apuesta * multiplicador;
            this.totalGanado += ganancia;

            if (ganancia === 300 && this.tiradasGratis === 0) {
                console.log("¡Ganaste un bono!");
                this.aplicarBono();
            }

            console.log(`Ganancia: ${ganancia}, Tiradas gratis restantes: ${this.tiradasGratis}, Total acumulado: ${this.totalGanado}`);
        } while (this.tiradasGratis > 0);

        return `Total acumulado: ${this.totalGanado}`;
    }

    aplicarBono(): string {
        this.tiradasGratis += 5;
        return "¡Ganaste 5 tiradas gratis!";
    }

    leerInstrucciones(): string {
        try {
            return fs.readFileSync(this.instruccionesPath, 'utf-8');
        } catch {
            return "No se pudieron cargar las instrucciones.";
        }
    }
}
