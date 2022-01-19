const axios = require('axios');
const dataBase = require('../Database/data');

const interesse = async function(client, message, user) {

    if(!user.estagio) {
        user.nome = message.body

        client
        .sendText(message.from, "Qual o seu interesse?\n\n1-Fibra\n\n2-Data Center\n\nDigite a opção numerica da opção desejada!")
        .then((result) => {
            //console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
        
        user.estagio = 'interesse'
        console.log(user)
        return
    }

    if (user.estagio === 'interesse') {
        if(message.body === '1') {
            user.interesse = 'fibra'
            
            client
            .sendText(message.from, "Por gentileza, nos informe o CEP do local desejado:")
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });

            user.fibra = 'fibraCep'
            return
        };

        if( user.fibra === 'fibraCep' && user.interesse === 'fibra') {

            user.cep = message.body

            client
            .sendText(message.from, "Por gentileza, nos informe o numero da residencia:")
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            
            user.fibra = 'fibraNumero'
            return
        }

        if( user.fibra === 'fibraNumero' && user.interesse === 'fibra') {
            user.numero = message.body

            client
            .sendText(message.from, "Nossos consultores entraram em contato no numero de seu whatssapp.")
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });

            await axios.post('http://localhost:3333/chamados/interesse-servico', {
                nome: user.nome.toString(),
                tel: message.from.toString(),
                interesse: 'fibra',
                cep: user.cep,
                numeroResidencia: user.numero
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
        
        if(message.body === '2') {
            user.interesse = 'data center'

            client
            .sendText(message.from, "Nossos consultores entraram em contato no numero de seu whatssapp.")
            .then((result) => {
                //console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            
            await axios.post('http://localhost:3333/chamados/interesse-servico', {
                nome: user.nome.toString(),
                tel: message.from.toString(),
                interesse: 'data center',
                cep: '0',
                numeroResidencia: '0'
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            const index = dataBase.indexOf(user)
            dataBase.splice(index, 1);
            
        };

    };

};

module.exports = interesse;