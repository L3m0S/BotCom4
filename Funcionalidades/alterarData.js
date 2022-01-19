const textos = require('../manifest.json');
const axios = require('axios');
const dataBase = require('../Database/data');

const alterarData = async function(client, message, user) {

    if(!user.estagio) {
        user.nome = message.body
        user.interesse = 'alterar data de vencimento'

        client
        .sendText(message.from, textos.opcoes.quarta.texto2)
        .then((result) => {
            //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
        
        user.estagio = 'nomeCompleto'
        console.log(user)
        return
    }

    if (user.estagio === 'nomeCompleto') {
            user.documento = message.body
            
            client
            .sendText(message.from, textos.opcoes.quarta.texto3)
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });

            user.estagio = 'CPF'
            return
    };

    if( user.estagio === 'CPF') {

        user.vencimento = message.body

        client
        .sendText(message.from, textos.opcoes.quarta.texto4)
        .then((result) => {
            //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
            
        await axios.post('http://localhost:3333/chamados/alterar-data', {
            nome: user.nome.toString(),
            tel: message.from.toString(),
            documento: user.documento,
            vencimento: user.vencimento
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        const index = dataBase.indexOf(user)
        dataBase.splice(index, 1);
        return
            
    }

};

module.exports = alterarData;