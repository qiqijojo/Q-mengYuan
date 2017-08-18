// pages/modal/modal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anonymity: '',
    imgUrl: '../images/user.jpg',
    loginCode: '',
    sex:0,
    gender:'',
    nature: '',
    expect: ''
  },
  //事件处理函数
  backIndex: function () {
    var that = this;
    wx.request({
      url: 'http://172.18.33.2/api/user/signup',
      data:{
        anonymity:'',
        loginCode: that.data.loginCode,
        gender: that.data.gender,
        nature: that.data.nature,
        expect: that.data.expect
      },
      method:'POST',
      success:function(res){
       if(res.data.code === 0){
         wx.showToast({
           title: '注册成功',
           icon:'success',
           mask:true,
           success:function(){
              wx.switchTab({
                url: '../index/index',
              })
           }
         })
       } else if (res.data.code === -1){
         wx.showModal({
           title: '注册失败！',
           content: '请检查输入是否正确！',
           showCancel:false,
         })
       }
      }
    })
  },
  bindMyCharacter:function(e){
    this.setData({
      nature: e.detail.value
    })
  },
  bindPeerCharacter:function(e){
    this.setData({
      expect: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var that = this;
    that.setData({
      anonymity: query.userName,
      loginCode: query.loginCode
    });
    console.log(that.data.userName)
    console.log(that.data.loginCode)
    app.getUserInfo(function (info){
      console.log(info)
      that.setData({
          sex: info.gender
      });
       if (that.data.sex === 1){
          that.setData({gender:'MAIL'})
        } else if (that.data.sex === 2){
            that.setData({gender:'FEMAIL'})
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})