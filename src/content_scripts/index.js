import sendToBG from "../utils/sendToBG";

console.log('vite_content_scripts');

sendToBG({cmd: "content_to_bg"}, res => {
    console.log(res)
})

// chrome.runtime.sendMessage({cmd: "content_to_bg"}, res => {
//     console.log(res)
// })
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log(request)
// })