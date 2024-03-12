<script>
import {axiosInstance} from "boot/axios";
import AppSidebar from "src/components/layout/AppSidebar.vue";
import moment from 'moment';

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  name: "PostDetail",
  props: ['postId'],
  components: {AppSidebar},
  data() {
    return {
      // 서버에서 받아온 게시글 데이터
      postDetail: {},
      postComments: [],
      comment: '',
    };
  },

  methods: {
    async getPostDetail() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/post/detail/${this.postId}`);
        this.postDetail = response.data.result
      } catch (e) {
        console.log(e + "게시글을 불러오지 못했습니다.");
      }
    },

    formatDateTime(dateTime) {
      return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    },

    async getPostComments() {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/api/comment/list/${this.postId}`);
        this.postComments = response.data.result
        this.postComments.reverse()
      } catch (e) {
        console.log(e + "댓글을 불러오지 못했습니다.");
      }
    },


    async writePostComment() {
      try {
        const writeComment = {
          "contents": this.comment
        }
        await axiosInstance.post(`${BASE_URL}/api/comment/create/${this.postId}`, writeComment);
        window.location.reload();
      } catch (e) {
        console.log(e + "댓글을 불러오지 못했습니다.");
      }
    },

    async addLike() {
      try {
        const addLikegogo = {
          "postId": this.postId
        }
        await axiosInstance.post(`${BASE_URL}/api/heart/add`, addLikegogo);
        window.location.reload();
      } catch (e) {
        console.log(e + "좋아요 추가 실패");
      }
    },

    async cancleLike() {
      try {
        const cancleLikegogo = {
          "postId": this.postId
        }
        await axiosInstance.post(`${BASE_URL}/api/heart/cancel`, cancleLikegogo);
        window.location.reload();
      } catch (e) {
        console.log(e + "좋아요 추가 실패");
      }
    },


  },
  created() {
    this.getPostDetail()
    this.getPostComments()
  },

  updated() {
  },
  computed: {
    renderedHtml() {
      return this.postDetail.contents;
    }
  },
}
</script>

<template>
  <q-page class="my-page row container sj-container">
    <div class="sj-content">

      <div class="q-ma-md for__box">
        <div class="date__box">
          <q-breadcrumbs class="text-blue-12 bold" active-color="secondary">
            <q-breadcrumbs-el
              :label="` ${postDetail.spaceType} / ${postDetail.spaceName}`"
              icon="widgets"
              class="space__name"
            />
          </q-breadcrumbs>

          <div>
            <p class="date-item"> Created At: {{ formatDateTime(postDetail.created_at) }}</p>
            <p class="date-item"> Updated At: {{ formatDateTime(postDetail.updated_at) }}</p>
          </div>
        </div>
        <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-9 text-white rounded-borders"
             style="padding: 12px">
          <div class="status-item"> ✍️ WRITER: {{ postDetail.nickname || 'N/A' }}</div>
          <q-space/>
          <div class="status-item"> 😁 STATUS : {{ postDetail.postStatus }}</div>
          <div class="status-item"> ❤️ HEARTS : {{ postDetail.postHearts }}</div>
        </div>


        <div v-if="postDetail" class="q-pa-xs">
          <h3>{{ postDetail.title }}</h3>
          <q-card flat bordered class="q-pa-md q-ma-lg">
            <div v-html="renderedHtml"></div>
          </q-card>
        </div>

        <div class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-9 text-white rounded-borders">
          <div style="font-size: 20px; padding: 0 15px">COMMENTS: {{ postDetail.commentCounts }}</div>
        </div>
        <q-input v-model="comment" label="댓글입력"/>
        <q-card-actions>
          <q-btn label="댓글달기" color="green-5" @click="writePostComment"/>
          <q-btn label="LIKE 😍" color="blue" @click="addLike"/>
          <q-btn label="cancle 🤣" color="red-5" @click="cancleLike"/>
        </q-card-actions>

        <div v-for="comment in postComments" :key="comment.id">
          <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
            <q-card-section>
              <div class="text-h7"> 작성자: {{ comment.nickname }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h6"> {{ comment.contents }}</div>
            </q-card-section>
            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section>삭제</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Share</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-separator/>

            <q-card-actions>
              <q-btn label="댓글달기" color="green-5"/>
              <q-btn label="LIKE 😍" color="blue"/>
              <q-btn label="cancle 🤣" color="red-5"/>
            </q-card-actions>
          </q-card>
        </div>

      </div>
      <q-space/>


    </div>
  </q-page>
  <AppSidebar></AppSidebar>
</template>

<style>
.date-item {
  margin-bottom: 1px; /* 원하는 간격으로 조절 */
  font-size: 20px;
  color: #afa9a9;
}

.status {
  display: flex;
  flex-direction: row; /* 가로로 정렬 */
}

.status-item {
  margin: 4px 12px; /* 원하는 간격으로 조절 */
  font-size: 20px;
}

.sj-container {
  width: 100vw;
  //background-color: red;
  display: grid;
  grid-template-columns: 2.7fr 8fr 0.5fr;
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

.space__name {
  font-size: 30px;
}

.for__box {
  background-color: rgba(255, 230, 192, 0.85);
  width: 100%;
  margin: 0;
  padding: 20px;
  border-radius: 30px;
}

.red__box {
  background-color: blue;
  width: 100%;
}

.date__box {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>
