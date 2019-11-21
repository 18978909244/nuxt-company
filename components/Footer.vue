<template>
  <div class="footer">
    <div class="container">
      <div class="left">
        <div class="logo">
          <el-image :src="getName('site_logo')" @click="$router.push('/')"></el-image>
          <div class="link" @click="$router.push('/help')">帮助中心</div>
          <div class="link" @click="$router.push('/user/aboutus')">关于我们</div>
        </div>
        <div class="copyright">{{getName('site_copyright')}}</div>
      </div>
      <div class="right">
        <el-tooltip placement="top">
          <div class="qr-img">
            <el-icon class="iconfont icon-weixinxiaochengxu"></el-icon>
            <p>微信小程序</p>
          </div>
          <div slot="content" class="content">
            <el-image :src="getName('qr_mp')" fit="fit"></el-image>
            <p style="text-align:center;font-size:16px;">微信“扫一扫”</p>
          </div>
        </el-tooltip>
        <el-tooltip placement="top">
          <div class="qr-img">
            <el-icon class="iconfont icon-weixin"></el-icon>
            <p>微信公众号</p>
          </div>
          <div slot="content" class="content">
            <el-image :src="getName('qr_weixin')" fit="fit"></el-image>
            <p style="text-align:center;font-size:16px;">微信“扫一扫”</p>
          </div>
        </el-tooltip>
        <div class="contact">
          <div class="time">{{getName('work_time')}}</div>
          <div class="phone">{{getName('site_phone')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getName"])
  }
};
</script>

<style scoped lang="less">
.footer {
  position: relative;
  background-color: #333;
  font-size: 20px;
  padding: 20px 0;
  width: 100%;
  height: 200px;
  color: #fff;

  .container {
    width: 1080px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
      }
      .copyright {
        font-size: 16px;
      }
    }
    .right {
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .qr-img{
        display: flex;
        flex-direction: column;
        .iconfont{
          font-size:50px;
          text-align: center;
        }
        p{
          text-align:center;
          font-size: 16px;
        }
      }
      .contact{
        display: flex;
        flex-direction: column;
        text-align: right;
        .time{
          font-size: 16px;
          color:whitesmoke;
        }
        .phone{
          margin-top: 20px;
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
