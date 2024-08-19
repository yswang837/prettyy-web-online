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
  - 除接口/user/login-register，/user/captcha-by-email和/user/captcha不需要填写该字段，其余接口都需要。示例值：Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWdpc3RlcmVkQ2xhaW1zIjp7InN1YiI6IlRva2VuIiwiZXhwIjoxNzIzODAwOTQwLCJpYXQiOjE3MjM4MDA5NDB9fQ.4wJGLMOp2eVKwOFq1ltyKq-z7zBdHgF2OD45L_N3HT4
- 验签sign字段
  - 统一的规则是md5($pin+$attrString)，其中，pin=098f6bcd4621d373cade4e832627b4f6，加号不参与验签，attrString是接口的某些字段值按顺序直接拼接的，由具体的接口指定。
  - 如接口A要参与验签的字段分别是aa,cc,bb,那么sign=md5(098f6bcd4621d373cade4e832627b4f6$aa$cc$bb),若aa=123,cc=456,bb=789,那么经计算sign=04e229d3fddf82f2e6cb6c9e5dac3ab7
- 接口地址
  - 域名：wys837.cn 正在icp备案，暂未使用
  - IP：120.26.203.121
- Content-Type
  - POST均为x-www-form-urlencoded
  - GET均为none
### 3.1 登录注册接口 ( /user/login-register )

- 接口说明
  - 合并了登录注册的功能，若是未注册用户，那么将直接注册并登录；如果是注册用户，那么验证通过后将登录。
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