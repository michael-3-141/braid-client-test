const Proxy = require('braid-client').Proxy;

const fundNode = new Proxy({url: 'http://prod-demo1.instate.io:9091/api/'}, onOpen, onClose, onError, {strictSSL: false})

function onOpen() {

    console.log("Connected")
    
    fundNode.BraidService.getLoans().then(info => {
        console.log(JSON.stringify(info))
    }).catch(error => {
        console.error(error)
    })

    fundNode.BraidService.draftLoanLegalText({ 
        "externalId":null,
        "id":"1a7a1ec8-aba4-4f10-a397-e60bcabea2c1"
     }).then(info => {
        console.log(JSON.stringify(info))
    }).catch(error => {
        console.error(error)
    })
}

function onClose() {
    console.log("closed")
}

function onError(err) {
    console.error(err)
}
