import wx from 'weixin-js-sdk'
import { api } from '@/http/api.js'
import axios from 'axios'

const wxShare = async function (title, desc, link, img) {
    // 转换为FormData
    let data = new FormData()
    data.append('url',link)
    axios({ method: 'post', url: api.getWxAppConfig, data: data }).then(res => {
        console.log(res.data);
        if (res.data.code === 0 && res.data.msg === 'success') {
            // 注入权限验证配置
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.data.appId, //后台 必填，公众号的唯一标识
                timestamp: res.data.data.timestamp, // 必填，后台生成签名的时间戳
                nonceStr: res.data.data.nonceStr, // 必填，后台生成签名的随机串
                signature: res.data.data.signature, // 必填，后台签名
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
            });

            // 注入权限验证配置
            wx.ready(function () {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
                // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
                // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

                // 判断当前客户端版本是否支持指定JS接口
                wx.checkJsApi({
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function (res) {
                        console.log('wxJsApi success:', res)
                        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                        wx.updateAppMessageShareData({
                            title: title, // 分享标题
                            desc: desc ? desc : '我发布了一条动态。快来围观',
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                                console.log("分享成功");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                console.log("分享取消");
                            }
                        });
                        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                        wx.updateTimelineShareData({
                            title: title, // 分享标题
                            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: img, // 分享图标
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                                // console.log("分享成功2");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                // console.log("分享取消2");
                            }
                        });
                    },
                    fail: (err) => {
                        console.log('wxJsApi fail:', err)
                    }
                });
            });

            //必须放wx.ready后面 否则无法执行
            wx.error(function (res) {
                console.log('error', res)
                // alert("config error");
                //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
                // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    })
}

export default wxShare