<template>
  <q-page class="my-page row container">
    <AppSidebar></AppSidebar>

    <q-item-section class="for_flex">
      <div class="container__in">
        <div class="page-header" >
          <h1>My Info</h1>
        </div>
        <table class="table">
          <tr>
            <th>Name : </th>
            <td>{{myInfo.name}}</td>
          </tr>
          <tr>
            <th>Nick Name : </th>
            <td>{{myInfo.nickname}}</td>
          </tr>
          <tr>
            <th>Email : </th>
            <td>{{myInfo.email}}</td>
          </tr>

          <tr>
            <th>Role : </th>
            <td>{{myInfo.role}}</td>
          </tr>
          <tr>
            <th>loginType : </th>
            <td>{{myInfo.loginType}}</td>
          </tr>
        </table>
      </div>
    </q-item-section>
  </q-page>
</template>

<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {axiosInstance} from "boot/axios";
const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  components: {AppSidebar},
  setup() {
    return {}
  },

  data() {
    return {
      myInfo: {},
    }
  },

  methods: {
    async loadMyInfo() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/member/mypage`);
        this.myInfo = response.data.result
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },
  },
  created() {
    this.loadMyInfo();
  }
}
</script>

<style lang="scss" scoped>


.container__in{
  height: 60vh;
  //background-color: gray;
  color:orange;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  //padding-right: 50vh;
  padding-bottom: 20vh;
}


.page-header {
}

.table {
  font-size : 40px;
  height: 70%;
  padding: 30px;
}

.for_flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
th {
  padding: 10px;
}
td {
  color: #98dad1;
}
</style>
