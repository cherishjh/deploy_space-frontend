<template>
  <q-item-section class="col-2" >
    <div class="text-white text-center " style=" position: fixed; top: 33%;  left: 5%;">
      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/MyPage')"
        > My Page</q-btn>
      </p>
      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/PostEditor')"
        > Posting</q-btn>
      </p>

      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/MySpace/MY')"
        > My SPACE</q-btn>
      </p>
      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/TeamSpace/TEAM')"
        > Team SPACE</q-btn>
      </p>
      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/GroupSpace/GROUP')"
        > Group SPACE</q-btn>
      </p>
<!--      <p>-->
<!--        <q-btn class="mr-2"-->
<!--               @mouseenter="handleHover"-->
<!--               @mouseleave="handleLeave"-->
<!--               @click="this.$router.push('/Kanban')"-->
<!--        > Kanban</q-btn>-->
<!--      </p>-->
<!--      <p>-->
<!--        <q-btn class="mr-2"-->
<!--               @mouseenter="handleHover"-->
<!--               @mouseleave="handleLeave"-->
<!--               @click="this.$router.push('/Calendar')"-->
<!--        > Calendar</q-btn>-->
<!--      </p>-->
      <p>
        <q-btn class="mr-2"
               @mouseenter="handleHover"
               @mouseleave="handleLeave"
               @click="this.$router.push('/Messages')"
        > Messages</q-btn>
      </p>

    </div>
  </q-item-section>
</template>

<script>
// 애플리케이션의 사이드바를 정의하는 컴포넌트. 사이드바에는 추가적인 메뉴나 기능을 제공
export default {
  setup() {


    return {}
  }
  ,
  methods: {
    handleHover(event) {
      // 호버 시 버튼 스타일 변경
      event.target.classList.add("hovered");
    },
    handleLeave(event) {
      // 호버 해제 시 버튼 스타일 초기화
      event.target.classList.remove("hovered");
    }
  }
}
</script>

<style lang="scss" scoped>
  .hovered {
    color: orange /* 호버 시 텍스트 색상 변경 */
  }
</style>
