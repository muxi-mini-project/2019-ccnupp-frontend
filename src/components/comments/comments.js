import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './comments.less'


export default class CommentUser extends Component {

  constructor(props){
    super(props)
    }

  render () {
    const {remark}=this.props
    return (
      <View className='return'>
        <View className='remark_box'>
        <Image src={remark.headPicture} className='headsculpture'></Image>
      <Text className='head-name'>
      {remark.username}
      </Text>
      </View>
      <View className='remark'>
        {remark.content}
      </View>
    </View>
    )
  }
}
