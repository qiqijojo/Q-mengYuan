// history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId: 1, 
    item: [],
    pageIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData({
      titleId: options.id || 1 //获取url的参数判断title的文案
    })
  },
  /*
    获取多条数据
   */
  getData: function (){
    let that = this;
    console.log(this.data.pageIndex,"############");
    wx.request({
      url: 'http://172.18.33.2/api/message/getMessageByWechatAndType', 
      data: {
        "wechat": "wechat11",     
        "type": "String",
        "pageIndex": this.data.pageIndex,
        "pageSize": 10
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data,"resData");
        let resData = res.data;
        if(resData.code == 0&&resData.data){
            that.setData({
              item: that.data.item.concat(resData.data)
            })
        }else if(resData.code == -1){
          wx.showToast({
            title: '到底啦，亲',
            icon: 'success',
            duration: 1200
          })
        }
      },
      fail: function (){
        console.log("接口数据获取失败");
      },
      complete: function (){
        console.log("接口数据获取成功");
      }
    });
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
      title:'Q萌缘分享测试',
      desc:'最具人气的交友平台',
      path:'pages/history/history',
      success:function(res){
        console.log('转发成功')
      },
      fail:function(res){
        console.log('转发失败')
      }
    }
  }
})