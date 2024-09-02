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
export const updateNickNameAPI = (uid, nick_name) => {
    return httpInstance({
        url:'/user/nick-name',
        method: 'POST',
        data: { uid, nick_name }
    })
}

// 更新用户性别
export const updateGenderAPI = (uid, gender) => {
    return httpInstance({
        url:'/user/gender',
        method: 'POST',
        data: { uid, gender }
    })
}

// 更新用户户籍省市
export const updateProvinceCityAPI = (uid, province, city) => {
    return httpInstance({
        url:'/user/province-city',
        method: 'POST',
        data: { uid, province, city }
    })
}

// 更新用户生日
export const updateBirthdayAPI = (uid, birthday) => {
    return httpInstance({
        url:'/user/birthday',
        method: 'POST',
        data: { uid, birthday }
    })
}

// 更新用户个人简介
export const updateSummaryAPI = (uid, summary) => {
    return httpInstance({
        url:'/user/summary',
        method: 'POST',
        data: { uid, summary }
    })
}

// 退出登录
export const loginOutAPI = () => {
    return httpInstance({
        url:'/user/login-out',
    })
}