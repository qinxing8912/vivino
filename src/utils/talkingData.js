// talkingData统计平台埋点
export function setSpot(sendMsg, logMsg, kv) {
    try {
        console.log(logMsg)
        window.TDAPP.onEvent(sendMsg, sendMsg, kv)
        return true
    } catch (err) {
        console.log(logMsg + '=>err', err)
        return false
    }
}
