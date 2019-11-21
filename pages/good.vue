<template>
  <div>
    <el-main v-loading="loading"></el-main>
    <el-main v-if="detail">
      <div class="header">
        <div class="main">
          <div class="title">
            <h1>{{ detail.name }}</h1>
            <span v-if="detail.remark"> - </span>
            <span>{{ detail.remark }}</span>
          </div>
          <div class="english">
            {{ detail.engilish_name }}
          </div>
          <div class="info">
            {{ detail.detail }}
          </div>
          <div class="button">
            <el-button type="primary" @click="buy">立即购买</el-button>
          </div>
        </div>
      </div>
      <el-divider />
      <Title title="产品优势" />
      <Advantage :list="detail.good_list" />
    </el-main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import Advantage from "@/components/Advantage";
import Title from "@/components/Title";
export default {
  components: {
    Advantage,
    Title
  },
  data() {
    return {
      id: null,
      detail: null,
      loading: false
    };
  },
  computed: {
    ...mapState(["user_info"]),
    ...mapGetters(["is_login"]),
    selectedKind: function() {
      return this.kind_id
        ? this.detail.kind_list.find(item => item.kind_id === this.kind_id)
            .kind_name
        : "";
    },
    selectedKindList: function() {
      return this.kind_id
        ? this.detail.kind_list.find(item => item.kind_id === this.kind_id)
            .kind_second_list
        : [];
    }
  },
  created() {
    this.id = Number(this.$route.query.id);
    this.initData(this.id);
  },
  methods: {
    ...mapActions(["asyncFetchGood"]),
    async initData(product_id) {
      this.loading = true;
      this.detail = await this.asyncFetchGood({ product_id });
      this.loading = false;
      this.detail.kind_list.forEach(item => {
        this.$set(item, "selected", false);
        if (item.kind_second_list.length > 0) {
          item.kind_second_list.forEach(second => {
            this.$set(second, "selected", false);
          });
        }
      });
    },
    buy() {
      if (!this.is_login) {
        this.$router.push("/login?redirect=" + this.$route.fullPath);
      }
      this.$router.push(`/createOrder?product_id=${this.detail.product_id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .main {
    display: flex;
    width: 500px;
    flex-direction: column;
    .title {
      display: inline-flex;
      align-items: center;
      h1 {
        color: #275df0 !important;
        font-size: 40px;
      }
      span {
        font-size: 22px;
        color: #455264 !important;
      }
    }
    .english {
      margin-top: 10px;
      color: rgba(217, 217, 217, 0.8) !important;
      border-bottom: 1px solid #e9eef3;
      font-size: 18px;
    }
    .info {
      margin-top: 10px;
      color: #68778d !important;
    }
    .button {
      margin-top: 10px;
      width: 300px;
    }
  }
}
</style>
