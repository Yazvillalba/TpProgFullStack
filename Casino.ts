import { Tragamonedas } from "./Tragamonedas";
import  {CongoCash} from "./CongoCash";
import { JokersJewels } from "./JokersJewels";
export class Casino {
    private juegos: Tragamonedas[] = [];

    constructor() {
        this.juegos.push(new CongoCash());
        this.juegos.push(new JokersJewels());
    }

    mostrarJuegos(): void {
        console.log("Juegos disponibles:");
        this.juegos.forEach((juego, index) => {
            console.log(`${index + 1}. ${juego.getNombre()} (Apuesta mínima: ${juego.getValorMinimoApuesta()})`);
        });
    }

    elegirJuego(indice: number): Tragamonedas | null {
        if (indice >= 1 && indice <= this.juegos.length) {
            return this.juegos[indice - 1];
        }
        console.log("Opción inválida.");
        return null;
    }

    jugarJuego(juego: Tragamonedas, apuesta: number): void {
        const resultado = juego.jugar(apuesta);
        console.log(resultado);
    }



}
