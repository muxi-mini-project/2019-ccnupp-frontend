import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button,Image } from '@tarojs/components'
import './car-tab.less'
import '../../images/time.png'
import '../../images/end.png'
import '../../images/start.png'

export default class CarTab extends Component {

  constructor(props){
    super(props)
    this.state = {
      }
    }
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
    var list=this.props.orderList
    return (
      <View scroll-y='true' className='box'>
      <View className='header'>
      {list.userPicture.map((value) => (
      <Image className='headSculpture'
        src={value}
      ></Image>
        ))}

      <View className='numberOfpinpin'>已拼{list.numExist}/{list.numNeed} </View>
      </View>
        <View className='description'>
        <View className='list'>
        <Image className='img' src='../../images/start.png'></Image>
        <View className='word'>{list.placeA}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../images/end.png'></Image>
        <View className='word'>{list.placeB}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../images/time.png'></Image>
        <View className='word'>{list.timeGo}</View>
        </View>
        </View>
        <View className='bottom'>
        <View className='remark'>备注：{list.heading}</View>
        <View className='btn'>
        <Text>确认拼单</Text>
        </View>
      </View>
    </View>
    )
  }
}
