import Taro from "@tarojs/taro";
// 包裹一层，并且返回供外部调用
// amd cmd;模块发展的演变的过程；
// promise就是一个表示未来的事情；

const preHttp = "https://pinpin.muxixyz.com/api/v1/";
const Fetch1 = (url, data = {}, method = "GET") => {
  const header = { "content-type": "application/json"};

  header.openid=Taro.getStorageSync('openid') ;
  header.token=Taro.getStorageSync('token');
  return Taro.request({
    url: preHttp + url,
    data,
    method,
    header
  }).then(res => {
    if (res.statusCode === 200) {
      if (res.data) {
        return res.data;
      } else {
        return res.data.code; // 业务逻辑错误，返回业务错误码
      }
    } else if(res.data.msg === 'order is full'){
      // 异常
      Taro.showToast({
        title: `该拼单人数已经满了~`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }else if(res.data.msg === 'you are the poster'){
      Taro.showToast({
        title: `本订单是由您发起的哟~`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }else if(res.data.msg === 'you have picked this order'){
      Taro.showToast({
        title: `您已经拼过此订单了！`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }
  });
};

export default Fetch1;