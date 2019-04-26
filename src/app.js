import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import  './img/uiindex.png'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/person/person',
      'pages/publish/publish',
      'pages/mine/home',
      'pages/add/detail',
      'pages/jinconnect/jinconnect',
      'pages/advice/advice',
      'pages/index/login/login',
      // 'pages/addcar/addcar'
      'pages/connectiontwo/connectiontwo',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./img/uiindex.png",
        selectedIconPath: "./img/uiindex-red.png"
      }, {
        pagePath: "pages/publish/publish",
        text: "发起",
        iconPath: "./img/uiplus.png",
        selectedIconPath: "./img/uiplus-red.png"
      },{
        pagePath: "pages/person/person",
        text: "我的",
        iconPath: "./img/uimine.png",
        selectedIconPath: "./img/uimine-red.png"
      }],
      color: '#333',
      selectedColor: 'red',
      backgroundColor: '#fff',
      borderStyle: 'white'
    }
  }

  componentDidMount () {
    Taro.login({
      success:function(res){
        console.log(res.code);
      if (res.code) {
        Taro.request({
          url:'https://pinpin.muxixyz.com/api/v1/auth/openid/',
          data:{code:res.code},
          method:'POST',
          success:function(res){
            var obj = {};
            obj.openid = res.data.openid;
            obj.token = res.data.token;
            console.log("openid:" + obj.openid);
            console.log("session_key:" + res.data.session_key);
            obj.expires_in = Date.now() + res.data.expires_in;
            Taro.setStorageSync('openid', obj.openid);
            if(!obj.token){
              Taro.navigateTo({
                url:'login/login',
              })
            }
            Taro.setStorageSync('token', obj.token);
          }
         })
      }
    }
  })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
