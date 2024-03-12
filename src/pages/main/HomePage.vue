<script>
import {ref} from 'vue'
// import postDatas from "../../assets/data/postdata"
import PostList from "pages/post/PostList.vue";
import {axiosInstance} from "boot/axios";

const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const PLAYDATA_URL = process.env.PLAYDATA_URL;

export default {
  components: {PostList},
  setup() {
    const items = ref([{}, {}, {}, {}, {}, {}, {}])
    return {
      slide: ref(1),
      autoplay: ref(true),

      items,
      onLoad(index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  },

  data() {
    return {
      postDatas: [],
    }
  },

  methods: {
    openLink() {
      window.open(PLAYDATA_URL, '_blank');
    },

    async loadPost() {
      try {
        console.log(BASE_URL);
        const response = await axiosInstance.get(`${BASE_URL}/api/post/list`);
        this.postDatas = response.data.result
        this.postDatas.reverse()
      } catch (e) {
        console.log(e + "모든 스페이스 가져오기 실패");
      }
    },
    goToPostDetail(event){
      console.log(event)
      this.$router.push( `/PostDetail/${event}`  );
    }
  },

  created(){
    this.loadPost()
  }
}
</script>

<template>
  <q-page class="home-page">

    <!--    <q-card-section class="text-center text-white">-->
    <!--      <h3>Welcome to </h3>-->
    <!--      <h1 class="text-orange">Encore Space</h1>-->
    <!--    </q-card-section>-->

    <q-card-section class="text-center q-ma-lg-lg">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseleave="autoplay = true"
        style="cursor: pointer"
        @Click="openLink"
      >
        <q-carousel-slide :name="1" img-src="../../../public/image/home/encoreSpace.jpg"/>
        <q-carousel-slide :name="2" img-src="../../../public/image/home/recruit.jpg"/>
        <q-carousel-slide :name="3" img-src="../../../public/image/home/encore.jpg"/>
      </q-carousel>

      <q-img class="breathing-animation" src="../../../public/image/home/map.png" height="926" width="1920" alt=""/>

    </q-card-section>

   <PostList
     class="postList__css"
     :postDatas="postDatas"
     @PostDtailOpen = "goToPostDetail($event)"
   />
<!--    <q-card-section class="text-center">-->
<!--      <q-infinite-scroll @load="onLoad" :offset="200">-->
<!--        <div v-for="(item, index) in items" :key="index" class="caption row justify-center">-->
<!--          <q-card class="my-card q-my-lg q-mx-lg" v-for="index in 4" :key="index">-->
<!--            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">-->
<!--              <div class="absolute-bottom text-h6">-->
<!--                제목-->
<!--              </div>-->
<!--            </q-img>-->

<!--            <q-card-section>-->
<!--              <p>대충 내용</p>-->
<!--            </q-card-section>-->
<!--          </q-card>-->
<!--        </div>-->
<!--        <template v-slot:loading>-->
<!--          <div class="row justify-center q-my-md">-->
<!--            <q-spinner-dots color="grey" size="40px"/>-->
<!--          </div>-->
<!--        </template>-->
<!--      </q-infinite-scroll>-->
<!--    </q-card-section>-->
  </q-page>
</template>


<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 20vw;
}


@keyframes breathing {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.0;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(0.5);
  }
}

.breathing-animation {
  animation: breathing 20s infinite;
}

.home-page {
  width: 100vw
}

.postList__css {
  padding: 30px;
}
</style>
