// pages/palInfo/palInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:0,
  },
  jump: function () {
    var that = this;
    wx.navigateTo({
      url: '../history/history'
    });
    wx.request({
      url: 'http://172.18.33.2/api/message/getMessageByWechat',
      data: {
        'wechat':'wechat11',
        'type':'String',
        'pageIndex':that.data.pageIndex,
        'pageSize':10
      },
      method:'POST',
      success:function(res){
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('aaaaaaaa')
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