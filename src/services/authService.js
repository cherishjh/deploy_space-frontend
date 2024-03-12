// 사용자 인증 및 권한 부여와 관련된 작업을 처리하는 파일로, 사용자 로그인, 로그아웃, 회원가입 등의 작업을 수행하고 사용자의 인증 상태를 관리
import axios from 'axios';
import { triggerOngoing, triggerNegative } from 'src/utils/notification';
import {axiosInstance} from "boot/axios";

export const FountURL = process.env.VUE_APP_FRONT_BASE_URL;
export const BackURL = process.env.VUE_APP_API_BASE_URL;

export function RegisterApi(formData, $q, router) {
  axios.post(BackURL+'/api/member/create', formData)
    .then(response => {
      triggerOngoing('회원가입 했습니다. 로그인해주세요.', $q);
      router.push('/');
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function githubApi(){
  location.href=BackURL+'/oauth2/authorization/github';
}
export function googleApi(){
  location.href=BackURL+'/oauth2/authorization/google';
}

export function emailLogin(formData, $q, router){
  axios.post(BackURL+'/api/member/login', formData)
    .then(response => {
      localStorage.setItem('accessToken',response.data.result)
      location.reload();
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function checkEmail(formData, $q)   {
  axios.post(BackURL+'/api/member/emailAuthentication', formData)
    .then(response => {
      triggerOngoing('해당 메일로 인증번호를 발송했습니다.', $q);
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function checkCode(formData, $q) {
  return new Promise((resolve, reject) => {
    axios.post(BackURL+'/api/member/emailCheck', formData)
      .then(response => {
        triggerOngoing(response.data.message, $q);
        resolve(true); // 성공 시 true 반환
      })
      .catch(error => {
        triggerNegative(error.response.data.message, $q);
        resolve(false); // 실패 시 false 반환
      });
  });
}

export function Logout($q){
  axiosInstance.get(BackURL+'/api/member/logout')
  .then(response => {
    console.log(response);
    localStorage.removeItem("accessToken");
    location.href=FountURL;
    resolve(true); // 성공 시 true 반환
  })
  .catch(error => {
    console.log(error);
    localStorage.removeItem("accessToken");
    location.href=FountURL;
  });
}

export function test(){
  return new Promise((resolve, reject) => {
  axiosInstance.post(BackURL+'/api/member/qwe',{id:123})
    .then(response => {
    })
    .catch(error => {
    });
  });
}
