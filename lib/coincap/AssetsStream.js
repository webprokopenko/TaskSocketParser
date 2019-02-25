const stream = require('stream');
const request = require('request');

module.exports = class AssetsStream extends stream.Readable{
    constructor(options){
        super(options);
        this.arrAssets = ['bitcoin', 'ripple','ethereum','bitcoin-cash','eos'];
        this.url = 'https://api.coincap.io/v2/assets/';
    }
    getAssets(curr){
        return new Promise((resolve, reject) => {
            let url = this.url + curr;
            request.get(url,
                (error, response, body) => {
                    if(error) reject(error);
                    try {
                        resolve(JSON.parse(body).data.priceUsd);
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        })        
    }
    async _read(size){
        if(this.arrAssets.length > 0){
            let asset = await this.getAssets(this.arrAssets.shift())
            this.push(asset);
        }else{
            this.push(null);
        }
    }
}