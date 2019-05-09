import Taro, { Component } from '@tarojs/taro'
import {View,Image,Button} from '@tarojs/components'
import './choose.less'
import  threeman from '../../img/three-people.png';
import Fetch from "../../common/request";

export default class Choose extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  Config = {
    navigationBarTitleText: '选择拼单'
  }

    toPageBuy(){
      Taro.navigateTo({
        url: `../publish/publish`
    })
  }
    toPageCar(){
      Taro.navigateTo({
        url: `../addcar/addcar`
    })
  }
  componentWillMount () {
    Fetch(
      'user/info/',
      {
        username:Taro.getStorageSync('nickName'),
        headPicture:Taro.getStorageSync('ava_p'),
      },
      "POST"
    )
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View className='bac'>
        <View className='pic'>
        <Image src={threeman} className='threeman'></Image>
        </View>
        <View className='btn_choose'>
        <Button className='footer' onClick={this.toPageBuy}>拼购</Button>
        <Button className='footer' onClick={this.toPageCar}>拼车</Button>
        </View>
      </View>
    )
  }
}
