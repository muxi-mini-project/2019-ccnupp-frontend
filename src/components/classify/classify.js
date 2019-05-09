/* eslint-disable react/no-unescaped-entities */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker ,Image} from '@tarojs/components'
import pho from '../../img/classify.png'
import './classify.less'


export default class Classify extends Component {

  constructor(props){
    super(props);
    this.state = {
      selector: ['网购', '会员账号', '其他','外卖'],
      selectorChecked : '网购'
    }
  }
    componentWillMount(){
      
      if(this.state.selectorChecked){
        this.props.onClassify(this.state.selectorChecked)
      }
    }

    onChange = e => {
      if(this.state.selectorChecked){
        this.props.onClassify(this.state.selector[e.detail.value])
      }
      this.setState({
        selectorChecked: this.state.selector[e.detail.value]
      })
    }
  
  render () {
    
    return (
          <View className='page-section'>
          <Image className='pho' src={pho} />
            <View>
            <Picker className='pck' mode='selector' range={this.state.selector} onChange={this.onChange} >
                <Text className='address'>分类</Text>
                <Text className='arry'>{this.state.selectorChecked}></Text>
              </Picker>
            </View>
          </View>
        )
        }
    }