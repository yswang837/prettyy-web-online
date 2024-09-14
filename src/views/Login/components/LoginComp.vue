<script setup>
import { ref, computed } from 'vue';
import { getIdentityCodeByEmailAPI} from '@/apis/base.js';
import { useCountDown, countDown } from '@/utils/countDown';
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import { useCaptchaStore } from "@/stores/captcha.js";
const userStore = useUserStore()
const captchaStore = useCaptchaStore()

// todo 登录组件
// 1、在点击圆形的文字登录avatar的时候，出现的是登录弹窗，
// todo 2、在点击别的需要登录态（这里需要在router那边设置路由导航守卫，验证拿到的token是否合法，合法这正常跳转到相应的功能，比如说发布文章等，不合法则跳转到登录页/login）的按钮或者链接的时候，
// todo   如果跳转到登录页面/login，此时把dialog的蒙层等去掉，加上背景图片assets/login-background.jpg，常显示登录弹窗，让其看起来像个普通的form，并调整该'form'到合适的位置

// 控制登录的弹窗是否显示
const showLoginDialog = ref(false)
defineExpose({showLoginDialog})

// 默认显示免密登录的tab
const activeName = ref('1')

// 免密登录表单校验(邮箱和验证码)
// 用户名和验证码只需要简单的配置(看文档的方式 - 复杂的功能通过多个不同的组件拆解)
// 同意协议 自定义校验规则 validator:(rule, value, callback)=>{}
// 统一校验 通过表单form实例的方法 validate -> true
// 1、表单对象
const form1 = ref({
  email: '',
  identifyCode1: '',
  method: '',
  agree: false
})
// 2、规则对象
const rules1 = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式不合法', trigger: 'blur'}
  ],
  identifyCode1: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min:6, max:6, message: '验证码必须为6位', trigger: 'blur'},
  ],
  // 自定义校验规则，勾选了checkbox就通过，不勾选就不通过
  agree: [
    {
      // rule 规则，代表这个自定义校验规则是检测的agree字段
      // value 当前checkbox拿到的值
      // callback 回调函数
      validator: (rule, value, callback)=>{
        // console.log('value....',value)
        // console.log('rule',rule)
        if (value) {
          // 校验通过
          callback()
        }else {
          // 校验不通过
          callback(new  Error('请勾选协议'))
        }
      }
    }
  ]
}

// 为了防止用户一上来就点击登录，导致我们写的rules都被绕过了，所以需要拿到form表单的实例，然后调用validate方法
const formRef1 = ref(null)
const router = useRouter()
// 通过邮箱和验证码登录
const loginOrRegisterByCode = async (email, identifyCode1, activeName) => {
  formRef1.value.validate(async (valid) => {
    // 所有项都通过校验，valid才为true
    // console.log(valid)
    if (valid) {
      if (formatTime.value <= 0) {
        ElMessage({type:'info', message: '验证码已过期，请重新获取验证码'})
        return
      }
      await userStore.loginByCodeAndSetUserInfo(email, identifyCode1, activeName)
      ElMessage({type:'success', message: '登录成功'})
      // 跳转到首页
      showLoginDialog.value = false
      await router.push({path: '/'})
    }
  })
}

// 通过账密登录
const formRef2 = ref(null)
const loginOrRegisterByPwd = async (email, password, activeName, identifyId, identifyCode) => {
  formRef2.value.validate(async (valid) => {
    // 所有项都通过校验，valid才为true
    // console.log(valid)
    if (valid) {
      await userStore.loginByPwdAndSetUserInfo(email, password, activeName, identifyId, identifyCode)
      ElMessage({type:'success', message: '登录成功'})
      // 跳转到首页
      showLoginDialog.value = false
      await router.push({path: '/'})
    }
  })

}

// 账密登录表单校验(邮箱，密码和验证码)
// 1、表单对象
const form2 = ref({
  email: '',
  password: '',
  captcha: '',
  method: '',
  agree: false
})
// 2、规则对象
const rules2 = {
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式不合法', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min:6, max:20, message: '密码的长度为6~20位', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min:6, max:6, message: '验证码必须为6位', trigger: 'blur'},
  ],
  // 自定义校验规则，勾选了checkbox就通过，不勾选就不通过
  agree: [
    {
      // rule 规则，代表这个自定义校验规则是检测的agree字段
      // value 当前checkbox拿到的值
      // callback 回调函数
      validator: (rule, value, callback)=>{
        // console.log('value....',value)
        // console.log('rule',rule)
        if (value) {
          // 校验通过
          callback()
        }else {
          // 校验不通过
          callback(new  Error('请勾选协议'))
        }
      }
    }
  ]
}
// 3、获取账密登录时的验证码

const countDown2 = useCountDown()

// 设置5分钟倒计时(如果刷新页面，验证码直接清零，直接过期，因为清除了定时器
// 正常操作 验证码5分钟有效，减少一次请求后端的次数)
//
// 设置60秒的获取验证码按钮，刷新不能直接清除定时器，需要维护localStorage，这是存在客户端的，也容易被篡改。
// 所以在此基础上，继续在后端新增频次限制

// 通过邮箱获取验证码
const { formatTime, start } = countDown(300)
const getIdentityCodeByEmail = async (email)=>{
  if (email === "") {
    ElMessage({type: 'warning', message: '请输入邮箱'})
    return
  }
  await getIdentityCodeByEmailAPI(email)
  ElMessage({type: 'success', message: '验证码已发送，请查看邮箱'})
  start()
  countDown2.startCountDown(60)
}

// 获取验证码按钮
const disabled = computed(() => countDown2.timeLeft.value > 0)

const buttonText = computed(() => disabled.value ? `${countDown2.timeLeft.value}秒后重试` : '获取验证码');

// el-tabs切换到选项卡‘账密登录’的时候，调用获取验证码的函数
const handleClick = (tab) => {
  if (tab.props.name === '2') {
    captchaStore.getIdentityCode()
  }
}

// 美化登录按钮，所有字段都填了才显示正常颜色，否则显示淡一点的颜色
const isFilledAll1 = computed(()=>form1.value.email && form1.value.identifyCode1 && form1.value.agree)
const isFilledAll2 = computed(()=>form2.value.email && form2.value.password && form2.value.captcha && form2.value.agree)

</script>

<template>
  <!-- 在el-dialog上套一个div，确保样式能穿透el-dialog -->
  <div class="my-dialog">
    <el-dialog :modal="showLoginDialog" v-model="showLoginDialog" center :show-close="false">
      <template #header="{}">
        <div class="welcome-msg">
          <span class="welcome-words">终于等到你~</span>
          <el-image class="welcome-img" src="http://sihrw5mu0.sabkt.gdipper.com/wel_tips.5624828-removebg-preview.png" alt=""></el-image>
        </div>
        <div class="login-slogan1">登录可享更多权益</div>
      </template>
      <div class="login-slogan2" v-if="activeName==='1'">与专业的创作者进行<span class="login-slogan3">深度的互动交流</span></div>
      <div class="login-slogan2" v-if="activeName==='2'">提高技能水平<span class="login-slogan3">海量资源免费使用</span></div>
      <el-tabs class="my-el-tabs" v-model="activeName" :stretch="true" @tab-click="handleClick">
        <el-tab-pane label="免密登录" name="1">
          <el-form @keyup.enter="loginOrRegisterByCode(form1.email, form1.identifyCode1, activeName)"
                   ref="formRef1" :model="form1" :rules="rules1" size="default" status-icon>
            <el-form-item prop="email">
              <el-input v-model="form1.email" placeholder="请输入邮箱" clearable/>
            </el-form-item>
            <el-form-item prop="identifyCode1">
              <el-input v-model="form1.identifyCode1" placeholder="6位数字验证码" clearable>
                <template v-slot:append>
                  <!--         todo 这个按钮在点击之后，不会立刻禁用该按钮，导致用户无法知道是否点击了，导致容易重复点击并且重复发送多个请求，导致收到很多验证码         -->
                  <el-button :disabled="disabled" @click="getIdentityCodeByEmail(form1.email)">{{buttonText}}</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-button :class="[isFilledAll1?'filled-all':'not-filled-all','login-btn']" @click="loginOrRegisterByCode(form1.email, form1.identifyCode1, activeName)">登录</el-button>
            <el-form-item prop="agree">
              <el-checkbox  size="small" v-model="form1.agree"></el-checkbox>
              <div class="agree-box">我已阅读并同意<router-link to="secret-policy" target="_blank" class="service-policy">《隐私保护协议》</router-link>和<router-link to="service-item" target="_blank" class="service-policy">《服务条款》</router-link></div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账密登录" name="2">
          <el-form @keyup.enter="loginOrRegisterByPwd(form2.email, form2.password, activeName,captchaStore.captchaInfo.captchaId, form2.captcha)"
                   ref="formRef2" :model="form2" :rules="rules2" size="default" status-icon>
            <el-form-item prop="email">
              <el-input v-model="form2.email" placeholder="请输入邮箱" clearable />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form2.password" type="password" show-password placeholder="请输入密码" clearable/>
              <a href="#" class="forget-password">忘记密码</a>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input class="captcha-input" v-model="form2.captcha" placeholder="6位数字验证码" clearable>
                <template v-slot:append>
                  <img class="captcha-img" @click="captchaStore.getIdentityCode" :src="captchaStore.captchaInfo.picPath" alt>
                </template>
              </el-input>
            </el-form-item>
            <el-button :class="[isFilledAll2?'filled-all':'not-filled-all','login2-btn']" @click="loginOrRegisterByPwd(form2.email, form2.password, activeName,captchaStore.captchaInfo.captchaId, form2.captcha)"
                       type="primary">登录</el-button>
            <el-form-item prop="agree" class="agree-box">
              <el-checkbox v-model="form2.agree" size="small"></el-checkbox>
              <div class="agree-box">我已阅读并同意<router-link to="secret-policy" target="_blank" class="service-policy">《隐私保护协议》</router-link>和<router-link to="service-item" target="_blank" class="service-policy">《服务条款》</router-link></div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <template #footer="{}">
        <span class="other-words">其他登录方式</span>
        <div>
          <img class="other-login-img" src="@/assets/images/social-weibo.svg" alt="">
          <img class="other-login-img" src="@/assets/images/GitHub.svg" alt="">
          <img class="other-login-img" src="@/assets/images/weixin.svg" alt="">
          <img class="other-login-img" src="@/assets/images/QQ.svg" alt="">
          <img class="other-login-img" src="@/assets/images/baidu.svg" alt="">
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.welcome-msg {
  display: flex;
  justify-content: end;
  align-items: end;
  background-color: #f7f7fc;
}
.welcome-words {
  color: #999aa9;
}
.welcome-img {
  width: 56px;
  top: 4px;
  margin-right: 35px;
}
.login-slogan1 {
  margin-top: 25px;
  font-size: 16px;
  font-weight: bold;
}
.login-slogan2 {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: -14px;
  margin-bottom: 15px;
}
.login-slogan3 {
  color: #e96140; /* todo 不知道为什么这里不能用$bjColor */
}
.my-el-tabs {
  width: 80%;
  margin: 0 auto;
}
.agree-box {
  font-size: 12px;
}
.service-policy:hover {
  text-decoration: underline;
}
.captcha-img {
  height: 30px;
  width: 80px;
  cursor: pointer;
}
.captcha-input {
  height: 30px;
}
.captcha-input :deep(.el-input-group__append) {
  padding: 0;
}
.login-btn, .login2-btn {
  width: 100%;
  margin-top: 12px;
  border-radius: 20px;
  color: white;
}
.forget-password {
  font-size: 11px;
  margin-top: 6px;
  margin-bottom: -8px;
  color: #2e2e2e;
  margin-left: 283px;
  height: 10px;
  line-height: 10px
}
.forget-password:hover {
  color: #e96140; /* todo 不知道为什么这里不能用$bjColor */
}
.filled-all {
  background-color: #e96140; /* todo 不知道为什么这里不能用$bjColor */
  border: 1px solid #e96140; /* todo 不知道为什么这里不能用$bjColor */
}
.not-filled-all {
  background-color: #e29f8a;
  border: 1px solid #e29f8a;
}
.other-words {
  color: #999aa9;
  font-size: 13px;
}
.other-login-img {
  width: 35px;
  padding: 10px 5px;
  cursor: pointer;
}
.my-dialog:deep(.el-dialog) {
  padding: 0;
  width: 410px;
}

</style>