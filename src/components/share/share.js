import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image ,Button} from '@tarojs/components'
import pho from '../../img/share.png'
import './share.less'

export default class Share extends Component {


  render () {
    return (
          <View className='page-section'>
            <Image className='pho' src={pho}></Image>
            <Button className='s_bnt' openType='share'>
            <Text className='txt'>分享小程序</Text>
            <Text className='arry'>></Text>
            </Button>
          </View>
        )
    }
}