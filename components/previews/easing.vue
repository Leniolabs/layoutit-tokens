<template>
    <div :style="`animation: fill 3s ${variant.$value} infinite alternate`"></div>         
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
div {
    background: #DE0063;
    opacity: 0.25;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
}
</style>