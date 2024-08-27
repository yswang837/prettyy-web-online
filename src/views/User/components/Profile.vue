<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { updateNickNameAPI, updateGenderAPI, updateSummaryAPI, updateProvinceCityAPI, updateBirthdayAPI } from "@/apis/user.js";
import { ElMessage } from "element-plus";
import { provinceAndCityData, codeToText } from 'element-china-area-data'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 从pinia中获取用户信息
const userStore = useUserStore()

// 用户昵称相关
let username = ref(userStore.userInfo.user.nick_name)
let showUserNameInput = ref(false)
const changeUserNameLayout = () => {
  showUserNameInput.value = true
}
const bdUserNameCommit = async (nickName) => {
  if (nickName===userStore.userInfo.user.nick_name) {
    ElMessage({type:'warning', message:'用户名未改变'})
    return
  }
  // console.log(userStore.userInfo.user.email, nickName)
  await updateNickNameAPI(userStore.userInfo.user.email, nickName)
  ElMessage({type:'success', message:'更新成功'})
  userStore.setNickName(nickName)
  showUserNameInput.value = false
}
const bdUserNameCancel = () => {
  // console.log('取消')
  username.value = userStore.userInfo.user.nick_name
  showUserNameInput.value = false
}

// 用户ID相关
const copyUid = async () => {
  try {
    await navigator.clipboard.writeText(userStore.userInfo.user.uid);
    ElMessage({type:'success',message:"复制成功"})
  } catch (err) {
    console.error('无法复制文本: ', err);
  }
}

// 用户性别相关
let gender = ref(userStore.userInfo.user.gender)
let showRadio = ref(false)
const changeGender = () => {
  showRadio.value = true
}
const bdSexCommit = async (gender) => {
  // console.log('gender....',gender)
  await updateGenderAPI(userStore.userInfo.user.email, gender)
  ElMessage({type:'success', message:'更新成功'})
  userStore.setGender(gender)
  showRadio.value = false
}
const bdSexCancel = () => {
  showRadio.value = false
  gender.value = userStore.userInfo.user.gender
}

// 用户个人简介相关
const bdIntroduceCancel = () => {
  showTextArea.value = false
}
let introduceVal = ref('')
const bdSummaryCommit = async (summary) => {
  if (summary===userStore.userInfo.user.summary) {
    ElMessage({type:'warning', message:'个人简介未改变'})
    return
  }
  // console.log('summary....',summary)
  await updateSummaryAPI(userStore.userInfo.user.email, summary)
  ElMessage({type:'success', message:'更新成功'})
  userStore.setSummary(summary)
  showTextArea.value = false
}
let showTextArea = ref(false)
const changeIntroduceLayout = () => {
  showTextArea.value = true
  introduceVal.value = userStore.userInfo.user.summary
}

// 选择城市相关
let showCityOption = ref(false)
const changeCityLayout = () => {
  showCityOption.value = true
}
const selectedProvinceAndCityValue = ref([])
let option = provinceAndCityData
const selectedValue = ref([])
const handleChangeCity = (selected) => {
  // console.log(selected[0], codeToText[selected[0]])
  // console.log(selected[1], codeToText[selected[1]])
  selectedValue.value = [codeToText[selected[0]], codeToText[selected[1]]]
}
const bdCityCommit = async (selectValue) => {
  if (selectValue.length === 0 || selectValue[0] === '' || selectValue[0] === null) {
    ElMessage({type:'warning', message:'户籍省市不能为空'})
    return
  }
  if (selectValue[0] + ' / ' + selectValue[1] === userStore.userInfo.user.province_city) {
    ElMessage({type:'warning', message:'户籍省市未改变'})
    return
  }
  // console.log('selectValue....',selectValue[0], selectValue[1])
  await updateProvinceCityAPI(userStore.userInfo.user.email, selectValue[0], selectValue[1])
  ElMessage({type:'success', message:'更新成功'})
  userStore.setProvinceCity(selectValue[0] + ' / ' + selectValue[1])
  showCityOption.value = false
}
const bdCityCancel = () => {
  showCityOption.value = false
}

// 用户设置生日相关
dayjs.locale('zh-cn'); // 设置周一为一周的开始
let showDatePicker = ref(false)
const toShowCalendar = () => {
  showDatePicker.value = true
}
const dateValue = ref('')
const bdBirthdayCommit = async (dateValue) => {
  if (dateValue === '' || dateValue === null) {
    ElMessage({type:'warning', message:'生日不能为空'})
    return
  }
  let dayStr = dayjs(dateValue).format('YYYY-MM-DD')
  if (dayStr === userStore.userInfo.user.birthday) {
    ElMessage({type:'warning', message:'出生日期未改变'})
    return
  }
  // console.log('date value', dateValue)
  await updateBirthdayAPI(userStore.userInfo.user.email, dayStr)
  ElMessage({type:'success', message:'更新成功'})
  userStore.setBirthday(dayStr)
  showDatePicker.value = false
}
const bdBirthdayCancel = () => {
  showDatePicker.value = false
}

// 设置用户收货地址相关
// let showAddressDetail = ref(false)
// let showDialog = ref(false)
// const showAddressDialog = () => {
//   showDialog.value = true
// }

// 设置教育信息
let showSchoolEdit = ref(false)
let schoolTimeIn = ref('')
let schoolTimeOut = ref('')
let selectEdValue = ref('')
const changeSchoolLayout = () => {
  console.log('school')
  showSchoolEdit.value = true
}
const schoolCancel = () => {
  console.log('取消。。')
  showSchoolEdit.value = false
}


</script>

<template>
    <!--  头像及相关信息展示区域  -->
    <div class="information-overview">
      <!--  头像  -->
      <el-avatar class="avatar-image" shape="circle" :size="80" src="https://s21.ax1x.com/2024/07/05/pkRgyT0.jpg" />
      <el-avatar class="avatar-icon" shape="circle" :size="80"><i class="iconfont icon-xiangji"></i></el-avatar>
      <!--  信息总览区域  -->
      <div class="info-overview">
        <!--  用户相关信息  -->
        <div class="userinfo">
          <span class="username">{{userStore.userInfo.user.nick_name}}</span>
          <div>
            <img class="code-age-img" src="http://sihrw5mu0.sabkt.gdipper.com/20210108035952.gif" alt="">
            <span class="code-age">码龄7年</span>
          </div>
        </div>
        <!--  奖牌相关信息  -->
        <div class="medal-info">
          <!--     todo 点击出现已解锁的勋章详情弹窗    -->
          <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/qixiebiaobing4%40240.png" title="勤写标兵" alt />
          <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/chizhiyiheng%40240.png" title="持之以恒" alt />
          <img class="polygon-image" src="http://sihrw5mu0.sabkt.gdipper.com/xinxiu%40240.png" title="创作新秀" alt />
          <!--     todo 点击出现所有勋章详情弹窗    -->
          <span class="all-medals">查看所有勋章 ></span>
        </div>
        <!--  会员相关信息  -->
        <div class="member-info">
          <i class="iconfont icon-huangguan"></i>
          <span class="member-slogan">开通会员全站，VIP资源免费下载，更有千元大奖等你拿！</span>
          <el-button class="member-btn" type="primary">开通会员</el-button>
        </div>
        <!--  账户余额相关信息  -->
        <div class="money-info">
          <i class="iconfont icon-jine"></i>
          <span>我的余额：<span class="charge-num">3948</span> 刀</span>
          <el-button class="recharge" type="primary">去充值</el-button>
        </div>
      </div>
    </div>
    <!--  基本信息详细交互区域  -->
    <div class="baseinfo-container">
      <div class="title">基本信息</div>
      <div class="baseinfo-detail">
        <!--  用户昵称项  -->
        <div class="part1">
          <div class="bd-username-title">用户昵称</div>
          <span v-if="!showUserNameInput">{{username}}</span>
          <input v-if="showUserNameInput" class="bd-username" v-model="username">
          <i v-if="!showUserNameInput" class="iconfont icon-bianji1" @click="changeUserNameLayout"></i>
          <el-button v-if="showUserNameInput" class="btn-conform" type="primary" @click="bdUserNameCommit(username)">确认</el-button>
          <el-button v-if="showUserNameInput" class="btn-cancel" @click="bdUserNameCancel">取消</el-button>
        </div>
        <!--  用户ID项  -->
        <div class="part2">
          <div class="bd-user-id">用&nbsp;&nbsp;户&nbsp;ID</div>
          <div class="bd-useridnum">{{userStore.userInfo.user.uid}}</div>
          <i class="iconfont icon-fuzhi" @click="copyUid"></i>
        </div>
        <!--  性别项  -->
        <div class="part3">
          <div class="bd-user-sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
          <span class="gender-display" v-if="!showRadio">{{ gender }}
            <i v-if="gender!=='男'&&gender!=='女'" class="iconfont icon-bianji1" @click="changeGender">
              <small class="gender-desc">性别设置后将无法修改</small>
            </i>
          </span>
          <div v-else class="radio-container">
            <label>
              <input type="radio" name="gender" value="男" v-model="gender">男
            </label>
            <label>
              <input type="radio" name="gender" value="女" v-model="gender">女
            </label>
            <label>
              <input type="radio" name="gender" value="保密" v-model="gender">保密
            </label>
            <el-button :disabled="gender==='保密'" class="btn-conform"  type="primary" @click="bdSexCommit(gender)">确认</el-button>
            <el-button class="btn-cancel" @click="bdSexCancel">取消</el-button>
          </div>
        </div>
        <!--  个人简介项  -->
        <div class="part4">
          <div class="bd-user-desc">个人简介</div>
          <div v-if="!showTextArea">{{userStore.userInfo.user.summary ? userStore.userInfo.user.summary : '此人很神秘，什么也没有留下'}}
            <i class="iconfont icon-bianji1" @click="changeIntroduceLayout"></i>
          </div>
          <div v-if="showTextArea" class="textarea-container">
            <textarea v-model="introduceVal" placeholder="此人很神秘，什么也没留下" cols="78" rows="5"></textarea>
            <el-button class="btn-conform"  type="primary" @click="bdSummaryCommit(introduceVal)">确认</el-button>
            <el-button class="btn-cancel" @click="bdIntroduceCancel">取消</el-button>
          </div>
        </div>
        <!--  户籍省市项  -->
        <div class="part5">
          <div class="bd-user-city">户籍省市</div>
            <div v-if="!showCityOption">{{userStore.userInfo.user.province_city ? userStore.userInfo.user.province_city : '未填写'}}
              <i class="iconfont icon-bianji1" @click="changeCityLayout"></i>
            </div>
            <div v-if="showCityOption">
              <el-cascader style="width: 392px" v-model="selectedProvinceAndCityValue" :options="option" @change="handleChangeCity" placeholder="请选择"></el-cascader>
              <el-button class="btn-conform"  type="primary" @click="bdCityCommit(selectedValue)">确认</el-button>
              <el-button class="btn-cancel" @click="bdCityCancel">取消</el-button>
            </div>

        </div>
        <!--  收货地址项  -->
        <div class="part6">
          <div class="bd-user-addr">收货地址</div>
<!--          <div v-if="!showAddressDetail">{{userStore.userInfo.user.address ? userStore.userInfo.user.address : "未填写"}}-->
<!--            <i class="iconfont icon-bianji1" @click="showAddressDialog"></i>-->
<!--          </div>-->
<!--          <div v-else>地址详情</div>-->
<!--          <el-dialog v-model="showDialog" width="35%" center :show-close="false">-->
<!--            <h4 class="address-title">新增收货地址</h4>-->
<!--            <el-form label-width="auto">-->
<!--              <el-form-item label="收&nbsp;件&nbsp;人">-->
<!--                <el-input  />-->
<!--              </el-form-item>-->
<!--              <el-form-item label="手机号码">-->
<!--                <el-input  />-->
<!--              </el-form-item>-->
<!--              <el-form-item label="选择区域">-->
<!--                <el-cascader style="width: 392px" v-model="selectedProvinceAndCityValue" :options="option" @change="handleChangeCity" placeholder="请选择"></el-cascader>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="详细地址">-->
<!--                <el-input type="textarea" />-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <el-button class="btn-conform"  type="primary" @click="bdCityCommit(selectedValue)">确认</el-button>-->
<!--            <el-button class="btn-cancel" @click="bdCityCancel">取消</el-button>-->
<!--          </el-dialog>-->
        </div>
        <!--  出生日期项  -->
        <div class="part7">
          <div class="bd-birthday">出生日期</div>
            <div v-if="!showDatePicker" class="birthday">{{userStore.userInfo.user.birthday ? userStore.userInfo.user.birthday : "未填写"}}
              <i class="iconfont icon-bianji1" @click="toShowCalendar"></i>
            </div>
            <div v-if="showDatePicker">
              <el-date-picker v-model="dateValue" :editable="false" type="date" placeholder="请选择您的出生日期"/>
              <el-button class="btn-conform"  type="primary" @click="bdBirthdayCommit(dateValue)">确认</el-button>
              <el-button class="btn-cancel" @click="bdBirthdayCancel">取消</el-button>
            </div>
        </div>
      </div>
    </div>
    <!--  教育信息详细交互区域  -->
    <div class="education-container">
      <div class="title">教育信息
        <span class="ed-desc">认证立享教育专属8折优惠，发现更多校友权益等</span>
      </div>
      <div class="education-detail">
        <div class="ed-detail-default">
          <div class="school-content" @click="changeSchoolLayout">
            <div class="school-content-left">
              <div class="ed-part1">
                <div class="bd-username-title">学校名称</div>
                <el-input class="full-school-name" placeholder="请填写学校全称"/>
              </div>
              <div class="ed-part2">
                <div class="bd-username-title">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</div>
                <el-input class="full-major-name" placeholder="请填写专业全称"/>
              </div>
              <div class="ed-part3">
                <div class="bd-username-title">入学时间</div>
                <el-date-picker style="width: 180px" v-model="schoolTimeIn" type="month" placeholder="入学时间"/>
                <span>至</span>
                <el-date-picker style="width: 180px"  v-model="schoolTimeOut" type="month" placeholder="毕业时间"/>
              </div>
              <div class="ed-part4">
                <div class="bd-username-title">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历</div>
                <el-select v-model="selectEdValue" class="select-ed">
                  <el-option value="博士研究生">博士研究生</el-option>
                  <el-option value="硕士研究生">硕士研究生</el-option>
                  <el-option value="大学">大学</el-option>
                  <el-option value="大专">大专</el-option>
                  <el-option value="高中">高中</el-option>
                  <el-option value="初中及以下">初中及以下</el-option>
                </el-select>
              </div>
            </div>
            <div v-if="!showSchoolEdit">
              <div class="ed-bianji1-icon">
                <i class="iconfont icon-bianji1">&nbsp;认证</i>
              </div>
            </div>
            <div v-else class="school-content-right">
              right
            </div>
          </div>
        </div>
        <div v-if="showSchoolEdit" class="ed-btn">
          <el-button class="ed-btn-confirm" type="primary">确认</el-button>
          <el-button class="ed-btn-cancel" @click="schoolCancel">取消</el-button>
        </div>
      </div>
    </div>
    <!--  工作信息详细交互区域  -->
    <div class="job-container">
      <div class="title">工作信息
        <span class="job-desc">认证即可发现更多公司内幕，超3千万同行已认证</span>
      </div>
      <div class="job-detail">
        a
      </div>
    </div>
    <!--  兴趣标签详细交互区域  -->
    <div class="interest-container">
      <div class="title">兴趣标签</div>
      <div class="interest-detail">
        a
      </div>
    </div>
    <!--  身份标签详细交互区域  -->
    <div class="person-container">
      <div class="title">身份标签</div>
      <div class="person-detail">
        a
      </div>
    </div>
</template>

<style scoped lang="scss">
.information-overview {
  display: flex;
  position: relative;
  align-items: center;
}
.avatar-image {
  margin: 0 30px;
}
.avatar-icon {
  position: absolute;
  top: 63px;
  left: 30px;
  opacity: 0;
  cursor: pointer;
}
.avatar-icon:hover {
  opacity: 0.7;
}
.icon-xiangji {
  font-size: 24px;
}
.info-overview {
  margin-top: 20px;
}
.info-overview .userinfo {
  display: flex;
  margin-bottom: 10px;
}
.info-overview .username {
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
}
.code-age-img {
  width: 18px;
  height: 18px;
}
.code-age {
  font-size: 12px;
  vertical-align: middle ;
  background-color: #bbddf6;
  border-radius: 20px;
}
.medal-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.polygon-image {
  margin-right: 8px;
  width: 30px; /* 设置图片的宽度 */
  height: 30px; /* 设置图片的高度，根据六边形的比例计算 */
  cursor: pointer;
}
.all-medals:hover {
  cursor: pointer;
  text-decoration: underline;
}
.member-info {
  display: flex;
  align-items: center;
  background-color: #fff1c6;
  border-radius: 40px;
  margin-bottom: 10px;
}
.icon-huangguan, .icon-jine {
  margin: 0 3px;
}
.member-btn {
  font-size: 12px;
  margin-left: 5px;
  width: 58px;
  height: 26px;
}
.recharge {
  font-size: 12px;
  margin-left: 5px;
  width: 50px;
  height: 26px;
}
.money-info {
  display: flex;
  align-items: center;
  border-radius: 40px;
  margin-bottom: 40px;
}
.charge-num {
  color: #e14343;
}

.baseinfo-container, .education-container, .job-container, .interest-container, .person-container {
  background-color: white;
}
.baseinfo-container .title,
.education-container .title,
.job-container .title,
.interest-container .title,
.person-container .title,{
  font-size: 21px;
  font-weight: bold;
  padding: 10px 15px;
  border-bottom: 1px solid #d0d0d0;
}
.ed-desc, .job-desc {
  font-size: 15px;
  font-weight: normal;
  margin-left: 10px;
}
.baseinfo-detail, .education-detail, .job-detail, .interest-detail, .person-detail {
  padding: 20px;
}
.baseinfo-detail .part1,
.baseinfo-detail .part2,
.baseinfo-detail .part3,
.baseinfo-detail .part4,
.baseinfo-detail .part5,
.baseinfo-detail .part6,
.baseinfo-detail .part7,
.education-detail .ed-part1,
.education-detail .ed-part2,
.education-detail .ed-part3,
.education-detail .ed-part4 {
  display: flex;
  align-items: center;
}
.bd-username-title,
.bd-user-id,
.bd-user-sex,
.bd-user-desc,
.bd-user-city,
.bd-user-addr,
.bd-birthday {
  margin: 10px 40px;
  font-size: 16px;
}
 .icon-fuzhi, .icon-bianji1 {
  opacity: 0;
  cursor: pointer;
  margin-left: 15px;
  width: 32px;
  height: 20px;
  font-size: 16px;
}
.btn-conform, .btn-cancel {
  opacity: 1;
  cursor: pointer;
  margin-left: 15px;
  width: 32px;
  height: 20px;
  font-size: 12px;
}
.bd-username {
  white-space: nowrap;
  font-size: 14px;
}
.part1:hover .icon-bianji1,
.part2:hover .icon-fuzhi,
.part3:hover .icon-bianji1,
.part4:hover .icon-bianji1,
.part5:hover .icon-bianji1,
.part6:hover .icon-bianji1,
.part7:hover .icon-bianji1,
.school-content:hover .icon-bianji1{
  color: deepskyblue;
  opacity: 1;
}
.gender-desc {
  margin-left: 5px;
  color: black;
  font-size: 12px;
}
.btn-conform, .btn-cancel {
  border: 1px solid #43341b;
}
.textarea-container {
  display: flex;
  align-items: center;
}

.address-title {
  text-align: center;
  margin-bottom: 15px;
}
// 以上是 information-overview 样式

.ed-detail-default:hover {
  background-color: #f8f8f8;
}
.school-content {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
}
.ed-bianji1-icon {
  padding: 10px;
}
.school-content-left {
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.school-content-right {
  flex: 2;
  height: 180px;
  background-color: #e3e3e3;
  border: 1px dashed #43341b;
}
.ed-btn {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.ed-btn-confirm, .ed-btn-cancel {
  width: 46px;
  height: 22px;
}
.ed-part1 .full-school-name, .ed-part2 .full-major-name{
  width: 403px;
}
.ed-part3 span {
  margin: 0 15px;
}
.select-ed {
  width: 403px;
}
</style>