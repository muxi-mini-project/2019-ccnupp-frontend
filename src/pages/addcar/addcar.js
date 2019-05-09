import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Input,Image,Button} from '@tarojs/components'
import Fetch from '../../common/request';
import './addcar.less'
import Cartime from '../../components/cartime/cartime';
import Carpeople from '../../components/carpeople/carpeople';
import phoone from '../../img/wechat.png'


export default class Car extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   config = {
    navigationBarTitleText: '发布拼车'
  }

  componentWillUnmount () {}

  componentDidShow () { }

  componentDidHide () { }
  constructor(){
    super()
    this.state={
      s_location:'',
      e_location:'',
      timego:'',
      numNeed:'',
      note:''
    }
  }
  changestart(e){
      this.setState({
          s_location:e.detail.value
      })
  }
  changend(e){
    this.setState({
        e_location:e.detail.value
      })
    }
    changenote(e){
        this.setState({
            note:e.detail.value
        })
    }
  time(e){
    this.setState({
      timego:e,
    })
  }
  numpeople(e){
    this.setState({
      numNeed:e,
    })
  }
  toPostOrder(){
    const {s_location,e_location,numNeed,timego}=this.state
    if((s_location!='')&&(e_location!='')&&(numNeed!='选择人数')&&(timego!='选择出发时间') ){
    Fetch(
      'order/post/car/',
      {
        placeA:this.state.s_location,
        placeB:this.state.e_location,
        numNeed: this.state.numNeed,
        timeGo:this.state.timego,
        content:this.state.note,
        tel:Taro.getStorageSync('tel'),
        qq:Taro.getStorageSync('qq'),
        wechat:Taro.getStorageSync('wechat'),
      },
      "POST"
     ).then(
      Taro.showToast({
        title: "发布成功",
        icon: "success",
        duration: 1000
      }),
      Taro.navigateBack({
        url:'pages/index/index'
      })
    )
    }
    else{
      Taro.showToast({
        title: "请填写完整的拼车信息",
        icon: "none",
        duration: 1500
      })
    }  
  }
 render () {
     const {s_location,e_location ,note}=this.state
    return (
      <View>
        <View className='bigbox'>
          <View className='qqinput'>
          <Text className='bit_1'>•</Text>
          <Input 
            type='text'
            placeholder='从哪里出发'
            value={s_location}
            onInput={this.changestart}
            onChange={this.changestart}
          />
          </View>
          <View className='qqinput'>
          <Text className='bit_2'>•</Text>
          <Input
            type='text'
            placeholder='你要去哪儿'
            value={e_location}
            onInput={this.changend}
            onChange={this.changend}
          />
          </View>
          <View className='c_box'>
            <Cartime onTime={this.time.bind(this)} />
            <Carpeople onPeople={this.numpeople.bind(this)} />
          </View>
          <View className='qqinput'>
          <Image className='pho' src={phoone}></Image>
          <Input
            className='s_put'
            type='text'
            placeholder='你对此行还有什么其他话要说吗'
            value={note}
            onInput={this.changenote}
            onChange={this.changenote}
          />
          </View>
        </View>
        <Button className='footer' onClick={this.toPostOrder} >确认发布</Button>
      </View>
    )
  }
}
