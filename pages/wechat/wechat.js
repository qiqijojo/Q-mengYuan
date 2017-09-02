// pages/wechat/wechat.js

var websocket = require('../../utils/websocket.js')
// var app = getApp()
var message = ''
var text = ''
var user = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    text: text,
    chat: '../images/chat.png'
  },
  bindChange: function (e) {
    message = e.detail.value
  },
  // 事件处理函数
  add: function (e) {
    websocket.send(user.nickName + ' : ' + message)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var that = this

    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   user = userInfo;

    //   websocket.connect(user, function (res) {
    //     text = res.data + "\n" + text;
    //     that.setData({
    //       text: text
    //     });
    //   })
    // })
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

  }
})
