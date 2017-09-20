const express = require('express');
const router = express.Router();
const YQL = require('yql');

class SpikaWebhookHandler {

    constructor() {

        router.post('/webhook', (req,res) => {

            console.log('spika webhook',req.body);
            console.log('spika webhook header',req.headers);

        });

        router.get('/webhook', (req,res) => {
            res.send('get is not supported aa')
        });
        
        this.router = router;

    }

} 

module["exports"] = SpikaWebhookHandler;