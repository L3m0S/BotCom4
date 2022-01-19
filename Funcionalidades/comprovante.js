const mime = require('mime-types');
const dataBase = require('../Database/data')
const Textos = require('../Textos');
const DowloadComprovante = require('../Funções/dowloadComprovante');
const axios = require("axios")

const comprovante =  async function(client, message, user) {

    if(!user.estagio) {

        if(message.body.length === 9 || message.body.length === 12) {
            user.documento = message.body

            client 
            .sendText(message.from, "Por gentileza, nos informe seu nome:")
    
            user.estagio = "nome"
            return
        } else {
            client
            .sendText(message.from, "Nos informe corretamente o CPF/CNPJ do cadastro: ")
        }
        
    } 

    if(user.estagio === "nome") {
        user.nome = message.body

        client
        .sendText(message.from, "Por gentileza, nos encaminhe uma foto nitida do comprovante para desbloqueio: ")

        user.estagio = "encaminhar-comprovante"
        return
    }

    if(user.estagio === "encaminhar-comprovante") {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg',  'image/png', 'application/pdf']
    
        const mimetype = allowedMimeTypes.indexOf(message.mimetype)
    
        if ( mimetype != -1) {

            const dowloadComprovante = await DowloadComprovante(client, message, user);

            await axios.post('http://localhost:3333/chamados/desbloqueio', {
                    nome: user.nome,
                    tel: message.from,
                    documento: user.documento,
                    comprovante: dowloadComprovante
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    

        client
        .sendText(message.from, "Comprovante sera verificado e dentro de 10 a 15 minutos seu link ser liberado!")
            
        const index = dataBase.indexOf(user)
        dataBase.splice(index, 1);
        return

        } else {
        client
        .sendText(message.from, `Por gentileza, nos encaminhe o comprovante como imagem ou pdf!`)
        return
        }
    }   
}

module.exports  = comprovante;