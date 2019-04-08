import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,Textarea,Button } from '@tarojs/components'
import './detail.less'
import '../../images/timeicon.png'
import '../../images/placeicon.png' 

export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      releaseFocus: false,
      orderid:0,
      // kind:0,
      location: "8号楼",
      timeBuy: "19：00",
      numNeed: 4,
      numExist: 2,
      picture: "../../images/uiplus.png",
      content: "我是内容",
      heading: "我是标题",
      // full: true,
      // usersid:[],
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
  // submitForm(e) {
  //   var form = e.detail.value;    
  //   var that = this;
  //   if(form.comment == ""){
  //     Taro.showLoading('请输入评论');    
  //     Taro.hideLoading();  
  //     return;    
  //   } 
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
  // }


  componentWillMount () {
    var id = this.$router.params.id     
    this.setState({
      orderid:id,
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='body'>
      <View className='content'>
      <View className='usrmasg'>
        <Image class='headsculpture' src='../../images/uiplus.png'> </Image>
        <View className='nickname'>我是名字</View>
        {/* {Taro.getUserInfo.nickName} */}
        </View>
        <View className='header'>{this.state.heading}</View>
        <View className='cnt'>{this.state.content}</View>
        <View className='time'>
          <Image className='timeimg' src='../../images/timeicon.png' ></Image>
          <View className='timetxt'>下单时间：{this.state.timeBuy}</View>
        </View>
        <View className='place'>
          <Image className='placeimg' src='../../images/placeicon.png'></Image>
          <View className='placetxt'>拼单地点：{this.state.location}</View>
        </View>
        <View className='num'>已拼{this.state.numExist}/{this.state.numNeed}</View>
        <Image className='content-imge' src={this.state.picture}></Image>
        </View>
        <View className='remarknum'>{this.state.comments.length}条评论回复</View>
        <View className='comments'>
        {/* <Textarea placeholder-class='input_null' maxlength='-1' show-confirm-bar={false} cursor-spacing='15' auto-height placeholder='请输入回复' name='comment'></Textarea>
        <Button form-type='submit' className='submit'>提交</Button>  */}
        <View className="talk" bindtap={this.bindReply}></View> 
        <Textarea class='text' 
          placeholderClass='input_null'
          fixed='true'
          maxlength='-1' 
          show-confirm-bar={false} 
          cursorSpacing
          auto-autoHeight
          placeholder='问问更多细节吧~'
          onClick={this.bindReply}
        ></Textarea> 
        <View class='release' hidden={!this.state.releaseFocus}>  
        <View className='submit'>发送</View> 
 </View> 
        </View>
      </View> 
    )
  }
}
