import httpInstance from '@/utils/http'
// 发布文章
export const publishArticleAPI = (title, content, uid, cover_img, summary) => {
    return httpInstance({
        url:'/article/publish',
        method: 'POST',
        data: { title, content, uid, cover_img, summary }
    })
}

export const getArticleListAPI = (page, page_size) => {
    return httpInstance({
        url:'/article/list',
        params: {
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
