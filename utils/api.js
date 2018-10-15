//获取应用实例
const app = getApp()
//接口地址
const HOST = 'http://101.201.34.77:40080/renren-api'
//接口地址
const apiList = {
  //微信授权登录
  wxlogin: HOST + '/api/v1.0/wechat/login',
  //授权信息存储
  saveuerInfo: HOST + '/api/v1.0/wechat/info/save',
  //手机号码解密
  getPhone: HOST + '/api/v1.0/wechat/sms/decrypt',
  //手机号码注册
  register: HOST + '/api/v1.0/register',
  //手机号码登录
  login: HOST + '/api/v1.0/login',
  //退出
  logout: HOST + '/api/v1.0/logout'
}

//接口请求
const $https = (that, url, params, method, success, fail) =>{
  //检查登录状态
  wx.checkSession({
    success:function(){
      console.log("token未过期")
      //调用接口
      wx.request({
        url: url,
        method: method,
        data: params,
        success: function (res) {
          console.log('请求成功返回' + res)
        },
        fail: function (res) {
          console.log('请求失败返回' + res)
        },
        complete: function (res) {
          console.log('请求完毕返回' + res)
        }
      })
    },
    fail:function(){
      console.log("token过期")
      // 重新授权登录
      wx.login({
        success: function (res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // http://timestamp.lanmaoly.com:40080/api/v1.0/wechat/login
          console.log("code" + res.code)
          wx.request({
            url: 'http://101.201.34.77:40080/renren-api/api/v1.0/wechat/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data)
              if(res.data.code == 0){
                //存储新token
                wx.setStorageSync('token', res.data.token)
                //调用接口
                wx.request({
                  url: url,
                  method: method,
                  data: params,
                  success: function (res) {
                    if(res.data.code == 0){
                      success(res.data)
                    }
                  },
                  fail: function (res) {
                    console.log('请求失败返回' + res)
                    fail(res)
                  },
                  complete: function (res) {
                    console.log('请求完毕返回' + res)
                  }
                })
              }
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      })
    }
  })

}
module.exports = {
  apiList,
  $https
}
