<template>
    <div class="variant-preview">
        <slot></slot> 
    </div>
</template>
<script>
export default {
  props: ['variant'],
}
</script>

<style lang="scss" scoped>
    .variant-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        max-width: 40px;
        min-width: 40px;
        position: relative;
        border-radius: 3px;
        overflow: hidden;
    }
</style>