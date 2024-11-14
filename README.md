# 笔尖

- 项目概览
  - 本项目提供的所有资源完全免费。前端采用Vue3框架构建的Web应用，本代码库全部源代码。
  - 后端接口由Go语言实现，服务托管在阿里云服务器，为各位免费提供稳定的接口服务。
  - 我们鼓励社区成员Fork本项目并贡献代码。任何优化，无论大小，我们都将予以考虑并合并，让你的简历增色。
  - 同时，我们也非常期待您为本项目点赞Star，以示支持。
- 学习交流机会
  - 欢迎加入我们的项目交流群，与志同道合的伙伴一起学习、分享和讨论。现在加入，完全免费。请添加我们的项目管理员微信：ssec532。我们会尽快验证并邀请您入群。

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
  - uid放在jwt生成的token中，前端需要uid时，需自己从token中解析，不再单独说明。
  - 后端下发的token，有效期是1天。
- 调用方
  - caller的值为web，用于标识调用方的字段，所有接口都需要该字段
- 验签sign字段
  - 统一的规则是md5($pin+$attrString)，其中，pin=4d3abacc23255a0767c718afda30cc8c，加号不参与验签，attrString是接口的所有字段的key=value按字符串排序后直接拼接的(sign、file和content字段除外)，由具体的接口指定。
  - 例如：接口A要参与验签的字段和值分别是aa=a,cc=c,bb=b,那么sign=md5(4d3abacc23255a0767c718afda30cc8caa=abb=bcc=c),那么经计算sign=33b707af5dc72835b529eb77a53ff873
- Content-Type
  - POST均为x-www-form-urlencoded （特殊说明的除外）
  - GET均为none
- 所有错误码明细见文末
- 所有请求示例的sign值不一定正确，正确的计算方式参考"验签sign字段"。
- 接口地址，wys837.cn 正在icp备案，暂未使用，先使用ip加端口访问，简记为ip:port 为 120.26.203.121:8888

### 3.1 通过邮箱获取验证码 ( /user/captcha-by-email )

- 接口说明
  - 通过邮箱获取验证码，验证码由6位数字组成，验证码有效期为5分钟。
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
  "message": "设置邮箱验证码成功"
}
```

### 3.2 账密登录时验证码 ( /user/captcha )

- 接口说明
  - 通过账密登录时，获取验证码，验证码由6位数字组成，验证失败或者页面刷新时，会刷新。验证码的防爆次数为1
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
curl --request POST --url http://ip:port/user/login-register --header 'content-type: application/x-www-form-urlencoded' --data caller=web --data email=yswang837@gmail.com --data identify_code=667788 --data method=1 --data sign=fb469d7ef430b0baf0cab6c436e70375
```
- 响应示例
```json
{
  "code": 2000001,
  "message": "注册成功",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOjEwMDAzLCJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI2MTMzOTMzLCJpYXQiOjE3MjYxMzM5MzN9fQ.QKzOm2JJ0K3s19BS69OPm3irrs4TNXigdLEqaHxEkCE",
    "user": {
      "avatar": "https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg",
      "code_age": 1,
      "create_time": "2024-09-12 17:38:53",
      "data_integrity": 30,
      "email": "yswang8371111@gmail.com",
      "gender": "保密",
      "grade": 1,
      "is_certified": 0,
      "login_time": "2024-09-12 17:38:53",
      "nick_name": "yswang8371111",
      "password": "e10adc3949ba59abbe56e057f20f883e",
      "phone": "",
      "role": 1,
      "summary": "",
      "update_time": "2024-09-12 17:38:53"
    }
  }
}
```

### 3.4 检查密码是否为空 ( /user/check-password )

- 接口说明
  - 检查当前用户是否设置密码，如录果未设置密码，则只能通过邮箱登录，无法账密登，在免密登录后，才能设置密码，之后才能账号密码登录。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| uid    | string | 是    | 用户id，需从token中解析     |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request GET --url 'http://ip:port/user/check-password?caller=web&uid=10001&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDMwMjAwLCJpYXQiOjE3MjQwMzAyMDB9fQ.pmlYFOMilNjoFX9vSc9CRsvaQ_MB30gYTx7aJLi6hkM'
```
- 响应示例
```json
{
  "code": 2000020,
  "message": "有效的密码"
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
  "code": 2000060,
  "message": "token作废成功"
}
```

### 3.6 更新昵称 ( /user/nick-name )

- 接口说明
  - 更新用户昵称，若昵称未改变，则更新失败。
  - 请求方式：POST

| 参数名       | 类型     | 是否必填 | 参数说明                |
|-----------|--------|------|---------------------|
| uid       | string | 是    | 用户id                |
| nick_name | string | 是    | 用户昵称                |
| caller    | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign      | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/nick-name --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --data caller=web --data uid=10001 --data nick_name=小钻风  --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000200,
  "message": "更新昵称成功"
}
```

### 3.7 更新性别 ( /user/gender )

- 接口说明
  - 更新用户性别，用户性别只能更新一次，若当前是保密，则只能更新成男或者女，若当前已经是男或者女了，那将不能被更新。
  - 请求方式：POST

| 参数名    | 类型     | 是否必填 | 参数说明                |
|--------|--------|------|---------------------|
| uid    | string | 是    | 用户id                |
| gender | string | 是    | 男，女，保密              |
| caller | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign   | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/gender  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --data uid=10001 --data caller=web --data 'gender=男' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000220,
  "message": "更新性别成功"
}
```

### 3.8 更新个人简介 ( /user/summary )

- 接口说明
  - 更新用户的个人简介，若前后值相同，则无法更新。
  - 请求方式：POST

| 参数名     | 类型     | 是否必填 | 参数说明                |
|---------|--------|------|---------------------|
| uid     | string | 是    | 用户id                |
| summary | string | 是    | 个人简介                |
| caller  | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign    | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/summary --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded'  --data uid=10001 --data caller=web --data 'summary=好记性不如烂笔头' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000240,
  "message": "个人简介更新成功"
}
```

### 3.9 更新户籍省市 ( /user/province-city )

- 接口说明
  - 更新户籍省市，前后值相同，则无法更新。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| uid      | string | 是    | 用户id                |
| province | string | 是    | 省                   |
| city     | string | 是    | 市                   |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/province-city --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded'  --data uid=10001 --data caller=web --data 'province=贵州' --data 'city=遵义' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000260,
  "message": "更新省市成功"
}
```

### 3.10 更新生日 ( /user/birthday )

- 接口说明
  - 更新生日，前后值相同，则无法更新。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| uid      | string | 是    | 用户id                |
| birthday | string | 是    | 生日，格式YYYY-MM-DD     |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/birthday --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded'  --data uid=10001 --data caller=web --data birthday=2023-12-11 --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000280,
  "message": "更新生日成功"
}
```

### 3.11 更新密码 ( /user/password )

- 接口说明
  - 更新密码，前后值相同，则无法更新，密码长度为6~20位。
  - 请求方式：POST

| 参数名      | 类型     | 是否必填 | 参数说明                |
|----------|--------|------|---------------------|
| uid      | string | 是    | 用户id                |
| password | string | 是    | 密码，长度6~20位          |
| caller   | string | 是    | 调用方标识，请传递固定字符串`web` |
| sign     | string | 是    | 签名，见"验签sign字段"      |

- 请求示例
```text
curl --request POST --url http://ip:port/user/password --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDQzMjQ1LCJpYXQiOjE3MjQwNDMyNDV9fQ.7I095qkv51gOaLTJr3aOZb4O6NVFHskRwmR8BEwNy9A' --header 'content-type: application/x-www-form-urlencoded' --data uid=10001 --data password=111111 --data caller=web --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000300,
  "message": "密码更新成功"
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

| 参数名         | 类型     | 是否必填 | 参数说明                                               |
|-------------|--------|------|----------------------------------------------------|
| title       | string | 是    | 文章标题                                               |
| content     | string | 是    | 文章内容，该字段不参与验签                                      |
| cover_img   | string | 是    | 文章封面url                                            |
| summary     | string | 是    | 文章摘要                                               |
| visibility  | string | 否    | 文章的可见性，默认全部可见 "1"-全部可见 "2"-VIP可见 "3"-粉丝可见 "4"-仅我可见 |
| tags        | string | 是    | 文章标签，以英文逗号分隔，最多10个标签，由用户发文的时候打标签                   |
| typ         | string | 否    | 文章类型，默认原创，"1"-原创 "2"-转载 "3"-翻译 "4"-其他              |
| uid         | int    | 是    | 用户id                                               |
| caller      | string | 是    | 调用方标识，请传递固定字符串`web`                                |
| sign        | string | 是    | 签名，见"验签sign字段"                                     |

- 请求示例
```text
curl --request POST --url http://ip:port/article/publish --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMTgwMTM5LCJpYXQiOjE3MjExODAxMzl9fQ.UXcN0t5kxzq9aBgMOU9jQ5P5LtaFZg_lFeyShuZPmsc' --header 'content-type: application/x-www-form-urlencoded' --data 'title=如何搭建redis主从同步集群' --data 'visibility=1' --data 'tags=数据结构,leetcode,golang解法' --data 'typ=1' --data 'caller=web' --data 'content=Redis 主从复制集群是一种高可用性架构，它允许多个Redis实例（节点）之间进行数据复制。在这种架构中，一个Redis节点被指定为主节点（master），其他节点作为从节点（slaves）。' --data uid=10001 --data cover_img=https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg --data 'summary=Redis 主从复制集群是一种高可用性架构，它允许多个Redis实例（节点）之间进行数据复制。' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
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
  - 获取文章列表，若想默认查询，则传递必填参数即可，page从1开始，默认一次查询20条；也支持分页查询，也支持查询某个用户的文章列表，也支持文章的可见性列表查询，也支持文章类型的列表查询。
  - 对应csdn->创作中心->内容管理->文章 下面的功能
  - 请求方式：GET

| 参数名        | 类型     | 是否必填 | 参数说明                                 |
|------------|--------|------|--------------------------------------|
| page       | int    | 是    | 第几页                                  |
| uid        | int    | 否    | 如果uid不为空，则返回当前用户的文章列表，否则返回所有文章列表     |
| page_size  | int    | 否    | 每页多少条                                |
| visibility | string | 否    | 文章的可见性, 1-全部可见 2-VIP可见 3-粉丝可见 4-仅我可见 |
| typ        | string | 否    | 文章类型，1-原创 2-转载 3-翻译                  |
| caller     | string | 是    | 调用方标识，请传递固定字符串`web`                  |
| sign       | string | 是    | 见"验签sign字段"                          |

- 请求示例
```text
curl --request GET --url 'http://ip:port/article/list?uid=10001&page=3&page_size=2&visibility=1&typ=2&caller=web&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMDQwMzEwLCJpYXQiOjE3MjEwNDAzMTB9fQ.tN_YD55WpkRsOXIfiH5TlI5MKp84ziRg0veSCXSxyjg'
```
- 响应示例
```json
{
  "code": 2000180,
  "message": "获取文章列表成功",
  "result": {
    "article_list": [
      {
        "aid": "AB125",
        "title": "test",
        "content": "\ufffd\ufffd-",
        "cover_img": "http://sihrw5mu0.sabkt.gdipper.com/Fgh2Yat8CNpeOrbzLm1Sf-gxJ4tG",
        "summary": "test",
        "tags": "test",
        "visibility": "1",
        "typ": "2",
        "share_num": 1,
        "comment_num": 1,
        "like_num": 1,
        "read_num": 1,
        "collect_num": 1,
        "status": "1",
        "uid": 10001,
        "create_time": "2024-09-01T21:11:35+08:00",
        "update_time": "2024-09-01T21:11:35+08:00"
      },
      {
        "aid": "AB126",
        "title": "test",
        "content": "\ufffd\ufffd-",
        "cover_img": "http://sihrw5mu0.sabkt.gdipper.com/Fgh2Yat8CNpeOrbzLm1Sf-gxJ4tG",
        "summary": "test",
        "tags": "test",
        "visibility": "1",
        "typ": "2",
        "share_num": 1,
        "comment_num": 1,
        "like_num": 1,
        "read_num": 1,
        "collect_num": 1,
        "status": "1",
        "uid": 10001,
        "create_time": "2024-09-01T21:11:35+08:00",
        "update_time": "2024-09-01T21:11:35+08:00"
      }
    ],
    "count": 8
  }
}
```

### 3.15 获取单篇文章的详情数据 ( /article/detail )

- 接口说明
  - 获取单篇文章的详情数据。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                                       |
|--------|--------|------|--------------------------------------------|
| aid    | string | 是    | 文章的唯一id                                    |
| caller | string | 是    | 调用方标识，请传递固定字符串`web`                        |
| sign   | string | 是    | 签名，$attrString为aid的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://ip:port/article/detail?aid=AA46828731192315904&caller=web&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMDQwMzEwLCJpYXQiOjE3MjEwNDAzMTB9fQ.tN_YD55WpkRsOXIfiH5TlI5MKp84ziRg0veSCXSxyjg'
```
- 响应示例
```json
{
  "code": 2000160,
  "message": "获取文章详情成功",
  "result": {
    "aid": "AA66157908588498944",
    "title": "海贼王",
    "content": "贴上这张图的时候，我们就已经知道它的作用了，将一些模糊不清的照片修复至高清",
    "cover_img": "http://sihrw5mu0.sabkt.gdipper.com/Fgh2Yat8CNpeOrbzLm1Sf-gxJ4tG",
    "summary": "贴上这张图的时候，我们就已经知道它的作用了，将一些模糊不清的照片修复至高清",
    "tags": "tag",
    "visibility": "1",
    "typ": "1",
    "share_num": 0,
    "comment_num": 0,
    "like_num": 0,
    "read_num": 0,
    "collect_num": 0,
    "status": "",
    "uid": 10001,
    "create_time": "2024-09-07T21:27:54+08:00",
    "update_time": "2024-09-07T21:27:54+08:00"
  }
}
```
### 3.16 删除文章 ( /article/del )

- 接口说明
  - 通过aid，uid删除一篇文章
  - 请求方式：POST

| 参数名    | 类型     | 是否必填 | 参数说明                                       |
|--------|--------|------|--------------------------------------------|
| aid    | string | 是    | 文章的唯一id                                    |
| uid    | int64  | 是    | 该文章所属的用户                                   |
| caller | string | 是    | 调用方标识，请传递固定字符串`web`                        |
| sign   | string | 是    | 签名，$attrString为aid的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request POST --url http://ip:port/article/del --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIxMTgwMTM5LCJpYXQiOjE3MjExODAxMzl9fQ.UXcN0t5kxzq9aBgMOU9jQ5P5LtaFZg_lFeyShuZPmsc' --header 'content-type: application/x-www-form-urlencoded' --data 'aid=AA66157908588498944' --data 'uid=10001' --data 'caller=web' --data 'sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例

```json
{
  "code": 2000320,
  "message": "删除文章成功"
}
```
### 3.17 通过aid获取用户信息 ( /article/get-user-info-by-aid )

- 接口说明
  - 通过aid获取用户信息。
  - 请求方式：GET

| 参数名    | 类型     | 是否必填 | 参数说明                                       |
|--------|--------|------|--------------------------------------------|
| aid    | string | 是    | 文章的唯一id                                    |
| caller | string | 是    | 调用方标识，请传递固定字符串`web`                        |
| sign   | string | 是    | 签名，$attrString为aid的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://127.0.0.1:6677/article/get-user-info-by-aid?aid=AA66157908588498944&caller=web&sign=04e229d3fddf82f2e6cb6c9e5dac3ab7'
```
- 响应示例
```json
{
  "code": 2000340,
  "message": "获取用户信息成功",
  "result": {
    "uid": 10001,
    "email": "yswang837@gmail.com",
    "password": "e10adc3949ba59abbe56e057f20f883e",
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
    "data_integrity": 30,
    "birthday": "",
    "create_time": "2024-09-09T09:41:36+08:00",
    "update_time": "2024-09-09T09:41:36+08:00",
    "login_time": "2024-09-13T14:37:04+08:00"
  }
}
```

## 4.错误码汇总

| 错误码     | 错误码说明               |
|---------|---------------------|
| 2000001 | 注册成功                | 
| 2000002 | 免密方式，登录成功           | 
| 2000003 | 账密方式，登录成功           |
| 2000020 | 有效的密码               |
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
| 2000320 | 删除文章成功              |
| 2000340 | 获取用户信息成功            |
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
| 4000320 | 参数错误                |
| 4000321 | 删除文章失败              |
| 4000340 | 参数错误                |
| 4000341 | 获取文章信息失败            |
| 4000342 | 获取用户信息失败            |
