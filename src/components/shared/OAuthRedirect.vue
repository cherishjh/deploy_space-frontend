<template>
  <div>

  </div>
</template>

<script>
// 전역적인 인증 상태를 나타내는 컴포넌트로, 사용자의 로그인 상태를 확인하고 로그인 상태에 따라 헤더에 로그인/로그아웃 버튼을 표시
import {triggerOngoing} from "src/utils/notification";
import {FountURL} from "src/services/authService";
export default {
  methods: {
    getAccessTokenFromCookie() {
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'accessToken') {
          return decodeURIComponent(value);
        }
      }
      return null;
    }
  },
  created() {
    // 쿠키에서 accessToken 가져오기
    const accessToken = this.getAccessTokenFromCookie();
    if(accessToken != null){
      localStorage.setItem("accessToken",accessToken)
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
    location.href=FountURL;
  }
}
</script>

<style lang="scss" scoped>

</style>
