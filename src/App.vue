<template>
  <q-layout view="lHh Lpr lFf" class="background-image" >

    <!-- 헤더 -->
    <AppHeader></AppHeader>
    <!--    <q-pull-to-refresh @refresh="refresh">-->
    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height: 100vh; max-width: 100vw;">

      <!-- 페이지 컨텐츠 -->
      <q-page-container>
         <router-view/>
      </q-page-container>
    <!--    </q-pull-to-refresh>-->
    </q-scroll-area>
  </q-layout>
</template>

<script>
import AppHeader from "components/layout/AppHeader.vue";
import { createPinia } from 'pinia'
import {createApp} from "vue";
import App from "app/.quasar/app";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

export default {
  components: {AppHeader},
  setup() {
    app.use(pinia)
    return {

      // refresh () {
      //   location.reload();
      // }
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#ff9800',
        width: '5px',
        opacity: 0.75
      },
    }
  }//zzzzz
}

</script>


