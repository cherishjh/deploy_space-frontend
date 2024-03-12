<script>
import {imgApi} from "src/services/dataService";

export default {
  name: "PostList",
  methods: {imgApi},
  props: {
    postDatas: Object,
  }
}
</script>

<template>
  <div class="postbox">
    <div class="postcard"
         v-for="(data, i) in postDatas" :key="i"
         @click="$emit('PostDtailOpen',data.postId)">
      <div class="postcard__title">{{ data.title }}</div>

      <img v-if="data.thumbnail===null" :src="`https://picsum.photos/30${10+data.postId%90}`" alt=""/>
      <img v-if="data.thumbnail!=null" :src=imgApi(data.thumbnail) alt=""/>
<!--<div class="text-white">{{data.thumbnail}}</div>-->

    </div>
  </div>
</template>

<style scoped>

.postbox {
  grid-area: c;
  padding-top: 7.5vh;;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px
}

.postcard {
  background-color: steelblue;
  height: 300px;
  border-radius: 20px;
  position: relative;
  transition: all 0.5s ease 0s;
  cursor: pointer;
  opacity: 0.5;
}
.postcard:hover {
  transform: translateY(-10px) scale(1.02);
  opacity: 1;
  box-shadow: 5px 5px 20px orange;
}
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .postcard__title {
    width: 70%;
    position: absolute;
    border-bottom-left-radius: 20px;
    bottom: 0;
    background: linear-gradient(90deg, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
    font-size: 20px;
    padding: 21px 25px 25px 25px;
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
  }



</style>
