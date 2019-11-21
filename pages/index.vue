<template>
  <div class="container">
    <section>

      <section class="body">

      <!-- <el-carousel :interval="4000" height="30px" >
        <el-carousel-item v-for="(item,index) in informations" :key="index">
          <h1>{{item.title}}</h1>
        </el-carousel-item>
      </el-carousel> -->
        <div v-for="(item, index) in recommandList" :key="index" class="warp">
          <div class="version3-public-title">
            <h3>{{item.service_name}}</h3>
            <!-- <p>xx</p> -->
          </div>
          <div class="good-block">
            <div class="good-list" v-for="(good, idx) in item.product_list" :key="idx" @click="$router.push(`/good/${good.product_id}`)">

              <el-image :src="good.product_img_small" fit="fit"></el-image>
              <h3>{{good.name}}</h3>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['informations']),
    ...mapGetters(["getName","recommandList"]),
  },
  created(){
    console.log(this.$route)
  },
  methods: {
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  
  opacity: 0.75;
  line-height: 30px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /* background-color: #99a9bf; */
}

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
}

.version3-public-title {
  padding-left: 45px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAhCAYAAADH97ugAAAAAXNSR0IArs4c6QAAA9RJREFUSA2lV11sFFUUPufO7NJajPylUWM1pjxIQBNpQ+JPH4xLG9a0VZNtjE8aAv4khKrhJ9qtV1obBVF8McgLrw0bEnFpF8qSEIIkKPBAQsBoQ2I1UaOolJ/anZnjmZWZzt69c3er8zLnfN93z3f/Z9eC//ls3Ph5orm5/d4HHu5MXLl8/FZcOYwj6sFT6wY3AdEAATUjgguExQZ7wfrDhwd+Utv/Z6PUumw/EX2iKTiVQHtVoSCvRTkRTeqNu3rkctZ+qNMTQEuJ3NdVzlaBenJ31t3N05U0aFer3LxH1JkeXMsmPWqhypxmKnOAeRlJKW3Xq14XtSgIcVDF5mV06oz3GgCtVIso+fkn14i8gkHdu64rI5e40+53PG1L1CLRHMHuKB6Rp6KYH9e9GZxpZwfrjSaAOFosVJv4RnVNXVd3diUfyFf9BrEPwi20rW1xfF0jcku0h8+HFVfExxHFzmJe/hCnqTmiVHqwl01ScQXKJgBTjZbYadIYjTIZmSTydpsK+JwA3JrPy5smndHoz+vOG0DQaiqAiF9NHBkaNWl8LtYonZZ3ewDv1ChAQsDmGpoyHWs0S84Ij+ZOUxEezf6JsaFzJk3AaY3WpmU7EbwUiLRvhOkkWrVGHDbVGnme8ykrjLcGb4Dh8XH5c1ipRlB1jlLp7Ivk0ePGdgiTixZae3Qa+qDtLvib+vhgLeXL9SQOfHPa11X0urtb3nHTcb/lz/N9uiIBJizoPTY2/GWQB296v201OF6R13ZxgLHhfljRuqFi6thkWy0T7llRa7KrswlK3qEKE9+N6GW4NPlCaJTqlvczuiXsiTZAx0pgv5a68dvbjOtngqAnNIKSu4t706gtchvki3Xv0fzQRVVDQ2seZOxNFQ9zBCobdT2T7eDvTF9IaAIEvGottN7VUACu8xHPRoOW80GkLwR/noXrgb+djQ8KHDyak1dVEb3X9hSbPK/iczlegIeW58TpM04P/z57dI7QRXhxUdOqvSpDBzIWL7Z2m4daS2zGvpxrewSG3vwrR8vqz+X63LBxEFz+PsPhI0Fa9UY8iNmzJ3yc1wjj55YFvDaHimOy6IurHsJnq7AQwBkQdriL/c1wPuSUgC/N2QQm31LguZQqD/wcUY4+xuzXVwJMJND6jA/hVABE34i0tVDITkaxihih6na4zf8ITctGolrh/xhvsBse4zMyUf5HwCxP1688mk3HxofNu3FF62j5iolWRPgDEqIXt0zcqIQj2dPPjSxNzsw2trTc88u+fa+UIpQxpB3tT/AW7+Ad+DsswAO4/dxfaoN/AH/ZJXpVSP+TAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 25px 34px;
  height: 34px;
}
.version3-public-title > h3 {
  font-size: 32px;
  color: #2a2e5a;
  float: left;
  line-height: 34px;
}
.version3-public-title > p {
  font-size: 18px;
  color: #686a84;
  margin-left: 32px;
  float: left;
  line-height: 36px;
}
.body {
  width: 1080px;
  margin: 0 auto;
}
.warp {
  clear: both;
  margin-bottom: 50px;
}
.good-list {
  /* margin-top: 20px;
  height: 385px;
  background:url('https://img20.wtoip.com/tesla/15605093615285.png') no-repeat;
  background-size: 168px 385px; */
}

.good-block {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  border: 1px solid #eee;
  box-shadow: 0px 0px 8px #d5d6d8;
}
.good-list {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 190px;
}

.good-list .el-image {
  width: 100px;
  height: 100px;
}
.good-list > h3 {
  /* color: #fff; */
  text-align: center;
  font-weight: normal;
  font-size: 18px;
  color: #333;
}
</style>
