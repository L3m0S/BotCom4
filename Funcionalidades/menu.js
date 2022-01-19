const textos = require('../manifest.json');

const menu = async function(client, message, user) {

    switch (message.body) {
        case '1':
            client
            .sendText(message.from, textos.opcoes.primeira.op1)
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            user.state = 'segundaVia'
        break;

        case '2':
            client
            .sendText(message.from, "Nos informe por gentileza o CPF/CPNJ do titular do cadastro:")
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            user.state = 'comprovante'
        break;

        case '3':
            client
            .sendText(message.from, textos.opcoes.terceira.texto)
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            user.state = 'suporte'
        break;
        
        case '4':
            client
            .sendText(message.from, textos.opcoes.quarta.texto1)
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            user.state = 'alterarData'
        break;

        case '5':
            client
            .sendText(message.from, "Por gentileza, nos informe seu nome completo:")
            .then((result) => {
                console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            user.state = 'interesse'
        break;

        default:
            client
            .sendText(message.from, textos.Menu)
            .then((result) => {
                console.log('Result: ', result, message.body); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
    }

    
}

module.exports = menu;