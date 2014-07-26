var currentWindow = {};

function updateTabs(){
	chrome.windows.getCurrent({"populate" : true}, function(w){
		currentWindow = w;
	});
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
	updateTabs();
	if		(request.data === "getTabs")		sendResponse({ data : "tabs", tabs : currentWindow.tabs });
	else if (request.data === "isFullscreen") 	sendResponse({ data : "isFullscreen", isFullscreen : (currentWindow.state === "fullscreen" ? true : false) });
	else if (request.data === "activateTab") 	chrome.tabs.update(request.id, {active: true});
});