const fs = require('fs');
const mime = require('mime-types');
const crypto = require('crypto');
const path = require('path')

const DowloadComprovante = async function (client, message, user) {

        const buffer = await client.decryptFile(message);

        const hash = `./temp/${crypto.randomBytes(16).toString('hex')}-${message.from}.${mime.extension(message.mimetype)}`
        
        // At this point you can do whatever you want with the buffer
        // Most likely you want to write it into a file
    
        fs.writeFile(hash, buffer, (err) => {
            if(err){
              return console.log(err)
            }
            console.log("Imagem Salva!")
        });

        const absolutePath = path.resolve(__dirname, hash);

        return  absolutePath
}



module.exports = DowloadComprovante;