import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker ,Image} from '@tarojs/components'
import pho from '../../img/people.png'
import './carpeople.less'

export default class Carpeople extends Component {
  state = {
    selector: ['2', '3', '4', '5','6'],
    selectorChecked: '选择人数',
  }
componentWillMount(){
  if(this.state.selectorChecked){
    this.props.onPeople(this.state.selectorChecked)
  }
}
  onChange = e => {
    if(this.state.selectorChecked){
      this.props.onPeople(this.state.selector[e.detail.value])
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
                <Text className='arry'>{this.state.selectorChecked}</Text>
            </Picker>
            </View>
          </View>
        )
    }
}