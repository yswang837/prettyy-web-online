# 笔尖

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
  - 除接口/user/login-register，/user/captcha-by-email和/user/captcha不需要填写该字段，其余接口都需要，不再另外说明。示例值：Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIzODAwOTQwLCJpYXQiOjE3MjM4MDA5NDB9fQ.4wJGLMOp2eVKwOFq1ltyKq-z7zBdHgF2OD45L_N3HT4
- 验签sign字段
  - 统一的规则是md5($pin+$attrString)，其中，pin=098f6bcd4621d373cade4e832627b4f6，加号不参与验签，attrString是接口的某些字段值按顺序直接拼接的，由具体的接口指定。
  - 如接口A要参与验签的字段分别是aa,cc,bb,那么sign=md5(098f6bcd4621d373cade4e832627b4f6$aa$cc$bb),若aa=123,cc=456,bb=789,那么经计算sign=04e229d3fddf82f2e6cb6c9e5dac3ab7
- 接口地址
  - 域名：wys837.cn 正在icp备案，暂未使用
  - IP：120.26.203.121
- Content-Type
  - POST均为x-www-form-urlencoded
  - GET均为none
- 所有错误码明细见文末
- 为方便，开发阶段，未开启sign验签，所以请求示例的sign不一定正确，正确的计算方式参考"验签sign字段"。

### 3.1 通过邮箱获取验证码 ( /user/captcha-by-email )

- 接口说明
  - 通过邮箱获取验证码，验证码由6位数字组成，有效时长为5分钟。
  - 请求方式：GET

| 参数名   | 类型     | 是否必填 | 参数说明                                         |
|-------|--------|------|----------------------------------------------|
| email | string | 是    | 邮箱                                           |
| sign  | string | 是    | 签名，$attrString为email的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://localhost:6677/user/captcha-by-email?email=yswang837@gmail.com&sign=fb469d7ef430b0baf0cab6c436e70375'
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

| 参数名  | 类型     | 是否必填 | 参数说明                         |
|------|--------|------|------------------------------|
| sign | string | 是    | 签名，$attrString为空，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url http://localhost:6677/user/captcha?sign=fb469d7ef430b0baf0cab6c436e70375
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

| 参数名           | 类型     | 是否必填 | 参数说明                                                                |
|---------------|--------|------|---------------------------------------------------------------------|
| email         | string | 是    | 邮箱                                                                  |
| method        | string | 是    | method为"1"时是免密登录注册(验证码登录注册)，method为"2"时是账密登录注册                      |
| identify_code | string | 否    | 当method为"1"时，该字段必填，为"2"时该字段不用填，该值是邮箱发送的验证码                          |
| identify_id   | string | 否    | 当method为"2"时，该字段必填，为"1"时该字段不用填，该值是生成的图片验证码                          |
| password      | string | 否    | 当method为"2"时，该字段必填，为"1"时该字段不用填                                      |
| caller        | string | 是    | 调用方标识，如test                                                         |
| sign          | string | 是    | 签名，$attrString为email、password、identity_code的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request POST --url http://localhost:6677/user/login-register --header 'content-type: application/x-www-form-urlencoded' --data email=yswang837@gmail.com --data identify_code=667788 --data method=1 --data caller=test --data sign=fb469d7ef430b0baf0cab6c436e70375
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
  - 检查当前用户是否设置密码，如果未设置密码，则只能通过邮箱登录，无法账密登录。
  - 请求方式：GET

| 参数名           | 类型     | 是否必填 | 参数说明                                                                |
|---------------|--------|------|---------------------------------------------------------------------|
| email         | string | 是    | 邮箱                                                                  |
| sign          | string | 是    | 签名，$attrString为email、password、identity_code的字段值拼接而成的字符串，见"验签sign字段" |

- 请求示例
```text
curl --request GET --url 'http://127.0.0.1:6677/user/check-password?email=yswang837@gmail.com' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzI0MDMwMjAwLCJpYXQiOjE3MjQwMzAyMDB9fQ.pmlYFOMilNjoFX9vSc9CRsvaQ_MB30gYTx7aJLi6hkM'
```
- 响应示例
```json
{
  "code": 2000020,
  "message": "empty password, please set it"
}
```