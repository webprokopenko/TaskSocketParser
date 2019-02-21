const request = require('request');
class CoincapAssets{
    constructor(){
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
    async getTopAssets(){
        try {
          return{
            'Bitoin': await this.getAssets('bitcoin'),
            'XRP': await this.getAssets('ripple'),
            'Ethereum': await this.getAssets('ethereum'),    
            'Bitcoin Cash': await this.getAssets('bitcoin-cash'),
            'EOS': await this.getAssets('eos')
          }  
        } catch (error) {
          return {
            'Error on a server':''
          }
        }
        
      }
}
module.exports = CoincapAssets