export default function sendToBG(msg,callback){
    return chrome.runtime.sendMessage(msg, callback)
}