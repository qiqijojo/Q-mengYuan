// history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId: 1, 
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://172.18.33.2/api/message/getMessageByWechatAndType', 
      data: {
        "wechat": "wangquan19921010",
        "type": "String",
        "pageIndex": 0,
        "pageSize": 10
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        debugger;
        console.log(res.data,"resData");
        if(res.code == 0){
          that.setData({
             content: res.data.data.forEach((item) => {
                return Object.assign({},item.content);
             }) 
          })
          console.log(content,"content");
        }
      },
      fail: function (){

      }
    });
    this.setData({
      titleId: options.id || 1 //获取url的参数判断title的文案
    })
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