import { Casino } from './Casino';
import * as readline from 'readline';
import { Ruleta } from './Ruleta';

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
                elegirJuego();
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

function elegirJuego(): void {
    console.log("\n--- SELECCIONAR TIPO DE JUEGO ---");
    console.log("1. Jugar Tragamonedas");
    console.log("2. Jugar Ruleta");
    console.log("3. Volver al menú principal");

    rl.question("Seleccione una opción: ", (opcion) => {
        switch (opcion) {
            case "1":
                jugarTragamonedas();
                break;
            case "2":
                jugarRuleta();
                break;
            case "3":
                mostrarMenu();
                break;
            default:
                console.log("Opción inválida. Intente nuevamente.");
                elegirJuego();
                break;
        }
    });
}

function jugarTragamonedas(): void {
    console.log("\n--- JUGAR TRAGAMONEDAS ---");
    casino.mostrarTragamonedas();
    rl.question("Ingrese el número de la tragamonedas que desea jugar: ", (numJuego) => {
        const juego = casino.elegirJuego(parseInt(numJuego));
        if (!juego) {
            console.log("Número de tragamonedas inválido. Inténtelo de nuevo.");
            return elegirJuego();
        }

        rl.question(`Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}): `, (apuesta) => {
            const apuestaNum = parseFloat(apuesta);
            casino.jugarJuego(juego, apuestaNum); 
            elegirJuego();  
        });
    });
}

function jugarRuleta(): void {
    console.log("\n--- JUGAR RULETA ---");
    const juego = casino.elegirJuego(3);
    if (!juego) {
        console.log("Ocurrió un error al seleccionar la ruleta.");
        return elegirJuego();
    }

    rl.question(`Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}): `, (apuesta) => {
        const apuestaNum = parseFloat(apuesta);

        if (apuestaNum < juego.getValorMinimoApuesta()) {
            console.log(`La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`);
            return jugarRuleta(); 
        }

        rl.question('Ingrese el número (del 1 al 36): ', (numero) => {
            rl.question('Ingrese el color (rojo o negro): ', (color) => {
                const resultado = juego.jugar(apuestaNum, `${numero.trim()} ${color.trim()}`);
                console.log(resultado);

                mostrarMenu(); 
            });
        });
    });
}



mostrarMenu();
