import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button,Image } from '@tarojs/components'
import './small-tab.less'

export default class SmallTab extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  changPage(e){
    var id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: '../add/detail?id=' + `${id}`
  })
}
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View scroll-y='true' className='box' onClick={this.changPage.bind(this)} data-id={1}>
      <View className='header'>
      <Image className='headSculpture'
        src={this.props.orderList.location}
      ></Image>
      <View className='numberOfpinpin'>已拼2/4</View>
      </View>
      <Image className='description-picture'
        src={this.props.orderList.location}
      ></Image>
        <View className='description'>
        <View className='title'>{this.props.orderList.heading}</View>
        <View className='time'>下单时间：{this.props.orderList.timeBuy}</View>
        <View className='place'>地点：{this.props.orderList.location}</View>
        </View>
        <View className='button-box'>
        <Button className='btn'>
        <Text>编辑</Text>
        </Button>
        <Button className='btn'>
        <Text>再拼一单</Text>
        </Button>
        </View>
      </View>
    )
  }
}
