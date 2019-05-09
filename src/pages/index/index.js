import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'
import Fetch from "../../common/request";
import SmallTab  from '../../components/smallTab-index/small-tab'
import headerTab from '../../components/headerTab/header-tab'
import NopicTab from '../../components/noPicTab-index/nopic-tab'
import CarTab from '../../components/carTab/car-tab'


export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 1,
      hasNext:true,
      index: 1
      }
    }
  config = {
    navigationBarTitleText: '华师拼单',
    "enablePullDownRefresh": true, 
    onReachBottomDistance:50
  }


  getOrderCarList(page){
    Fetch(`order/car/list/?page=${page}`).then(data => {
      this.setState({
        orderList:data.data.orderList,
        hasNext:data.data.hasNext,
        pageNum:data.data.pageNum
      })
      console.log(data);
    })
  }
  getOrderBuyList(index,page){
    Fetch(`order/buy/list/?kind=${index}&page=${page}`).then(data => {
      console.log(data);
      this.setState({
        orderList:data.data.orderList,
        hasNext:data.data.hasNext,
        pageNum:data.data.pageNum
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
      Fetch(`order/buy/list/?kind=${this.state.index}&page=${num}`).then(data => {
        var datalist = data.data.orderList;
        this.setState({
          hasNext:data.data.hasNext,
          pageNum:data.data.pageNum
        })
        return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
    }else{
      Fetch(`order/car/list/?page=${num}`).then(data => {
        var datalist = data.data.orderList;
        this.setState({
          hasNext:data.data.hasNext,
          pageNum:data.data.pageNum
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
    Fetch(
      'user/info/',
      {
        username:Taro.getStorageSync('nickName'),
        headPicture:Taro.getStorageSync('ava_p'),
      },
      "POST"
    )
    Fetch(`order/buy/list/?kind=1&page=1`).then(data => {
      this.setState({
        orderList: data.data.orderList
      })
    })
  }
  render () {
    const {index,orderList} = this.state;
    return (
      <View>
        <headerTab navList={[{key:1,content:'网购'},{key:2,content:'拼车'},{key:3,content:'外卖'},{key:4,content:'会员账号'},{key:5,content:'其他'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {index === 2?
          orderList.map((obj) => (
            <CarTab key='2' orderList={obj} />
        ))
        :
        orderList.map((obj) => (
          obj.picture?
            <SmallTab key='2' orderList={obj} />
            :
            <NopicTab key='2' orderList={obj} />
        ))
        }
        </View>
      </View>
    </View>
    )
  }
}

