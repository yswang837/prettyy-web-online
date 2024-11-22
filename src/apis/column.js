import httpInstance from '@/utils/http'

// 通过Uid获取专栏列表
export const getColumnListByUidAPI = (uid) => {
    return httpInstance({
        url:'/column/list/uid',
        params: {
            uid
        }
    })
}

// 通过Aid获取专栏列表
export const getColumnListByAidAPI = (aid) => {
    return httpInstance({
        url:'/column/list/aid',
        params: {
            aid
        }
    })
}
