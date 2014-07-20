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

/*chrome.windows.getAll(
{
	for(var i in windows)
	{
	  for(var j in windows[i].tabs)
	  {
		original.push(new tabInfo(windows[i].tabs[j], j));
		alert(original[i*j].tab.title);
		original[i*j].tab.title = tab.title;
		original[i*j].tab.url = tab.url;
		original[i*j].tab.status = tab.status;
		original[i*j].count = 0;

		localstorage.setitem["tab.title"];
		localstorage.setitem["tab.url"];
		localstorage.setitem["tab.status"];
	   }
	}
});*/