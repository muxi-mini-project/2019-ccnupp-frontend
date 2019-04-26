import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import pho from '../../img/phone.png'
import './connection.less'

export default class Connection extends Component {
  toPage() {
    Taro.navigateTo({
      url: '/pages/jinconnect/jinconnect',
    })
}
  render () {
    return (
          <View className='page-section'onClick={()=>this.toPage()}>
            <Image className='pho' src={pho} />
            <Text className='address'>联系方式</Text>
            <Text className='arry' >></Text>
          </View>
        )
    }
}