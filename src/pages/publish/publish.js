import Taro, { Component } from '@tarojs/taro'
import { View, Text , Input,Textarea,Button,Image} from '@tarojs/components'
import './publish.less' 
import pho from '../../img/pho.png'
import '../../components/classify/classify.less'
import Classify from '../../components/classify/classify';
import Address from '../../components/address/address';
import Time from '../../components/time/time';
import People from '../../components/people/people';
import Connection from '../../components/connection/connection';
import Fetch from '../../common/request_1';

export default class Publish extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  componentWillMount(){
    Taro.removeStorageSync('qq'),
    Taro.removeStorageSync('tel'),
    Taro.removeStorageSync('wechat')
  }
   config = {
    navigationBarTitleText: '发布拼单'
  }
  
  constructor(props){
    super(props)
    this.state = {
      kind:'',
      url:'',
      heading:'',
      content:'',
      location:'',
      numNeed:'',
      timeBuy:'',
      }
    }
  changeheading(e) {
    this.setState({
      heading: e.detail.value
    });
  }

  changecontent(e) {
    this.setState({
      content: e.detail.value
    });
  }
  chooseImage(){
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then((res)=>{ 
      const tempFilePaths = res.tempFilePaths;
      this.setState({url:tempFilePaths})
      // Fetch(
      //   'order/image/',
      //   {
      //     image:tempFilePaths
      //   },
      //   res.tempFilePaths[0]
      // ).then(data=>{
      //   this.setState({url:data.image_url})
      // })
      Taro.uploadFile({
        url:'https://pinpin.muxixyz.com/api/v1/order/image/',
        name:'image',
        filePath:tempFilePaths[0],
        formData:{
          image:tempFilePaths
        },
        header:{
          token:Taro.getStorageSync('token')
        },
        success:function(res){
          console.log(res)
          Taro.setStorageSync('image',res.data.image_url)
        }
      })
      // this.setState({  url: res.image_url });
    })
  }
  numpeople(e){
    this.setState({
      numNeed:e,
    })
  }
  time(e){
    this.setState({
      timeBuy:e,
    })
  }
  adress(e){
    this.setState({
      location:e,
    })
  }
  classify(e){
    if(e=='网购') this.setState({kind:1});
    if(e=='外卖') this.setState({kind:2});
    if(e=='会员账号') this.setState({kind:3});
    if(e=='其他') this.setState({kind:4});
  }
  toPostOrder(){
    Fetch(
      'order/post/buy/',
      {
        kind:this.state.kind,
        heading:this.state.heading,
        content:this.state.content,
        timeBuy:this.state.timeBuy,
        location: this.state.location,
        numNeed: this.state.numNeed,
        picture:Taro.getStorageSync('image'),
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
  render () {
    const { heading , content}=this.state;
    return (
    <View>
      <View className='titlebox'>
        <Text className='s'>标 题:</Text>
        <Input 
          className='input' 
          type='text' 
          placeholder='写清商品名称有助于找到更多拼友'
          value={heading}
          onInput={this.changeheading}
          onChange={this.changeheading}
        ></Input>
      </View>
      <View className='describe'>
        <View className='textbox'>
        <Text className='d'>描述:</Text>
        <Textarea 
          className='textarea-one' 
          placeholder='拼单商品的详细信息和对拼友的要求'
          value={content}
          onInput={this.changecontent}
          onChange={this.changecontent}
        ></Textarea>
        </View>
        <View className='addbox'>
        <Image src={this.state.url} className='pho-two'></Image>
        <Button className='addpho' onClick={this.chooseImage}>
        <Image src={pho} className='pho-one'></Image>
        <Text className='text-one'>添加照片</Text>
        </Button>
        </View>
      </View>
      <View className='choose-box'>
        <Classify onClassify={this.classify.bind(this)} />
        <Address onAdress={this.adress.bind(this)} />
        <Time onTime={this.time.bind(this)} />
        <People onPeople={this.numpeople.bind(this)} />
        <Connection />
      </View>
      <Button className='footer' onClick={this.toPostOrder} >确认发布</Button>
    </View>
    )
  }
}