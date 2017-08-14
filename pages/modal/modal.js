// pages/modal/modal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anonymity: 'qiqijojo',
    imgUrl: '../images/user.jpg',
    wechat: '',
    sex:1,
    gender:'',
    nature: '',
    expect: ''
  },
  //事件处理函数
  backIndex: function () {
    wx.request({
      url: 'http://172.18.33.2/api/user/signup',
      data:{
        wechat:this.data.wechat,
        gender:this.data.gender,
        nature:this.data.nature,
        expect:this.data.expect
      },
      method:'POST',
      success:function(res){
        console.log(res)
      }
    })
    // wx.switchTab({
    //   url: '../index/index',
      
    // })
  },
  bindMyCharacter:function(e){
    this.setData({
      nature:e.detail.value
    })
  },
  bindPeerCharacter:function(e){
    this.setData({
      expect:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    app.getUserInfo(function (wechat){
      that.setData({
        wechat: wechat.nickName
      },{
        sex:wechat.gender
      });
      console.log(wechat)
    });
    if (that.data.sex === 1){
      that.setData({gender:'MAIL'})
    } else if (that.data.sex === 2){
      that.setData({gender:'FEMAIL'})
    }
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