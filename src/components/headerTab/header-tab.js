/* eslint-disable taro/duplicate-name-of-state-and-props */
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
      currentTab:1
      }
    }

    switchNav (value,e){
      var cur = e.target.dataset.current;
      if(this.state.currentTab === cur){return false;}
      else{
        this.setState({
          currentTab:cur
        })
      }
      this.props.onGetIndex(value);
    }

  render () {
    return (
      <View className='swiper-tab'>
        {this.props.navList.map((nav) =>
          <View className={this.state.currentTab===nav.key?'active':'normal'} data-current={nav.key} onClick={this.switchNav.bind(this,nav.key)} key='0'>{nav.content}</View>
        )}
    </View>
    )
  }
}


