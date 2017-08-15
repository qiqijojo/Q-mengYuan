var app = getApp()
Page( {
  data: {
    userInfo: {},
    hiddenLoading: false,
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    tabs: ['笑话','照片','视频'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabsId: 1
  },
  tabClick: function (e){
    const numId = Number(e.target.id)+1;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.activeIndex,
      tabsId: numId || 1
    })
  },
  onLoad: function(options) {
    const that = this;
    var sliderLeft = 0;
 
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
  },
  onShareAppMessage: function (){
    return {
      title: '萌缘',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  }
})