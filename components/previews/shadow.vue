<template>
    <div :style="`box-shadow: ${variant.$value}`"></div>    
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 
div {
    background: transparent;
    height: 50%;
    width: 50%;
    position: relative;
}
 
</style>