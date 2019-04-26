import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker ,Image ,} from '@tarojs/components'
import pho from '../../img/address.png'
import './address.less'

export default class Address extends Component {
  state = {
    selector: ['图书馆', '八号楼', '东一食堂', '南湖食堂','学子食堂','北门','佑铭体育馆'],
    selectorChecked: '图书馆',
  }

  componentWillMount(){
    if(this.state.selectorChecked){
      this.props.onAdress(this.state.selectorChecked)
    }
  }
    onChange = e => {
      if(this.state.selectorChecked){
        this.props.onAdress(this.state.selector[e.detail.value])
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
              <Picker className='pck' mode='selector' range={this.state.selector} onChange={this.onChange}>
                <Text className='address'>拼单地点</Text>
                <Text className='arry'>{this.state.selectorChecked}></Text>
              </Picker>
            </View>
          </View>
        )
    }
}