export abstract class Tragamonedas {
    protected nombre: string;
    protected valorMinimoApuesta: number;
    protected tipoBono: string;
    
    constructor(nombre: string, valorMinimoApuesta: number, tipoBono: string) {
        this.nombre = nombre;
        this.valorMinimoApuesta = valorMinimoApuesta;
        this.tipoBono = tipoBono;
    }

    abstract jugar(apuesta: number): string;

    abstract aplicarBono(): string;

    abstract leerInstrucciones(): string;

    getNombre(): string {
        return this.nombre;
    }

    getValorMinimoApuesta(): number {
        return this.valorMinimoApuesta;
    }

    getTipoBono(): string {
        return this.tipoBono;
    }
}
