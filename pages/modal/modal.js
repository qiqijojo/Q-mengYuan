// pages/modal/modal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '../images/user.jpg',
    loginCode: '',
    gender:'',
    modalHidden: true,
    nocancel:false,
    selfLabel: [
        {label: "看小说"},
        {label: "看电影"},
        {label: "打游戏"},
        {label: "写代码"},
        {label: "种花"}
    ],
    allLabel:[],
    labelWarp: [],
    labelArr: [],
    lightColor: "" //颜色高亮
  },
  //事件处理函数

  // backIndex: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'http://172.18.33.2/api/user/signup',
  //     data:{
  //       anonymity:'',
  //       loginCode: that.data.loginCode,
  //       gender: that.data.gender,
  //       nature: that.data.nature,
  //       expect: that.data.expect
  //     },
  //     method:'POST',
  //     success:function(res){
  //      if(res.data.code === 0){
  //        wx.showToast({
  //          title: '注册成功',
  //          icon:'success',
  //          mask:true,
  //          success:function(){
  //             wx.switchTab({
  //               url: '../index/index',
  //             })
  //          }
  //        })
  //      } else if (res.data.code === -1){
  //        wx.showModal({
  //          title: '注册失败！',
  //          content: '请检查输入是否正确！',
  //          showCancel:false,
  //        })
  //      }
  //     }
  //   })
  // },
  // bindMyCharacter:function(e){
  //   this.setData({
  //     nature: e.detail.value
  //   })
  // },
  // bindPeerCharacter:function(e){
  //   this.setData({
  //     expect: e.detail.value
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    if (app.globalData.userInfo.gender === 1) {
      this.setData({ gender: 'MAIL' })
    } else if (app.globalData.userInfo.gender === 2) {
      this.setData({ gender: 'FEMAIL' })
    }

    // var that = this;
    // that.setData({
    //   anonymity: query.userName,
    //   loginCode: query.loginCode
    // });
    // console.log(that.data.userName)
    // console.log(that.data.loginCode)
    // app.getUserInfo(function (info){
    //   console.log(info)
    //   that.setData({
    //       sex: info.gender
    //   });
       
    // });
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
      let that = this;
      let labelArr = [];
      if(app.globalData.customInput) {
          if (app.globalData.labelWarp.length > 0) {
              let hasLabel = app.globalData.labelWarp.some(val => {
                  return val.label == app.globalData.customInput
              });
              if (!hasLabel) {
                  app.globalData.labelWarp.push({label: app.globalData.customInput});
                  that.setData({
                      labelWarp: app.globalData.labelWarp
                  })
              }
          } else {
              app.globalData.labelWarp.push({label: app.globalData.customInput});
              that.setData({
                  labelWarp: app.globalData.labelWarp
              });
          }
      }
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
  //添加标签
  addLabel: function (e){
      if(this.data.selfLabel.length){
          let labelIndex = e.currentTarget.dataset.index;
          if(app.globalData.labelCount.length>0){
              if(!app.globalData.labelCount.includes(labelIndex)){  //判断全局globalData对象里面的labelCount数组里面是否包含labelIndex，为了避免让同一种标签重复被选择，如果没有则存储，如果有则return终止;
                  this.filterLabel(labelIndex);
              }else {
                 return false;
              }
          }else {
              this.filterLabel(labelIndex);
          }
      }
  },
  filterLabel: function (index){
      //该方法是将选中的标签的数据存放起来，在自定义标签下面的输入框中展示；
      let selfLabel = this.data.selfLabel;
      for( let i =0;i<selfLabel.length;i++){
          if(i == index){
              selfLabel[index]["flag"] = index;
              app.globalData.labelWarp.push(selfLabel[index]);
              app.globalData.labelCount.push(index);
              selfLabel[i].lightColor = "#1AAD19";
          }
      }
      this.setData({
          labelWarp: app.globalData.labelWarp,
          selfLabel: selfLabel
      })
  },
  //删除标签
  deleteLabel: function (e){
      let index = e.currentTarget.dataset.index;
      let flag = e.currentTarget.dataset.flag;
      let labelWarp = this.data.labelWarp;
      let selfLabel = this.data.selfLabel;

      if(labelWarp.length>0){
          labelWarp.splice(index,1);
          app.globalData.labelWarp.splice(index,1);
          app.globalData.labelCount.splice(index,1);
          selfLabel.map((ele,k) => {
              if(k == flag){
                  ele.lightColor = "#F8F8F8";
              }
          });
          this.setData({
              labelWarp: labelWarp,
              selfLabel: selfLabel
          })
      }
  },
  //添加自定义标签
  addInterest: function (){
      wx.navigateTo({
          url: '../custom/custom'
      })
  },
  //完成兴趣标签，提交标签
  submitLabel: function(){
    var that = this;
    if(app.globalData.labelWarp){
      let label = [];
      app.globalData.labelWarp.map((item)=>{
        return label.push(item.label)
      });
      that.setData({
        allLabel: label
      })
    }
    wx.request({
      url:'http://172.18.33.2/api/user/update',
      data:{
        userId: app.globalData.userId,
        nick: app.globalData.userInfo.nickName,
        gender: that.data.gender,
        language: app.globalData.userInfo.language,
        city: app.globalData.userInfo.city,
        province: app.globalData.userInfo.province,
        country: app.globalData.userInfo.country,
        avatar: app.globalData.userInfo.avatarUrl,
        tag: that.data.allLabel
      },
      method: 'POST',
      success:(res=>{
        console.log(res)
      }),
      fail: (err=>{
        console.log(err.message)
      })
    })
  }
});