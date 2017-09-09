// app.js
App({
  // 启动时登录
  onLaunch: function () {
    var that = this

    // 获取loginCode
    wx.login({
      success: (loginRes) => {
        if (loginRes.code) {
          // loginCode换取sessionId和userId
          wx.request({
            url: that.globalData.mengyuanIp + '/api/user/auth',
            data: {
              'loginCode': loginRes.code
            },
            method: 'POST',
            success: (res) => {
              let authRes = res.data
              that.globalData.sessionId = authRes.data.sessionId
              that.globalData.userId = authRes.data.userId

              // 将userId存储到缓存
              try {
                wx.setStorageSync('userId', `${authRes.data.userId}`)
              } catch (err) {
                console.error('设置userId失败')
                throw new Error(err)
              }
              // 将sessionId存储到缓存
              try {
                wx.setStorageSync('sessionId', `${authRes.data.sessionId}`)
              } catch (err) {
                console.error('设置sessionId失败')
                throw new Error(err)
              }

              // 获取用户信息
              that.getUserInfo()
            }
          })
        } else {
          console.error('获取用户登录态失败!')
          throw new Error(loginRes)
        }
      }
    })
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
    userId: '',
    userInfo: '',
    labelWarp: [],
    labelCount: [],
    customInput: '',
    // mengyuanIp: 'http://172.18.33.4',
    mengyuanIp: 'https://hackathon-yuan.dearitgirl.com',
    users: []
  }
})
