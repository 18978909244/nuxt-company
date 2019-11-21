<template>
  <section>
    <section v-loading="loading"></section>
    <section v-if="detail">
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
      <!-- <el-divider /> -->
      <section class="middle-container">
        <Title title="产品" sub="优势" v-if="detail.good_list.length > 0" />
        <Advantage :list="detail.good_list" />
        <section class="divider"></section>
        <Title title="办理" sub="流程" v-if="processList.length > 0" />
        <Process :list="processList" />
        <section class="divider"></section>
        <Title title="常见" sub="问题" v-if="detail.problem_list.length > 0" />
        <Problem :list="detail.problem_list" />
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import Advantage from "@/components/Advantage";
import Process from "@/components/Process";
import Problem from "@/components/Problem";
import Title from "@/components/Title";
export default {
  components: {
    Advantage,
    Title,
    Process,
    Problem
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
    },
    processList: function() {
      return (
        this.detail.processse_type_list[0] &&
        this.detail.processse_type_list[0].processses
      );
    }
  },
  created() {
    this.id = Number(this.$route.params.id);
    this.initData(this.id);
  },
  methods: {
    ...mapActions(["asyncFetchGood"]),
    async initData(product_id) {
      this.loading = true;
      this.detail = await this.asyncFetchGood({ product_id });
      console.log(this.detail);
      console.log(this.detail.problem_list);
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
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  background: url("../../assets/pro_bg.png") no-repeat;
  background-position: center center;
  .main {
    display: flex;
    width: 1080px;
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
.divider {
  height: 100px;
}
</style>
