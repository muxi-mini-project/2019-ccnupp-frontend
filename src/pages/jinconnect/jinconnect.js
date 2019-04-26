import Taro, { Component} from '@tarojs/taro'
import { View, Button ,Input ,Image} from '@tarojs/components'
import pho from '../../img/qq.png'
import phoone from '../../img/wechat.png'
import photwo from '../../img/c-phone.png'

import './jinconnect.less'
import Fetch from '../../common/request_1';

export default class  Jconnection extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  componentWillMount(){
      //this.setState({
        // tel:this.$router.params.tel,
        // qq:this.$router.params.qq,
        // wechat:this.$router.params.wechat
        // tel:Taro.getStorageSync('tel'),
        // qq:Taro.getStorageSync('qq'),
        // wechat:Taro.getStorageSync('wechat')
      // })
      // Fetch(`user/info/`).then(data =>{
      //   console.log(data.info)
      //   this.setState({
      //     tel: data.info.tel,
      //     qq: data.info.qq,
      //     wechat:data.info.wechat
      //   })
      // })
      
          // this.setState({
          //     tel:data.tel,
          //     qq:data.qq,
          //     wechat:data.wechat,
          // })
      
      // var that=this;
      // Taro.request({
      //       url:'https://pinpin.muxixyz.com/api/v1/user/info/',
      //       method:'GET',
      //       header:{
      //         token:Taro.getStorageSync('token')
      //       },
      //       success:function(res){
      //         var obj = {};
      //         obj.tel = res.data.tel;
      //         obj.qq = res.data.qq;
      //         obj.wechat = res.data.wechat;
      //         obj.expires_in = Date.now() + res.data.expires_in;
      //         Taro.setStorageSync('tel', obj.tel);
      //         Taro.setStorageSync('qq', obj.qq);
      //         Taro.setStorageSync('wechat', obj.wechat);
      //     }
      // })
  }
  componentDidShow(){
    Fetch('user/info/').then(data =>{
      console.log(data.info)
      this.setState({
        tel: data.info.tel,
        qq: data.info.qq,
        wechat:data.info.wechat
      })
    })
  }
  Config = {
    navigationBarTitleText: "联系方式"
  }
  constructor(props){
    super(props)
    this.state = {
      tel: '',
      qq: '',
      wechat:'',
  }
}
  changedisplay(){
      Taro.navigateTo({
          url:'/pages/connectiontwo/connectiontwo',
      })
  }
  setconnection1(){
    Taro.setStorageSync('tel',this.state.tel)
    Taro.navigateBack({
      url:'pages/index/login/login'
    })
  }
  setconnection2(){
    Taro.setStorageSync('wechat',this.state.wechat)
    Taro.navigateBack({
      url:'pages/index/login/login'
    })
  }
  setconnection3(){
    Taro.setStorageSync('qq',this.state.qq)
    Taro.navigateBack({
      url:'pages/index/login/login'
    })
  }
  render () {
    const{ tel , qq , wechat }=this.state;
    return (
      <View>
        <View className='btn'>
        <View className='box'></View>
        <Button onClick={this.changedisplay}>编辑</Button>
        </View>
        <View className='bigbox'>
          <View className='qqinput'>
          <Image className='photwo' src={photwo}></Image>
          <Input
            disabled
            type='text'
            placeholder='请输入手机号'
            value={tel}
            onClick={()=>this.setconnection1()}
          >{this.state.tel}</Input>
          </View>
          <View className='qqinput'>
          <Image className='pho' src={phoone}></Image>
          
          <Input
            disabled
            type='text'
            placeholder='快来完善微信号'
            value={wechat}
            onClick={()=>this.setconnection2()}
          />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={pho}></Image>
          <Input
            disabled
            type='text'
            placeholder='请输入qq号'
            value={qq}
            onClick={()=>this.setconnection3()}
          />
          </View>
        </View>
      </View>
    )
  }
}