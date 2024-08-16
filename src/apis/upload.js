import httpInstance from '@/utils/http'

// 上传文件
export const UploadFileAPI = (file) => {
    // console.log('api...', file)
    return httpInstance({
        url:'/file/upload',
        method: 'POST',
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data: { file }
    })
}
