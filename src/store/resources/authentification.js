import jwt_decode from 'jwt-decode';
import cookie from 'cookie';
const cookies = cookie.parse(document.cookie);
/**
 * control (front) of the validity of the token
 * @returns boolean
 */
export function authentification() {
  const token = cookies.token ?
    cookies.token : undefined;
  if (token) {
    try {
      const decodedToken = jwt_decode(token)
      const activeToken = decodedToken.exp > Date.now() / 1000
      // if (activeToken) {
      //   console.log("activeToken : ", activeToken);
      // } else {
      //   console.log("activeToken : ", false);
      // }
      return activeToken;
    } catch (e) {
      console.log("Error : ", e)
    }
  } else {
    // console.log("activeToken : ", false);
    return false;
  }
}
/**
 * get the token in the cookies
 * @returns token or undefined
 */
export function getToken() {
  return cookies.token ?
  cookies.token : undefined;
}
/**
 * set the state of the token in the store
 * @param {store} datas 
 */
export function setStateToken(datas) {
  datas.token[1](cookies.token ? cookies.token : undefined);
}