const express = require('express');
const router = express.Router();
const YQL = require('yql');

const SpikaSDK = require('../spika');
const init = require('../init');

class SpikaWebhookHandler {

    constructor() {

        router.post('/webhook', (req,res) => {
            
            const params = req.body;
            console.log("spika webhook",params);
            

        });

        router.get('/webhook', (req,res) => {
            res.send('get is not supported aa')
        });
        
        this.router = router;

    }

} 

module["exports"] = SpikaWebhookHandler;