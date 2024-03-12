<script>
export default {
  name: "MemberListForCreate",
  props: {
    SpaceType: String,
  }
}
</script>

<template>
  <div class="spacebox">
    <div class="spaceCard sj-center"
         @click="$emit('GoToCreate')">
      <div class="spaceCard__create"> CREATE {{SpaceType}} SPACE</div>
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
  font-size: 40px;
  color: orange;
  line-height: 1.7;
}
</style>
