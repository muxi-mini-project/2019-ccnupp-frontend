import Taro, { Component } from '@tarojs/taro'
import { View,Swiper,SwiperItem,ScrollView } from '@tarojs/components'
import './home.less'
import Fetch from "../../common/request";
import SmallTab  from '../../componments/smallTab/small-tab'
import headerTab from '../../componments/headerTab/header-tab'
import NopicTab from '../../componments/noPicTab/nopic-tab'
import CarTab from '../../componments/carTab/car-tab'

export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 1,
      userID: 2,
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
      url: `../add/detail?id=${id}`
  })
}
switchNav (e){
  var cur = e.target.dataset.index;
  if(this.state.currentTab == cur){return false;}
  else{
    this.setState({
      currentTab:cur
    })
  }
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
  getIndex(index){
    if(index === 1){
      Fetch(`/order/post/list/?userID=${this.state.userID}&page=${this.state.pageNum}`).then(data => {
        this.setState({
          orderList: data.orderList
        })
        console.log(data.orderList);
      })
    }else if(index === 2){
    Fetch(`/order/pick/list/?userID=${this.state.userID}&page=${this.state.pageNum}`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }else{
    Fetch(`/order/comment/list/?userID=${this.state.userID}&page=${this.state.pageNum}`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }
  }

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
        <headerTab navList={[{key:1,content:'发起'},{key:2,content:'参与'},{key:3,content:'我的'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {this.state.orderList.map((obj,index) => (
            <NopicTab key='2' orderList={this.state.orderList[index]} />
        ))}
        </View>
        </View>
      </View>
    )
  }
}



