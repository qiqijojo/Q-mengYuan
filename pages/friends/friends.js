// pages/pals/pal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [
        { userImgs: "../../images/headImg1.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"},
        { userImgs: "../../images/headImg2.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"},
        { userImgs: "../../images/headImg3.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"},
        { userImgs: "../../images/headImg4.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"},
        { userImgs: "../../images/headImg5.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"},
        { userImgs: "../../images/headImg6.jpg",publishTime: "2017-8-21 10:00",charactDesc: "我是一个性格活泼开朗的少年，我的爱好是喜欢看书，没事的时候喜欢听着音乐吼两嗓子，喜欢结交朋友。"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  deleteItem: function (e){
    var that = this;
    wx.showModal({
      title: '',
      content: '确定要删除此萌友及其聊天内容吗？',
      success:(res)=>{
        if(res.confirm){
          let id = e.currentTarget.dataset.id;
          if (that.data.userInfo.length){
            let userData = that.data.userInfo;
            userData.splice(id,1);
            that.setData({
              userInfo: userData
            })
          }
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            mask: true,
          })
        }else if(res.cancel){
          return ;
        }
      }
    })
    
  }
});