<template>
    <div :style="`background:${variant.$value};`"></div> 
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>