// Funzioni di utilità

function GetBrowserType() {
var OP,IE4,IE5,NN4,NN6
OP = (window.opera) ? 1:0; 
IE4 = (document.all && !OP) ? 1:0; 
IE5 = (IE4 && document.getElementById) ? 1:0; 
NN4 = (document.layers) ? 1:0; 
NN6 = (!IE4 && !NN4 && document.getElementById) ? 1:0; 
	if (OP) {
		return "OPERA"
	} else if ((IE4) || (IE5)) {
		return "IE"
	} else if ((NN4) || (NN6)) {
		return "NN"
	} else {
		// se e' un browser diverso ritorna come se fosse IE
		return "IE"
	}
}

function GetBrowserVersion() {
var sType = GetBrowserType()
	if ((sType=="OPERA")||(sType=="NN")) {
		return parseFloat(navigator.appVersion)
	} else if (sType=="IE") {
		if (navigator.appName.indexOf("Microsoft") >= 0) {
			// IE
			var iInfo = navigator.appVersion.indexOf("MSIE") + 5
			var sInfo = navigator.appVersion.substring(iInfo)
			return parseFloat(sInfo)
		} else {
			return parseFloat("0.0")
		}
	}
}

function JSQueryString(par) {
var sTemp 
var sPar
var sFin, iStart, iEnd
	sTemp = new String(window.location)
	sPar = new String(par + "=")
	iStart = sTemp.indexOf(sPar)
	if (iStart>0) {
		iFin = sTemp.indexOf("&",iStart)
		if (iFin==-1) {
			//Se non c'è fine allora è l'ultimo
			iFin = sTemp.length
		}
		sFin = sTemp.substring(iStart + sPar.length,iFin)
	} else {
		sFin = ""
	}
	return sFin
}

function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" + 
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

function Stato(msg) {
	window.status = msg
}

function Fix3(valore) {
	return (Math.floor(valore)).toString() + "." + Math.floor(((valore-Math.floor(valore))*1000)).toString()
}

function ConvToFloat(valore) {
	var s1=valore.toString().replace("\,",".")
	return parseFloat(s1)
}

function ShowLayer(lname) {
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
var lay
var vis
    if(ns4) eval("lay=document."+lname)
    else if(ns6) lay = document.getElementById(lname);
    else eval("lay=document.all."+lname)
	if (lay.style) {
		lay.style.visibility="show"
	}
}
// Example: obj = findObj("image1");
function findObj(theObj, theDoc)
{
  var p, i, foundObj;
  
  if(!theDoc) theDoc = document;
  if( (p = theObj.indexOf("?")) > 0 && parent.frames.length)
  {
    theDoc = parent.frames[theObj.substring(p+1)].document;
    theObj = theObj.substring(0,p);
  }
  if(!(foundObj = theDoc[theObj]) && theDoc.all) foundObj = theDoc.all[theObj];
  for (i=0; !foundObj && i < theDoc.forms.length; i++) 
    foundObj = theDoc.forms[i][theObj];
  for(i=0; !foundObj && theDoc.layers && i < theDoc.layers.length; i++) 
    foundObj = findObj(theObj,theDoc.layers[i].document);
  if(!foundObj && document.getElementById) foundObj = document.getElementById(theObj);
  
  return foundObj;
}
// * Dependencies * 
// this function requires the following snippets:
// JavaScript/readable_MM_functions/findObj
//
// Accepts a variable number of arguments, in triplets as follows:
// arg 1: simple name of a layer object, such as "Layer1"
// arg 2: ignored (for backward compatibility)
// arg 3: 'hide' or 'show'
// repeat...
//
// Example: showHideLayers(Layer1,'','show',Layer2,'','hide');
function showHideLayers()
{ 
  var i, visStr, obj, args = showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3)
  {
    if ((obj = findObj(args[i])) != null)
    {
      visStr = args[i+2];
      if (obj.style)
      {
        obj = obj.style;
        if(visStr == 'show') visStr = 'visible';
        else if(visStr == 'hide') visStr = 'hidden';
      }
      obj.visibility = visStr;
    }
  }
}

function invertiLayer(liv) { 
	if ((obj = findObj(liv)) != null) {
		if(obj.style) obj=obj.style
		obj.visibility=='visible'?obj.visibility='hidden':obj.visibility='visible'
	}
}

function invertiDisplayLayer(liv) { 
	if ((obj = findObj(liv)) != null) {
		if(obj.style) obj=obj.style
		obj.display==''?obj.display='none':obj.display=''
	}
}


