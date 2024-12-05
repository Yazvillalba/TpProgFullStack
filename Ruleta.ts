import * as readlineSync from 'readline-sync';
import * as fs from 'fs';

export class Ruleta {
    private nombre: string;
    private valorMinimoApuesta: number;
    private instruccionesPath: string;
    private totalGanado: number;

    constructor() {
        this.nombre = "Ruleta";
        this.valorMinimoApuesta = 100;
        this.instruccionesPath = './instrucciones/Ruleta.txt';
        this.totalGanado = 0;
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

    jugar(apuesta: number, eleccion: string): string {
        if (apuesta < this.valorMinimoApuesta) {
            return "La apuesta es menor al valor mínimo permitido.";
        }

        const numeros = Array.from({ length: 36 }, (_, i) => i + 1);
        const colores = ["rojo", "negro"];
        const numeroGanador = numeros[Math.floor(Math.random() * numeros.length)];
        const colorGanador = colores[Math.floor(Math.random() * colores.length)];

        console.log(`Número ganador: ${numeroGanador}, Color ganador: ${colorGanador}`);

        let ganancia = 0;

        const partes = eleccion.split(" ").map(p => p.trim().toLowerCase());
        const numeroElegido = parseInt(partes[0]);
        const colorElegido = partes[1];

        const esNumeroValido = numeros.includes(numeroElegido);
        const esColorValido = colores.includes(colorElegido);

        if (esNumeroValido && esColorValido) {
            if (numeroElegido === numeroGanador && colorElegido === colorGanador) {
                ganancia = apuesta * (Math.floor(Math.random() * 3) + 8); 
                this.totalGanado += ganancia - apuesta;
                return `¡Felicidades! Ganaste apostando al número ${numeroElegido} y al color ${colorElegido}. Ganaste ${ganancia} unidades.${this.totalGanado >= 0 ? ` Total acumulado: ${this.totalGanado}` : ''}`;
            }
            
            else if (numeroElegido === numeroGanador) {
                ganancia = apuesta * (Math.floor(Math.random() * 3) + 4); 
                this.totalGanado += ganancia - apuesta;
                return `¡Felicidades! Ganaste apostando al número ${numeroElegido}. Ganaste ${ganancia} unidades.${this.totalGanado >= 0 ? ` Total acumulado: ${this.totalGanado}` : ''}`;
            }
            else if (colorElegido === colorGanador) {
                ganancia = apuesta * (Math.floor(Math.random() * 3) + 4);
                this.totalGanado += ganancia - apuesta;
                return `¡Felicidades! Ganaste apostando al color ${colorElegido}. Ganaste ${ganancia} unidades.${this.totalGanado >= 0 ? ` Total acumulado: ${this.totalGanado}` : ''}`;
            }
        }

        this.totalGanado -= apuesta;
        return `Lo siento, no ganaste esta vez.${this.totalGanado >= 0 ? ` Total acumulado: ${this.totalGanado}` : ''}`;
    }

    leerInstrucciones(): string {
        try {
            return fs.readFileSync(this.instruccionesPath, 'utf-8');
        } catch {
            return "No se pudieron cargar las instrucciones.";
        }
    }
}
