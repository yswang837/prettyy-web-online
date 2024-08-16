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

### 3.1 
