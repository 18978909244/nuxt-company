<template>
  <section v-if="detail" class="body-container middle-container">
    <h1>{{ detail.title }}</h1>
    <el-divider />
    <el-image :src="detail.information_img" fit="contain"></el-image>
    <div v-html="detail.content"></div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      id: null
    };
  },
  computed: {
    ...mapState(["informations"]),
    detail: function() {
      return this.informations.find(item => item.information_id === this.id);
    }
  },
  created() {
    this.id = Number(this.$route.params.id);
  }
};
</script>

<style lang="less" scoped></style>
