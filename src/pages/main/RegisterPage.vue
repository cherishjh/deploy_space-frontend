<template>
  <q-page class="my-register container row  justify-center align-center">


      <q-card-section class="text-center" style="width: 25vw; top: 10vh">

        <div class="text-center" >
          <h5 class="text-orange">Email Register</h5>
          <div class="row">
          <q-input
            dark
            v-model="email"
            rounded
            type="email"
            label="이메일"
            label-color="orange"
            class="q-mb-sm col-10"
            @keyup="validateEmail"
          />
            <q-btn dense class=" bg-white col-2 q-mb-sm" style="opacity: 0.8;" @click="emailChecks" >Code Send</q-btn>
          </div>
          <div class="row">
          <q-input
            dark
            v-model="code"
            label="이메일 인증번호"
            label-color="orange"
            class="q-mb-sm col-10"
          />
            <q-btn dense class=" bg-white col-2 q-mb-sm" style="opacity: 0.8;" @click="codeCheck" >Code Check</q-btn>
          </div>
          <q-input
            dark
            v-model="name"
            label="이름"
            label-color="orange"
            class="q-mb-sm"
            @keyup="validateName"
          />
          <q-input
            dark
            v-model="nickname"
            rounded
            label="닉네임"
            label-color="orange"
            class="q-mb-sm"
            @keyup="validateNickname"
          />
          <q-input
            dark
            v-model="password"
            rounded
            type="password"
            label="비밀번호"
            label-color="orange"
            class="q-mb-sm"
            @keyup="validatePassword"
          />
          <q-input
            dark
            v-model="passwordCheck"
            rounded
            type="password"
            label="비밀번호 확인"
            label-color="orange"
            class="q-mb-sm"
            @keyup="validatePasswordCheck"
          />
          <div v-if="errorMessage" style="color: orange;">{{ errorMessage }}</div>
          <div class="q-mt-lg">
            <q-btn label="회원가입" type="submit" @click="register" class="text-black bg-white" style="opacity: 0.8" />
          </div>
        </div>
      </q-card-section>
  </q-page>
</template>

<script>

import {triggerNegative} from 'src/utils/notification';
import {checkEmail, checkCode, RegisterApi} from "src/services/authService";
import {isValidEmail, isValidPassword} from "src/services/utilityService";

export default {
  data() {
    return {
      name: '',
      code: '',
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
      errorMessage: '',
      emailCheck: false,
      emailBackUp : '',
    }
  },
  methods: {
    codeCheck(){
      const data = {
        "email" : this.email,
        "code" : this.code
      }
      checkCode(data, this.$q)
        .then(success => {
          if (success) {
            this.emailCheck = true;
            this.emailBackUp = this.email;
          }
        })
        .catch(error => {
        });
      this.emailBackUp = this.email;
    },
    emailChecks(){
      if (!isValidEmail(this.email)) {
        this.errorMessage = '유효한 이메일 주소를 입력해주세요.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }
      const data = {
        "email" : this.email
      }
      checkEmail(data, this.$q);
    }
    ,
    validateEmail() {
      if (!isValidEmail(this.email)) {
        this.errorMessage = '유효한 이메일 주소를 입력해주세요.';
      } else {
        this.errorMessage = '';
      }
    },
    validateName() {
      if (!this.name) {
        this.errorMessage = '이름을 입력해주세요.';
      } else {
        this.errorMessage = '';
      }
    },
    validateNickname() {
      if (!this.nickname) {
        this.errorMessage = '닉네임을 입력해주세요.';
      } else {
        this.errorMessage = '';
      }
    },
    validatePassword() {
      if (!isValidPassword(this.password)) {
        this.errorMessage = '비밀번호는 최소 8자 이상, 15자 이하의 숫자를 입력하세요. 알파벳 대소문자(a~z, A~Z), 숫자(0~9)가 혼합되어야 합니다.';
      } else {
        this.errorMessage = '';
      }
    },
    validatePasswordCheck() {
      if (this.password !== this.passwordCheck) {
        this.errorMessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
      } else {
        this.errorMessage = '';
      }
    },
    register() {
      if (!this.name || !this.email || !this.password || !this.nickname) {
        this.errorMessage = '모든 필드를 입력해주세요.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      // 이메일 형식이 올바르지 않을 경우
      if (!isValidEmail(this.email)) {
        this.errorMessage = '유효한 이메일 주소를 입력해주세요.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      // 비밀번호가 유효하지 않을 경우
      if (!isValidPassword(this.password)) {
        this.errorMessage = '비밀번호는 최소 8자 이상, 15자 이하의 숫자를 입력하세요. 알파벳 대소문자(a~z, A~Z), 숫자(0~9)가 혼합되어야 합니다.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
      if (this.password !== this.passwordCheck) {
        this.errorMessage = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      if(!this.emailCheck){
        this.errorMessage = '이메일 인증을 해주세요.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }
      console.log(this.emailBackUp)
      console.log(this.email)
      if(! (this.emailBackUp === this.email)){
        this.errorMessage = '만약 이메일을 수정하셨으면 다시 이메일 인증을 해주셔야합니다.';
        triggerNegative(this.errorMessage, this.$q);
        return;
      }

      this.errorMessage ='';

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        nickname: this.nickname,
        loginType: "EMAIL"
      };

      RegisterApi(formData,this.$q,this.$router);
    },
  }
  ,
}
</script>

<style lang="scss" scoped>
</style>
