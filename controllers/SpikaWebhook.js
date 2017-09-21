const express = require('express');
const router = express.Router();
const YQL = require('yql');
const AllBot = require('allbot');

const SpikaSDK = require('../spika');
const init = require('../init');

class SpikaWebhookHandler {

    constructor() {

        router.post('/webhook', (req,res) => {
            
            const params = req.body;
            console.log("spika webhook",params);

            const fromUser = params.receiver.userid;

            global.allbot.sendText(params.receiver.userid,
                params.message.message,(result) => {

                    console.log("send to messenger",result);

                });


        });

        router.get('/webhook', (req,res) => {
            res.send('get is not supported aa')
        });
        
        this.router = router;

    }

} 

module["exports"] = SpikaWebhookHandler;