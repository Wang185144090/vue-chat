<template>
  <div class="cotn_principal">
    <div class="cont_centrar">
      <div class="cont_login">
        <div class="cont_info_log_sign_up">
          <div class="col_md_login">
            <div class="cont_ba_opcitiy">
              <h2>登录</h2>
              <p>若已有账号，请您登录</p>
              <button class="btn_login" @click="display_login()">登录</button>
            </div>
          </div>
          <div class="col_md_sign_up">
            <div class="cont_ba_opcitiy">
              <h2>注册</h2>
              <p>若没有账号，请您注册</p>
              <button class="btn_sign_up" @click="display_sign_up()">注册</button>
            </div>
          </div>
        </div>
        <div class="cont_back_info">
          <div class="cont_img_back_grey"><img src="../assets/image/po.jpg" alt=""/></div>
        </div>
        <div class="cont_forms">
          <div class="cont_img_back_"><img src="../assets/image/po.jpg" alt=""/></div>
          <div class="cont_form_login">
            <a href="#" @click="hidden_login_sign_up()"><i class="material-icons">&#xE5C4;</i></a>
            <h2>登录</h2>
            <input v-model="loginParam.account" type="text" placeholder="请输入用户名或账号"/>
            <input v-model="loginParam.inputPassword" type="password" placeholder="请输入密码"/>
            <button class="btn_login" @click="login_request()">确认登录</button>
          </div>
          <div class="cont_form_sign_up">
            <a href="#" @click="hidden_login_sign_up()"><i class="material-icons">&#xE5C4;</i></a>
            <h2>注册</h2>
            <input type="text" v-model="signUpParam.userName" placeholder="用户名不能大于20个字,不能为纯数字"/>
            <input type="text" v-model="signUpParam.realName" placeholder="真实名称不能大于10个字"/>
            <select v-model="signUpParam.userSex" type="text">
              <option value="0">---请选择性别---</option>
              <option value="1">男</option>
              <option value="2">女</option>
            </select>
            <input type="password" v-model="signUpParam.inputPassword" placeholder="密码不能大于50个字"/>
            <input type="password" v-model="signUpParam.confirmPassword" placeholder="确认输入的密码"/><br/>
            <button class="btn_sign_up" @click="sign_up_request()">开始注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  beforeRouteEnter (to, from, next) {
    // 添加背景色 margin:0;padding:0是为了解决vue四周有白边的问题
    document.querySelector('body').setAttribute('style', 'margin:0;padding:0')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  data () {
    return {
      showPicker: false,
      loginParam: {
        account: '',
        inputPassword: ''
      },
      signUpParam: {
        userName: '',
        realName: '',
        userSex: '',
        inputPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    display_sign_up: function (at) {
      document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_sign_up'
      document.querySelector('.cont_form_sign_up').style.display = 'block'
      document.querySelector('.cont_form_login').style.opacity = '0'

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.opacity = '1'
      }, 100)

      setTimeout(function () {
        document.querySelector('.cont_form_login').style.display = 'none'
      }, 400)
    },
    display_login: function () {
      document.querySelector('.cont_forms').className = 'cont_forms cont_forms_active_login'
      document.querySelector('.cont_form_login').style.display = 'block'
      document.querySelector('.cont_form_sign_up').style.opacity = '0'

      setTimeout(function () {
        document.querySelector('.cont_form_login').style.opacity = '1'
      }, 400)

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = 'none'
      }, 200)
    },
    hidden_login_sign_up: function () {
      document.querySelector('.cont_forms').className = 'cont_forms'
      document.querySelector('.cont_form_sign_up').style.opacity = '0'
      document.querySelector('.cont_form_login').style.opacity = '0'

      setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = 'none'
        document.querySelector('.cont_form_login').style.display = 'none'
      }, 500)
    },
    login_request: function () {
      if (this.$check.isEmpty(this.loginParam.account)) {
        this.tip.popup('用户名或账号不能为空')
        return
      }
      if (this.$check.isEmpty(this.loginParam.inputPassword)) {
        this.tip.popup('密码不能为空')
        return
      }
      this.$api.user.login({
        loginName: this.loginParam.account,
        userPassword: this.loginParam.inputPassword
      }).then(res => {
        let data = res.data
        if (data.code === '200') {
          // TODO 处理成功跳转路由
          this.tip.popup(data.message)
        } else {
          this.tip.popup(data.message)
        }
      })
    },
    sign_up_request: function () {
      if (this.$check.isEmpty(this.signUpParam.userName)) {
        this.tip.popup('用户名不能为空!')
        return
      }
      if (this.$check.strLen(this.signUpParam.userName) > 10) {
        this.tip.popup('用户名不能超过10个字符！')
        return
      }
      if (!isNaN(this.signUpParam.userName)) {
        this.tip.popup('用户名不能为纯数字！')
        return
      }
      if (!this.$check.isEmpty(this.signUpParam.realName)) {
        if (this.$check.strLen(this.signUpParam.realName) > 10) {
          this.tip.popup('真实名不能超过10个字符！')
          return
        }
      }
      if (this.$check.isEmpty(this.signUpParam.inputPassword)) {
        this.tip.popup('密码不能为空！')
        return
      }
      if (this.$check.isEmpty(this.signUpParam.confirmPassword)) {
        this.tip.popup('确认密码不能为空！')
        return
      }
      if (this.signUpParam.inputPassword !== this.signUpParam.confirmPassword) {
        this.tip.popup('两次输入密码不相同！')
        return
      }
      this.$api.user.signUp({
        userName: this.signUpParam.userName,
        realName: this.signUpParam.realName,
        userPassword: this.signUpParam.inputPassword,
        userSex: this.signUpParam.userSex
      }).then(res => {
        let data = res.data
        if (data.code === '200') {
          this.display_login()
          this.tip.popup('注册成功请登录')
        } else {
          this.tip.popup(data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  /* latin-ext */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  /* latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -moz-font-feature-settings: 'liga';
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0px auto;
    padding: 0px;
    text-align: center;
    font-family: 'Lato', sans-serif;
  }

  .cotn_principal {
    position: absolute;
    width: 100%;
    height: 100%;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#cfd8dc+0,607d8b+100,b0bec5+100 */
    background: #aac4bc; /* Old browsers */
    background: -moz-linear-gradient(-45deg, #aac4bc 0%, #eca8a8 100%, #eed5a9 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(-45deg, #aac4bc 0%, #eca8a8 100%, #eed5a9 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(135deg, #aac4bc 0%, #eca8a8 100%, #eed5a9 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cfd8dc', endColorstr='#b0bec5', GradientType=1); /* IE6-9 fallback on horizontal gradient */

  }

  .cont_centrar {
    position: relative;
    float: left;
    width: 100%;

  }

  .cont_login {
    position: relative;
    width: 640px;
    left: 50%;
    margin-left: -320px;

  }

  .cont_back_info {
    position: relative;
    float: left;
    width: 640px;
    height: 280px;
    overflow: hidden;
    background-color: #fff;
    margin-top: 100px;
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
  }

  .cont_forms {
    position: absolute;
    overflow: hidden;
    top: 100px;
    left: 0px;
    width: 320px;
    height: 280px;
    background-color: #eee;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_forms_active_login {
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
    height: 420px;
    top: 20px;
    left: 0px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;

  }

  .cont_forms_active_sign_up {
    box-shadow: 1px 10px 30px -10px rgba(0, 0, 0, 0.5);
    height: 510px;
    top: 20px;
    left: 320px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_img_back_grey {
    position: absolute;
    width: 950px;
    top: -80px;
    left: -116px;
  }

  .cont_img_back_grey > img {
    width: 100%;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 0.2;
    animation-name: animar_fondo;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;

  }

  .cont_img_back_ {
    position: absolute;
    width: 950px;
    top: -80px;
    left: -116px;
  }

  .cont_img_back_ > img {
    width: 100%;
    opacity: 0.3;
    animation-name: animar_fondo;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .cont_forms_active_login > .cont_img_back_ {
    top: 0px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_forms_active_sign_up > .cont_img_back_ {
    top: 0px;
    left: -435px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_info_log_sign_up {
    position: absolute;
    width: 640px;
    height: 280px;
    top: 100px;
    z-index: 1;
  }

  .col_md_login {
    position: relative;
    float: left;
    width: 50%;
  }

  .col_md_login > h2 {
    font-weight: 400;
    margin-top: 70px;
    color: #757575;
  }

  .col_md_login > p {
    font-weight: 400;
    margin-top: 15px;
    width: 80%;
    color: #37474F;
  }

  .btn_login {
    background-color: #FF9800;
    border: none;
    padding: 10px;
    width: 200px;
    border-radius: 3px;
    box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
  }

  .col_md_sign_up {
    position: relative;
    float: left;
    width: 50%;
  }

  .cont_ba_opcitiy > h2 {
    font-weight: 400;
    color: #fff;
  }

  .cont_ba_opcitiy > p {
    font-weight: 400;
    margin-top: 15px;
    color: #fff;
  }

  .cont_ba_opcitiy {
    position: relative;
    background-color: rgba(187, 168, 170, 0.79);
    width: 80%;
    border-radius: 3px;
    margin-top: 60px;
    padding: 15px 0px;
  }

  .btn_sign_up {
    background-color: #f44336;
    border: none;
    padding: 10px;
    width: 200px;
    border-radius: 3px;
    box-shadow: 1px 5px 20px -5px rgba(0, 0, 0, 0.4);
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
  }

  .cont_forms_active_sign_up {
    z-index: 2;
  }

  @-webkit-keyframes animar_fondo {
    from {
      -webkit-transform: scale(1) translate(0px);
      -moz-transform: scale(1) translate(0px);
      -ms-transform: scale(1) translate(0px);
      -o-transform: scale(1) translate(0px);
      transform: scale(1) translate(0px);
    }
    to {
      -webkit-transform: scale(1.5) translate(50px);
      -moz-transform: scale(1.5) translate(50px);
      -ms-transform: scale(1.5) translate(50px);
      -o-transform: scale(1.5) translate(50px);
      transform: scale(1.5) translate(50px);
    }
  }

  @-o-keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }

  }

  @-moz-keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }

  }

  @keyframes identifier {
    from {
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }
    to {
      -webkit-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -ms-transform: scale(1.5);
      -o-transform: scale(1.5);
      transform: scale(1.5);
    }
  }

  .cont_form_login {
    position: absolute;
    opacity: 0;
    display: none;
    width: 320px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_forms_active_login {
    z-index: 2;
  }

  .cont_forms_active_login > .cont_form_login {
  }

  .cont_form_sign_up {
    position: absolute;
    width: 320px;
    float: left;
    opacity: 0;
    display: none;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .cont_form_sign_up > input {
    text-align: left;
    padding: 15px 5px;
    margin-left: 10px;
    margin-top: 20px;
    width: 260px;
    border: none;
    color: #757575;
  }

  .cont_form_sign_up > select {
    text-align: left;
    padding: 15px 5px;
    margin-left: 10px;
    margin-top: 20px;
    width: 270px;
    border: none;
    color: #757575;
  }

  .cont_form_sign_up > h2 {
    margin-top: 50px;
    font-weight: 400;
    color: #757575;
  }

  .cont_form_login > input {
    padding: 15px 5px;
    margin-left: 10px;
    margin-top: 20px;
    width: 260px;
    border: none;
    text-align: left;
    color: #757575;
  }

  .cont_form_login > h2 {
    margin-top: 110px;
    font-weight: 400;
    color: #757575;
  }

  .cont_form_login > a, .cont_form_sign_up > a {
    color: #757575;
    position: relative;
    float: left;
    margin: 10px;
    margin-left: 30px;
  }
</style>
