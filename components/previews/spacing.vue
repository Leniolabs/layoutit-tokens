<template>
    <div :style="`width:${variant.$value};`"></div>                  
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
    border-radius: 0;
    position: relative;
    height: 100%;
}
</style>