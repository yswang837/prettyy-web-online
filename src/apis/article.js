import httpInstance from '@/utils/http'
// 发布文章
export const publishArticleAPI = (title, content, cover_img, summary, visibility, tags, typ,column, uid) => {
    return httpInstance({
        url:'/article/publish',
        method: 'POST',
        data: { title, content, cover_img, summary, visibility, tags, typ, column, uid }
    })
}

export const delArticleAPI = (aid, uid) => {
    return httpInstance({
        url:'/article/del',
        method: 'POST',
        data: { aid, uid }
    })
}

export const getArticleListAPI = (uid, page, page_size) => {
    return httpInstance({
        url:'/article/list',
        params: {
            uid,
            page,
            page_size
        }
    })
}

export const getArticleDetailAPI = (aid) => {
    return httpInstance({
        url:'/article/detail',
        params: {
            aid
        }
    })
}

export const getUserInfoByAidAPI = (aid) => {
    return httpInstance({
        url:'/article/get-user-info-by-aid',
        params: {
            aid
        }
    })
}
