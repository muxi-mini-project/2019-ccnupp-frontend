import Taro from "@tarojs/taro";
// 包裹一层，并且返回供外部调用
// amd cmd;模块发展的演变的过程；
// promise就是一个表示未来的事情；

const preHttp = "https://pinpin.muxixyz.com/api/v1/";
const Fetch = (url, data = {}, method = "GET") => {
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
    } else {
      // 异常
      Taro.showToast({
        title: ` ${res.data.msg}`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }
  });
};

export default Fetch;