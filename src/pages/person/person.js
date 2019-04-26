import Taro, { Component} from '@tarojs/taro'
import { View,  OpenData} from '@tarojs/components'
// import { AtButton ,Open-data} from 'taro-ui'
import './person.less'
import Connection from '../../components/connection/connection';
import Myrecord from '../../components/myrecord/myrecord';
import Toadvice from '../../components/toadvice/toadvice';
import Share from '../../components/share/share';

export default class Person extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  render () {
    return (
      <View>
      <View className='user'>
      <OpenData className='avatar' type='userAvatarUrl'></OpenData>
      <OpenData className='name' type='userNickName' lang='zh_CN'></OpenData>
      </View>
      <View className='choose-box'>
      <Connection />
      <Myrecord />
      <Toadvice />
      <Share />
      </View>
      </View>
    )
  }
}
