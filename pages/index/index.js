//index.js
//获取应用实例
let app = getApp();
Page({
  data: {
    userImage: '',
    nickName: '',
    showData: [],
    perData: [],
    pageIndex: 0,
    openId: '',
    usrs: []
  },
  //事件处理函数

  onLoad: function () {
    var that = this;
    // wx.checkSession({
    //   success:()=>{
    //     console.log('session没过期')
    //   },
    //   fail:()=>{
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  Object.assign(app.globalData.userInfo, res.userInfo);
                }
              })
              wx.login({
                success: function (obj) {
                  var that = this;
                  if (obj.code) {
                    wx.request({
                      url: app.globalData.mengyuanIp + '/api/user/auth',
                      data: { 'loginCode': obj.code },
                      method: 'POST',
                      success: (res) => {
                        app.globalData.sessionId = res.data.data.sessionId;
                        app.globalData.userId = res.data.data.userId;
                        wx.setStorage(
                          {
                            key: 'sessionId',
                            data: res.data.data.sessionId,
                            success: (res) => {
                              console.log(res)
                            },
                            fail: (err) => {
                              console.log(err)
                            }
                          });
                        wx.setStorage({
                          key: 'userId',
                          data: res.data.data.userId,
                          success: (res) => {
                            console.log(res)
                          },
                          fail: (err) => {
                            console.log(err)
                          }
                        })
                      }
                    })
                    wx.navigateTo({
                      url: '../modal/modal',
                    })

                  } else {
                    console.log('获取用户登录态失败!' + res.errMsg)
                  }
                }
              });
            },
            fail: function () {
              console.log('用户拒绝授权！！！')
            }
          })
        }
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    if (app.globalData.userId) {
      wx.request({
        url: app.globalData.mengyuanIp + '/api/user/recommend',
        data: {
          userId: app.globalData.userId,
        },
        method: 'POST',
        success: (res) => {
          console.log('res.data: ', JSON.stringify(res.data))
          that.setData({
            'users': res.data.data
          });
        },
        fail: (err) => {
          console.log(err.data);
        }
      });
      console.log('users: ', that.data['users'])
    }
  },
  // onReachBottom: function(){
  //   if (this.data.perData.length === 0){
  //     wx.showToast({
  //       title: '没有数据了！',
  //       mask: true,
  //       duration: 2000,
  //       success:function(res){
  //         console.log(res)
  //       },
  //       fail:function(res){
  //         console.log(res)
  //       }
  //     })
  //   }else{
  //     this.setData({ pageIndex: this.data.pageIndex + 1 });
  //     this.getAllItems();
  //   }
  // },
  onShareAppMessage: function (res) {
    return {
      title: 'Q萌缘分享测试',
      desc: '最具人气的交友平台',
      path: 'pages/index/index',
      success: function (res) {
        console.log('转发成功')
      },
      fail: function (res) {
        console.log('转发失败')
      }
    }
  },
  goChat: function () {
    wx.navigateTo({
      url: '../wechat/wechat',
    })
  }
})
