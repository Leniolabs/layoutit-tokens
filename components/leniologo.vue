<template>
  <div class="leniologo">
    <a href="https://leniolabs.com"><img src="https://i.imgur.com/QoxHIFN.png" alt=""></a>
    <div>Built with <br> <span style="color:#f44336;">&hearts;</span> & <span>✨</span></div>
  </div>
</template>
 
<style lang="scss">
.leniologo {
  position: absolute;
  bottom: 65px;
  left: 10px;
  right: -20px;
  fill: #fff;
  display: flex;
  align-items: center;
  gap: 0;
  color: #ddd;
  padding-right: 0 !important;
  a {
    text-decoration: none;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
  img {
    height: 55px;
    width: auto;
    margin-right: 20px;
  }
  div {
    font-size: 14px;
    text-align: center;
    color: #aaa;
  }
}
</style>
