const express = require('express');
const router = express.Router();
const YQL = require('yql');

const SpikaSDK = require('../spika');
const init = require('../init');

class SpikaWebhookHandler {

    constructor() {

        router.post('/webhook', (req,res) => {
            
            const params = req.body;
            
            if(params.sender.userid == 'cloverrobot')
                return;
            if(!params.group)
                return;

            const groupId = params.group.id;

            SpikaSDK.init(init.spika.url,init.spika.apiKey);
            
            const promise = new Promise((fulfill, reject) => {
            
              SpikaSDK.signin(
                  init.spika.org,
                  init.spika.user,
                  init.spika.password,(statusCode,body) => {
                  
                if(statusCode == 200){
                  fulfill(body);
                }else{
                  reject(body);
                }
              });
            
            }).then((signinBody) => {
            
              return new Promise((fulfill,reject) => {
            
                setTimeout(() => {

                    SpikaSDK.sendMessage(2,groupId,1,"kaj ?",null,(statusCode,body) => {
                
                        if(statusCode == 200){
                            fulfill(body);
                        }else{
                            reject(body);
                        }
                        
                    });
                },3000);
            
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