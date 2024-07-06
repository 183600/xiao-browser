// chrome.runtime.onConnect.addListener((port) => {
//     port.onMessage.addListener(function(msg){
//         console.log(msg);
//     })
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if(request.cmd === 'content_to_bg'){
        sendResponse({res:'bg_to_content'})
    }
})