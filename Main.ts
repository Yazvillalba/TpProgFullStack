import { Casino } from './Casino';
import * as readline from 'readline';

const casino = new Casino();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu(): void {
    console.log("\n--- MENÚ DEL CASINO ---");
    console.log("1. Mostrar juegos disponibles");
    console.log("2. Leer instrucciones de un juego");
    console.log("3. Jugar un juego");
    console.log("4. Salir");

    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                mostrarJuegos();
                break;
            case "2":
                leerInstrucciones();
                break;
            case "3":
                jugarJuego();
                break;
            case "4":
                console.log("¡Gracias por visitar el casino!");
                rl.close();
                break;
            default:
                console.log("Opción inválida. Intente nuevamente.");
                mostrarMenu();
                break;
        }
    });
}

function mostrarJuegos(): void {
    casino.mostrarJuegos();
    mostrarMenu();
}

function leerInstrucciones(): void {
    casino.mostrarJuegos();
    rl.question("Ingrese el número del juego para leer las instrucciones: ", (numJuego) => {
        const juego = casino.elegirJuego(parseInt(numJuego));
        if (juego) {
            console.log("\n--- INSTRUCCIONES ---");
            console.log(juego.leerInstrucciones());
        }
        mostrarMenu();
    });
}

function jugarJuego(): void {
    casino.mostrarJuegos();
    rl.question("Ingrese el número del juego que desea jugar: ", (numJuego) => {
        const juego = casino.elegirJuego(parseInt(numJuego));
        if (juego) {
            rl.question(`Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}): `, (apuesta) => {
                const apuestaNum = parseFloat(apuesta);
                if (apuestaNum >= juego.getValorMinimoApuesta()) {
                    casino.jugarJuego(juego, apuestaNum);
                } else {
                    console.log(`La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`);
                }
                mostrarMenu();
            });
        } else {
            mostrarMenu();
        }
    });
}

mostrarMenu();
