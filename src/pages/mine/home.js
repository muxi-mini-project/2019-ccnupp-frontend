import Taro, { Component } from '@tarojs/taro'
import { View,Swiper,SwiperItem,ScrollView } from '@tarojs/components'
import './home.less'
import Fetch from "../../common/request";
import SmallTab  from '../../components/smallTab/small-tab'
import headerTab from '../../components/headerTab/header-tab'
import NopicTab from '../../components/noPicTab/nopic-tab'
import CarTab from '../../components/carTab/car-tab'

export default class mypage extends Component{
    constructor(props){
    super(props)
    this.state = {
      orderList: [ ],
      pageNum: 1,
      userID: 2,
      index: 0,
      pageMax: 0,
      hasNext:true,
      ordersnum:0,
      }
    }
  config = {
    navigationBarTitleText: '我的拼单',
    "enablePullDownRefresh": true, 
    onReachBottomDistance:50
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
  getOrderPostList(page){
    Fetch(`/order/post/list/?userID=${this.state.userID}&page=${page}`).then(data => {
      this.setState({
        orderList:data.orderList,
        hasNext:data.hasNext,
        pageNum:data.pageNum
      })
    })
  }
  getOrderPickList(page){
    Fetch(`/order/pick/list/?userID=${this.state.userID}&page=${page}`).then(data => {
      this.setState({
        orderList:data.orderList,
        hasNext:data.hasNext,
        pageNum:data.pageNum
      })
    })
  }
  getOrderCommentList(page){
    Fetch(`/order/comment/list/?userID=${this.state.userID}&page=${page}`).then(data => {
      this.setState({
        orderList:data.orderList,
        hasNext:data.hasNext,
        pageNum:data.pageNum
      })
    })
  }

  getIndex(index){
    this.setState({
      index:index
    })
    if(index === 1){
      this.getOrderPostList(1);
    }else if(index === 2){
      this.getOrderPickList(1);
  }else{
      this.getOrderCommentList(1);
  }
  }
    //刷新
    onPullDownRefresh(){
      Taro.showNavigationBarLoading();
      this.getIndex(this.state.index);
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
  }
    //上拉加载更多
    onReachBottom(){
      var hasNext=this.state.hasNext;
      if(hasNext){
        var list = this.state.orderList;
        var num = this.state.pageNum;
        num = num + 1;
        if(this.state.index === 1 ){
          Fetch(`/order/post/list/?userID=${this.state.userID}&page=${num}`).then(data => {
            var datalist = data.orderList;
            this.setState({
              hasNext:data.hasNext,
              pageNum:data.pageNum
            });
            return datalist;
        }).then(datalist =>{
          list = list.concat(datalist);
          this.setState({
            orderList:list
          })
        })
      }else if(this.state.index === 2){
        Fetch(`/order/pick/list/?userID=${this.state.userID}&page=${num}`).then(data => {
          var datalist = data.orderList;
          this.setState({
            hasNext:data.hasNext,
            pageNum:data.pageNum
          });
          return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
      }else{
        Fetch(`/order/comment/list/?userID=${this.state.userID}&page=${num}`).then(data => {
          var datalist = data.orderList;
          this.setState({
            hasNext:data.hasNext,
            pageNum:data.pageNum
          });
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



