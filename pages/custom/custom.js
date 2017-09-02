// history.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    this.data.pageIndex++;
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'Q萌缘分享测试',
      desc: '最具人气的交友平台',
      path: 'pages/history/history',
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        console.log('转发失败')
      }
    }
  },
  /*
  * 表单提交
  * */
  formSubmit: function (e) {
    let text = e.detail.value.textarea;
    if (!text.trim()) { //textarea为空
      wx.showModal({
        title: '提示',
        content: '输入框不能为空!'
      });
    } else {
      let arrText = text.split("");
      if (arrText.length > 15) {
        wx.showModal({
          title: '提示',
          content: '输入内容超过15字，请重新输入~~'
        });
      } else {
        app.globalData.customInput = text.trim();
        wx.navigateBack({
          url: '../modal/modal'
        })
      }
    }
  }
});