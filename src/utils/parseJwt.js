import {jwtDecode} from 'jwt-decode';

export default function getUidFromJwt(){
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log('user',user)
    if (user) {
        const chainObj = jwtDecode(user.userInfo.token);
        return chainObj.Uid
    }
}