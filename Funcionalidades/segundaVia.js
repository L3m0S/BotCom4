const textos = require('../manifest.json');
const enviaSegundaVia = require('../Funções/enviaSegundaVia')
const dataBase = require('../Database/data')

const segundaVia = async function(client, message, user) {

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
            return
        }  
    }


    if(user.estagio = "nome") {
        user.nome = message.body

        client
        .sendText(message.from, textos.opcoes.primeira.resposta)

        user.state = 'menu'

        await enviaSegundaVia(client, message, user)
        
        return
    }

    
}

module.exports = segundaVia;