import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Input,Button,OpenData } from '@tarojs/components'
import './detail.less'
import Fetch from "../../common/request";
import '../../img/timeicon.png'
import '../../img/placeicon.png' 
import CommentUser from '../../components/comments/comments';

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      releaseFocus: false,
      orderid:0,  
      info:{
      kind:0,
      location: "8号楼",
      timeBuy: "19：00",
      numNeed: 4,
      numExist: 2,
      picture: "../../images/uiplus.png",
      content: "我是内容",
      heading: "我是标题",
      full: true,
      },
      userPicture:[],
      comments:[],
      // userheadpic:"1"
      }
    }
  config = {
    navigationBarTitleText: '首页'
  }
    bindReply ( ){ 
    this.setState({ 
    releaseFocus: true 
    }) 
    }
    changeRemark(e){
      this.setState({
        remark:e.detail.value
      })
    }
  submitForm() {
    var form = this.state.remark;    
    if(form == ""){
      Taro.showLoading('请输入评论');    
      Taro.hideLoading();  
      return;    
    }else{
    Fetch(`/order/comments/buy/?orderID=${this.state.orderid}`,
    {
      userID:'1',
      content:form,
    },
    "POST"
    ).then(
      Fetch(`/order/buy/?orderID=${this.state.orderid}`).then(data =>{
      this.setState({
        comments:data.comments,
        }).then(
          this.setState({
            remark:""
          })
        )
      })
    )
  }
}
  // 提交评论    
  //   Taro.request({      
      // url: /order/comments/buy? + {orderid},      
  //     method: "POST",
  //     data: {
  //       sourceId: this.state.sourceId,
  //       comment: form.comment,
  //       userId: this.state.globalData.haulUserInfo.id,        
  //       userName: this.state.globalData.haulUserInfo.userName,        
  //       userPhoto: app.globalData.haulUserInfo.userPhoto
  //     },      
  //     header: {        
  //       "content-type": "application/x-www-form-urlencoded;charset=utf-8",        
  //       //token: app.globalData.token       
  //     },      
  //     success: res => {        
  //       console.log(res)        
  //       if (res.data.success) {          
  //         Taro.showToast({            
  //           title: "回复成功"          
  //         })          
  //         that.refresh();
  //         mydata.commentId = "";
  //         mydata.replyUserName = "";
  //         this.setState({            
  //           replyUserName: mydata.replyUserName,
  //           reply: false
  //         })        
  //       } else {          
  //         Taro.showToast({            
  //           title: '回复失败，请检查您的网络',          
  //         })        
  //       }      
  //     }    
  //   })


  componentWillMount () {
    var id = this.$router.params.id     
    this.setState({
      orderid:id,
    })
    Fetch(`/order/buy/?orderID=${id}`
    ).then(data =>{
      console.log(data);
      this.setState({
      info:data.info,
      userPicture:data.userPicture,
      comments:data.comments,
      })
    });
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {remark} = this.state;
    return (
      <View className='body'>
      <View className='content'>
      <View className='usrmasg'>
        <Image class='headsculpture' src={this.state.info.user_picture}> </Image>
        <View className='nickname'>{this.state.info.username}</View>
        </View>
        <View className='header'>{this.state.info.heading}</View>
        <View className='cnt'>{this.state.info.content}</View>
        <View className='time'>
          <Image className='timeimg' src='../../img/timeicon.png' ></Image>
          <View className='timetxt'>下单时间：{this.state.info.timeBuy}</View>
        </View>
        <View className='place'>
          <Image className='placeimg' src='../../img/placeicon.png'></Image>
          <View className='placetxt'>拼单地点：{this.state.info.location}</View>
        </View>
        <View className='num'>已拼{this.state.info.numExist}/{this.state.info.numNeed}</View>
        <View className='img-box'>
        <Image className='content-imge' src={this.state.info.picture}></Image>
        </View>
        </View>
        <View className='remarknum'>{this.state.comments.length}条评论回复</View>
        <View className='comments'>
        <View className='talk'>
        <View className='headsculpture'>
        <OpenData type='userAvatarUrl'></OpenData>
        </View>
        <Input className='text' 
          type='text'
          placeholderClass='input_null'
          placeholder='问问更多细节吧~'
          focus
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
      {this.state.comments.map((obj,index) => (
      <CommentUser  remark={this.state.comments[index]} />
      ))}
      </View>
    </View>
    )
    }
  }
