
export abstract class Tragamonedas {
    protected nombre: string;
    protected valorMinimoApuesta: number;

    constructor(nombre: string, valorMinimoApuesta: number) {
        this.nombre = nombre;
        this.valorMinimoApuesta = valorMinimoApuesta;
    }

    abstract jugar(apuesta: number): string;

    abstract leerInstrucciones(): string;

    getNombre(): string {
        return this.nombre;
    }

    getValorMinimoApuesta(): number {
        return this.valorMinimoApuesta;
    }
}
