<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-userbox">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullScreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="@assets/images/user_avator.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userName}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { SET_COLLAPSE } from '@store/contants';
    import { getStorage, removeStorage } from '@utils/index';
    export default {
        data() {
            return {
                fullScreen: false,
                defaultUserName: 'admin'
            }
        },
        computed:{
            ...mapState(['collapse']),
            userName(){
                return getStorage('users') || this.defaultUserName;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command === 'loginOut'){ // 退出登录
                  removeStorage('users');
                  this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.$store.commit(SET_COLLAPSE, !this.collapse)
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullScreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullScreen = !this.fullScreen;
            }
        },
        mounted(){
            // 当屏幕小于1500，折叠左侧栏
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  height: 70px;
  font-size: 22px;
  color: #fff;
  .logo{
    float: left;
    line-height: 70px;
  }
  .collapse-btn{
    cursor: pointer;
    float: left;
    padding: 0 21px;
    line-height: 70px;
  }
  .header-right{
    float: right;
    padding-right: 50px;
  }
  .header-userbox{
    padding-top: 14px;
    height: 70px;
    box-sizing: border-box;
  }
  .btn-fullscreen{
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    margin:5px 5px 0 0; 
    width: 30px;
    height: 30px;
    border-radius: 15px;
    transform: rotate(45deg);
    font-size: 24px;
    text-align: center;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    img{
      display: block;
      width:40px;
      height:40px;
      border-radius: 50%;
    }
  }
  .el-dropdown-link{
    cursor: pointer;
    color: #fff;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
}
</style>
