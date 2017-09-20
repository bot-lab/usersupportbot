const express = require('express');
const router = express.Router();
const YQL = require('yql');
const SpikaSDK = require('../spika');

class SpikaWebhookHandler {

    constructor() {

        router.post('/webhook', (req,res) => {
            
            const params = req.body;
            
            if(params.sender.userid == 'cloverrobot')
                return;
            if(!params.group)
                return;

            const groupId = params.group.id;

            SpikaSDK.init("https://spika.chat/api/v3","GMUwQIHielm7b1ZQNNJYMAfCC508Giof");
            
            const promise = new Promise((fulfill, reject) => {
            
              SpikaSDK.signin("clover","cloverrobot","password",(statusCode,body) => {
                  
                if(statusCode == 200){
                  fulfill(body);
                }else{
                  reject(body);
                }
              });
            
            }).then((signinBody) => {
            
              return new Promise((fulfill,reject) => {
            
                SpikaSDK.sendMessage(2,groupId,1,"kaj ?",null,(statusCode,body) => {
            
                  if(statusCode == 200){
                    fulfill(body);
                  }else{
                    reject(body);
                  }
                  
                });
            
              });
            
            }).then( (sendBody) => {
            
              console.log("bot message sent",sendBody);
            
            });

        });

        router.get('/webhook', (req,res) => {
            res.send('get is not supported aa')
        });
        
        this.router = router;

    }

} 

module["exports"] = SpikaWebhookHandler;