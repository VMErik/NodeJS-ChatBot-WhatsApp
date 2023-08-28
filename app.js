const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
    // Especificamos el proveedor
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
    // Especificamos el almancenamiento
const MockAdapter = require('@bot-whatsapp/database/mock')

let nombre = "";

const respuestas = ["1", "2"]

const clases = addKeyword(["1", "1.", "uno", "un"])
    .addAnswer(
        ["Perfecto!",
            "Estas a un paso de aprender algo nuevo",
            "Puedes encontrarme en las siguientes plataformas como Erik Monroy"
        ])
    .addAnswer("Superprof : https://www.superprof.mx/ingeniero-tecnologias-informacion-comunicacion-con-mas-anos-experiencia-desarrollo-web-win-aplicaciones-moviles.html")
    .addAnswer("TusClases : https://www.tusclases.mx/profesores/erik-monroy.htm");
const redes = addKeyword(["2", "2.", "dos"])
    .addAnswer("Comparto contenido que puede interesarte en ")
    .addAnswer("Twitter : https://twitter.com/monroyaeu")
    .addAnswer("LinkedIn : https://www.linkedin.com/in/erik-uriel-monroy-angeles/")
    .addAnswer("No olvides seguirme! 😉")

// Definimos nuestros flujos
// Con addkweyword, especificamos las palabras a las que queremos que respondan
// Con addAnswer indicamos que queremos que responda, si queremos saltos de linea lo ponemos separado por un array
// Como segundo parametro podemos especificar si necesitamos esperar respuesta
// El tercer parametro, es donde recibiremos el contexto de la respuesta
// La funcion fallback o retornamos si no obtenemos una respuuesta correcta para que vuelva a pregunta


const flujoPrincipal = addKeyword(['hola', 'buenas', 'hol', 'ola'])
    .addAnswer(['Hola!!👋 Muchas gracias por contactarme', 'Me puedes decir en que puedo ayudarte',
        "1️⃣ Me gustaria tomar clases online contigo",
        "2️⃣ En que redes sociales te puedo encontrar"
    ], { capture: true }, (ctx, { fallBack }) => {
        if (respuestas.includes(ctx.body)) {

        } else {
            return fallBack();
        }
    }, [clases, redes]);


const main = async() => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()