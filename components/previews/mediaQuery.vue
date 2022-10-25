<template>
    <div>{{variant.$value}}</div>                   
</template>

<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 
div {
    font-size: 10px;
    color: #666;
    position: relative;
    flex:1;
    max-width: max-content;
    height:initial;
}
 
</style>