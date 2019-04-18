import Taro, { Component } from '@tarojs/taro'
import { View,Swiper,SwiperItem,ScrollView } from '@tarojs/components'
import './home.less'
import Fetch from "../../common/request";
import SmallTab  from '../../componments/smallTab/small-tab'
import headerTab from '../../componments/headerTab/header-tab'
import { get } from 'http';
import { red } from '_ansi-colors@3.2.4@ansi-colors';

export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 0,
      pageMax: 0,
      hasNext:true,
      ordersnum:0,
      kind: 2,
      index: 1
      }
    }
  config = {
    navigationBarTitleText: '华师拼单',
    "enablePullDownRefresh": true, 
    onReachBottomDistance:50
  }
  changPage(e){
    var id = e.currentTarget.dataset.id
    Taro.navigateTo({
      url: `../add/detail?id=${id}`
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
  // switchNav (index){
  //   if(this.state.currentTab ===index){return false;}
  //   else{
  //     this.setState({
  //       currentTab:index
  //     })
  //   }
  // }
  getOrderCarList(){
    Fetch(`/order/car/list/?page=${this.state.pageNum}`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }
  getOrderBuyList(index){
    Fetch(`/order/buy/list/?kind=${index}&page=${this.state.pageNum}`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }

  getIndex(index){
    this.setState({
      index:index
    })
    if(index===2){
      this.getOrderCarList();
    }else if(index != 1){
      index = index - 1;
      this.getOrderBuyList(index);
  }else{
    this.getOrderBuyList(1);
  }
  }
  onPullDownRefresh(){
    console.log('刷新');
    this.getIndex(this.state.index);
    Taro.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    
  }

  componentWillMount() {
    Fetch(`/order/buy/list/?kind=1`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }

  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <headerTab navList={[{key:1,content:'网购'},{key:2,content:'拼车'},{key:3,content:'会员账号'},{key:4,content:'其他'},{key:5,content:'外卖'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {this.state.orderList.map((_obj,index) => (
            <SmallTab key='2' orderList={this.state.orderList[index]} />
        ))}
        </View>
        </View>
      </View>
    )
  }
}

