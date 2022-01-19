

const enviaSegundaVia = async function (client, message, user) {

    await client
    .sendFile(
    message.from,
    'C:/Users/Gabs/Desktop/chatbotcom4/temp/ef1486853c84ee19fbced51704d790f5-5516992826876@c.us.pdf',
    'boleto-teste',
    'Segue segunda via solicitada!'
    )
    .then((result) => {
        console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
    });

    return
}

module.exports = enviaSegundaVia;