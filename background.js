chrome.extension.onMessage.addListener( function(request, sender, sendResponse){
	if(request.data === "getTabs")	sendResponse({ data : chrome.windows.id });
	else //clicked at a tab:
		opera.extension.tabs.getAll()[e.data].focus();
});

//var tabs = {};
/*chrome.windows.getAll({"populate" : true}, function(windows)
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
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {data:"ms_toggle_visibility"});
	});
});*/