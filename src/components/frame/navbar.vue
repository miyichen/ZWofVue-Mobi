<template lang="html">
  <van-nav-bar :fixed="true" :border="false" :title="$route.meta.pagename" :left-text="$route.meta.lefttext" :left-arrow="$route.meta.isleftarrow" @click-left="onClickLeft">
    <slot slot="right" name="right"></slot>
  </van-nav-bar>
</template>

<script>
export default {
  methods:{
    onClickLeft() {
      if(this.$route.meta.isleftarrow){
        this.$router.go(-1);
      }else{
        return
      }
    }
  }
}
</script>

<style lang="css">
.van-nav-bar{
  background-color: #1d2088;
}
.van-nav-bar__title{
  color:#FFF;
}
.van-nav-bar .van-icon{
  color:#FFF;
}
.van-nav-bar__text{
  color:#FFF;
}
</style>
