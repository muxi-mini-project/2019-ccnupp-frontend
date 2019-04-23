import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import './index.less'
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


  getOrderCarList(page){
    Fetch(`/order/car/list/?page=${page}`).then(data => {
      this.setState({
        orderList:data.orderList,
        pageMax:data.pageMax,
        hasNext:data.hasNext,
        ordersnum:data.ordersnum,
        pageNum:data.pageNum
      })
      console.log(data);
    })
  }
  getOrderBuyList(index,page){
    Fetch(`/order/buy/list/?kind=${index}&page=${page}`).then(data => {
      console.log(data);
      this.setState({
        orderList:data.orderList,
        pageMax:data.pageMax,
        hasNext:data.hasNext,
        ordersnum:data.ordersnum,
        pageNum:data.pageNum
      })
    })
  }

  getIndex(index){
    this.setState({
      index:index
    })
    if(index===2){
      this.getOrderCarList(1);
    }else if(index !== 1){
      index = index - 1;
      this.getOrderBuyList(index,1);
  }else{
    this.getOrderBuyList(1,1);
  }
  }
  //刷新
  onPullDownRefresh(){
    Taro.showNavigationBarLoading();
    this.getIndex(this.state.index);
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
}
  //下拉加载更多
  onReachBottom(){
    var hasNext=this.state.hasNext;
    if(hasNext){
      var list = this.state.orderList;
      var num = this.state.pageNum;
      num = num + 1;
      if(this.state.index !==2 ){
      Fetch(`/order/buy/list/?kind=${this.state.index}&page=${num}`).then(data => {
        var datalist = data.orderList;
        this.setState({
          hasNext:data.hasNext,
          pageNum:data.pageNum
        })
        return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
    }else{
      Fetch(`/order/car/list/?page=${num}`).then(data => {
        var datalist = data.orderList;
        this.setState({
          hasNext:data.hasNext,
          pageNum:data.pageNum
        })
        return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
    }
    }
  }

  componentWillMount() {
    Fetch(`/order/buy/list/?kind=1&page=1`).then(data => {
      this.setState({
        orderList: data.orderList
      })
    })
  }

  componentDidMount () {

   }
  
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const dxs = this.state.index;
    return (
      <View>
        <headerTab navList={[{key:1,content:'网购'},{key:2,content:'拼车'},{key:3,content:'会员账号'},{key:4,content:'其他'},{key:5,content:'外卖'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {dxs === 2?
          this.state.orderList.map((obj,index) => (
            <CarTab key='2' orderList={this.state.orderList[index]} />
        ))
        :
        this.state.orderList.map((obj,index) => (
          obj.picture?
            <SmallTab key='2' orderList={this.state.orderList[index]} />
            :
            <NopicTab key='2' orderList={this.state.orderList[index]} />
        ))
        }
        </View>
      </View>
    </View>
    )
  }
}

