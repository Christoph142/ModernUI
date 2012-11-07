// ==UserScript==
// @name          Modern UI
// @description	  
// @author        Christoph D.
// @exclude http://acid3.acidtests.org/
// @exclude http://www.megalab.it/*
// ==/UserScript==

window.opera.addEventListener("AfterEvent.DOMContentLoaded", function(){
	if(window.self != window.top) return; // only treat main page not iframes, ads, etc.
	
	inject_css();
	add_UI();
	
	on_fullscreen();
	window.addEventListener("resize", on_fullscreen, false);
	opera.extension.postMessage("getTabs");
	opera.extension.onmessage = function(e){ update_tabs(JSON.parse(e.data)); }
	//window.addEventListener("fullscreenchange",function(){ alert("changed"); },false);
},false);

function on_fullscreen(){
	if(window.screen.height === window.outerHeight) document.getElementById("modern_ui").style.display = "inline";
	else document.getElementById("modern_ui").style.display = "none";
}

function inject_css(){
	var style = document.createElement("style");
	style.setAttribute("type","text/css");
	style.innerHTML = "#modern_ui{ position:fixed; top:-199px; left:0; width:100%; height:200px; z-index:2147483647; border:none; padding:0; margin:0; background:#CC0F16; display:none;} #modern_ui:hover{ top:0px; }"+
	".MUI_tab{ height:100px; width:100px; background:#FFF; float:left; margin-right:5px; }";
	document.getElementsByTagName("head")[0].appendChild(style);
}

function add_UI(){
	var modern_ui = document.createElement("div");
	modern_ui.id = "modern_ui";
	modern_ui.innerHTML = "<div style='width:30px; height:30px; background:#000;' onclick='window.location.reload();'>r</div><input id='modern_ui_addressbar' type='text' style='width:100%; position:absolute; bottom:0px;'>";
	document.body.appendChild(modern_ui);
	
	document.getElementById("modern_ui_addressbar").addEventListener("keydown",function(e){
		if(e.which==13) window.location.href = this.value.match(/^(http)/)? this.value : "http://"+this.value;
	},false);
}

function update_tabs(tabs){
	//alert(JSON.stringify(tabs[0]));
	for(var nr in tabs){
		var tab = document.createElement("div");
		tab.id = "MUI_"+nr;//tabs[nr]["id"];
		tab.innerHTML = "<img src='"+tabs[nr]["faviconUrl"]+"'>";
		tab.className = "MUI_tab";
		tab.onclick = function(){ opera.extension.postMessage(this.id.split("_")[1]); };
		document.getElementById("modern_ui").appendChild(tab);
	}
}