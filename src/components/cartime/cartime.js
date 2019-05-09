import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker ,Image} from '@tarojs/components'
import pho from '../../img/watch.png'
import './cartime.less'

export default class Cartime extends Component {
  componentWillMount(){
    this.props.onTime(this.state.timeSel)
  }
  state = {
    timeSel: '选择出发时间',
  }

  onTimeChange = e => {
    this.props.onTime(e.detail.value)
    this.setState({
      timeSel: e.detail.value
    })
  }

  render () {
    return (
    <View className='page-section'>
       <Image className='pho' src={pho} />
            <View>
              <Picker className='pck' mode='date' onChange={this.onTimeChange} >
                <Text className='arry'>{this.state.timeSel}</Text>
              </Picker> 
        </View>
      </View>
    )
  }
}