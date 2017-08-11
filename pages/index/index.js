//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userImage:'../images/user.jpg',
    showData:[]
   },
  //事件处理函数
  goPalsInfo:function(){
    wx.navigateTo({
      url: '../../palInfo/palInfo',
    })
  },
  timeFormat:function(time){
    var a = 2;
    a.map((item) => {
      item.unshift({ 'userImage': this.data.userImage });
      return item;
    })
  },
  getAllItems:function(){
    var that = this;
    wx.request({
      url: 'http://172.18.33.2/api/message/getMessages',
      data: {
        "pageIndex": 0,
        "pageSize": 10
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          showData: res.data.data.map((item) => {
           return Object.assign(item,{ 'userImage': that.data.userImage });
          })
        });
        console.log(that.data.showData)
      },      
    });
    console.log(that.data.showData)
  },
  onLoad: function () {
    this.getAllItems();
  },
   onShow:function(){
     
  }
})
