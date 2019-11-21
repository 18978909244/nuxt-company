<template>
  <section class="body-container middle-container">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          status-icon
          class="demo-ruleForm"
        >
          <el-form-item
            ><h1>
              注册
            </h1></el-form-item
          >
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="ruleForm.mobile" type="text" autocomplete="off"
              ><el-button slot="append" @click="sendMsg('ruleForm')"
                >发送验证码</el-button
              ></el-input
            >
          </el-form-item>
          <el-form-item label="验证码" prop="sms_code">
            <el-input
              v-model="ruleForm.sms_code"
              width="5"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            ><el-button
              @click="submitForm('ruleForm')"
              type="primary"
              size="medium"
              style="width:100%"
              >注册</el-button
            ></el-form-item
          >
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import _ from "lodash";
import { Message } from "element-ui";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getName", "is_login"])
  },
  data() {
    return {
      redirect: null,
      ruleForm: {
        password: "",
        mobile: "",
        sms_code: ""
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        sms_code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.redirect = this.$route.query.redirect;
    if (this.is_login) {
      this.$router.push(this.redirect || "/");
    }
  },
  methods: {
    ...mapActions(["asyncRegister", "asyncSendMessage"]),
    async sendMsg(formName) {
      if (!this.ruleForm.mobile) return Message.error("请输入手机号");
      try {
        await this.asyncSendMessage(_.pick(this.ruleForm, ["mobile"]));
        Message.success("验证码发送成功，请查收");
      } catch (e) {}
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.asyncRegister(this.ruleForm);
          if (this.redirect) {
            this.$router.push(this.redirect);
          } else {
            this.$router.push("/");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
h1 {
  text-align: center;
}
</style>
