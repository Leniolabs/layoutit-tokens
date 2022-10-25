<template>
    <div :style="`letter-spacing:${variant.$value}`">Abcde</div>      
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 
div {
    color: #666;
    font-size: 14px;
    position: relative;
    flex: 1;
    max-width: max-content;
    max-height: 18px;
}
 
</style>