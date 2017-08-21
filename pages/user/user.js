const app = getApp();
Page( {
  data: {
    userInfo: {}/*,
    hiddenLoading: false*/
  },

  onLoad: function() {
    let that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    //小程序授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
                scope: 'scope.userInfo',
                success() {
                    // 用户已经同意小程序使用用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
                    wx.getUserInfo()
                },
                fail() {
                  wx.showToast({
                    title: '用户授权失败',
                    icon: 'loading',
                    duration: 1200
                  })
                  that.setData({
                    userInfo: {"nickName":"用户未授权"}
                  })
                }
            })
        }
      }
    })
  },
  //跳转到历史记录页面
  jumpToHistory: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../history/history?id='+id
    })
  },
  //跳转到上传页面
  jumpToUpload: function (){
    wx.navigateTo({
      url: '../upload/upload'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
          // 用户已经同意小程序使用用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
          wx.getUserInfo()
      },
      fail() {
        wx.showToast({
          title: '用户授权失败',
          icon: 'loading',
          duration: 1200
        })
        that.setData({
          userInfo: {"nickName":"用户未授权"}
        })
      }
    })
  },
  //重新授权并获取用户信息
  switchChange: function (){
    let that = this;
    wx.openSetting({
      success:(res) => {
        //调用应用实例的方法获取全局数据
        app.getUserInfo( function( userInfo ) {
          //更新数据
          that.setData({
            userInfo: userInfo
          })
        });
        //小程序授权
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
                wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                        // 用户已经同意小程序使用用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
                        wx.getUserInfo()
                    },
                    fail() {
                      wx.showToast({
                        title: '用户授权失败',
                        icon: 'loading',
                        duration: 1200
                      })
                      that.setData({
                        userInfo: {"nickName":"用户未授权"}
                      })
                    }
                })
            }
          }
        })
      }
    })
  },
  onShareAppMessage: function (){
    return {
      title: '萌缘',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user/user'
    }
  }
})