import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import  './images/uiindex.png'
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
      'pages/mine/home',
      'pages/add/detail'
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
        iconPath: "./images/uiindex.png",
        selectedIconPath: "./images/uiindex-red.png"
      }, {
        pagePath: "pages/mine/home",
        text: "发起",
        iconPath: "./images/uiplus.png",
        selectedIconPath: "./images/uiplus-red.png"
      },{
        pagePath: "pages/mine/home",
        text: "我的",
        iconPath: "./images/uimine.png",
        selectedIconPath: "./images/uimine-red.png"
      }],
      color: '#333',
      selectedColor: 'red',
      backgroundColor: '#fff',
      borderStyle: 'white'
    }
  }

  componentDidMount () {}

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
