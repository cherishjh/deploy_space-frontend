<style>
.forfont__size {
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 45vh;

}
</style>
<template>
  <q-header class="top-navbar row justify-between q-ma-auto">
    <div class="text-white q-mx-lg q-my-auto">
      <q-btn class="home text-center text-orange"  size="2em"  flat label="encore SPACE" @click="this.$router.push('/')"></q-btn>
    </div>
    <div class="text-grey-8 row q-mx-lg q-my-auto text-white">

      <q-input class="search q-my-auto q-mx-lg-xl text-white " standout="bg-orange text-white" dense  rounded  placeholder="Search..."   model-value="" >
        <template v-slot:append>
          <q-icon class="text-white" color="text-white" name="search" />
        </template>
      </q-input>
      <q-icon class="q-mx-lg text-white" size="3em" name="notifications"></q-icon>

      <q-icon class="q-mx-auto text-white" size="3em" name="mail"></q-icon>

      <q-icon class="q-mx-lg text-white" size="2.7em" name="fas fa-calendar"></q-icon>

      <q-btn v-if="!this.isLoggedIn" flat rounded class="bg-white text-black " label="Login" >
        <q-menu class="q-my-lg-lg">
          <LoginPage></LoginPage>
        </q-menu>
      </q-btn>


      <q-btn v-if="this.isLoggedIn" flat rounded class="bg-white text-black " label="Menu" >
        <q-menu>

          <q-list>
            <q-item
              clickable
              @click="this.$router.push('/MyPage')">
              <q-item-section >My Page</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/PostEditor')">
              <q-item-section >Posting</q-item-section>
            </q-item>

            <q-item
              clickable
              @click="this.$router.push('/MySpace/MY')">
              <q-item-section>My SPACE</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/TeamSpace/TEAM')">
              <q-item-section>Team SPACE</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/GroupSpace/GROUP')">
              <q-item-section>Group SPACE</q-item-section>
            </q-item>
<!--            <q-item clickable @click="this.$router.push('/Kanban')">-->
<!--              <q-item-section>Kanban</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item clickable @click="this.$router.push('/Calendar')">-->
<!--              <q-item-section>Calendar</q-item-section>-->
<!--            </q-item>-->
            <q-item
              clickable
              @click="this.$router.push('/Messages')">
              <q-item-section>Message</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="handleLogout">
              <q-item-section>Log Out</q-item-section>
            </q-item>

          </q-list>

        </q-menu>
      </q-btn>

    </div>
  </q-header>
</template>

<script>
// 애플리케이션의 상단에 표시되는 헤더 컴포넌트로, 로고나 네비게이션 메뉴와 같은 요소
import {ref} from "vue";
import LoginPage from "pages/main/LoginPage.vue";
import {Logout, test} from "src/services/authService";


export default {
  name: 'AppHeader'
  ,
  components: {LoginPage},

  data() {
    return{
      isLoggedIn:false
    }
  },
  setup () {
    return {
      showing: ref(false),
    }
  },
  created() {
    if(localStorage.getItem("accessToken")){
      this.isLoggedIn = true
    }
  },
  methods: {

    handleLogout(){
      Logout(this.$q)

    }
  }
}
</script>
