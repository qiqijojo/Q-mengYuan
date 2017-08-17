//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userImage:'../images/user.jpg',
    showData:[],
    perData:[],
    pageIndex:0,
    openId:'',
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
        if(res.data.code === 0){
          that.setData({
            perData: res.data.data.map((item) => {
            return Object.assign(item,{ 'userImage': that.data.userImage });
            })
          });
          if(that.data.perData.length>0){
              that.setData({
                showData: that.data.showData.concat(that.data.perData)
              })
          }
        } else if (res.data.code === -1) {
            that.setData({
              perData: []
            })
        }
      },      
      fail:function(err){
         console.log(err)       
      }
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.login({
                success: function (obj) {
                  if (obj.code) {
                    var JSCODE = obj.code;
                    wx.request({
                      data: {},
                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9fe2d766e02466b4&secret=746ec8739f1f75c5766cecf430d7ff98&js_code='+JSCODE+'&grant_type=authorization_code',
                      method: 'GET',
                      success: function (res) {
                        console.log(res.data)
                        that.setData({
                          openId:res.data.openid
                        })
                      }
                    })
                  } else {
                    console.log('获取用户登录态失败!' + res.errMsg)
                  }
                }
              });
              // wx.navigateTo({
              //   url: '../modal/modal',
              // })
            },
            fail:function(){
              console.log('1111111111111111111111')
            }
          })
        }
      }
    })
    this.getAllItems();
  },
  onReady: function(){
    
  },
  onShow: function(){
     
  },
  onReachBottom: function(){
    if (this.data.perData.length === 0){
      wx.showToast({
        title: '没有数据了！',
        mask: true,
        duration: 2000,
        success:function(res){
          console.log(res)
        },
        fail:function(res){
          console.log(res)
        }
      })
    }else{
      this.setData({ pageIndex: this.data.pageIndex + 1 });
      this.getAllItems();
    }
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
