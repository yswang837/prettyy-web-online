import httpInstance from '@/utils/http'

// 通过邮件获取验证码
export const getIdentityCodeByEmailAPI = (email) => {
    return httpInstance({
        url:'/user/captcha-by-email',
        params: {
            email
        }
    })
}

// 账密登录获取验证码
export const getIdentityCodeAPI = () => {
    return httpInstance({
        url:'/user/captcha',
    })
}

// 用账号密码的方式支持用户登录注册
// 已注册用户：直接登录
// 未注册用户：直接注册并登录
export const loginOrRegisterByPwdAPI = (email, password, method, identify_id, identify_code) => {
    return httpInstance({
        url:'/user/login-register',
        method: 'POST',
        data: { email, password, method, identify_id, identify_code }
    })
}

// 用验证码的方式支持用户登录注册
// 已注册用户：直接登录
// 未注册用户：直接注册并登录
export const loginOrRegisterByCodeAPI = (email, identify_code, method) => {
    return httpInstance({
        url:'/user/login-register',
        method: 'POST',
        data: { email, identify_code, method }
    })
}