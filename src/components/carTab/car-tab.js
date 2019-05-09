import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './car-tab.less'
import '../../img/time.png'
import '../../img/end.png'
import '../../img/start.png'
import '../../img/full.png'
import Fetch1 from '../../common/request_1';

export default class CarTab extends Component {

  constructor(props){
    super(props)
    this.state = {
      full:false
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
  toPostOrder(e){
    var id = e.currentTarget.dataset.id;
    Fetch1(
      `order/car/?orderID=${id}`,
      {
        userID:Taro.getStorageSync('openid')
      },
      "POST"
    ).then(data =>{
      var tel1 = data.way.tel;
      var qq1 = data.way.qq;
      var wechat1 = data.way.wecaht;
      console.log(tel1,qq1,wechat1);
      Taro.showModal({
        title: "参与成功",
        content:`联系方式：\r\n
        qq：${qq1}\r\n
        电话：${tel1}\r\n
        微信：${wechat1}`
      })
    })
  }
  componentWillMount () {
    const {orderList}=this.props
    if(orderList.numExist == orderList.numNeed){
      this.setState({
        full:true
      })
    }
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {orderList}=this.props
    const {full} = this.state
    return (
      <View scroll-y='true' className='box'>
      <View className='header'>
      {orderList.userPicture.map((value) => (
      <Image className='headSculpture'
        src={value} key='2'
      ></Image>
        ))}

      <View className='numberOfpinpin'>已拼{orderList.numExist}/{orderList.numNeed} </View>
      </View>
        <View className='description'>
        <Image className={full?'pic':'none'} src='../../img/full.png'></Image>
        <View className='list'>
        <Image className='img' src='../../img/start.png'></Image>
        <View className='word'>{orderList.placeA}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../img/end.png'></Image>
        <View className='word'>{orderList.placeB}</View>
        </View>
        <View className='list'>
        <Image className='img' src='../../img/time.png'></Image>
        <View className='word'>{orderList.timeGo}</View>
        </View>
        </View>
        <View className='bottom'>
        <View className='remark'>备注：{orderList.heading}</View>
        <View className='btn' data-id={orderList.ordercarID} onClick={this.toPostOrder.bind(this)}>
        <Text>确认拼车</Text>
        </View>
      </View>
    </View>
    )
  }
}
