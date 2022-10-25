<template>
    <div :style="`border-radius:${variant.$value};`"></div> 
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 div {
    background:#DE0063;
    opacity: 0.25;
    height:75%;
    width:75%;
    position: relative;
}
 
</style>