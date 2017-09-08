const express = require('express');
const router = express.Router();
const YQL = require('yql');

class ApiAIHandler {

    constructor() {

        router.post('/webhook', (req,res) => {

            console.log('apiai webhook',req.body);

            res.json({
                'speech':req.body.result.fulfillment.speech,
                'displayText':req.body.result.fulfillment.speech
            });

        });

        router.get('/webhook', (req,res) => {
            res.send('get is not supported')
        });
        
        this.router = router;

    }

} 

module["exports"] = ApiAIHandler;