/* eslint-disable react/no-unescaped-entities */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import pho from '../../img/advice.png'
import './toadvice.less'

export default class Toadvice extends Component {
  toPage() {
    Taro.navigateTo({
      url: '/pages/advice/advice',
    })
}
  render () {
    return (
          <View className='page-section' onClick={()=>this.toPage()}>
            <Image className='pho' src={pho} />
            <Text className='address'>意见反馈</Text>
            <Text className='arry'> > </Text>
          </View>
        )
    }
}