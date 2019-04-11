import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Fetch from "../../common/request";
import './index.less'

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderbuyID:"12"
      }
    }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    Fetch('/order/post/buy/',{
      Postdata:{
        kind: 1,
        location: "string",
        timeBuy: "string",
        numNeed: 4,
        heading: "string",
        content: "string",
        tel: "string",
        qq: "string",
        wechat: "string",
        picture: "string"
      }
    },"POST" ).then(data =>{
      this.setState({
        orderbuyID: data.orderbuyID
      })
    });
    }
    

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
