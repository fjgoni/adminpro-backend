const jwt = require('jsonwebtoken');

const generarJWT = (id,name) => {
    return new Promise((resolve, reject)=>{
        const payload = {
            id,
            name
        }
        jwt.sign(payload, process.env.JWT_SECRET,{
          expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('NO se pudo generar el JWT');
                
            }else{
                resolve(token);
            }
    
    
        });
    });
    

}


module.exports = {
    generarJWT
}