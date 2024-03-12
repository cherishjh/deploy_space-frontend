<script>
export default {

  props: ['postId'],
  created() {
    console.log(this.postId); // 이제 this.data로 데이터에 접근할 수 있습니다.
  },

  name: "PostDetail",
}
</script>

<template>
  <h1> PostId:  {{ postId }}
<!--  {{ data }}-->
  </h1>
</template>

<style scoped>
h1{
  color: white;
}
</style>
