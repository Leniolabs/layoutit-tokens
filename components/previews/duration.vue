<template>
    <div :style="`animation: run ${variant.$value} linear infinite alternate`"></div>         
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
    height: 25%;
    width: 25%;
    border-radius: 50%;
    position: relative;
}
 
</style>