import jwt_decode from 'jwt-decode';

export function authentification(){
    const token = JSON.parse(localStorage.getItem('token'))?(JSON.parse(localStorage.getItem('token'))) : undefined;
    if(token){
        const decodedToken = jwt_decode(token)
        const activeToken = decodedToken.exp > Date.now()/1000
        if(activeToken){
            console.log("activeToken : ",activeToken);
        }else{
            localStorage.clear();
            console.log("activeToken : ",false);
        }
        return activeToken;
    }
    return false;
}