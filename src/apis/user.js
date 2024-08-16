import httpInstance from '@/utils/http'

// 检查密码是否为空
export const checkPasswordAPI = (email) => {
    return httpInstance({
        url:'/user/check-password',
        params: {
            email
        }
    })
}

// 更新用户昵称
export const updateNickNameAPI = (email, nick_name) => {
    return httpInstance({
        url:'/user/nick-name',
        method: 'POST',
        data: { email, nick_name }
    })
}

// 更新用户性别
export const updateGenderAPI = (email, gender) => {
    return httpInstance({
        url:'/user/gender',
        method: 'POST',
        data: { email, gender }
    })
}

// 更新用户户籍省市
export const updateProvinceCityAPI = (email, province, city) => {
    return httpInstance({
        url:'/user/province-city',
        method: 'POST',
        data: { email, province, city }
    })
}

// 更新用户生日
export const updateBirthdayAPI = (email, birthday) => {
    return httpInstance({
        url:'/user/birthday',
        method: 'POST',
        data: { email, birthday }
    })
}

// 更新用户个人简介
export const updateSummaryAPI = (email, summary) => {
    return httpInstance({
        url:'/user/summary',
        method: 'POST',
        data: { email, summary }
    })
}

// 退出登录
export const loginOutAPI = () => {
    return httpInstance({
        url:'/user/login-out',
    })
}