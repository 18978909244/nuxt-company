<template>
  <div>
    <Header />
    <div v-if="$route.path==='/'">
      <el-carousel :interval="4000" type="card" :height="`${bannerHeight}px`">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <!-- <el-image :src="item.banner_img"></el-image> -->
          <el-image ref="image" :src="item.banner_img" @load="imageLoaded" fit="cover" style="width:100%" :style="`height:${bannerHeight}px`"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="body-container">
      <nuxt />
    </div>
    
    <Footer />
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { mapState, mapGetters, mapMutations,mapActions } from "vuex";
const initList = ['initSetting','asyncFetchCategory','initBanner','initAboutUs','initInformation','initHelp']
export default {
  components:{
    Header,
    Footer
  },
  data(){
    return {
      bannerHeight:0
    }
  },
  async created(){
    await Promise.all(initList.map(item=>this[item]()))
  },
  computed:{
    ...mapState(["banners", "informations"]),
    ...mapGetters(["getName", "recommandList"]),
    bannerList: function() {
      return this.banners.filter(item => item.is_enable === 1);
    }
  },
  methods:{
    ...mapActions(initList),

    async imageLoaded() {
      await this.$nextTick();
      if (
        this.$refs.image &&
        this.$refs.image[0] &&
        this.$refs.image[0].imageHeight &&
        this.$refs.image[0].imageHeight > 0
      ) {
        this.bannerHeight = this.$refs.image[0].imageHeight;
      }
    }
  }
}
</script>


<style>
@import url('//at.alicdn.com/t/font_1517780_2vrs948a17q.css');
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.body-container {
  min-height:600px;
  margin: 0 auto;
}

.middle-container{
  width: 1080px;
  margin: 0 auto;
  padding: 50px 0
}
</style>
