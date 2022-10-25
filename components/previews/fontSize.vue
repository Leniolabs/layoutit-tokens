<template>
    <div :style="`font-size:${variant.$value};`">Aa</div>                  
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 div {
    color:#666;
    position: relative;
    flex:1;
    max-width: max-content;
    height:initial;
}
 
</style>