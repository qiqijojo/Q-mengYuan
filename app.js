// app.js
App({
  onLaunch: function () {
    // 调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('user') || []
    logs.unshift(Date.now())
    wx.setStorageSync('user', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb === 'function' && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    users: [],
    userId: '',
    userInfo: {},
    labelWarp: [],
    labelCount: [],
    customInput: '',
    // mengyuanIp: 'http://172.19.25.44'
    mengyuanIp: 'https://yuan.weimob.com'
  }
})
