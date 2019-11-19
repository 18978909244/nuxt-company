<template>
  <div v-if="detail">
    <el-steps :active="1" simple>
      <el-step title="提交工单" icon="el-icon-edit"></el-step>
      <el-step title="客户经理对接" icon="el-icon-upload"></el-step>
      <el-step title="确认付款" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-divider></el-divider>

    <Title :title="`${detail.name} - ${detail.remark}`" :line="false"></Title>
    <el-divider></el-divider>

    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-form label-width="200px">
          <el-form-item
            :label="item.input_name"
            v-for="(item, index) in input_list"
            :key="index"
          >
            <el-input
            v-if="item.control.control_code === 'input'"
              v-model="input_message[item.value_field]"
              :placeholder="item.remark"
            ></el-input>
            <el-input
            v-if="item.control.control_code === 'textarea'"
                type="textarea"
                v-model="input_message[item.value_field]"
                :placeholder="item.remark"
              ></el-input>
              <el-upload
              v-if="item.control.control_code === 'file'"
              class="upload-demo"
              action="/api/api/upload/uploadFile"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                {{item.remark}}
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button @click="submit">提交订单</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import Advantage from "@/components/Advantage";
import Title from "@/components/Title";
import { Message } from "element-ui";
export default {
  components: {
    Advantage,
    Title
  },
  data() {
    return {
      id: null,
      input_message: {},
      input_list: [],
      detail: null
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
    // this.product_id = Number(this.$route.query.product_id);
    // this.initData(this.product_id);
    this.initData(this.$route.query);
  },
  methods: {
    ...mapActions(["asyncFetchGood", "asyncGetOrderInput", "asyncAddOrder"]),
    async initData(option) {
      Object.keys(option).forEach(item => {
        this[item] = option[item];
      });
      if (!option.product_id) return;
      this.detail = await this.asyncFetchGood({
        product_id: Number(option.product_id)
      });

      const { order_input } = await this.asyncGetOrderInput(option);

      this.input_list = order_input;
      this.input_list.forEach(item => {
        if (item.value_field === "client") {
          this.$set(
            this.input_message,
            "client",
            this.user_info ? this.user_info.member_name : ""
          );
        } else if (item.value_field === "phone") {
          this.$set(
            this.input_message,
            "phone",
            this.user_info ? this.user_info.member_account : ""
          );
        } else {
          this.$set(this.input_message, item.value_field, "");
        }
      });
    },

    inputChange(e) {
      const key = e.currentTarget.dataset.name;
      const value = e.detail.value;
      this.input_message[key] = value;
    },
    async submit() {
      let isSomeMissInput = this.input_list.find(item => {
        return item.must_input === 1 && !this.input_message[item.value_field];
      });
      console.log("isSomeMissInput", isSomeMissInput);
      if (isSomeMissInput) {
        Message.error(`请输入${isSomeMissInput.input_name}`);
        return;
      }
      // console.log(this.orderGood)
      const postData = {
        product_id: Number(this.product_id),
        kind_id: this.kind_id,
        second_id: this.second_id,
        ...this.input_message
      };
      let order_id = await this.asyncAddOrder(postData);
      this.$router.push(`/orderDetail?order_id=${order_id}`);
    }
  }
};
</script>

<style lang="less" scoped>
.submit{
  width: 100%;
  text-align: center;
}
</style>
