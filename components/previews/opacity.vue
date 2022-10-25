<template>
    <div style="display:contents">
        <div class="transparency-cell"></div>    
        <div class="opacity-cell" :style="`opacity:${variant.$value};`"></div>                  
    </div>
</template>
<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
 
.opacity-cell {
    background:rgb(222, 0, 99);
    position:relative;
    height:75%;
    width:75%;      
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;      ;            
}
.transparency-cell {
    height: 100%;
    position: absolute;
    border-radius: 2px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(45deg,rgba(43,40,38,.1) 25%,transparent 0),linear-gradient(-45deg,rgba(43,40,38,.1) 25%,transparent 0),linear-gradient(45deg,transparent 75%,rgba(43,40,38,.1) 0),linear-gradient(-45deg,transparent 75%,rgba(43,40,38,.1) 0);
    background-size: 12px 12px;
    background-position: 0 0,0 6px,6px -6px,-6px 0;            
}
 
</style>