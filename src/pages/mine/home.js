import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
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
      hasNext:true,
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
    Fetch(`order/post/list/?userID=${this.state.userID}&page=${page}`).then(data => {
      this.setState({
        orderList:data.data.orderList,
        hasNext:data.data.hasNext,
        pageNum:data.data.pageNum
      })
    })
  }
  getOrderPickList(page){
    Fetch(`order/pick/list/?userID=${this.state.userID}&page=${page}`).then(data => {
      this.setState({
        orderList:data.data.orderList,
        hasNext:data.data.hasNext,
        pageNum:data.data.pageNum
      })
    })
  }
  getOrderCommentList(page){
    Fetch(`order/comment/list/?userID=${this.state.userID}&page=${page}`).then(data => {
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
    if(index === 1){
      this.getOrderPostList(1);
    }else if(index === 2){
      this.getOrderPickList(1);
  }else{
      this.getOrderCommentList(1);
  }
  }
    //刷新
  //   onPullDownRefresh(){
  //     const{index} = this.state;
  //     Taro.showNavigationBarLoading();    
  //     if(index == 1){
  //     Fetch(`order/post/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       console.log(data);
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   }else if(index == 2){
  //     Fetch(`order/pick/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   }else{
  //     Fetch(`order/comment/list/?userID=${this.state.userID}&page=1`).then(data => {
  //       this.setState({
  //         orderList: data.data.orderList
  //       })
  //     })
  //   };
  //     Taro.hideNavigationBarLoading();
  //     Taro.stopPullDownRefresh();
  // }
    //上拉加载更多
    onReachBottom(){
      var hasNext=this.state.hasNext;
      if(hasNext){
        var list = this.state.orderList;
        var num = this.state.pageNum;
        num = num + 1;
        if(this.state.index === 1 ){
          Fetch(`order/post/list/?userID=${this.state.userID}&page=${num}`).then(data => {
            var datalist = data.data.orderList;
            this.setState({
              hasNext:data.data.hasNext,
              pageNum:data.data.pageNum
            });
            return datalist;
        }).then(datalist =>{
          list = list.concat(datalist);
          this.setState({
            orderList:list
          })
        })
      }else if(this.state.index === 2){
        Fetch(`order/pick/list/?userID=${this.state.userID}&page=${num}`).then(data => {
          var datalist = data.data.orderList;
          this.setState({
            hasNext:data.data.hasNext,
            pageNum:data.data.pageNum
          });
          return datalist;
      }).then(datalist =>{
        list = list.concat(datalist);
        this.setState({
          orderList:list
        })
      })
      }else{
        Fetch(`order/comment/list/?userID=${this.state.userID}&page=${num}`).then(data => {
          var datalist = data.data.orderList;
          this.setState({
            hasNext:data.data.hasNext,
            pageNum:data.data.pageNum
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
    Fetch(`order/post/list/?userID=${this.state.userID}&page=1`).then(data => {
      this.setState({
        orderList: data.data.orderList
      })
      console.log(data.data.orderList);
    })
  }


  componentDidMount () { }
  
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {orderList} = this.state
    return (
      <View>
        <headerTab navList={[{key:1,content:'发起'},{key:2,content:'参与'},{key:3,content:'我的'}]} onGetIndex={this.getIndex.bind(this)} />  
        <View className='height'>
        <View className='tab-content'>
        {
        orderList.map((obj) => (
          obj.kind === 2?
          <CarTab key='2' orderList={obj} />
          :
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



