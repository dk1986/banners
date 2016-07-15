window.onload = initComponent;

/*===================================================
 * PAGE-AD HTML TEMPLATE 3.0
 *===================================================
 * How to use:
 * --------------------------------------------------
 * 1. FUNCTIONS
 * --------------------------------------------------
 * The below functions can be used for Page-Ad functionality.
 *
 * -=| AdLanticHPTO_Click(event) |=-
 * This function can be called to open the default landing page, as specified in the Page-Ad system.
 * Note that the event of the click must always be passed for heatmap functionality.
 *
 * -=| AdLanticHPTO_OpenUrl(url, event) |=-
 * This function can be called to open a specific landing page.
 * The 'url' parameter is the page you want to navigate to and the 'event' parameter is the click event.
 * This must always be passed for heatmap functionality.
 *
 * -=| AdLanticHPTO_GetComponentSize(name) |=-
 * You can call this function to request Page-Ad about the size of a certain component.
 * This will give you the current size of the component that is displayed on screen.
 * The 'name' parameter takes one of the following:
 * - header
 * - left
 * - right
 * - footer
 * The answer will be sent to the 'ADL_OnSizeRequest' function as specified below.
 *
 * -=| AdLanticHPTO_SendMessage(name, message) |=-
 * This is used to send a string message to another component.
 * Use this to synchronise animations, or maybe even send detailed JSON strings to other components.
 * The 'name' parameter takes one of the names specified below:
 * - header
 * - left
 * - right
 * - footer
 * - lightbox
 * - leaderboard
 * - billboard
 * The 'message' parameter is the message you want to send.
 * The answer will be sent to the 'ADL_OnGetMessage' function as specified below.
 *
 * -=| AdLanticHPTO_VideoPrivileges() |=-
 * Using this will tell you what you're allowed to do with video on the current website.
 * This will allow you to build a Page-Ad with video and only show it when allowed by the website.
 * The answer will be sent to the 'ADL_OnGetVidPrivileges' function as specified below.
 *
 * -=| AdLanticHPTO_ExpandOuter(name) |=-
 * NOTE: This functionality will only work if 'Expandables' is configured in the Page-Ad system.
 * Call this function to expand a component of choice.
 * The 'name' parameter takes one of the following:
 * - header
 * - left
 * - right
 * - footer
 *
 * -=| AdLanticHPTO_CollapseOuter(name) |=-
 * NOTE: This functionality will only work if 'Expandables' is configured in the Page-Ad system.
 * Call this function to collapse an expanded component of choice.
 * The 'name' parameter takes one of the following:
 * - header
 * - left
 * - right
 * - footer
 *
 * --------------------------------------------------
 * 2. OPTIONAL CALLBACKS
 * --------------------------------------------------
 * The below callbacks can be added to your code (optionally).
 * When they're called and what they do, is described below.
 *
 * -=| ADL_OnGetVidPrivileges(privilege) |=-
 * After requesting video privileges through use of 'AdLanticHPTO_VideoPrivileges' as described above,
 * the answer will be returned in this function, if it exists in your code.
 * The answer will be one of the below:
 * - user		Video is allowed, but only user-initiated.
 * - allow		Video is allowed.
 * - refuse		Video is not allowed.
 *
 * --------------------------------------------------
 * 3. STATISTICS
 * --------------------------------------------------
 * The below functions can be used to register statistics (optionally).
 * What they register and how to use them, is described below.
 *
 * -=| AdLanticHPTO_LogVideoEvent(vidEvent) |=-
 * This function can be called every time you want to register a video event.
 * Be sure to also use the "pause" when you're using the "play" even, for both pausing and when the video is done playing.
 * The events names you can pass to this function as string values are:
 * - play           Video has started playing.
 * - pause		    Video has stopped playing.
 * - mute           Video was muted.
 * - unmute         Video was unmuted.
 * - fullscreen		Video was set to fullscreen.
 * - smallscreen	Video was set to normal size.
 */

function ADL_PostMessage(){window.top.postMessage(JSON.stringify(postMessageData),"*")}function getAdlClickData(){postMessageData.f="ADL_HPTO_getClickData",ADL_PostMessage()}function AdLanticHPTO_Click(e){e=e||window.event,null==defaultClick?(postMessageData.f="ADL_HPTO_getClickData",ADL_PostMessage()):(window.open(defaultClick,"_blank"),postMessageData.f="ADL_HPTO_addContentClick",postMessageData.pos={x:e.clientX||e.stageX,y:e.clientY||e.stageY},ADL_PostMessage())}function AdLanticHPTO_OpenUrl(e,t){null==clickPrefix?(postMessageData.f="ADL_HPTO_getClickData",ADL_PostMessage()):(window.open(clickPrefix+e.replace("${PUB_DOM}",referrer),"_blank"),postMessageData.f="ADL_HPTO_addContentClick",postMessageData.pos={x:t.clientX||t.stageX,y:t.clientY||t.stageY},ADL_PostMessage())}function AdLanticHPTO_GetTimeLimit(){postMessageData.f="ADL_HPTO_getTimeLimit",ADL_PostMessage()}function AdLanticHPTO_GetComponentSize(e){postMessageData.f="ADL_HPTO_getComponentSize",postMessageData.n=e,ADL_PostMessage()}function AdLanticHPTO_SendMessage(e,t){postMessageData.f="ADL_HPTO_sendMessage",postMessageData.n=e,postMessageData.m=t,ADL_PostMessage()}function AdLanticHPTO_VideoPrivileges(){postMessageData.f="ADL_HPTO_getVideoPrivileges",ADL_PostMessage()}function AdLanticHPTO_ExpandOuter(e){postMessageData.f="ADL_HPTO_expandOuter",postMessageData.n=e,ADL_PostMessage()}function AdLanticHPTO_CollapseOuter(e){postMessageData.f="ADL_HPTO_collapsedOuter",postMessageData.n=e,ADL_PostMessage()}function AdLanticHPTO_LogVideoEvent(e){postMessageData.f="AdLanticHPTO_logVideoEvent",postMessageData.e=e,ADL_PostMessage()}function ADL_HPTO_onMessage(e){try{if("ADL_HPTO_CHILD"==JSON.parse(e.data).c){var t=JSON.parse(e.data);switch(t.f){case"ADL_HPTO_setClickData":referrer=t.ref,defaultClick=t["default"].replace("${PUB_DOM}",referrer),clickPrefix=t.track;break;case"ADL_HPTO_setTimeLimit":parseInt(t.t)>0&&setTimeout(function(){"function"==typeof ADL_OnPageAdStop&&ADL_OnPageAdStop()},1e3*parseInt(t.t));break;case"ADL_HPTO_setComponentSize":"function"==typeof ADL_OnSizeRequest&&ADL_OnSizeRequest(t.n,t.s);break;case"ADL_HPTO_receiveMessage":"function"==typeof ADL_OnGetMessage&&ADL_OnGetMessage(t.m);break;case"ADL_HPTO_setVideoPrivileges":"function"==typeof ADL_OnGetVidPrivileges&&ADL_OnGetVidPrivileges(t.p)}}}catch(a){}}var postMessageData={c:"ADL_HPTO_TOP",l:window.location.href},defaultClick=null,clickPrefix=null,referrer=null;getAdlClickData(),AdLanticHPTO_GetTimeLimit(),window.addEventListener("message",ADL_HPTO_onMessage,!1);

var ad;

function initComponent() {
	/* START HERE
	 * This will be your entry point to start coding.
	 */
	ad = document.getElementById("ad");

	// Adds a listener for resize events.
	window.onresize = adl_onPageResize;
	setTimeout(adl_onPageResize, 100);

	var tl = new TimelineMax();
	var pl = new TimelineMax();


// set base for elements
 TweenMax.set(["#overlay"],{clip:"rect(0px,0px,600px,0px)",/*x:-800,*/ autoAlpha:0});
  // TweenMax.set([".chickenFlag", ".flag"],{autoAlpha:0});
TweenMax.set([".chickenFlag", ".flag"],{clip:"rect(0px,0px,1105px,900px)"});
 TweenMax.set(["#overlay", ".bigTastyText"],{autoAlpha:0});


 TweenMax.set([".tijdelijk_btn", ".vindRestaurant"],{autoAlpha:0, x:-70});


//start animation
//tl.to("#bigTastyChicken", 1, {x: 0, autoAlpha:1, ease:Power1.easeInOut})
tl.to("#overlay", 2.2, {clip:"rect(0px,1590px,1105px,0px)", autoAlpha:1, ease:Power2.easeInOut})

tl.to(".bigTastyText", 2, { autoAlpha:1, ease:Power2.easeInOut}, -.1)

// tl.to([".chickenFlag", ".flag"], 2, {x:0, autoAlpha:1, ease:Power3.easeInOut}, .4)
tl.to([".chickenFlag", ".flag"], 2, {clip:"rect(0px,1800px,600px,0px)", autoAlpha:1, ease:Power2.easeInOut},-.2)


tl.to(".tijdelijk_btn", .5, { autoAlpha:1, x:0, ease:Power3.easeInOut}, 2.1)

// tl.fromTo(".tijdelijk_btn", .6, {rotationY:90}, {rotationY:-90, ease: Linear.easeNone})
// tl.fromTo(".tijdelijk_btn-back", .8, {rotationY:-90}, {rotationY:-270, ease: Linear.easeNone})
// tl.fromTo(".tijdelijk_btn", .6, {rotationY:-270}, {rotationY:-360, ease: Power1.easeOut})

tl.to(".vindRestaurant", .5, { autoAlpha:1, x:0, ease:Power2.easeOut})



//tl.to( ".flag", 2, {clip:"rect(0px,1590px,1105px,0px)", autoAlpha:1, ease:Power2.easeInOut})
}

function adl_onPageResize(){
	/* This function will be called whenever this component resizes and first loads.
	 * Use this function to handle whatever you need to happen when the component changes size.
	 */
}

function ADL_OnPageAdStop() {
	/* This function will be called when the Page-Ad is required to stop due to website requirements.
	 * Use this function to stop all your animations and make sure the animation ends nicely when it does.
	 */
}

function ADL_OnGetMessage(message) {
	/* Whenever a message is sent to this component through use of 'AdLanticHPTO_SendMessage' as described
	 * above, it will be returned in this function.
	 * The 'message' parameter is the message as a String value.
	 */
}

function ADL_OnSizeRequest(name, size) {
	/* This function  will be called after you have used 'AdLanticHPTO_GetComponentSize'
	 * as described above.
	 * The 'name' parameter will be the name of the component you have requested the size of and the 'size'
	 * parameter will be the size as a string, for example '430x990'.
	 * You can use 'size.split("x")[0]' to only get the width or 'size.split("x")[1]' for the height.
	 */
}
