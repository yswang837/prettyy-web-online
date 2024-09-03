# 笔尖

- 项目概览
  - 本项目提供的所有资源完全免费。前端采用Vue3框架构建的Web应用，本代码库全部源代码。
  - 后端接口由Go语言实现，服务托管在阿里云服务器，为各位免费提供稳定的接口服务。
  - 我们鼓励社区成员Fork本项目并贡献代码。任何优化，无论大小，我们都将予以考虑并合并，让你的简历增色。
  - 同时，我们也非常期待您为本项目点赞Star，以示支持。
- 学习交流机会
  - 欢迎加入我们的项目交流群，与志同道合的伙伴一起学习、分享和讨论。现在加入，完全免费。请添加我们的项目管理员微信：wys837。我们会尽快验证并邀请您入群。

## 1、快速开始

```sh
npm install
npm run dev
```
## 2、网站
[查看笔尖官网](http://120.26.203.121/)

## 3、后端接口文档

- 鉴权
  - 采用Bearer auth认证，在header中添加键值对，键为：Authorization，值的格式格式为Bearer $token,其中token是jwt生成的。
  - 除接口/user/login-register，/user/captcha-by-email，/user/captcha，/article/detail和/article/list不需要填写该字段，其余接口都需要，不再另外说明。示例值：Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIzODAwOTQwLCJpYXQiOjE3MjM4MDA5NDB9fQ.4wJGLMOp2eVKwOFq1ltyKq-z7zBdHgF2OD45L_N3HT4
- 调用方
  - caller的值为web，用于标识调用方的字段，所有接口都需要该字段
- 验签sign字段
  - 统一的规则是md5($pin+$attrString)，其中，pin=4d3abacc23255a0767c718afda30cc8c，加号不参与验签，attrString是接口的所有字段的key=value按字符串排序后直接拼接的(sign、file和content字段除外)，由具体的接口指定。
  - 例如：接口A要参与验签的字段和值分别是aa=a,cc=c,bb=b,那么sign=md5(4d3abacc23255a0767c718afda30cc8caa=abb=bcc=c),那么经计算sign=33b707af5dc72835b529eb77a53ff873
- Content-Type
  - POST均为x-www-form-urlencoded （特殊说明的除外）
  - GET均为none
- 所有错误码明细见文末
- 为方便，开发阶段，未开启sign验签，所以请求示例的sign不一定正确，正确的计算方式参考"验签sign字段"。
- 接口地址，wys837.cn 正在icp备案，暂未使用，先使用ip加端口访问，简记为ip:port 为 120.26.203.121:8888

### 3.1 通过邮箱获取验证码 ( /user/captcha-by-email )

- 接口说明
  - 通过邮箱获取验证码，验证码由6位数字组成，有效时长为5分钟。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| email  | string | 是    | 邮箱                  |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request GET --url 'http://ip:port/user/captcha-by-email?caller=web&email=yswang837@gmail.com&sign=fb469d7ef430b0baf0cab6c436e70375'
```
- 响应示例
```json
{
  "code": 2000040,
  "message": "set identify code success"
}
```

### 3.2 账密登录时验证码 ( /user/captcha )

- 接口说明
  - 通过账密登录时，获取验证码，验证码由6位数字组成，验证失败或者页面刷新时，会刷新。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request GET --url http://ip:port/user/captcha?caller=web&sign=fb469d7ef430b0baf0cab6c436e70375
```
- 响应示例
```json
{
  "code": 2000100,
  "message": "生成验证码成功",
  "result": {
    "captchaId": "DKhgbBos0VfeFfrEM1FC",
    "picPath": "data:image/png;base64,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",
    "captchaLength": 6
  }
}
```

### 3.3 登录注册接口 ( /user/login-register )

- 接口说明
  - 合并了登录注册的功能，若是未注册用户，那么将直接注册并登录；如果是注册用户，那么验证通过后将登录。
  - 请求方式：POST
- 登录注册方式
  - 通过method字段来区分登录注册方式，method为"1"时是免密登录注册(验证码登录注册)，method为"2"时是账密登录注册。不同的method值对应不同的必填字段，详见接口参数表。

| 参数名           | 类型     | 是否必填 | 参数说明                                           |
|---------------|--------|------|------------------------------------------------|
| email         | string | 是    | 邮箱                                             |
| method        | string | 是    | method为"1"时是免密登录注册(验证码登录注册)，method为"2"时是账密登录注册 |
| identify_code | string | 否    | 当method为"1"时，该字段必填，为"2"时该字段不用填，该值是邮箱发送的验证码     |
| identify_id   | string | 否    | 当method为"2"时，该字段必填，为"1"时该字段不用填，该值是生成的图片验证码     |
| password      | string | 否    | 当method为"2"时，该字段必填，为"1"时该字段不用填                 |
| caller        | string | 是    | 调用方标识，请传递固定字符串`web`                            |
| sign          | string | 是    | 签名，见"验签sign字段"                                 |

- 请求示例
```text
curl --request POST --url http://ip:port/user/login-register --header 'content-type: application/x-www-form-urlencoded' --data caller=web --data email=yswang837@gmail.com --data identify_code=667788 --data method=1 --data caller=test --data sign=fb469d7ef430b0baf0cab6c436e70375
```
- 响应示例
```json
{
	"code": 2000001,
	"message": "注册成功",
	"result": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDI4NDQ3LCJpYXQiOjE3MjQwMjg0NDd9fQ.TEZLCHmFjX99FFYuw848kI4X24hmRUObNatTF2wFpS8",
		"user": {
			"uid": 10001,
			"email": "yswang837@gmail.com",
			"password": "",
			"phone": "",
			"nick_name": "yswang837",
			"role": 1,
			"grade": 1,
			"avatar": "https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg",
			"summary": "",
			"gender": "保密",
			"province_city": "",
			"code_age": 1,
			"is_certified": 0,
			"data_integrity": 0,
			"birthday": "",
			"create_time": "2024-08-19T08:47:27Z",
			"update_time": "2024-08-19T08:47:27Z",
			"login_time": "2024-08-19T08:47:27Z"
		}
	}
}
```

### 3.4 检查密码是否为空 ( /user/check-password )

- 接口说明
  - 检查当前用户是否设置密码，如果未设置密码，则只能通过邮箱登录，无法账密登录，在免密登录后，才能设置密码，之后才能账号密码登录。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| email  | string | 是    | 邮箱                  |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request GET --url 'http://ip:port/user/check-password?caller=web&email=yswang837@gmail.com&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDMwMjAwLCJpYXQiOjE3MjQwMzAyMDB9fQ.pmlYFOMilNjoFX9vSc9CRsvaQ_MB30gYTx7aJLi6hkM'
```
- 响应示例
```json
{
  "code": 2000020,
  "message": "empty password, please set it"
}
```

### 3.5 退出登录 ( /user/login-out )

- 接口说明
  - 退出登录，将jwt token加入到jwt黑名单中，禁止该jwt登录。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request GET --url http://ip:port/user/login-out?caller=web&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7 --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIwMDgxMzUzLCJpYXQiOjE3MjAwODEzNTN9fQ.Jw5JWbvl7yS0rX9qZd75xUM6lzjcNVGOjSpOiQX5WhM'
```
- 响应示例
```json
{
  "code": 2000061,
  "message": "jwt作废成功"
}
```

### 3.6 更新昵称 ( /user/nick-name )

- 接口说明
  - 更新用户昵称，若昵称未改变，则更新失败。
  - 请求方式：POST

| 参数名       | 类型     | 是否必填 | 参数说明                |
|-----------|--------|------|---------------------|
| email     | string | 是    | 邮箱                  |
| nick_name | string | 是    | 用户昵称                |
| caller    | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign      | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/nick-name --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzE5ODEwMDUwLCJpYXQiOjE3MTk4MTAwNTB9fQ.Ugo95yKM7V3qc4YALIniVy3jiCMXrrZgVNwn9hutvCg' --data caller=web --data email=yswang837@gmail.com --data nick_name=小钻风  --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000200,
  "message": "update nick name succ"
}
```

### 3.7 更新性别 ( /user/gender )

- 接口说明
  - 更新用户性别，用户性别只能更新一次，若当前是保密，则只能更新成男或者女，若当前已经是男或者女了，那将不能被更新。
  - 请求方式：POST

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| email  | string | 是    | 邮箱                  |
| gender | string | 是    | 男，女，保密              |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/gender  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzE5ODEwMDUwLCJpYXQiOjE3MTk4MTAwNTB9fQ.Ugo95yKM7V3qc4YALIniVy3jiCMXrrZgVNwn9hutvCg' --data email=yswang837@gmail.com --data caller=web --data 'gender=男' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000220,
  "message": "update gender succ"
}
```

### 3.8 更新个人简介 ( /user/summary )

- 接口说明
  - 更新用户的个人简介，前后值相同，则无法更新。
  - 请求方式：POST

| 参数名     | 类型     | 是否必填 | 参数说明                |
|---------|--------|------|---------------------|
| email   | string | 是    | 邮箱                  |
| summary | string | 是    | 个人简介                |
| caller  | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign    | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/summary --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzE5ODEwMDUwLCJpYXQiOjE3MTk4MTAwNTB9fQ.Ugo95yKM7V3qc4YALIniVy3jiCMXrrZgVNwn9hutvCg' --data email=yswang837@gmail.com --data caller=web --data 'summary=好记性不如烂笔头' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000240,
  "message": "update summary succ"
}
```

### 3.9 更新户籍省市 ( /user/province-city )

- 接口说明
  - 更新户籍省市，前后值相同，则无法更新。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| email    | string | 是    | 邮箱                  |
| province | string | 是    | 省                   |
| city     | string | 是    | 市                   |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/province-city --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzE5ODEwMDUwLCJpYXQiOjE3MTk4MTAwNTB9fQ.Ugo95yKM7V3qc4YALIniVy3jiCMXrrZgVNwn9hutvCg' --data email=yswang837@gmail.com --data caller=web --data 'province=贵州' --data 'city=遵义' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000260,
  "message": "update province city succ"
}
```

### 3.10 更新生日 ( /user/birthday )

- 接口说明
  - 更新生日，前后值相同，则无法更新。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| email    | string | 是    | 邮箱                  |
| birthday | string | 是    | 生日，格式YYYY-MM-DD     |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/birthday --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzE5ODEwMDUwLCJpYXQiOjE3MTk4MTAwNTB9fQ.Ugo95yKM7V3qc4YALIniVy3jiCMXrrZgVNwn9hutvCg' --data email=yswang837@gmail.com --data caller=web --data birthday=2023-12-11 --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000280,
  "message": "update birthday succ"
}
```

### 3.11 更新密码 ( /user/password )

- 接口说明
  - 更新密码，前后值相同，则无法更新，密码长度为6~20位。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| email    | string | 是    | 邮箱                  |
| password | string | 是    | 密码，长度6~20位          |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://127.0.0.1:6677/user/password --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --data email=yswang837@gmail.com --data password=111111 --data caller=web --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000300,
  "message": "update password success"
}
```

### 3.12 文件上传 ( /file/upload )

- 接口说明
  - 上传文件的通用接口，比如说上传文章封面，上传用户头像等。
  - 请求方式：POST
  - 注意该接口的content-type: multipart/form-data

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| file   | file   | 是    | 不参与验签               |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/file/upload --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIwNzYzNzAwLCJpYXQiOjE3MjA3NjM3MDB9fQ.3o-Rsg_o5n04D6Xajzb0NGUJ2JmrirIFxvf-oCV_iQE' --header 'content-type: multipart/form-data' --form file=~/Downloads/2024-08-13_17-18-57.png --data caller=web --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000140,
  "message": "上传文件成功",
  "result": "http://sghu8zs4b.hb-bkt.clouddn.com/Fo1ljdiV_R1pXxKq9PR9FZy4J0fo"
}
```

### 3.13 发布文章 ( /article/publish )

- 接口说明
  - 发布文章。
  - 请求方式：POST

| 参数名       | 类型     | 是否必填 | 参数说明                |
|-----------|--------|------|---------------------|
| title     | string | 是    | 文章标题                |
| content   | string | 是    | 文章内容，不参与验签          |
| cover_img | string | 是    | 文章封面url             |
| summary   | string | 是    | 文章摘要                |
| uid       | int    | 是    | 用户ID                |
| caller    | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign      | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/article/publish --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMTgwMTM5LCJpYXQiOjE3MjExODAxMzl9fQ.UXcN0t5kxzq9aBgMOU9jQ5P5LtaFZg_lFeyShuZPmsc' --header 'content-type: application/x-www-form-urlencoded' --data 'title=如何搭建redis主从同步集群' --data 'caller=web' --data 'content=Redis 主从复制集群是一种高可用性架构，它允许多个Redis实例（节点）之间进行数据复制。在这种架构中，一个Redis节点被指定为主节点（master），其他节点作为从节点（slaves）。' --data uid=10001 --data cover_img=https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg --data 'summary=Redis 主从复制集群是一种高可用性架构，它允许多个Redis实例（节点）之间进行数据复制。' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000120,
  "message": "添加文章成功"
}
```

### 3.14 获取文章列表 ( /article/list )

- 接口说明
  - 获取文章列表，默认查询则传递对应参数的零值，默认一次查询50条，也支持分页查询。
  - 请求方式：GET

| 参数名       | 类型     | 是否必填 | 参数说明                                                  |
|-----------|--------|------|-------------------------------------------------------|
| page      | int    | 是    | 第几页                                                   |
| uid       | int    | 否    | 如果uid不为空，则返回当前用户的文章列表，否则返回所有文章列表                      |
| page_size | int    | 否    | 每页多少条                                                 |
| caller    | string | 是    | 调用方标识，请传递固定字符串`web`                                   |
| sign      | string | 是    | 签名，$attrString为page、page_size的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://ip:port/article/list?uid=10001&page=3&page_size=2&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMDQwMzEwLCJpYXQiOjE3MjEwNDAzMTB9fQ.tN_YD55WpkRsOXIfiH5TlI5MKp84ziRg0veSCXSxyjg' --data 'caller=web' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000180,
  "message": "获取文章列表成功",
  "result": [
    {
      "aid": "AA46829987331837952",
      "title": "黑悟空的由来",
      "content": "<p>黑悟空，正式名称为《黑神话：悟空》，是由游戏科学开发的一款以《西游记》为背景的动作角色扮演游戏。游戏的主角是猴子（很可能是孙悟空的第二元神、身外化身或者心魔的存在），在孙悟空的指引下，玩家将扮演这位&ldquo;天命之人&rdquo;，在妖魔横行、佛道衰败的东方魔幻世界中踏上冒险旅程，寻找能够拯救世界的秘密&ldquo;那个东西&rdquo;<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">30</span>。</p>\n<p>游戏的世界观和背景故事是西游取经之后，妖魔与神佛展开大战，上一代&ldquo;天命人&rdquo;孙悟空带领下的妖魔联军成功击败佛道两家，成为新任三界统治阶级，导致末法时代来临，如来涅槃，弥勒转世，道门隐遁。但随着时间推移，孙悟空发现世界并没有变得更好，反而更糟，因此他内心充满自责和愧疚，开始寻找新的救世之道，催生心魔，培育成身外化身，也就是玩家操作的主角猴子，并指使玩家去寻找救世之道<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">30</span>。</p>\n<p>《黑神话：悟空》在游戏行业及玩家中具有强大的号召力，被视为&ldquo;国产3A之光&rdquo;，在预售阶段就获得了极大的关注和支持<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">33</span>。游戏的实机演示视频一经发布，就引起了轰动效应，让许多玩家和从业者看到了国产3A游戏的希望<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">28</span>。尽管游戏还未正式面世，但其宣传片已经激发了国外玩家对中国神话的兴趣，开始好奇《龙珠》中的悟空与《西游记》中的悟空之间的区别<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">28</span>。</p>\n<p class=\"last-node\">然而，游戏在预售和即将上线的过程中也遇到了一些争议，涉及到&ldquo;政治正确&rdquo;和&ldquo;性别议题&rdquo;。不过，这些争议反而激发了更多玩家的热情，纷纷预购游戏以示支持<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">33</span>。尽管面临一些挑战，《黑神话：悟空》的开发团队依然在积极推进游戏的开发，并希望通过这款游戏向全球玩家展示中国传统文化的魅力<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">28</span><span class=\"refIndex___iN7ZN ragIndex___HYxyx\">33</span></p>",
      "cover_img": "http://sghu8zs4b.hb-bkt.clouddn.com/FnKt4JTjW0m83WLrNKqaWG8NrleB",
      "summary": "黑悟空，正式名称为《黑神话：悟空》，是由游戏科学开发的一款以《西游记》为背景的动作角色扮演游戏。游戏的主角是猴子（很可能是孙悟空的第二元神、身外化身或者心魔的存在），在孙悟空的指引下，玩家将扮演这位“天命之人”，在妖魔横行、佛道衰败的东方魔幻世界中踏上冒险旅程，寻找能够拯救世界的秘密“那个东西”30。",
      "read_num": 0,
      "comment_num": 0,
      "collect_num": 0,
      "uid": 10001,
      "create_time": "2024-07-16T13:25:39+08:00",
      "update_time": "2024-07-16T13:25:39+08:00"
    },
    {
      "aid": "AA46830307449507840",
      "title": "超二午饭大站沙鲁解说",
      "content": "<p>在《龙珠Z》的沙鲁篇中，孙悟饭（午饭）变身为超级赛亚人2（Super Saiyan 2，简称超二）与沙鲁的战斗是一个标志性的情节。以下是对这场战斗的解说：</p>\n<p>1. 背景：沙鲁是由格罗博士制造的终极人造人，他拥有吸收他人能力的特性，并在吸收了众多Z战士的能力后变得异常强大。沙鲁还自导了一场武道会，邀请Z战士们参加，实际上是为了展示自己的力量。</p>\n<p>2. 沙鲁的挑衅：沙鲁在武道会上击败了众多Z战士，包括比克、天津饭、克林和特兰克斯等，他的强大让Z战士们感到绝望。</p>\n<p>3. 孙悟饭的觉醒：在沙鲁的挑衅和对家人及朋友的威胁下，孙悟饭的愤怒被激发，他开始变身为超级赛亚人2。</p>\n<p>4. 超二变身：孙悟饭变身为超二时，他的头发变得更长，身体周围环绕着闪电，气焰更加强烈，力量、速度和耐力都有了质的飞跃。</p>\n<p>5. 战斗开始：变身后的孙悟饭与沙鲁展开了激烈的战斗。超二状态下的孙悟饭展现出了惊人的战斗力，能够与沙鲁进行正面对抗。</p>\n<p>6. 战斗高潮：孙悟饭使用了他的招牌技能，如&ldquo;神龙翔拳&rdquo;和&ldquo;怒放撃心&rdquo;，对沙鲁造成了重创。沙鲁虽然强大，但在超二的孙悟饭面前开始显得力不从心。</p>\n<p>7. 战斗结果：尽管孙悟饭在战斗中占据了上风，但沙鲁在最后选择了自爆，企图与Z战士们同归于尽。孙悟饭在紧急时刻被孙悟空用瞬间移动救走，而孙悟空不幸牺牲。</p>\n<p>8. 后续影响：孙悟饭的超二变身不仅在战斗中取得了胜利，也为他赢得了&ldquo;神童&rdquo;的称号。这场战斗成为了《龙珠Z》中的经典时刻，展示了孙悟饭作为Z战士的潜力和勇气。</p>\n<p>9. 文化影响：孙悟饭与沙鲁的战斗在《龙珠》粉丝中具有极高的知名度，成为了赛亚人变身和战斗精神的象征。</p>\n<p>孙悟饭的超二变身与沙鲁的战斗是《龙珠Z》中一个非常重要的转折点，它不仅展示了孙悟饭的成长和力量，也是对赛亚人不屈不挠、勇往直前精神的体现。</p>",
      "cover_img": "http://sghu8zs4b.hb-bkt.clouddn.com/FgD5d5tDjLBvT8KwSe7J8iyKoMmQ",
      "summary": "在《龙珠Z》的沙鲁篇中，孙悟饭（午饭）变身为超级赛亚人2（Super Saiyan 2，简称超二）与沙鲁的战斗是一个标志性的情节。以下是对这场战斗的解说：",
      "read_num": 0,
      "comment_num": 0,
      "collect_num": 0,
      "uid": 10001,
      "create_time": "2024-07-16T13:26:55+08:00",
      "update_time": "2024-07-16T13:26:55+08:00"
    }
  ]
}
```

### 3.15 获取单篇文章的详情数据 ( /article/detail )

- 接口说明
  - 获取单篇文章的详情数据。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                                       |
|--------|--------|------|--------------------------------------------|
| aid    | string | 是    | 文章的唯一ID                                    |
| caller | string | 是    | 调用方标识，请传递固定字符串`web`                        |
| sign   | string | 是    | 签名，$attrString为aid的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://ip:port/article/detail?aid=AA46828731192315904&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMDQwMzEwLCJpYXQiOjE3MjEwNDAzMTB9fQ.tN_YD55WpkRsOXIfiH5TlI5MKp84ziRg0veSCXSxyjg' --data 'caller=web'  --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000160,
  "message": "获取文章详情成功",
  "result": {
    "aid": "AA46828731192315904",
    "title": "比克大魔王的人生经历",
    "content": "<div class=\"main-content\">\n<div class=\"pop-container\">\n<div class=\"popcontent-hole\">\n<div class=\"pop-content\">\n<div class=\"normal___qxduM\">\n<div class=\"markdown___vuBDJ\">\n<p>比克大魔王是《龙珠》系列中一个重要的反派角色，他的人生经历跌宕起伏，充满了转变和成长。以下是对他人生经历的总结：</p>\n<ol>\n<li>\n<p><strong>身份背景</strong>：比克大魔王原本是地球神仙的邪恶化身，由于那美克星气候恶劣，他的父亲卡达兹将他送到地球上，但不幸失去记忆。后来被地球的神看重，却因产生邪念被排出体外，成为了比克大魔王<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n<li>\n<p><strong>特征特点</strong>：比克大魔王有着一张可怕的脸和绿色皮肤，穿着带有&ldquo;魔&rdquo;字的道服，性格邪恶，喜欢征服世界和欣赏人类的恐惧表情<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n<li>\n<p><strong>恢复青春</strong>：在被皮拉夫一伙释放后，比克大魔王为了恢复青春和力量，搜集龙珠，并命令手下杀害武道会的知名人士。最终通过龙珠成功恢复了青春<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n<li>\n<p><strong>征服世界</strong>：恢复年轻后的比克大魔王攻入世界首都，杀死阻挡自己的军队和武术家，逼迫国王退位，并宣布将世界变成人间地狱<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n<li>\n<p><strong>失败死亡</strong>：在与孙悟空的决战中，比克大魔王被击败，临死前吐出了带有全部力量的卵，诞生了儿子比克，并嘱咐其为自己报仇<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n<li>\n<p><strong>转变与成长</strong>：比克，作为比克大魔王的儿子，最初是为了复仇而诞生，但在与孙悟饭的相处中逐渐发生了改变。他成为了悟饭的师傅，并在多次战斗中为保护悟饭而牺牲自己，表现出了深厚的情感<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">11</span>。</p>\n</li>\n<li>\n<p><strong>与神仙同化</strong>：比克为了获得更强大的力量，选择与神仙重新合体，不仅增强了战斗力，还继承了神仙的智慧和超能力，成为了超级那美克星人<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">11</span>。</p>\n</li>\n<li>\n<p><strong>最终牺牲</strong>：在《龙珠GT》中，地球面临毁灭时，比克选择与地球同归于尽，成为了地狱的守护者，体现了他作为天神的责任感<span class=\"refIndex___iN7ZN ragIndex___HYxyx\">9</span>。</p>\n</li>\n</ol>\n<p class=\"last-node\">比克大魔王的人生经历从邪恶的征服者到为保护世界而牺牲的英雄，展现了一个反派角色深刻的转变和成长。</p>\n</div>\n</div>\n</div>\n</div>\n</div>\n<div class=\"contentbottom-hole\">&nbsp;</div>\n</div>",
    "cover_img": "http://sghu8zs4b.hb-bkt.clouddn.com/FiYcUo-9yt9kVXscPWb-pYY72ceS",
    "summary": "比克大魔王是《龙珠》系列中一个重要的反派角色，他的人生经历跌宕起伏，充满了转变和成长。以下是对他人生经历的总结：",
    "read_num": 0,
    "comment_num": 0,
    "collect_num": 0,
    "uid": 10001,
    "create_time": "2024-07-16T13:20:39+08:00",
    "update_time": "2024-07-16T13:20:39+08:00"
  }
}
```

## 4.错误码汇总

| 错误码     | 错误码说明               |
|---------|---------------------|
| 2000001 | 注册成功                | 
| 2000002 | 免密方式，登录成功           | 
| 2000003 | 账密方式，登录成功           |
| 2000021 | 有效的密码               |
| 2000040 | 设置邮箱验证码成功           |
| 2000060 | token作废成功           |
| 2000100 | 生成验证码成功             |
| 2000120 | 添加文章成功              |
| 2000140 | 上传文件成功              |
| 2000160 | 获取文章详情成功            |
| 2000180 | 获取文章列表成功            |
| 2000200 | 更新昵称成功              |
| 2000220 | 更新性别成功              |
| 2000240 | 个人简介更新成功            |
| 2000260 | 更新省市成功              |
| 2000280 | 更新生日成功              |
| 2000300 | 密码更新成功              |
| 4000001 | 参数错误                |
| 4000002 | 免密方式，验证码为空          |
| 4000003 | 免密方式，验证码错误          |
| 4000004 | 账密方式，密码为空           |
| 4000005 | 账密方式，验证码为空          |
| 4000006 | 账密方式，验证码错误          |
| 4000007 | 不支持的登录/注册方式         |
| 4000008 | 生成token失败           |
| 4000009 | 注册失败                |
| 4000010 | 注册成功，但获取用户信息失败      |
| 4000011 | 免密方式，更新登录时间失败       |
| 4000012 | 您未设置密码，请使用免密登录后设置密码 |
| 4000013 | 账密方式，更新登录时间失败       |
| 4000014 | 邮箱或者密码错误            |
| 4000020 | 参数错误                |
| 4000021 | 获取用户信息失败            |
| 4000022 | 密码为空，请设置密码          |
| 4000040 | 参数错误                |
| 4000041 | 邮件发送失败，请稍后重试或联系客服   |
| 4000042 | 设置邮箱验证码失败           |
| 4000060 | token为空             |
| 4000061 | token作废失败           |
| 4000080 | 未登录或非法访问            |
| 4000081 | 帐户异地登陆或令牌失效         |
| 4000082 | token未授权            |
| 4000100 | 生成验证码失败             |
| 4000120 | 参数错误                |
| 4000121 | 添加文章失败              |
| 4000140 | 参数错误                |
| 4000141 | 上传文件错误              |
| 4000160 | 参数错误                |
| 4000161 | 获取文章详情失败            |
| 4000180 | 参数错误                |
| 4000181 | 没有更多数据              |
| 4000182 | 获取文章列表失败            |
| 4000200 | 参数错误                |
| 4000201 | 获取用户信息失败            |
| 4000202 | 昵称未改变               |
| 4000203 | 更新昵称失败              |
| 4000220 | 参数错误                |
| 4000221 | 更新性别失败              |
| 4000240 | 参数错误                |
| 4000241 | 获取用户信息失败            |
| 4000242 | 个人简介未改变             |
| 4000243 | 个人简介更新失败            |
| 4000260 | 参数错误                |
| 4000261 | 获取用户信息失败            |
| 4000262 | 省市未改变               |
| 4000263 | 更新省市失败              |
| 4000280 | 参数错误                |
| 4000281 | 获取用户信息失败            |
| 4000282 | 生日未改变               |
| 4000283 | 更新生日失败              |
| 4000300 | 参数错误                |
| 4000301 | 密码长度必须在6~20个字符      |
| 4000302 | 获取用户信息失败            |
| 4000303 | 密码未改变               |
| 4000304 | 密码更新失败              |
