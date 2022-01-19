const venom = require('venom-bot');
const mainFunction = require('./main');


// venom
//   .create({headless: false})
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });

// async function start(client) {
//   await client.onMessage((message) => {
//         mainFunction(client, message)
//         console.log("chamou")
//   });
// }


venom
  .create({
    headless: false,
    session: 'teste1', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if(message.isGroupMsg === false) {
      mainFunction(client, message)
    }
  });
}

