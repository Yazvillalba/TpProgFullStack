import { Casino } from './Casino';
import { Ruleta } from './Ruleta';
import inquirer from 'inquirer';

const casino = new Casino();

async function mostrarMenu(): Promise<void> {
    const opcionesMenu = [
        { name: "1. Mostrar juegos disponibles", value: "1" },
        { name: "2. Leer instrucciones de un juego", value: "2" },
        { name: "3. Jugar un juego", value: "3" },
        { name: "4. Salir", value: "4" },
    ];

    const respuesta = await inquirer.prompt({
        type: "list",
        name: "opcion",
        message: "Seleccione una opción:",
        choices: opcionesMenu,
    });

    switch (respuesta.opcion) {
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
            break;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            mostrarMenu();
            break;
    }
}

async function mostrarJuegos(): Promise<void> {
    casino.mostrarJuegos();
    await mostrarMenu();
}

async function leerInstrucciones(): Promise<void> {
    casino.mostrarJuegos();

    const respuesta = await inquirer.prompt({
        type: "input",
        name: "numJuego",
        message: "Ingrese el número del juego para leer las instrucciones:",
    });

    const juego = casino.elegirJuego(parseInt(respuesta.numJuego));
    if (juego) {
        console.log("\n--- INSTRUCCIONES ---");
        console.log(juego.leerInstrucciones());
    }
    await mostrarMenu();
}

async function elegirJuego(): Promise<void> {
    const opcionesJuego = [
        { name: "1. Jugar Tragamonedas", value: "1" },
        { name: "2. Jugar Ruleta", value: "2" },
        { name: "3. Jugar Dados", value: "3" },
        { name: "4. Volver al menú principal", value: "4" },
    ];

    const respuesta = await inquirer.prompt({
        type: "list",
        name: "opcion",
        message: "Seleccione el tipo de juego:",
        choices: opcionesJuego,
    });

    switch (respuesta.opcion) {
        case "1":
            jugarTragamonedas();
            break;
        case "2":
            jugarRuleta();
            break;
        case "3":
            jugarDados();
            break;
        case "4":
            mostrarMenu();
            break;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            elegirJuego();
            break;
    }
}

async function jugarTragamonedas(): Promise<void> {
    console.log("\n--- JUGAR TRAGAMONEDAS ---");
    casino.mostrarTragamonedas();

    const { numJuego } = await inquirer.prompt({
        type: "input",
        name: "numJuego",
        message: "Ingrese el número de la tragamonedas que desea jugar:",
    });

    const juego = casino.elegirJuego(parseInt(numJuego));
    if (!juego) {
        console.log("Número de tragamonedas inválido. Inténtelo de nuevo.");
        return elegirJuego();
    }

    const { apuesta } = await inquirer.prompt({
        type: "input",
        name: "apuesta",
        message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
    });

    const apuestaNum = parseFloat(apuesta);
  casino.jugarJuego(juego, apuestaNum);
  
    await elegirJuego();
}

async function jugarRuleta(): Promise<void> {
    console.log("\n--- JUGAR RULETA ---");
    const juego = casino.elegirJuego(3);

    if (!juego) {
        console.log("Ocurrió un error al seleccionar la ruleta.");
        return elegirJuego();
    }

    const { apuesta } = await inquirer.prompt({
        type: "input",
        name: "apuesta",
        message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
    });

    const apuestaNum = parseFloat(apuesta);

    if (apuestaNum < juego.getValorMinimoApuesta()) {
        console.log(`La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`);
        return jugarRuleta();
    }

    const { numero, color } = await inquirer.prompt([
        { type: "input", name: "numero", message: "Ingrese el número (del 0 al 36):" },
        { type: "input", name: "color", message: "Ingrese el color (rojo o negro):" },
    ]);

    const resultado = juego.jugar(apuestaNum, `${numero.trim()} ${color.trim()}`);
    console.log(resultado);

    await mostrarMenu();
}

async function jugarDados(): Promise<void> {
    console.log("--- JUGAR DADOS ---");
    const juego = casino.elegirJuego(4);

    if (!juego) {
        console.log("Ocurrió un error al seleccionar los dados.");
        return elegirJuego();
    }

    const { apuesta } = await inquirer.prompt({
        type: "input",
        name: "apuesta",
        message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
    });

    const apuestaNum = parseFloat(apuesta);

    if (apuestaNum < juego.getValorMinimoApuesta()) {
        console.log(`La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`);
        return jugarDados();
    }

    const { prediccion } = await inquirer.prompt({
        type: "input",
        name: "prediccion",
        message: "Ingrese su predicción de la suma de los dos dados (de 2 a 12):",
    });

    const resultado = juego.jugar(apuestaNum, prediccion.trim());
    console.log(resultado);

    await mostrarMenu();
}


mostrarMenu();
