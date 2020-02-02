const Proxy = require('braid-client').Proxy;

const fundNode = new Proxy({url: 'http://prod-demo1.instate.io:9091/api/'}, onOpen, onClose, onError, {strictSSL: false})

async function issueCash() {
    let notaries = await fundNode.network.notaryIdentities()

    let issueTransaction = await fundNode.flows.CashIssueFlow({
        "amount": { "quantity":10000, displayTokenSize: 0.01, token: "USD" },
        "issueRef": { bytes: "dGVzdA=="}, // This is an id that identifies the issuer. Can be any base64 string.
        "notary": notaries[0] // Just use the first notary returned by the server
    })

    console.log(JSON.stringify(issueTransaction))
}

async function payCash() {
    let paymentTransaction = await fundNode.flows.CashPaymentFlow({
        "amount": { "quantity":5000, displayTokenSize: 0.01, token: "USD" },
        "recipient": { owningKey: "GfHq2tTVk9z4eXgyP7H4nG2tjxzq5uEjDk2sMKoXbvYWWvp77qZjERpwL3LG", name: "O=Fund,L=New York,C=US" }, // You can get the owning key and name from network.allNodes()
        "anonymous": false
    })

    console.log(JSON.stringify(paymentTransaction))
}

async function exitCash() {
    let exitTransaction = await fundNode.flows.CashExitFlow({
        "amount": { "quantity":2500, displayTokenSize: 0.01, token: "USD" },
        "issuerRef": { bytes: "dGVzdA=="}
    })

    console.log(JSON.stringify(exitTransaction))
}

function onOpen() {

    console.log("Connected")
    
    issueCash().then(() => console.log("Done")).catch(error => console.error(error))

    payCash().then(() => console.log("Done")).catch(error => console.error(error))

    exitCash().then(() => console.log("Done")).catch(error => console.error(error))

}

function onClose() {
    console.log("closed")
}

function onError(err) {
    console.error(err)
}
