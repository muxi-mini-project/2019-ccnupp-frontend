import Taro, { Component } from '@tarojs/taro'
import { View,Swiper,SwiperItem,ScrollView } from '@tarojs/components'
import './home.less'
import Fetch from "../../common/request";
import SmallTab  from '../../componments/smallTab/small-tab'
import headerTab from '../../componments/headerTab/header-tab'

export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 0,
      pageMax: 0,
      hasNext:true,
      ordersnum:0,
      }
    }
  config = {
    navigationBarTitleText: '我的拼单'
  }
  changPage(e){
    var id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: '../add/detail?id=' + `${id}`
  })
}

  // getpindanList (ordercarID, page) {
  //   Fetch(`/order/car/`+ `${ordercarID}/`+`${page}`).then(data => {
  //     this.setState({
  //       orderList:data.orderList,
  //       pageMax:data.pageMax,
  //       hasNext:data.hasNext,
  //       ordersnum:data.ordersnum,
  //       pageNum:data.pageNum
  //     })
  //   });
  // }

  componentWillMount() {
    Fetch("/order/buy/list/?kind=1").then(data => {
      this.setState({
        orderList: data.orderList
      })
      console.log(data.orderList);
    })
  }

  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <headerTab navList={['发起','参与','讨论']} />  
        <View className='height'>
        <View className='tab-content'>
        {this.state.orderList.map((obj,index) => (
            <SmallTab key='2' orderList={this.state.orderList[index]} />
        ))}
        </View>
        </View>
      </View>
    )
  }
}



