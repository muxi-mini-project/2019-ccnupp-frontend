import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button,Image } from '@tarojs/components'
import './nopic-tab.less'

export default class NopicTab extends Component {

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

<View className='numberOfpinpin' onClick={this.changPage.bind(this)} data-id={1} >已拼{list.numExist}/{list.numNeed} 
      <View className='sign'> > </View>
      </View>
      </View>
        <View className='description'>
        <View className='title'>{list.heading}</View>
        <View className='cont'>{list.content}</View>
        <View className='time'>下单时间：{list.timeBuy}</View>
        <View className='place'>地点：{list.location}</View>
        </View>
        <View className='button-box'>
        <View className='btn red'>
        <Text>编辑</Text>
        </View>
        <View className='btn black'>
        <Text>再拼一单</Text>
        </View>
        </View>
      </View>
    )
  }
}
