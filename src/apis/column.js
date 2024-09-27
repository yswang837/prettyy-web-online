import httpInstance from '@/utils/http'

// 获取专栏列表
export const getColumnListAPI = (uid) => {
    return httpInstance({
        url:'/column/list',
        params: {
            uid
        }
    })
}
