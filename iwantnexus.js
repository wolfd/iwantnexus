var currenturl = window.location.href;
var iwantit = jQuery('#body-content > div.details-wrapper.devices.id-track-partial-impression.vs-enabled > div.details-info-wrapper > div > div.info-container > div.details-actions > span.buy-button-container > button');
iwantit.click();

chrome.storage.sync.get({
	refresh_interval:1000
}, function(items) {
	setTimeout(function() { 
		if(window.location.pathname == "/store/cart") { 
			jQuery('#hardware-checkout').click();
			document.getElementById("result").insertAdjacentHTML("beforeEnd", JSON.stringify(res, null, 4) + "\n");
			chrome.storage.sync.get({
				api_key: '',
				devices:[]
			}, function(items) {
				PushBullet.APIKey = items.api_key;
				$.each(items.devices, function(index, device_iden){
					PushBullet.push("link", device_iden, null, {title: "I got you a Nexus 6", url: currenturl});
				});
			});
		} else {
			window.location.reload();
		}
	}, items.refresh_interval);
});


function send_pushes()
{

}