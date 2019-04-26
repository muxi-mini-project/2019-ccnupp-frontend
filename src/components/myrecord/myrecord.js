/* eslint-disable react/no-unescaped-entities */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image} from '@tarojs/components'
import pho from '../../img/myrecord.png'
import './myrecord.less'

export default class Myrecord extends Component {
  toPage() {
    Taro.navigateTo({
      url: '/pages/mine/home',
    })
}
  render () {
    return (
          <View className='page-section' onClick={()=>this.toPage()}>
            <Image className='pho' src={pho} />
            <Text className='address'>我的订单</Text>
            <Text className='arry'> > </Text>
          </View>
        )
    }
}