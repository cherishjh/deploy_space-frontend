<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import columns from "assets/data/SpaceTableData/forCreateSpace";
import {ref} from "vue";
import {jwtDecode} from "jwt-decode";
import {axiosInstance} from "boot/axios";
import MemberListForCreate from "pages/space/cardList/MemberListForCreate.vue";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "CreateSpaceCompo",


  props: {
    SpaceType: String
  },

  setup() {
    return {
      selected: ref([]),
      columns,
    }
  },

  data() {
    return {
      mySpaceList: {},
      getAllMembers: [],
      getPostsBySpaceId: Object,
      getSpacesBySpaceId: Object,
      clickedSpaceId: 1,
      viewMembersTable: false,
      membersRows: Object,

      dialog: false,
      spaceName: '',
      description: '',

    }
  },

  methods: {
    async getAllMembersBySpaceId() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/member/members`);
        this.getAllMembers = response.data.result
        this.rows = this.getAllMembers
      } catch (e) {
        console.log(e);
      }
    },

    async createTeamSpace() {
      const TOKEN = localStorage.getItem('accessToken')
      const email = jwtDecode(TOKEN).sub;
      let members = this.selected   // 생성을 위한 Json 객체 조립
        .filter(obj => obj.email !== email)
        .map(obj => {
          return {
            memberEmail: obj.email,
            spaceRole: "CREW"
          }
        })

      members = [...members, {memberEmail: email, spaceRole: "CAPTAIN"}]
      const postData = {
        "spaceName": this.spaceName,
        "description": this.description,
        "spaceThumbNailPath": "https://picsum.photos/2",
        "spaceMembers": members
      }

      try {
      if(this.SpaceType === "TEAM")
        await axiosInstance.post(`${BASE_URL}/space/create/team`, postData);
      if(this.SpaceType === "GROUP")
          await axiosInstance.post(`${BASE_URL}/space/create/group`, postData);
        if(this.SpaceType === "MY")
          await axiosInstance.post(`${BASE_URL}/space/create/my`, postData);
      } catch (e) {
        console.log(e + "스페이스 생성 실패");
      }

    }

  },
  components: {MemberListForCreate, AppSidebar},
  created() {
    this.getAllMembersBySpaceId();
  },
}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card class="card-size">
      <q-card-section class="input__size">
        <q-input class="input__size" outlined v-model="spaceName" label="팀 스페이스 제목"/>
        <q-input class="input__size" outlined v-model="description" label="간단한 설명"/>
      </q-card-section>
      <q-card-actions>
        <q-btn flat class="button--size" label="Cancel" color="primary" v-close-popup/>
        <q-btn flat class="button--size" label="Submit" color="primary" v-close-popup @click="createTeamSpace"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page class="sj-container">
    <div class="sj-content">

      // Create BOX
      <MemberListForCreate
        :SpaceType="SpaceType"
        @GoToCreate=" dialog=true"
      />

      <q-table
        class="spaceTable"

        flat bordered
        title="맴버리스트"
        :rows="getAllMembers"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:body-selection="scope">
          <q-toggle v-model="scope.selected"/>
        </template>

      </q-table>

    </div>
  </q-page>
  <AppSidebar></AppSidebar>
</template>

<style scoped>

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 1.2fr;
}

.sj-content {
  box-sizing: border-box;
  padding-top: 4vh;;
  //background-color: gray;
  width: 100%;
  height: 100%;
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.spaceTable{
  margin-top: 50px;
  width: 100%;
  background: none;
  color: orange;
}
.card-size {
  width: 50vw;
  background-color: #ffe5b6;
  padding: 2vw;
  border-radius: 20px;

}
.input__size {
  font-size: 35px;
  font-weight: bold;
}
.button--size{

  font-size: 50px;

}
</style>
