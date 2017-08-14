//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userImage:'../images/user.jpg',
    showData:[],
    perData:[],
    pageIndex:0,
   },
  //事件处理函数
  goPalsInfo:function(){
    wx.navigateTo({
      url: '../palInfo/palInfo',
    })
  },
  getAllItems:function(){
    var that = this;
    wx.request({
      url: 'http://172.18.33.2/api/message/getMessages',
      data: {
        pageIndex:this.data.pageIndex,
        pageSize:10
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          perData: res.data.data.map((item) => {
           return Object.assign(item,{ 'userImage': that.data.userImage });
          })
        });
        if(that.data.perData.length>0){
          console.log(that.data.showData)
            that.setData({
              showData: that.data.showData.concat(that.data.perData)
            })
        }
      },      
      fail:function(err){
         console.log(err)       
      }
    });
  },
  onLoad: function () {
    // this.getAllItems();
   
  },
  onReady: function(){
     wx.getSetting({
      success(res){
        if(!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo()
            }
          })
        }
      }
    })
  },
  onShow: function(){
     
  },
  onReachBottom: function(){
    var that = this;
    that.setData({pageIndex: that.data.pageIndex+1});
    // that.getAllItems();
  },
  onPullDownRefresh:function(){
    console.log('刷新新上传的数据~~~')
  },
  onShareAppMessage:function(res){
    return {
      title:'Q萌缘分享测试',
      desc:'最具人气的交友平台',
      path:'pages/index/index',
      success:function(res){
        console.log('转发成功')
      },
      fail:function(res){
        console.log('转发失败')
      }
    }
  }
})
