import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './comments.less'


export default class CommentUser extends Component {

  constructor(props){
    super(props)
    this.state = {
      }
    }


  render () { 
    var list=this.props.remark
    return (
      <View className='return'>
        <View className='remark_box'>
        <Image src={list.headPicture} className='headsculpture'></Image>
      <Text className='head-name'>
      {list.username}
      </Text>
      </View>
      <View className='remark'>
        {list.content}
      </View>
    </View>
    )
  }
}
