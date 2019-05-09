import Taro, { Component } from '@tarojs/taro'
import { View,Image,Input,OpenData,Button } from '@tarojs/components'
import './detail.less'
import Fetch1 from "../../common/request_1";
import Fetch from "../../common/request";
import '../../img/timeicon.png'
import '../../img/placeicon.png' 
import CommentUser from '../../components/comments/comments';

export default class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderid:0,  
      info:{
      kind:0,
      location: "8号楼",
      timeBuy: "19：00",
      numNeed: 4,
      numExist: 2,
      picture: "",
      content: "内容没有加载出来噢~",
      heading: "请检查网络！",
      full: true,
      username:''
      },
      remark:'',
      comments:[],
      showButtonCheek:false,
      showButtonEdit:true,
      nickname:''
      }
    }
    config = {
      navigationBarTitleText: '订单',
      "enablePullDownRefresh": true, 
      onReachBottomDistance:50
    }
  previewImage(){
    var Img = this.state.info.picture;
    console.log(Img);
    var Arr = [Img];
    console.log(Arr);
    Taro.previewImage({
      current:Arr[0],
      urls:Arr,
    })
  }
  changeRemark(e){
    this.setState({
      remark:e.detail.value
    })
  }
  chooseButton(){
    const {info,nickname} = this.state;
    var usrname = info.username;
    if(usrname == nickname){
      this.setState({
        showButtonCheek:true
      })
    }
  }
  submitForm() {
    var form = this.state.remark;    
    if(form == ""){
      Taro.showLoading('请输入评论');    
      Taro.hideLoading();  
      return;    
    }else{
    Fetch(`order/comments/buy/?orderID=${this.state.orderid}`,
    {
      userID:Taro.getStorageSync('openid'),
      content:form,
    },
    "POST"
    ).then(
      Fetch(`order/buy/?orderID=${this.state.orderid}`).then(data =>{
      this.setState({
        comments:data.data.comments,
        remark:''
        })
      })
    )
  }
}
toPostOrder(){
  Fetch1(
    `order/buy/?orderID=${this.state.orderid}`,
    {
      userID:Taro.getStorageSync('openid')
    },
    "POST"
   ).then(data =>{
     var num = 0;
     var tel1 = data.way.tel;
     var qq1 = data.way.qq;
     var wechat1 = data.way.wecaht;
     if(qq1!=''){
       num = 0;
     }else if(wechat1!=''){
       num = 1;
     }else if(tel1!=''){
       num = 2;
     }
     console.log(tel1,qq1,wechat1);
    Taro.showModal({
      title: "参与成功",
      content:`联系方式：\n
      qq：${qq1}\n
      电话：${tel1}\n
      微信：${wechat1}\n
      按确定复制联系方式噢~
      `,
      success:(res)=> {
        if (res.confirm) {
          if(num == 0){
          Taro.setClipboardData({
            data:`电话：${tel1}`,
          })
        }else if(num == 1){
          Taro.setClipboardData({
            data:`qq：${qq1}`,
          })
        }else if(num == 2){
          Taro.setClipboardData({
            data:`微信：${wechat1}`,
          })
        }
      }
    }
    }).then()
  })
}
    //刷新
    onPullDownRefresh(){
      const {orderid} = this.state
      Taro.showNavigationBarLoading();
      Fetch(`order/buy/?orderID=${orderid}`).then(data =>{
        this.setState({
          info:data.data.info,
          comments:data.comments,
          })
      });
      Taro.hideNavigationBarLoading();
      Taro.stopPullDownRefresh();
  }


  // componentWillMount () {
  //   var id = this.$router.params.id     
  //   this.setState({
  //     orderid:id,
  //   })
  //   console.log(id)
  //   Fetch(`order/buy/?orderID=${id}`
  //   ).then(data =>{
  //     this.setState({
  //     info:data.data.info,
  //     comments:data.data.comments,
  //     })
  //   })
  // }

  componentDidMount () {
    var id = this.$router.params.id     
    this.setState({
      orderid:id,
    })
    Fetch(`order/buy/?orderID=${id}`
    ).then(data =>{
      var infoname = data.data.info.username;
      console.log(infoname);
      this.setState({
      info:data.data.info,
      comments:data.data.comments,
      })
      var usrname = infoname;
      var that = this;
        Taro.getUserInfo({
          success(res) {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            console.log(nickName,usrname);
            if(usrname === nickName){
              that.setState({
                nickname:nickName,
                showButtonCheek:true
              })
            }else{
              that.setState({
                showButtonEdit:true
              })
            }
          }
        })
      })
    }

  componentDidShow () {
   }

  componentDidHide () { }

  render () {
    const {remark,info,comments,showButtonEdit} = this.state;
    return (
      <View className='body'>
      <View className='content'>
      <View className='usrmasg'>
        <Image class='headsculpture' src={info.user_picture}> </Image>
        <View className='nickname'>{info.username}</View>
        </View>
        <View className='header'>{info.heading}</View>
        <View className='cnt'>{info.content}</View>
        <View className='time'>
          <Image className='timeimg' src='../../img/timeicon.png' ></Image>
          <View className='timetxt'>下单时间：{info.timeBuy}</View>
        </View>
        <View className='place'>
          <Image className='placeimg' src='../../img/placeicon.png'></Image>
          <View className='placetxt'>拼单地点：{info.location}</View>
        </View>
        <View className='num'>已拼{info.numExist}/{info.numNeed}</View>
        {info.picture?
        <View className='img-box'>
        <Image className='content-imge' src={info.picture} mode='aspectFit' onClick={this.previewImage}></Image>
        </View>
        :
        <View></View>
        }
        </View>
        <View className='remarknum'>{comments.length}条评论回复</View>
        <View className='comments'>
        <View className='talk'>
        <View className='headsculpture'>
        <OpenData type='userAvatarUrl'></OpenData>
        </View>
        <Input className='text' 
          type='text'
          placeholderClass='input_null'
          placeholder='问问更多细节吧~'
          maxLength='-1' 
          showConfirmBar={false} 
          cursorSpacing={0}
          value={remark}
          onInput={this.changeRemark}
          onChange={this.changeRemark}
        ></Input> 
        <View class='release'> 
        <View className='submit' onClick={this.submitForm.bind(this)}>发送</View> 
        </View> 
      </View> 
      {comments.map((obj) => (
      <CommentUser remark={obj} key='2' />
      ))}
      </View>
      <View className='blank'>  </View>
      <Button className={showButtonEdit?'footer':'none'} onClick={this.toPostOrder}>我要拼单</Button>
      {/* <Button className={showButtonCheek?'footer_blue':'none'} onClick={this.toPostOrder}>编辑</Button> */}
    </View>
    )
    }
  }
