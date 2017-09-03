// index.js
// 获取应用实例
var app = getApp()
Page({
  data: {
    userImage: '',
    nickName: '',
    showData: [],
    perData: [],
    pageIndex: 0,
    openId: '',
    users: []
  },
  // 事件处理函数
  onLoad: function () {
    var that = this
    var userId = ''
    var sessionId = ''
    try {
      userId = wx.getStorageSync('userId')
    } catch (e) {
      throw new Error(e)
    }
    try {
      sessionId = wx.getStorageSync('sessionId')
    } catch (e) {
      throw new Error(e)
    }
    console.log(`userId: ${userId}, sessionId: ${sessionId}`)
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  if (typeof app.globalData.userInfo !== 'object') {
                    app.globalData.userInfo = {}
                  }
                  Object.assign(app.globalData.userInfo, res.userInfo)
                  console.log('111 new userInfo: ', JSON.stringify(app.globalData.userInfo))
                  // 从萌缘服务器获取用户之前填的信息
                  wx.request({
                    url: app.globalData.mengyuanIp + '/api/user/getUserInfo',
                    data: {
                      'userId': userId,
                      'sessionId': sessionId
                    },
                    method: 'POST',
                    success: (res) => {
                      let oldUserInfoRes = res.data

                      // 合并用户信息
                      Object.assign(app.globalData.userInfo, oldUserInfoRes.data)
                      console.log('222 new userInfo: ', JSON.stringify(app.globalData.userInfo))
                      // 用户之前没有填标签
                      if (app.globalData.userInfo && app.globalData.userInfo.tag && app.globalData.userInfo.tag.length === 0) {
                        wx.navigateTo({
                          url: '../modal/modal'
                        })
                      } else {
                        that.getRecom()
                      }
                    }
                  })
                }
              })

              // wx.login({
              //   success: (loginRes) => {
              //     if (loginRes.code) {
              //       // var self = that
              //       // loginCode换取sessionId和userId
              //       wx.request({
              //         url: app.globalData.mengyuanIp + '/api/user/auth',
              //         data: {
              //           'loginCode': loginRes.code
              //         },
              //         method: 'POST',
              //         success: (res) => {
              //           let authRes = res.data
              //           // app.globalData.sessionId = authRes.data.sessionId
              //           // app.globalData.userId = authRes.data.userId

              //           // 将userId存储到缓存
              //           wx.setStorage({
              //             key: 'userId',
              //             data: authRes.data.userId,
              //             success: (res) => {
              //               // console.log('设置userId成功', JSON.stringify(res))
              //             },
              //             fail: (err) => {
              //               console.error('设置userId失败')
              //               throw new Error(err)
              //             }
              //           })
              //           // 将sessionId存储到缓存
              //           wx.setStorage({
              //             key: 'sessionId',
              //             data: authRes.data.sessionId,
              //             success: (res) => {
              //               // console.log('设置sessionId成功', JSON.stringify(res))
              //             },
              //             fail: (err) => {
              //               console.error('设置sessionId失败')
              //               throw new Error(err)
              //             }
              //           })

              //           // 获取用户信息
              //           app.getUserInfo()
              //         }
              //       })
              //     } else {
              //       console.error('获取用户登录态失败!')
              //       throw new Error(loginRes)
              //     }
              //   }
              // })
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
    var that = this
    // 用户之前没有填标签
    if (app.globalData.userInfo && app.globalData.userInfo.tag && app.globalData.userInfo.tag.length !== 0) {
      that.getRecom()
    }
    // if (app.globalData.userId) {
    //   wx.request({
    //     url: app.globalData.mengyuanIp + '/api/user/recommend',
    //     data: {
    //       userId: app.globalData.userId
    //     },
    //     method: 'POST',
    //     success: (res) => {
    //       console.log('res.data: ', JSON.stringify(res.data))
    //       that.setData({
    //         'users': res.data.data
    //       })
    //     },
    //     fail: (err) => {
    //       console.log(err.data)
    //     }
    //   })
    //   console.log('users: ', that.data['users'])
    // }
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
      path: `pages/index/index?userId=${app.globalData.userId}`,
      success: function (res) {
        console.log('转发成功', JSON.stringify(res))
      },
      fail: function (res) {
        console.log('转发失败', JSON.stringify(res))
      }
    }
  },
  goChat: function () {
    wx.navigateTo({
      url: '../wechat/wechat'
    })
  },
  getRecom: function () {
    var that = this
    if (app.globalData.userId) {
      wx.request({
        url: app.globalData.mengyuanIp + '/api/user/recommend',
        data: {
          userId: app.globalData.userId
        },
        method: 'POST',
        success: (res) => {
          console.log('res.data: ', JSON.stringify(res.data))
          that.setData({
            users: res.data.data
          })
        },
        fail: (err) => {
          console.log(err.data)
        }
      })
    }
  }
})
