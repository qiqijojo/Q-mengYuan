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
    this.getAllItems();
  },
   onShow:function(){
     
  },
  onReachBottom: function(){
    var that = this;
    that.setData({pageIndex: that.data.pageIndex+1});
    that.getAllItems();
  },
})
