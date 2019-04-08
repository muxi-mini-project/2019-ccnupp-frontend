import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import './header-tab.less'


export default class headerTab extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props){
    super(props)
    this.state = { 
      //导航索引
      currentTab: 0,
      }
    }

    //点击首页导航
    switchNav (e){
      var cur = e.target.dataset.index;
      if(this.state.currentTab == cur){return false;}
      else{
        this.setState({
          currentTab:cur
        })
      }
    }

  render () {
    return (
      <View className='swiper-tab'>
        {this.props.navList.map((nev,index) => (
          <View className={this.state.currentTab===index?'active':'normal'} data-index={index}  onClick={this.switchNav.bind(this)}>{nev}</View>
        ))}
    </View>
    )
  }
}


