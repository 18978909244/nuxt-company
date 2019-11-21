<template>
  <div v-html="aboutus">
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['aboutus'])
  }
}
</script>
<style scoped lang="less"></style>
