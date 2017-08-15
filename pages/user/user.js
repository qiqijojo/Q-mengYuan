const app = getApp();
Page( {
  data: {
    userInfo: {},
    hiddenLoading: false,
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall'
  },

  onLoad: function() {
    const that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
      setTimeout(function(){
        that.setData({
          hiddenLoading: true
        })
      },1000)
    })
  },
  //跳转到历史记录页面
  jumpToHistory: function (e) {
    const id = e.currentTarget.dataset.id;
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
  onShareAppMessage: function (){
    return {
      title: '萌缘',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  }
})