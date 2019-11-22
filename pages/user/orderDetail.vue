<template>
  <section>
    <section v-loading="loading"></section>
    <div class="gd_form" v-if="item">
      <div class="gd_tit">
        <span class="icon_tit"></span>服务工单</div>
      <div>
        <div class="item">
          <span class="text">订单号</span>
          <span class="c_6">{{ item.order_no }}</span>
        </div>
        <div class="item">
          <span class="text">产品名称</span>
          <span class="c_6">{{ item.product && item.product.name }}
          </span>
        </div>
        <div class="item" v-if="item.kind">
          <span class="text">服务名称</span>
          <span class="c_6">{{ item.kind && item.kind.kind_name }}</span>
        </div>
        <div class="item" v-if="item.kind">
          <span class="text">选择类型</span>
          <span class="c_6">{{ item.kind_second && item.kind_second.kind_second_name }}</span>
        </div>
        <div v-if="input.value" class="item" v-for="(input, key) in input_message" :key="key">
          <span class="text">{{ input.key }} </span>
          <span class="c_6" v-if="input.type !== 'file'">
            {{ input.value }}
          </span>
          <span class="c_6" v-else>
            <el-link type="primary" :href="input.value" target="_blank">附件</el-link>
          </span>
        </div>

        <div class="item" v-if="[3, 4, 5].includes(item.order_status)">
          <span class="text">服务金额</span>
          <span class="c_6">{{ item.order_price }} 元</span>
        </div>
        <div class="operate">
          <el-tag style="margin-right:20px;">工单状态:{{ order_status_text }}</el-tag>
          <el-button @click="pay(item)" v-if="item.order_status === 3">支付</el-button>
          <el-button @click="cancelOrder(item)" v-if="item.order_status < 3">取消</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import { Message } from "element-ui";
export default {
  data() {
    return {
      item: null,
      input_message: [],
      loading:false
    };
  },
  computed: {
    ...mapState(["user_info", "orderTypes"]),
    ...mapGetters(["is_login"]),
    order_status_text: function() {
      return this.orderTypes.find(item => item.id === this.item.order_status)
        .name;
    }
  },
  async created() {
    console.log(Number(this.$route.query.order_id));
    this.loading = true
    this.item = await this.asyncFetchOrder(Number(this.$route.query.order_id));
    this.loading = false
    if (this.item) {
      this.initData({
        product_id: this.item.product_id,
        kind_id: this.item.kind_id,
        second_id: this.item.second_id
      });
    }
  },
  methods: {
    ...mapActions([
      "asyncFetchOrder",
      "asyncGetOrderInput",
      "asyncFetchGood",
      "asyncAddOrder",
      "asyncCancelOrder",
      "asyncWeixinScan"
    ]),
    async initData(option) {
      const { order_input } = await this.asyncGetOrderInput(option);
      this.input_message = order_input.map(input => {
        return {
          key: input.input_name,
          value: this.item[input.value_field],
          type: input.control.control_code
        };
      });
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
    async cancelOrder(item) {
      await this.asyncCancelOrder({
        order_no: item.order_no,
        order_status: 9
      });
      this.$router.push("/user/orderList");
    }
  }
};
</script>

<style lang="less" scoped>
.gd_form {
  padding: 10px 30px;
  background-color: #fff;
  box-shadow: 0 2px 1px 2px #eaebf1;
  .gd_tit {
    font-size: 22px;
    color: #666;
    line-height: 60px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ececec;
  }
  .item {
    background-color: #f7f9fe;
    font-size: 16px;
    color: #444;
    min-height: 48px;
    word-break: break-all;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    line-height: 48px;
    &:nth-child(2n) {
      background-color: #fff;
    }
    .text {
      text-align: right;
      flex: 1;
    }
    .c_6 {
      padding-left: 10px;
      flex: 2;
      text-align: left;
      vertical-align: middle;
      word-wrap: break-word;
    }
  }
}
.operate {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
