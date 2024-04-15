<template>
  <div id="userLayout">
    <div class="login_panel">
      <div class="login_panel_form" :class="{ register_panel_form: flipped, lo_panel_form: !flipped }">
        <div class="login_panel_form_title">
          <img class="login_panel_form_title_logo" :src="$GIN_VUE_ADMIN.appLogo" alt>
          <p class="login_panel_form_title_p">{{ $GIN_VUE_ADMIN.appName }}</p>
        </div>
        <!-- <TransitionGroup name="slide" tag="div" class="transition-container"> -->
        <div class="flipper" :class="{ flipped: flipped }" ref="flipper">
          <el-form ref="loginForm" :model="loginFormData" :rules="rules" :validate-on-rule-change="false"
            @keyup.enter="submitForm" key="1" class="front">
            <div ref="front">
              <el-form-item prop="username">
                <el-input v-model="loginFormData.username" name="username" size="large" placeholder="请输入用户名"
                  suffix-icon="user" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginFormData.password" name="password" show-password size="large" type="password"
                  placeholder="请输入密码" />
              </el-form-item>
              <el-form-item v-if="loginFormData.openCaptcha" prop="captcha">
                <div class="vPicBox">
                  <el-input v-model="loginFormData.captcha" name="captcha" placeholder="请输入验证码" size="large"
                    style="flex:1;padding-right: 20px;" />
                  <div class="vPic">
                    <img v-if="picPath" :src="picPath" alt="请输入验证码" @click="loginVerify()">
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <!-- <el-button
              type="primary"
              style="width: 46%"
              size="large"
              @click="checkInit"
            >前往初始化</el-button> -->
                <el-button type="primary" size="large" style="width: 46%; margin-right: 5%" @enter="submitForm"
                  @click="submitForm">登 录</el-button>
                <el-button type="primary" size="large" style="width: 46%;" @click="toggleDiv" text>注册</el-button>
              </el-form-item>
            </div>
          </el-form>
          <el-form ref="registerForm" :model="registerFormData" :rules="register_rules" :validate-on-rule-change="false"
            @keyup.enter="submitForm_register" key="2" class="back" label-position="right" label-width="auto">
            <div ref="back">
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="registerFormData.nickName" name="nickName" size="large" placeholder="昵称"
                  suffix-icon="user" clearable />
              </el-form-item>
              <el-form-item label="账号名称" prop="userName">
                <el-input v-model="registerFormData.userName" name="userName" size="large" placeholder="账号名称"
                  suffix-icon="user" clearable />
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input v-model="registerFormData.phone" name="phone" size="large" placeholder="手机"
                  suffix-icon="phone" clearable />
              </el-form-item>
              <el-form-item label="密码" prop="passWord">
                <el-input v-model="registerFormData.passWord" name="passWord" show-password size="large" type="password"
                  placeholder="请输入密码" clearable />
              </el-form-item>
              <el-form-item>
                <el-table :data="registerFormData.shops" style="width: 100%;" :key="registerFormData.shops.length">
                  <el-table-column type="index" align="center" />

                  <el-table-column v-for="item, index in registerFormHead.table_head" :key="index" :prop="item.dataKey"
                    show-overflow-tooltip :label="item.title">
                    <template #header v-if="item.dataKey == 'shopName'">
                      <span style="color: red;font-size:16px;">*</span><span>店铺名称</span>
                    </template>
                    <template #default="scope">
                      <el-input v-model="registerFormData.shops[scope.$index][item.dataKey]" :id="scope.$index"
                        :key="scope.$index" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column width="80">
                    <template #default="scope">
                      <el-button v-if="scope.$index > 0" type="danger" size="small" text
                        @click="delAcc(scope.row, scope.column, scope.$index)" icon="delete">删 除</el-button>
                      <el-button v-else type="primary" size="small" text @click="addAcc()" icon="plus">添 加</el-button>
                    </template>
                  </el-table-column>

                  <!-- <el-table-column prop="shopName" label="店铺名称">
                    <template #header>
                      <span style="color: red;font-size:16px;">*</span><span>店铺名称</span>
                    </template>
                    <template #default="scope">
                      <el-input v-model="scope.row.shopName" :key="'shopName' + scope.$index" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column prop="qianniuAcc" label="千牛账号">
                    <template #default="scope">
                      <el-input v-model="scope.row.qianniuAcc" :key="'qianniuAcc' + scope.$index" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column prop="qianniuPwd" label="千牛密码">
                    <template #default="scope">
                      <el-input v-model="scope.row.qianniuPwd" :key="'qianniuPwd' + scope.$index" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column width="80">
                    <template #default="scope">
                      <el-button v-if="scope.$index > 0" type="danger" size="small" text
                        @click="delAcc(scope.row, scope.column, scope.$index)" icon="delete">删 除</el-button>
                      <el-button v-else type="primary" size="small" text
                        @click="addAcc(scope.row, scope.column, scope.$index)" icon="plus">添 加</el-button>
                    </template>
                  </el-table-column> -->
                </el-table>
              </el-form-item>

              <el-form-item v-if="registerFormData.openCaptcha" prop="captcha">
                <div class="vPicBox">
                  <el-input v-model="registerFormData.captcha" name="captcha1" placeholder="请输入验证码" size="large"
                    style="flex:1;padding-right: 20px;" />
                  <div class="vPic" style="height: 50px;">
                    <img v-if="register_picPath" :src="register_picPath" alt="请输入验证码" @click="registerVerify()">
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" style="width: 46%; margin-right: 5%" @enter="submitForm_register"
                  @click="submitForm_register">提 交 注 册</el-button>
                <el-button type="primary" size="large" style="width: 46%;" @click="toggleDiv" text>返
                  回 登 录</el-button>
              </el-form-item>
            </div>
          </el-form>
          <!-- </TransitionGroup> -->
        </div>
      </div>
      <div class="login_panel_right" />
      <div class="login_panel_foot">
        <div class="links">
          <a href="http://doc.henrongyi.top/" target="_blank">
            <img src="@/assets/docs.png" class="link-icon" alt="文档">
          </a>
          <a href="https://support.qq.com/product/371961" target="_blank">
            <img src="@/assets/kefu.png" class="link-icon" alt="客服">
          </a>
          <a href="https://github.com/flipped-aurora/gin-vue-admin" target="_blank">
            <img src="@/assets/github.png" class="link-icon" alt="github">
          </a>
          <a href="https://space.bilibili.com/322210472" target="_blank">
            <img src="@/assets/video.png" class="link-icon" alt="视频站">
          </a>
        </div>
        <div class="copyright">
          <BottomInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<script setup>
import { captcha } from '@/api/user'
import { checkDB } from '@/api/initdb'
import BottomInfo from '@/view/layout/bottomInfo/bottomInfo.vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/pinia/modules/user'
const router = useRouter()
const flipped = ref(false);
const flipper = ref(null);
const front = ref(null);
const back = ref(null);
const cutNu = ref(0)
const setFlipperHeight = () => {
  const frontHeight = front.value.offsetHeight + 50 + ((cutNu.value > 0) ? (-60) : (+0));
  const backHeight = back.value.offsetHeight + 50 + ((cutNu.value > 0) ? (-60) : (+0));
  let heig = ref(0)
  if (!flipped.value) {
    heig.value = frontHeight
  } else {
    heig.value = backHeight
  }
  flipper.value.style.height = `${heig.value}px`;
};
onMounted(() => {
  setFlipperHeight();
  window.addEventListener('resize', setFlipperHeight);
});
watch(flipped, () => {
  setTimeout(setFlipperHeight, 50);
});

function toggleDiv() {
  if (registerFormData.shops.length == 0) {
    let accountItem = {
      shopName: '',
      qianniuAcc: '',
      qianniuPwd: '',
    }
    registerFormData.shops.push(accountItem)
  }
  cutNu.value++
  flipped.value = !flipped.value;
}
// 验证函数
const checkUsername = (rule, value, callback) => {
  if (value.length < 5 || value.length > 30) {
    return callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}
const checkPhone = (rule, value, callback) => {
  const regex = /^1[3-9]\d{9}$/;
  if (!regex.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 获取验证码
const loginVerify = () => {
  captcha({}).then(async (ele) => {
    rules.captcha.push({
      max: ele.data.captchaLength,
      min: ele.data.captchaLength,
      message: `请输入${ele.data.captchaLength}位验证码`,
      trigger: 'blur',
    })
    picPath.value = ele.data.picPath
    loginFormData.captchaId = ele.data.captchaId
    loginFormData.openCaptcha = ele.data.openCaptcha
  })
}
loginVerify()


// 登录相关操作
const loginForm = ref(null)
const picPath = ref('')
const loginFormData = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaId: '',
  openCaptcha: false,
})
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  captcha: [
    {
      message: '验证码格式不正确',
      trigger: 'blur',
    }, { required: true, trigger: 'blur', message: '验证码必填' }
  ],
})

const userStore = useUserStore()
const login = async () => {
  return await userStore.LoginIn(loginFormData)
}
const submitForm = () => {
  loginForm.value.validate(async (v) => {
    if (v) {
      const flag = await login()
      if (!flag) {
        loginVerify()
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true,
      })
      loginVerify()
      return false
    }
  })
}


// 获取注册验证码
const registerVerify = () => {
  captcha({}).then(async (ele) => {
    register_rules.captcha.push({
      max: ele.data.captchaLength,
      min: ele.data.captchaLength,
      message: `请输入${ele.data.captchaLength}位验证码`,
      trigger: 'blur',
    })
    register_picPath.value = ele.data.picPath
    registerFormData.captchaId = ele.data.captchaId
    registerFormData.openCaptcha = ele.data.openCaptcha
  })
}
registerVerify()
const register_rules = reactive({
  nickName: [{ required: true, message: '请填写昵称', trigger: 'blur' }, { min: 3, max: 15, message: '长度3到15', trigger: 'blur' },],
  userName: [{ validator: checkUsername, trigger: 'blur' }, { required: true, trigger: 'blur' }],
  passWord: [{ validator: checkPassword, trigger: 'blur' }, { required: true, trigger: 'blur' }],
  phone: [{ validator: checkPhone, trigger: 'blur' }, { required: true, trigger: 'blur' }],
  captcha: [
    {
      message: '验证码格式不正确',
      trigger: 'blur',
    }, { required: true, trigger: 'blur', message: '验证码必填' }
  ],
})
// 注册相关操作
const registerForm = ref(null)
const register_picPath = ref('')
const registerFormHead = reactive({
  table_head: [
    {
      title: "店铺名称",
      width: '140',
      align: "center",
      dataKey: "shopName",
      key: "shopName",
      fixed: false,
      unit: "",
    },
    {
      title: "千牛账号",
      width: '',
      align: "center",
      dataKey: "qianniuAcc",
      key: "qianniuAcc",
      fixed: false,
      unit: "",
    },
    {
      title: "千牛密码",
      width: '',
      align: "center",
      dataKey: "qianniuPwd",
      key: "qianniuPwd",
      fixed: false,
      unit: "",
    },
  ],
})
const registerFormData = reactive({
  nickName: '',
  userName: '',
  phone: '',
  passWord: '',
  captcha: '',
  captchaId: '',
  openCaptcha: false,
  shops: [],
})
const delAcc = (row, column, index) => {
  registerFormData.shops.splice(index, 1)
  setTimeout(setFlipperHeight, 50);
}
const addAcc = () => {
  let accountItem = {
    shopName: '',
    qianniuAcc: '',
    qianniuPwd: '',
  }
  registerFormData.shops.push(accountItem)
  setTimeout(setFlipperHeight, 50);
  console.log(registerFormData.shops, "registerFormData.shops")
}
const register = async () => {
  return await userStore.register2(registerFormData)
}
const submitForm_register = () => {
  registerForm.value.validate(async (v) => {
    if (v) {
      const capt = registerFormData.shops.every(shop => shop.shopName != '');
      if (capt) {
        const flag = await register()
        if (flag) {
          ElMessage({
            type: 'success',
            message: '注册成功，等待管理员审核',
            showClose: true,
          })
          toggleDiv()
        } else {
          registerVerify()
        }
      } else {
        ElMessage({
          type: 'error',
          message: '请填写店铺名称！',
          showClose: true,
        })
        registerVerify()
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写注册信息',
        showClose: true,
      })
      registerVerify()
      return false
    }
  })
}

// 跳转初始化
const checkInit = async () => {
  const res = await checkDB()
  if (res.code === 0) {
    if (res.data?.needInit) {
      userStore.NeedInit()
      router.push({ name: 'Init' })
    } else {
      ElMessage({
        type: 'info',
        message: '已配置数据库信息，无法初始化',
      })
    }
  }
}


</script>

<style lang="scss" scoped>
@import "@/style/newLogin.scss";

.register_panel_form {
  width: 30% !important;
  transition: 0.6s;
}

.lo_panel_form {
  width: 420px !important;
  transition: 0.6s;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.front {
  // background: lightblue;
  z-index: 2;
  transform: rotateY(0deg);
}

.back {
  // background: lightcoral;
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}
</style>
