const venom = require('venom-bot');
const textos = require('./manifest.json');
const dataBase = require('./Database/data')
const suporteFibra = require('./Funcionalidades/suporteFibra')
const segundaVia = require('./Funcionalidades/segundaVia');
const menu = require('./Funcionalidades/menu');
const interesse = require('./Funcionalidades/interesse');
const alterarData = require('./Funcionalidades/alterarData');
const comprovante = require('./Funcionalidades/comprovante');

const mainFunction = async function(client, message) {  

    if(dataBase.find(c => c.user == message.from)){
        const user = dataBase.find(c => c.user == message.from);
        if (user.state === 'menu') {
            menu(client, message, user);
            return
        };

        if (user.state === 'segundaVia') {
            segundaVia(client, message, user);
            return
        };

        if (user.state === 'comprovante') {
            comprovante(client, message, user);
            return
        }

        if (user.state === 'suporte') {
            suporteFibra(client, message, user);
            return
        };

        if (user.state === 'alterarData') {
            alterarData(client, message, user);
            return
        };

        if (user.state === 'interesse') {
            interesse(client, message, user);
        };
        
    } else {
        console.log('não achou');
        let user = {

        }
        user.user = message.from;
        user.state = 'menu';
        dataBase.push(user);

        console.log(user);
        console.log(dataBase.find(c => c.user == message.from))

        client
        .sendText(message.from, textos.Menu)
        .then((result) => {
            console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
    }    
};


module.exports = mainFunction;