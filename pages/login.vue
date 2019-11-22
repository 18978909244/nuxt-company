<template>
  <section class="body-container middle-container">
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon class="demo-ruleForm">
          <el-form-item>
            <h1>
              登录
            </h1>
          </el-form-item>
          <el-form-item label="账号" prop="member_account">
            <el-input v-model="ruleForm.member_account" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" type="primary" size="medium" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getName", "is_login"])
  },
  data() {
    return {
      redirect: null,
      ruleForm: {
        member_account: "",
        password: ""
      },
      rules: {
        member_account: [
          {
            required: true,
            message: "手机号不能为空",
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
  watch:{
    is_login:function(newValue,oldValue){
      if(newValue===true){ 
        this.$router.push(this.redirect || "/");
      }
    }
  },
  methods: {
    ...mapActions(["asyncLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.asyncLogin(this.ruleForm);
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
