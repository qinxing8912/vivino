<template>
    <div class="communitySharing" @click="openMask">
        <div class="suckTop">
            <div class="Sleft">
                <img src="@/assets/communitySharing/logo.png" alt="">
            </div>
            <div class="Scenter">
                <p class="SCtop">唯唯诺App</p>
                <p class="SCbot">让您成为聚会上更懂酒的人</p>
            </div>
            <div class="Sright">打开App</div>
        </div>
        <div class="main">
            <div class="slideShow">
                <van-swipe :autoplay="3000" lazy-render>
                    <van-swipe-item v-for="image in images" :key="image">
                        <img :src="image" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="userInfo">
                <div class="Uleft">
                    <img src="@/assets/communitySharing/logo.png" alt="">
                </div>
                <div class="Ucenter">唯唯诺App让您成为聚会上更懂酒的人</div>
                <div class="Uright">关注</div>
            </div>
            <div class="article">
                <h3 class="Atitle">唯唯诺App让您成为聚人唯唯诺App让您成为聚会上更懂酒的人</h3>
                <div class="Acontent">
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                    唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人唯唯诺App让您成为聚会上更懂酒的人
                </div>
            </div>
            <div class="wine">
                <div class="Winfo">
                    <h4 class="Wname">唯唯诺App让您成为聚人唯唯诺App让您成为聚会上更懂酒的人</h4>
                    <div class="Wfrom">
                        <div class="Wflag">
                            <img src="@/assets/communitySharing/logo.png" alt="">
                        </div>
                        <div class="Waddress">来自 唯唯诺App让您成为聚人唯唯诺App让您成为聚会上更懂酒的人</div>
                    </div>
                    <div class="Wscore">
                        <div class="Waverage"> 4.5 </div>
                        <div class="WstarBox">
                            <div class="Wstar">
                                <van-rate allow-half v-model="value" size="calc(var(--vw)*12)" color="#FCB709" void-icon="star" void-color="#eee" />
                            </div>
                            <p class="Wtotal"> 99999条评价 </p>
                        </div>
                    </div>
                </div>
                <div class="Wimg">
                    <img src="https://vivino-wines.oss-cn-shanghai.aliyuncs.com/images/active/gejhdtp1.png" alt="">
                </div>
            </div>
            <div class="location">
                <div class="Laddress">
                    <img alt="Vue logog" class="logog" src="@/assets/communitySharing/country.svg" width="125" height="125" />
                    <span>昆明市·恒隆写字楼观景天台</span>
                </div>
                <div class="ip">11-10 云南</div>
            </div>
            <div class="uesrBack van-safe-area-bottom">
                <div class="Uinput">
                    <input type="text" placeholder="留下你的精彩评论吧"/>
                </div>
                <div class="reply">
                    <img alt="Vue logog" class="logog" src="@/assets/communitySharing/menu_message.svg" width="125" height="125" />
                    <span>9999</span>
                </div>
                <div class="like">
                    <img alt="Vue logog" class="logog" src="@/assets/communitySharing/reviews_praise.svg" width="125" height="125" />
                    <span>8888</span>
                </div>
            </div>
        </div>
    </div>
    <div class="appOpen">
        <span @click="openMask">App内打开</span>
    </div>
    <div class="mask" v-if="maskState" @click="colseMask">
        <img src="@/assets/communitySharing/pointer.png" alt="" class="arrow">
        <div>
            <p>1、点击右上角 ···</p>
            <p>2、屏幕下方选择 在默认浏览器打开</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { _post, _get } from '@/http/request'
import { api } from "@/http/api";
let maskState = ref(false)
const images = ref([
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-5.jpeg',
]);
const value = ref(4.5);
let list1 = ref([])
let router = useRouter;
let route = useRoute;
const {proxy} = getCurrentInstance()
const newWxShare = proxy.$wxShare;
onMounted(() => {
    // 调用分享
    newWxShare('社区分享','我是一条社区分享',window.location.href,'封面图')
    getUser()
})
// 打开遮罩层
function openMask() {
    // 如果是在微信内正常关闭遮罩层
    // console.log(isWeiXin());
    if (isWeiXin() == true) {
        maskState.value = true;
    } else {// 否则就打开应用市场或者是app
        openAppOrMarket();
    }
}
// 关闭遮罩层
function colseMask() {
    maskState.value = false;
}
// 判断是否是微信浏览器，即是不是在微信内打开的页面
function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}

// 打开app或者是应用市场
function openAppOrMarket() {
    const t = 1000
    const t1 = Date.now()
    const isiOS = /(iPhone|iPad|iPod|IOS)/i.test(window.navigator.userAgent)
    // const ifr = document.createElement('iframe')
    // 下面的是需要跳转到app的schema链接
    // ifr.setAttribute('src', 'vivinochina://')
    // ifr.setAttribute('style', 'display:none')
    // document.body.appendChild(ifr)
    // 跳转详情
    window.location.href = 'vivinochina://activity/deep-link-wine-comments-detail-screen?detailId=${id}&navigatorSource=deep_link_source'
    // 一段时间没有跳转后打开下载
    setTimeout(function () {
        // 启动app时间较长处理
        const t2 = Date.now()
        // document.body.removeChild(ifr)
        if (t2 - t1 < t + 100) {
            console.log('hasApp', false)
            // 没有安装App，跳转到对应的App下载页面。
            if (isiOS) {
                window.location.href = 'https://apps.apple.com/app/apple-store/id1626033731';
            } else {
                window.location.href = 'https://vivino-wines.oss-cn-shanghai.aliyuncs.com/app/vivinocn-app-release.apk';
            }
        } else {
            console.log('hasApp', true)
            // 已经安装App，下面的是需要跳转到app的schema链接。
            window.location.href = 'vivinochina://activity/deep-link-wine-comments-detail-screen?detailId=${id}&navigatorSource=deep_link_source'
        }
    }, t)
}
// 获取App跳转过来URL后的参数
function getParameter() {
    const url = decodeURI(window.location.search); //获取Url ？后的参数并解码
    let obj = {};
    if (url.indexOf('?') !== -1) { //url中存在问号，也就说有参数。
        let str = url.substring(1); //得到?后面的字符串
        let strs = str.split('&'); //将得到的参数分隔成数组[id="123456",name="www"];
        for (let i = 0; i < strs.length; i++) {
            obj[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
        return obj;
    }
}
// 获取用户信息
function getUser() {
    let data = {
        page: 1,
        size: 10
    }
    _get(api.getCommentJoinInfo, data).then((res) => {
        console.log(res);
        list1.value = res.data
    })
    let abc = getParameter()
    console.log(abc.ie);
}
</script>

<style scoped>
.communitySharing{
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.suckTop{
    width: 100vw;
    height: calc(var(--vw)*56);
    background-color: rgba(24, 24, 24, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: calc(var(--vw)*14);
}
.suckTop .Sleft,.suckTop .Sleft img{
    width: calc(var(--vw)*40);
    height: calc(var(--vw)*40);
}
.suckTop .Sleft{
    margin-left: calc(var(--vw)*16);
    margin-right: calc(var(--vw)*16);
}
.suckTop .Scenter{
    width: calc(var(--vw)*207);
}
.suckTop .Scenter .SCbot{
    font-size: calc(var(--vw)*12);
}
.suckTop .Sright{
    width: calc(var(--vw)*80);
    height: calc(var(--vw)*20);
    line-height: calc(var(--vw)*20);
    text-align: center;
    background-color: #B81728;
    border-radius: calc(var(--vw)*32);
    margin-right: calc(var(--vw)*16);
}
.main{
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.slideShow,.slideShow img{
    width: 100vw;
    height: calc(var(--vw)*500);
}
.slideShow :deep(.van-swipe__indicator){
    width: calc(var(--vw)*4);
    height: calc(var(--vw)*4);
    background-color: rgba(255, 255, 255, 0.4);
}
.slideShow :deep(.van-swipe__indicator--active){
    background-color: #fff;
}
.userInfo{
    /* width: 100vw; */
    height: calc(var(--vw)*56);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: calc(var(--vw)*14);
    margin: calc(var(--vw)*12) calc(var(--vw)*16) 0;
    padding-bottom: calc(var(--vw)*12);
    border-bottom: calc(var(--vw)*1) solid #EEEEEE;
}
.userInfo .Uleft,.userInfo .Uleft img{
    width: calc(var(--vw)*48);
    height: calc(var(--vw)*48);
    border-radius: 50%;
}
.userInfo .Uleft{
    /* margin-left: calc(var(--vw)*16); */
    margin-right: calc(var(--vw)*16);
}
.userInfo .Ucenter{
    font-size: calc(var(--vw)*16);
    color: #1B1B1B;
    width: calc(var(--vw)*193);
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.userInfo .Uright{
    width: calc(var(--vw)*70);
    height: calc(var(--vw)*30);
    line-height: calc(var(--vw)*30);
    text-align: center;
    background-color: #B81728;
    border-radius: calc(var(--vw)*32);
    margin-left: calc(var(--vw)*16);
}
.article{
    margin: calc(var(--vw)*12) calc(var(--vw)*16);
    color: #1B1B1B;
}
.Atitle{
    font-size: calc(var(--vw)*16);
    margin-bottom: calc(var(--vw)*12);
    text-align: center;
}
.Acontent{
    font-size: calc(var(--vw)*14);
}
.wine{
    box-shadow: calc(var(--vw)*0) calc(var(--vw)*2) calc(var(--vw)*8) rgba(27, 27, 27, 0.04);
    border-radius: calc(var(--vw)*12);
    margin: calc(var(--vw)*12) calc(var(--vw)*16) calc(var(--vw)*14);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
}
.wine .Winfo{
    width: calc(var(--vw)*247);
    margin-left: calc(var(--vw)*12);
}
.wine .Winfo .Wname{
    color: #1B1B1B;
    font-size: calc(var(--vw)*17);
    margin-top: calc(var(--vw)*10);
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.wine .Winfo .Wfrom,.wine .Winfo .Wscore{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
}
.wine .Winfo .Wfrom .Wflag img{
    width: calc(var(--vw)*12);
    height: calc(var(--vw)*12);
    border-radius: 50%;
    margin-right: calc(var(--vw)*4);
}
.wine .Winfo .Wfrom .Waddress{
    color: #979797;
    font-size: calc(var(--vw)*12);
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.wine .Winfo .Wscore .Waverage{
    font-size: calc(var(--vw)*16);
    color: #1B1B1B;
    margin-right: calc(var(--vw)*8);
}
.wine .Winfo .Wscore .WstarBox{
    font-size: calc(var(--vw)*12);
    color: #979797;
}
.wine .Wimg{
    width: calc(var(--vw)*60);
    height: calc(var(--vw)*100);
    margin: calc(var(--vw)*4) calc(var(--vw)*12);
    border: 2px solid #FFFFFF;
    border-radius: calc(var(--vw)*8);
    filter: drop-shadow(calc(var(--vw)*0) calc(var(--vw)*-1) calc(var(--vw)*4) rgba(27, 27, 27, 0.1)) drop-shadow(calc(var(--vw)*0) calc(var(--vw)*1) calc(var(--vw)*1) rgba(27, 27, 27, 0.1));
}
.wine .Wimg img{
    border-radius: calc(var(--vw)*8);
    width: 100%;
    height: 100%;
}

.location{
    font-size: calc(var(--vw)*12);
    color: #979797;
    margin: calc(var(--vw)*12) calc(var(--vw)*16);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.location .Laddress{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 70vw;
}
.location .Laddress img{
    width: calc(var(--vw)*16);
    height: calc(var(--vw)*16);
    margin-right: calc(var(--vw)*4);
}
.location .Laddress span{
    display: inline-block;
    width: 60vw;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.uesrBack{
    height: calc(var(--vw)*60);
    padding: 0 calc(var(--vw)*16);
    border-top: calc(var(--vw)*0.5) solid #F7F7F7;
    display: flex;
    flex-direction: row;
}
.uesrBack .Uinput{
    width: calc(var(--vw)*257);
    height: calc(var(--vw)*36);
    margin: calc(var(--vw)*12) 0;
}
.uesrBack .Uinput input{
    width: 100%;
    height: 100%;
    padding: 0 calc(var(--vw)*16);
    background-color: #F7F7F7;
    border: none;
    border-radius: calc(var(--vw)*20);
}
.uesrBack .Uinput input::placeholder{
    font-size: calc(var(--vw)*12);
    color: #bbb;
}
.uesrBack .reply,.uesrBack .like{
    height: calc(var(--vw)*36);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: calc(var(--vw)*15);
    margin-left: calc(var(--vw)*16);
    font-size: calc(var(--vw)*12);
    color: #979797;
}
.uesrBack .reply img,.uesrBack .like img{
    width:  calc(var(--vw)*18);
    height:  calc(var(--vw)*18);
}
.appOpen{
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: calc(var(--vw)*48);
}
.appOpen span{
    display: inline-block;
    width: calc(var(--vw)*120);
    height: calc(var(--vw)*36);
    line-height: calc(var(--vw)*36);
    text-align: center;
    color: #fff;
    font-size: calc(var(--vw)*14);
    background-color: #B81728;
    border-radius: calc(var(--vw)*32);
}
.mask{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
}
.mask .arrow{
    width: calc(var(--vw)*96);
    height: calc(var(--vw)*238);
    position: absolute;
    top: calc(var(--vw)*16);
    right: calc(var(--vw)*24);
}
.mask div{
    font-size: calc(var(--vw)*16);
    color: #fff;
    margin-top: calc(var(--vw)*274);
    margin-left: calc(var(--vw)*62);
}
</style>