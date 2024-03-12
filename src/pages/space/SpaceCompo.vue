<script>
import AppSidebar from "components/layout/AppSidebar.vue";
import {columns, rows} from "assets/data/SpaceTableData/forInviteMembers";
import {ref} from "vue";
import SpaceList from "pages/space/cardList/SpaceList.vue";
import {axiosInstance} from "boot/axios";
import PostList from "pages/post/PostList.vue";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "SpaceDetail",
  setup() {
    return {
      selected: ref([]),
      columns,
      rows
    }
  },

  props: {
    SpaceType: String
  },

  data() {
    return {
      AllSpaceList: {},
      mySpaceList: {},
      getMembersBySpaceId: [],
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
    async loadMySpacesByEmail() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/space/my`);
        this.AllSpaceList = response.data.result
        this.mySpaceList = this.AllSpaceList.filter(space => space.spaceType === this.SpaceType)
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },

    async membersBySpaceId(id) {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/space/${id}/members`);
        this.getMembersBySpaceId = response.data.result
        this.rows = this.getMembersBySpaceId
      } catch (e) {
        console.log(e);
      }
    },


    async postsBySpaceId(id) {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/space/${id}/posts`);
        this.getPostsBySpaceId = response.data.result
        console.log(this.mySpaceList)
        console.log("end")
      } catch (e) {
        console.log(e);
      }
    },

    goToPostDetail(event){
      console.log(event)
      this.$router.push( `/PostDetail/${event}`  );
    },


    async schedulesBySpaceId() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/space/${clickedSpaceId}/schedules`);
        this.getSpacesBySpaceId = response.data.result
        console.log(this.mySpaceList)
      } catch (e) {
        console.log(e);
      }
    },

    getMembersPostsSchedule(id) {
      this.viewMembersTable = true
      this.membersBySpaceId(id)
      this.postsBySpaceId(id)
    },

  },
  components: {PostList, SpaceList, AppSidebar},
  created() {
    this.loadMySpacesByEmail();
  },
  updated() {
    this.loadMySpacesByEmail();
    this.viewMembersTable = false
  }
}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <q-input outlined v-model="spaceName" :label="`${SpaceType} 스페이스 이름`" />
        <q-input outlined v-model="description" label="간단한 설명" />
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Submit" color="primary" v-close-popup @click="createTeamSpace" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page class="sj-container">
    <div class="sj-content">

      <SpaceList
        :mySpaceList="mySpaceList"
        @getClickedSpaceId="getMembersPostsSchedule($event)"
        @GoToCreate=" $router.push(`/SpaceCreate/${SpaceType}`)"
      />

      <q-table
        v-if="viewMembersTable"
        flat bordered
        title="맴버리스트"
        :rows="getMembersBySpaceId"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        class="spaceTable"
      >
        <template v-slot:body-selection="scope">
          <q-toggle v-model="scope.selected"/>
        </template>
      </q-table>

      <PostList
        class="postList__css"
        :postDatas="getPostsBySpaceId"
        @PostDtailOpen = "goToPostDetail($event)"
      />


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

.spaceTable {
  width: 100%;
  background: none;
  color: orange;
}

.hi {
  font-size: 20px;
  color: white;
}

</style>
