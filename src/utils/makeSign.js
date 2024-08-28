import cryptoJS from 'crypto-js/crypto-js.js'

export default function makeSign(params) {
    // web调用方对应的pin
    const pin = "4d3abacc23255a0767c718afda30cc8c"
    let stringToSign = ''
    Object.keys(params).sort().forEach(key => {
        if (key !== 'sign' && key !== 'file' && key !== 'content'){
            // console.log('key',key,params[key])
            stringToSign += `${key}=${params[key]}`
        }
    });
    return cryptoJS.MD5(pin+stringToSign)
}