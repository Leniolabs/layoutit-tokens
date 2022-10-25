<template>
    <div :style="`font-weight:${variant.$value}`">Aa</div>                 
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 
div {
    color: #666;
    font-size: 18px;
    position: relative;
    flex: 1;
    max-width: max-content;
    max-height: 22px;
}
 
</style>