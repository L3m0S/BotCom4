const textos = require('../manifest.json');
const dataBase = require('../Database/data');

const suporteFibra = function(client, message, user) {
    if(message.body === '1') {
        client
        .sendText(message.from, textos.opcoes.terceira.op1)
        .then((result) => {
            //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });

        const index = dataBase.indexOf(user)
        dataBase.splice(index, 1);
        return

    } 
    if(message.body === '2') {
        client
        .sendText(message.from, textos.opcoes.terceira.op2)
        .then((result) => {
            //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
        const index = dataBase.indexOf(user)
        dataBase.splice(index, 1);
        return
    }
}

module.exports = suporteFibra;