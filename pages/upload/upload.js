let app = getApp()
Page( {
  data: {
    userInfo: {},
    hiddenLoading: false,
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    tabs: ['笑话','照片','视频'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabsId: 1,
    isHiddenImage: false,
    imageList:[]
  },
  tabClick: function (e){
    const numId = Number(e.currentTarget.id)+1;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.activeIndex,
      tabsId: numId,
      pics: []
    })
  },
  onLoad: function(options) {
    const that = this;
    /** 
     let sliderLeft = 0;

    switch(options.id){
      case "1":
        sliderLeft="0%";
        break;
      case "2":
        sliderLeft="33%";
        break;
      case "3":
        sliderLeft="66%";
        break;
      default:
        sliderLeft=0;
        break;
    };
    that.setData({
      tabsId: options.id || 1,
      sliderLeft: sliderLeft
    })
     * **/
  },
  previeImg: function (e){ //预览图片
    wx.previewImage({
      current: e.currentTarget.imgUrl, // 当前显示图片的http链接
      urls: this.data.imageList[0] // 需要预览的图片http链接列表
    })
  },
  uploadImg: function (){ //上传图片
    let that = this;
    let single = "";
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        for(let i = 0;i<tempFilePaths.length; i++){
          single = tempFilePaths[i];
          that.data.imageList.push(tempFilePaths[i]);
          that.saveImg(single);
        }
      }
    })  
  },
  saveImg: function(single){
    let arr = [];
    let that = this;
    wx.saveFile({
      tempFilePath: single,
      success: (res) => {
        let savedFilePath = res.savedFilePath;
        arr.push(savedFilePath);
        that.setData({
          pics: arr,
          isHiddenImage: true
        })
      }
    })
  },
  removeImg: function (){
    let that = this;
    wx.getSavedFileList({
      success: function(res) {
        if (res.fileList.length > 0){
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete: function(res) {
              console.log(res)
              that.setData({
                isHiddenImage: false
              })
            }
          })
        }
      }
    })
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
  onShareAppMessage: function (){
    return {
      title: '萌缘',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  }
})