import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Textarea ,Button} from '@tarojs/components'
import './advice.less'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
 config = {
    navigationBarTitleText: '意见反馈'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  constructor(props){
    super(props);
  };
  toPage() {
    Taro.navigateBack({
      delta:1
    })
}
  render () {
    return (
      <View>
      <View className='adviceBox'>
        <View className='connection'>
        <Text className='way'>您的意见将是我们宝贵的财富</Text>
        {/* <Input type='text' placeholder='您的意见将是我们宝贵的财富' disabled></Input> */}
        </View>
        <Textarea className='text-area' placeholder='用户交流qq群：595330682' disabled></Textarea>
      </View>
      <Button className='footer' onClick={()=>this.toPage()}>确认发布</Button>
      </View>
    )
  }
}
