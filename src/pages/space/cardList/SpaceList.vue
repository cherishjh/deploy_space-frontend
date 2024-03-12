<script>
export default {
  name: "SpaceList",
  props: {
    mySpaceList: {},
  }
}
</script>

<template>
  <div class="spacebox">
    <div class="spaceCard sj-center"
         @click="$emit('GoToCreate')">
      <div class="spaceCard__create"> GO TO CREATE</div>
    </div>


    <div class="spaceCard"
         v-for="(data, i) in mySpaceList" :key="i"
         @click="$emit('getClickedSpaceId',data.spaceId)">
      <div class="spaceCard__roundbox type_my" v-if="data.spaceType === 'MY'">{{ data.spaceType }}</div>
      <div class="spaceCard__roundbox type_team" v-if="data.spaceType === 'TEAM'">{{ data.spaceType }}</div>
      <div class="spaceCard__roundbox type_group" v-if="data.spaceType === 'GROUP'">{{ data.spaceType }}</div>
      <div class="spaceCard__title">{{ data.spaceName }}</div>
      <img :src="data.spaceThumbNailPath" alt=""/>
    </div>

  </div>
</template>

<style scoped>

.spacebox {
  grid-area: c;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px
}

.spaceCard {
  height: 200px;
  border-radius: 20px;
  position: relative;
  transition: all 1.2s ease 0s;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    transform: translateX(-7px) translateY(-7px) scale(95%);
    opacity: 1;
    box-shadow: orange 5px 5px 5px;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .spaceCard__roundbox {
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 10px;
    color: white;
    padding: 5px 12px 5px 15px;
    font-size: 13px;
  }
  .type_my {
    background: linear-gradient(0deg, rgb(255, 0, 0), rgba(255, 0, 0, 0));
  }
  .type_team {
    background: linear-gradient(0deg, rgb(0, 20, 255), rgba(255, 0, 0, 0));
  }
  .type_group {
    background: linear-gradient(0deg, rgb(35, 194, 0), rgba(255, 0, 0, 0));
  }


  .spaceCard__title {
    width: 70%;
    position: absolute;
    border-bottom-left-radius: 20px;
    bottom: 0;
    background: linear-gradient(90deg, rgba(1, 1, 1, 1), rgba(255, 0, 0, 0));
    font-size: 18px;
    padding: 15px 25px 10px 25px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: orange;
  }
}

.sj-center {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(220, 220, 220, 0.35);
  color: rgba(255, 255, 255, 0.47);
  font-size: 20px;
}
.spaceCard__create {
  font-size: 25px;
  color: white;
  line-height: 1.7;
}
</style>
