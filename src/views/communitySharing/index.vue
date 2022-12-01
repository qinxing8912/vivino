<template>
    <div class="communitySharing" @click="openMask">
        <div class="main" v-if="userInfo !== '' && userInfo !== undefined && userInfo !== null">
            <div class="suckTop">
                <div class="Sleft">
                    <img src="@/assets/communitySharing/logo.png" alt="">
                </div>
                <div class="Scenter">
                    <p class="SCtop">唯唯诺App</p>
                    <p class="SCbot">让您成为聚会上更懂酒的人</p>
                </div>
                <div class="Sright" @click="openApp">打开App</div>
            </div>
            <div class="slideShow" v-if="userInfo.fileList.length > 0">
                <van-swipe lazy-render>
                    <van-swipe-item v-for="image in userInfo.fileList" :key="image.uuid">
                        <img :src="fileAddress + image.uuid" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="userInfo">
                <div class="Uleft">
                    <img :src="fileAddress + userInfo.avatarUUID" alt="">
                </div>
                <div class="Ucenter">{{ userInfo.username }}</div>
                <div class="Uright">关注</div>
            </div>
            <div class="article">
                <h3 class="Atitle">{{ userInfo.title }}</h3>
                <div class="Acontent">{{ userInfo.comment }}</div>
            </div>
            <div class="wine" v-if="(userInfo.wine !== '' && userInfo.wine.id !== null)">
                <div class="Winfo">
                    <h4 class="Wname">{{ userInfo.wine.name }}</h4>
                    <div class="Wfrom">
                        <!--<div class="Wflag">
                            <img src="@/assets/communitySharing/logo.png" alt="">
                        </div> -->
                        <div class="Waddress">
                            来自{{ userInfo.wine.countryName + '·' + userInfo.wine.regionName + '·' + userInfo.wine.wineryName }}
                        </div>
                    </div>
                    <div class="Wscore">
                        <div class="Waverage">{{ userInfo.wine.rate }}</div>
                        <div class="WstarBox">
                            <div class="Wstar">
                                <van-rate allow-half readonly v-model="userInfo.wine.rate" size="calc(var(--vw)*12)" color="#FCB709" void-icon="star" void-color="#eee"></van-rate>
                            </div>
                            <p class="Wtotal">{{ userInfo.wine.numOfRate }}条评价</p>
                        </div>
                    </div>
                </div>
                <div class="Wimg">
                    <img :src="userInfo.wine.bottleImg" alt="">
                </div>
            </div>
            <div class="location">
                <div class="Laddress">
                    <img class="logog" alt="" src="@/assets/communitySharing/country.svg" width="125" height="125" v-if="userInfo.publishAddress !== ''">
                        <span>{{ userInfo.publishAddress }}</span>
                    </div>
                <div class="ip">{{ userInfo.commentDate }} {{ userInfo.userIpAddress }}</div>
            </div>
            <div class="uesrBack van-safe-area-bottom">
                <div class="Uinput"><input type="text" placeholder="留下你的精彩评论吧" disabled></div>
                <div class="reply">
                    <img class="logog" alt src="@/assets/communitySharing/menu_message.svg" width="125" height="125">
                    <span>{{ userInfo.replyCount > 999 ? '999+' : userInfo.replyCount }}</span>
                </div>
                <div class="like">
                    <img class="logog" alt src="@/assets/communitySharing/reviews_praise.svg" width="125" height="125">
                    <span>{{ userInfo.thumbCount > 999 ? '999+' : userInfo.thumbCount }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="appOpen"><span @click="inApp">App内打开</span></div>
    <div class="mask" v-if="maskState" @click="colseMask">
        <img class="arrow" src="@/assets/communitySharing/pointer.png" alt>
        <div>
            <p>1、点击右上角 ···</p>
            <p>2、屏幕下方选择 在默认浏览器打开</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { fileAddress } from '@/http/index'
import { _post, _get } from '@/http/request'
import { api } from "@/http/api";
import { setSpot } from "@/utils/talkingData";

const { proxy } = getCurrentInstance();
const newWxShare = proxy.$wxShare;

let urlParameter = ref();//URL后的参数
let userInfo = ref(); //详情数据
let maskState = ref(false); //遮罩层状态
let timer = ref(); //定时器

onMounted(() => {
    // 埋点
    setSpot('动态详情分享', '动态详情分享');
    // 保存页面url用于分享
    setUrl();
    // 获取参数
    getParameter();
})
// 进入页面存储页面路径
function setUrl() {
    let userAgent = navigator.userAgent
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        sessionStorage.setItem('originUrl', window.location.href) // 用于ios分享
        // console.log(window.location.href);
    }
}
// 打开遮罩层
function openMask() {
    // 如果是在微信内正常关闭遮罩层
    // console.log(isWeiXin());
    if (isWeiXin() == true) {
        maskState.value = true;
        let mo = function (e) {
            e.preventDefault();
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', mo, false); //禁止页面滑动
    } else {// 否则就打开应用市场或者是app
        // commentUnionId其实就是gatherId
        openAppOrMarket(urlParameter.value.gatherId,urlParameter.value.reqType);
    }
}
// 关闭遮罩层
function colseMask() {
    maskState.value = false;
    let mo = function (e) {
        console.log(e);
        e.preventDefault();
    }
    document.body.style.overflow = ''; //出现滚动条
    document.addEventListener('touchmove', mo, false);
}
// 判断是否是微信浏览器，即是不是在微信内打开的页面
function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}
// 打开app或者是应用市场
function openAppOrMarket(id, type) {
    timer = setTimeout(() => {
        const isiOS = /(iPhone|iPad|iPod|IOS)/i.test(window.navigator.userAgent)
        // 下载地址
        if (isiOS) {
            window.location.href = 'https://apps.apple.com/app/apple-store/id1626033731';
        } else {
            window.location.href = 'https://vivino-wines.oss-cn-shanghai.aliyuncs.com/app/vivinocn-app-release.apk';
        }
    }, 3000)
    // 打开特定的详情页面
    console.log(`vivinochina:///deep-link-wine-comments-detail-screen?detailId=${id}&type=${type}`);
    window.location.href = `vivinochina:///deep-link-wine-comments-detail-screen?detailId=${id}&type=${type}`
    watchVisibility();
}
// 如果页面隐藏了，则表示唤起成功，这时候需要清除下载定时器
function watchVisibility() {
    window.addEventListener('visibilitychange', () => {
        // 监听页面visibility
        if (document.hidden) {
            // 如果页面隐藏了，则表示唤起成功，这时候需要清除下载定时器
            clearTimeout(timer)
            console.log('visibilitychange');
        }
    })
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
        console.log(obj);
        urlParameter.value = obj;
        // return obj;
        getUser(obj.gatherId, obj.reqType, obj.userUUID)
    }
}
// 获取用户信息
function getUser(id, type, uuid) {
    let data = {
        dynamicId: id,
        gatherId: id,
        reqType: type,
        userUUID: uuid
    }
    _get(api.queryCommunityCommonInfoWeb, data).then((res) => {
        console.log(res);
        if (res.code === 200) {
            // 截取日期 月日
            res.data.commentDate = res.data.commentDate.substring(5);
            // 转为数字并保留一位小数
            // res.data.wine.rate = Number(res.data.wine.rate);
            userInfo.value = res.data;

             // 调用分享
            // console.log(fileAddress+res.data.fileList[0].uuid);
            // 判断是否有标题，
            if (res.data.title !== '') {
                if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
                    newWxShare(res.data.title, res.data.comment, sessionStorage.getItem('originUrl'), fileAddress+res.data.fileList[0].uuid)
                } else {
                    newWxShare(res.data.title, res.data.comment, window.location.href, fileAddress+res.data.fileList[0].uuid)
                }
            } else {
                if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
                    newWxShare(res.data.comment, '', sessionStorage.getItem('originUrl'), fileAddress+res.data.fileList[0].uuid)
                } else {
                    newWxShare(res.data.comment, '', window.location.href, fileAddress+res.data.fileList[0].uuid)
                }
            }
        }
    })
}
// 埋点-打开App
function openApp() {
    openMask();
    const isiOS = /(iPhone|iPad|iPod|IOS)/i.test(window.navigator.userAgent)
    if (isiOS) {
        const kv = {
            'source': 'H5动态分享页',
            'os': 'ios'
        }
        setSpot('打开App', '打开App ', kv)
    } else {
        const kv = {
            'source': 'H5动态分享页',
            'os': 'android'
        }
        setSpot('打开App', '打开App ', kv)
    }

}
// 埋点-App内打开
function inApp() {
    openMask();
    const isiOS = /(iPhone|iPad|iPod|IOS)/i.test(window.navigator.userAgent)
    if (isiOS) {
        const kv = {
            'source': 'H5动态分享页',
            'os': 'ios'
        }
        setSpot('App内打开', 'App内打开', kv)
    } else {
        const kv = {
            'source': 'H5动态分享页',
            'os': 'android'
        }
        setSpot('App内打开', 'App内打开', kv)
    }
}
</script>

<style scoped>
.communitySharing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    /* height: 100vh; */
    overflow: hidden;
}

.main {
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
}

.suckTop {
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

.suckTop .Sleft,
.suckTop .Sleft img {
    width: calc(var(--vw)*40);
    height: calc(var(--vw)*40);
}

.suckTop .Sleft {
    margin-left: calc(var(--vw)*16);
    margin-right: calc(var(--vw)*16);
}

.suckTop .Scenter {
    width: calc(var(--vw)*207);
}

.suckTop .Scenter .SCbot {
    font-size: calc(var(--vw)*12);
}

.suckTop .Sright {
    width: calc(var(--vw)*80);
    height: calc(var(--vw)*20);
    line-height: calc(var(--vw)*20);
    text-align: center;
    background-color: #B81728;
    border-radius: calc(var(--vw)*32);
    margin-right: calc(var(--vw)*16);
}

.slideShow,
.slideShow img {
    width: 100vw;
    height: calc(var(--vw)*500);
}

.slideShow :deep(.van-swipe__indicator) {
    width: calc(var(--vw)*4);
    height: calc(var(--vw)*4);
    background-color: rgba(255, 255, 255, 0.4);
}

.slideShow :deep(.van-swipe__indicator--active) {
    background-color: #fff;
}

.userInfo {
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

.userInfo .Uleft,
.userInfo .Uleft img {
    width: calc(var(--vw)*48);
    height: calc(var(--vw)*48);
    border-radius: 50%;
}

.userInfo .Uleft {
    /* margin-left: calc(var(--vw)*16); */
    margin-right: calc(var(--vw)*16);
}

.userInfo .Ucenter {
    font-size: calc(var(--vw)*16);
    color: #1B1B1B;
    width: calc(var(--vw)*193);
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /*规定段落中的文本不进行换行 */
}

.userInfo .Uright {
    width: calc(var(--vw)*70);
    height: calc(var(--vw)*30);
    line-height: calc(var(--vw)*30);
    text-align: center;
    background-color: #B81728;
    border-radius: calc(var(--vw)*32);
    margin-left: calc(var(--vw)*16);
}

.article {
    margin: calc(var(--vw)*12) calc(var(--vw)*16);
    color: #1B1B1B;
}

.Atitle {
    font-size: calc(var(--vw)*16);
    margin-bottom: calc(var(--vw)*12);
    text-align: center;
}

.Acontent {
    font-size: calc(var(--vw)*14);
}

.wine {
    box-shadow: calc(var(--vw)*0) calc(var(--vw)*2) calc(var(--vw)*8) rgba(27, 27, 27, 0.04);
    border-radius: calc(var(--vw)*12);
    margin: calc(var(--vw)*12) calc(var(--vw)*16) calc(var(--vw)*14);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
}

.wine .Winfo {
    width: calc(var(--vw)*247);
    margin-left: calc(var(--vw)*12);
}

.wine .Winfo .Wname {
    color: #1B1B1B;
    font-size: calc(var(--vw)*17);
    margin-top: calc(var(--vw)*10);
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /*规定段落中的文本不进行换行 */
}

.wine .Winfo .Wfrom,
.wine .Winfo .Wscore {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
}

.wine .Winfo .Wfrom .Wflag img {
    width: calc(var(--vw)*12);
    height: calc(var(--vw)*12);
    border-radius: 50%;
    margin-right: calc(var(--vw)*4);
}

.wine .Winfo .Wfrom .Waddress {
    color: #979797;
    font-size: calc(var(--vw)*12);
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /*规定段落中的文本不进行换行 */
}

.wine .Winfo .Wscore .Waverage {
    width: calc(var(--vw)*24);
    text-align: center;
    font-size: calc(var(--vw)*16);
    color: #1B1B1B;
    margin-right: calc(var(--vw)*8);
}

.wine .Winfo .Wscore .WstarBox {
    font-size: calc(var(--vw)*12);
    color: #979797;
}

.wine .Wimg {
    width: calc(var(--vw)*60);
    height: calc(var(--vw)*100);
    margin: calc(var(--vw)*4) calc(var(--vw)*12);
    border: 2px solid #FFFFFF;
    border-radius: calc(var(--vw)*8);
    filter: drop-shadow(calc(var(--vw)*0) calc(var(--vw)*-1) calc(var(--vw)*4) rgba(27, 27, 27, 0.1)) drop-shadow(calc(var(--vw)*0) calc(var(--vw)*1) calc(var(--vw)*1) rgba(27, 27, 27, 0.1));
}

.wine .Wimg img {
    border-radius: calc(var(--vw)*8);
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.location {
    font-size: calc(var(--vw)*12);
    color: #979797;
    margin: calc(var(--vw)*12) calc(var(--vw)*16);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.location .Laddress {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 70vw;
}

.location .Laddress img {
    width: calc(var(--vw)*16);
    height: calc(var(--vw)*16);
    margin-right: calc(var(--vw)*4);
}

.location .Laddress span {
    display: inline-block;
    width: 60vw;
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /*规定段落中的文本不进行换行 */
}

.uesrBack {
    height: calc(var(--vw)*60);
    padding: 0 calc(var(--vw)*16);
    border-top: calc(var(--vw)*0.5) solid #F7F7F7;
    display: flex;
    flex-direction: row;
}

.uesrBack .Uinput {
    width: calc(var(--vw)*257);
    height: calc(var(--vw)*36);
    margin: calc(var(--vw)*12) 0;
}

.uesrBack .Uinput input {
    width: 100%;
    height: 100%;
    padding: 0 calc(var(--vw)*16);
    background-color: #F7F7F7;
    border: none;
    border-radius: calc(var(--vw)*20);
}

.uesrBack .Uinput input::placeholder {
    font-size: calc(var(--vw)*12);
    color: #bbb;
}

.uesrBack .reply,
.uesrBack .like {
    width: calc(var(--vw)*27);
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

.uesrBack .reply img,
.uesrBack .like img {
    width: calc(var(--vw)*18);
    height: calc(var(--vw)*18);
}

.appOpen {
    width: 100%;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: calc(var(--vw)*48);
    z-index: 100;
}

.appOpen span {
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

.mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7);
}

.mask .arrow {
    width: calc(var(--vw)*96);
    height: calc(var(--vw)*238);
    position: absolute;
    top: calc(var(--vw)*16);
    right: calc(var(--vw)*24);
}

.mask div {
    font-size: calc(var(--vw)*16);
    color: #fff;
    margin-top: calc(var(--vw)*274);
    margin-left: calc(var(--vw)*62);
}
</style>