// history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId: 1, 
    item: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
        console.log(res.data,"resData");
        let resData = res.data;
        if(resData.code == 0){
          if(resData.data){
            that.setData({
              item: resData.data 
            })
          }
        }
      },
      fail: function (){
        console.log("接口数据获取失败");
      },
      complete: function (){
        console.log("接口数据获取成功");
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