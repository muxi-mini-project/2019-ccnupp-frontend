import Taro, { Component } from "@tarojs/taro";
import { View,  Input, Button ,Image,Text} from "@tarojs/components";


import logo from "../../../img/logo.png";
import shouquan from "../../../img/shouquan.png";
import "./login.less";

export default class Index extends Component {
    state = {
      username: '',
      password: '',
      mask_name: 'unmask',
      // content_name: 'cover',
      mask_bg: 'mask_bg_show',
    };

    config = {
      navigationBarTitleText: "登录"
    };
    toLogin() {
        if (!this.state.username) {
          Taro.showToast({
            title: "请输入学号",
            icon: "none"
          });
          return;
        }
        if (!this.state.password) {
          Taro.showToast({
            title: "请输入密码",
            icon: "none"
          });
          return;
        }
        Taro.request({
          url:'https://pinpin.muxixyz.com/api/v1/auth/login/',
          data:{
            stNum: this.state.username,
            password: this.state.password
          },
          header:{
            openid:Taro.getStorageSync('openid')
          },
          method:"POST",
          success:function(res){
            var obj = {};
            obj.token = res.data.token;
            console.log("token:" + obj.token);
            obj.expires_in = Date.now() + res.data.expires_in;
            Taro.setStorageSync('token', obj.token);
            if(obj.token){
              Taro.showToast({
                title: "登录成功",
                icon: "success",
                duration: 1000
              });
              Taro.navigateBack({
                url:"/pages/index/index"
              })
            }
            else{
              Taro.showToast({
                title: "密码错误",
                icon: "none",
                duration: 1000
              });
            }
            return obj;
          }
         })
        //  Taro.uploadFile({
        //   url:'https://pinpin.muxixyz.com/api/v1/order/image/',
        //   name:'image',
        //   filePath:,
        //   formData:{
        //     image:tempFilePaths
        //   },
        //   header:{
        //     token:Taro.getStorageSync('token')
        //   },
        //   success:function(res){
        //     console.log(res)
        //     Taro.setStorageSync('image',res.data.image_url)
        //   }
        // })
        //  Fetch(
        //    'user/info',
        //    {
        //      username:this.state.nickName,
        //      headPicture:this.state.ava_p,
        //    },
        //    "PUT"
        //  )
      }
        handleSave(){
          this.setState({
            mask_name: 'mask',
            // content_name: 'uncover',
            mask_bg: 'mask_bg_none',
          })
        // Fetch(
        //   'auth/login/',
        //   {
        //     stNum: this.state.username,
        //     password: this.state.password
        //   },
        //   "POST",
        // )
        //.then(data => {
        //   if (data === 20105) {
        //     Taro.showToast({
        //       title: "密码错误",
        //       icon: "none",
        //       duration: 1000
        //     });
        //   } else {
        //     //登录成功
        //     Taro.showToast({
        //       title: "登录成功",
        //       icon: "success",
        //       duration: 1000
        //     });
        //     Taro.setStorageSync('token', data.token);
        //     Taro.navigateTo({
        //       url: "/pages/index/index"
        //     });
        //   }
        // });
      }
      changeusername(e) {
        this.setState({
          username: e.detail.value
        });
      }
    
      changepassword(e) {
        this.setState({
          password: e.detail.value
        });
      }
      onGotUserInfo(e){
        // this.setState({
        //   nickName: e.detail.userInfo.nickName,
        //   ava_p:e.detail.userInfo.avatarUrl,
        // })
        Taro.setStorageSync('nickName',e.detail.userInfo.nickName),
        Taro.setStorageSync('ava_p',e.detail.userInfo.avatarUrl)
      }
      render() {
        const {  username, password } = this.state;
        return(
            <View className='login'>
            <View className='logo_container'>
              <Image className='logo' src={logo} />
            </View>
            <View className='form_container'>
              <View className='login_item login_name'>
              <Text>学号</Text>
                <Input
                  placeholderClass='placeholder'
                  type='number'
                  placeholder='请输入学号'
                  value={username}
                  onInput={this.changeusername}
                  onChange={this.changeusername}
                />
              </View>
              <View className='login_item login_code'>
              <Text>密码</Text>
                <Input
                  placeholderClass='placeholder'
                  type='text'
                  password
                  placeholder='请输入密码'
                  value={password}
                  onInput={this.changepassword}
                  onChange={this.changepassword}
                />
              </View>
            </View>
            <View className='btn_container'>
              <Button className='login_btn' onClick={this.toLogin} >
                登录
              </Button>
            </View>
            <View className={this.state.mask_bg}></View>
            <View className={this.state.mask_name}>
              <Image className='shouquan' src={shouquan}></Image>
              <Button
                open-type='getUserInfo' 
                lang='zh_CN' 
                onGetUserInfo={this.onGotUserInfo.bind(this)}
                onClick={this.handleSave.bind(this)}
              >
              点我授权
              </Button>
            </View>
          </View>
        )
    }
}