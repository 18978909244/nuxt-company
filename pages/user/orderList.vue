<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.name" v-for="(item, index) in typeOrderList" :key="index" />
    </el-tabs>
    <el-table :data="getOrderList" style="width: 100%">
      <el-table-column prop="order_no" label="订单号" width="200">
      </el-table-column>
      <el-table-column prop="name" label="服务" width="250"> </el-table-column>
   

      <el-table-column prop="order_price" label="服务金额（元）" width="150">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.order_status !== 9">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" v-if="scope.row.order_status === 3" @click="pay(scope.row)">支付</el-button>
          <el-button type="text" size="small" v-if="scope.row.order_status <= 3" @click="cancelOrder(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import Advantage from "@/components/Advantage";
import { Message } from "element-ui";
export default {
  components: {
    Advantage
  },
  data() {
    return {
      id: null,
      detail: null,
      activeName: "",
      index: 0
    };
  },
  computed: {
    ...mapState(["orderList", "user_info"]),
    ...mapGetters(["is_login", "filterOrderList", "typeOrderList"]),
    getOrderList: function() {
      return this.typeOrderList[this.index].orderList.map(item => {
        return {
          ...item,
          name: `${item.product && item.product.name} ${
            item.kind ? '- '+item.kind.kind_name : ""
          } ${item.kind_second ? '- '+ item.kind_second.kind_second_name : ""}`
        };
      });
    }
  },
  created() {
    console.log(this.typeOrderList[this.index].orderList);
    this.activeName = this.typeOrderList[this.index].name;
  },
  methods: {
    ...mapActions([
      "asyncCancelOrder",
      "asyncPayOrder",
      "asyncDeleteOrder",
      "initMyOrder",
      "asyncWeixinScan"
    ]),
    handleClick(tab, event) {
      this.index = Number(tab.index);
      this.initMyOrder();
    },
    async cancelOrder(item) {
      await this.asyncCancelOrder({
        order_no: item.order_no,
        order_status: 9
      });
      this.initMyOrder();
    },
    async pay(item) {
      let result = await this.asyncWeixinScan({
        order_no: item.order_no,
        pay_type: "wechat",
        method: "web"
      });
      const div = document.createElement("div");
      div.innerHTML = result;
      document.querySelector("body").appendChild(div);
      document.forms.alipaysubmit.setAttribute("target", "_blank");
      document.forms.alipaysubmit.submit();
    },
    handleDetail(item) {
      this.$router.push(`/user/orderDetail?order_id=${item.order_id}`);
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
