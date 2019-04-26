import Taro, { Component } from '@tarojs/taro'
import { View, Button ,Input ,Image} from '@tarojs/components'
import pho from '../../img/qq.png'
import phoone from '../../img/wechat.png'
import photwo from '../../img/c-phone.png'

import './connectiontwo.less'
import Fetch from '../../common/request_1';

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '联系方式'
  }
  state = {
    tel: '',
    qq: '',
    wechat:'',
  };
  changetel(e) {
    this.setState({
      tel: e.detail.value
    });
  }
  changeqq(e) {
    this.setState({
      qq: e.detail.value
    });
  }
  changewechat(e) {
    this.setState({
      wechat: e.detail.value
    });
  }
  torefInfo(){
    Fetch(
      'user/info/',
      {
        username:'',
        headPicture:'',
        tel:this.state.tel,
        qq:this.state.qq,
        wechat:this.state.wechat,
      },
      "PUT"
    ).then(
      Taro.navigateBack({
        delta:1,
      url:`/pages/jinconnect/jinconnect/?tel=${this.state.tel}&qq=${this.state.qq}&wechat=${this.state.wechat}`
    })
    )
  }
  render () {
    const{ tel , qq , wechat }=this.state;
    return (
      <View>
        <View className='btn'>
        <Button onClick={this.torefInfo}>保存</Button>
        </View>
        <View className='bigbox'>
          <View className='qqinput'>
          <Image className='photwo' src={photwo}></Image>
          <Input 
            type='number'
            placeholder='请输入手机号'
            value={tel}
            onInput={this.changetel}
            onChange={this.changetel}
          />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={phoone}></Image>
          <Input
            type='text'
            placeholder='快来完善微信号'
            value={wechat}
            onInput={this.changewechat}
            onChange={this.changewechat}
          />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={pho}></Image>
          <Input
            type='number' 
            placeholder='请输入qq号'
            value={qq}
            onInput={this.changeqq}
            onChange={this.changeqq}
          />
          </View>
        </View>
      </View>
    )
  }
}