// pages/login/login.js
//获取应用实例
var app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInputPhone:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**获取用户信息 */
  onGotUserInfo: function (e) {
    console.log(e)
    if(e.detail.userInfo){
      //存储用户信息
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hasUserInfo = true;
      //关闭所有页面跳转首页
      wx.reLaunch({
        url: '../main/main',
      })
    }
  },
  //微信用户登录
  getPhoneNumber:function(e){
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    if (e.detail.iv){
      //关闭所有页面跳转首页
      wx.reLaunch({
        url: '../main/main',
      })
    }
  },
  //展示输入手机号登录
  showInputPhoneBox:function(){
    this.setData({
      isInputPhone:true
    })
  },
  //登录或注册
  registerSubmit:function(e){
    console.log(e.detail.value)
    
  }
})