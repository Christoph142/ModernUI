window.addEventListener("DOMContentLoaded", function(){
	if(window.self !== window.top) return; // only treat main page not iframes, ads, etc.
	
	injectCSS();
	addUI();
	listen_to_messages();
	requestTabUpdate();

	window.addEventListener("resize", checkIfFullscreen, false);
	window.addEventListener("fullscreenchange", checkIfFullscreen, false);
	window.addEventListener("webkitfullscreenchange", checkIfFullscreen, false);
	checkIfFullscreen();
}, false);

function checkIfFullscreen(){ chrome.runtime.sendMessage({data:"isFullscreen"}, isFullscreen); }
function isFullscreen(msg){
	console.log(msg);
	if 		( msg.isFullscreen === true ) document.getElementById("modern_ui").style.display = "inline";
	else if ( msg.isFullscreen === false) document.getElementById("modern_ui").style.display = null;
}

function injectCSS()
{
	var style = document.createElement("style");
	style.setAttribute("type","text/css");
	style.innerHTML = "\
		#modern_ui { position:fixed; top:-199px; left:0; width:100%; height:200px; z-index:2147483647; border:none; padding:0; margin:0; background:#CC0F16; display:none;}\n\
		#modern_ui:hover{ top:0px; }\n\
		.MUI_tab{ height:100px; width:100px; background:#FFF; float:left; margin-right:5px; }";
	document.getElementsByTagName("head")[0].appendChild(style);
}

function addUI()
{
	var modern_ui = document.createElement("div");
	modern_ui.id = "modern_ui";
	modern_ui.innerHTML = "<div style='width:30px; height:30px; background:#000;' onclick='window.location.reload();'>r</div><input id='modern_ui_addressbar' type='text' style='width:100%; position:absolute; bottom:0px;'>";
	document.documentElement.appendChild(modern_ui);
	
	document.getElementById("modern_ui_addressbar").addEventListener("keydown",function(e){
		if(e.which===13) window.location.href = this.value.match(/^(http)/)? this.value : "http://"+this.value;
	},false);
}

function listen_to_messages()
{
	chrome.runtime.onMessage.addListener( function( msg, sender, sendResponse ){
		console.log(msg);
		if 		( msg.data === "tabs" ) 		updateTabs( msg );
		else if ( msg.data === "isFullscreen") 	isFullscreen( msg );
	});
}

function requestTabUpdate(){ chrome.runtime.sendMessage({ data : "getTabs" }, updateTabs); }
function updateTabs(msg)
{
	var tabs = msg.tabs;
	console.log(tabs);
	for(var nr in tabs)
	{
		var tab = document.createElement("div");
		tab.id = tabs[nr]["id"];
		var icon = (tabs[nr]["favIconUrl"] === "undefined" || tabs[nr]["favIconUrl"] === "" ? "test" : tabs[nr]["favIconUrl"]);
		var title = tabs[nr]["title"];
		tab.innerHTML = "<img src='"+icon+"' alt='"+title+"'>";
		tab.className = "MUI_tab";
		document.getElementById("modern_ui").appendChild(tab);
		tab.addEventListener("click", function(){
			console.log(window.event.target.id, chrome.runtime);
			chrome.runtime.sendMessage({data : "activateTab", id : parseInt(window.event.target.id)});
		}, false);
	}
}