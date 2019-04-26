import Taro from "@tarojs/taro";
// 包裹一层，并且返回供外部调用
// amd cmd;模块发展的演变的过程；
// promise就是一个表示未来的事情；

// Fetch(url, data).then((res) => { console.log(res)})
const preHttp = "https://pinpin.muxixyz.com/api/v1/";
const Fetch = (url, method = "POST",name='image',formData,filePath) => {
  const header = { "content-type": "multipart/form-data"};
  // const token = Taro.getStorageSync("token");
  // if (token) {
  //   header.openid = `Bearer ${token}`;
  // }
  header.openid=Taro.getStorageSync('openid') ;
  header.token=Taro.getStorageSync('token');
  return Taro.uploadFile({
    url: preHttp + url,
    method,
    name,
    formData,
    filePath,
    header,
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
        title: `服务端错误: ${res.statusCode}, ${res.data.message}`,
        icon: "none",
        duration: 1000
      });
      throw new Error(`服务端错误: ${res.statusCode}`);
    }
  });
};

export default Fetch;