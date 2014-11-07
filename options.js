var devices = [];

$("#save").click(function(e) {
	devices = [];
	$(".devices").filter(':checked').each(function(index, element) {
		devices.push($(element).val());
	});
	
	chrome.storage.sync.set({
		refresh_interval: $("#refresh_interval").val(),
		api_key: $("#api_key").val(),
		devices: devices
	});
	
	PushBullet.APIKey = $("#api_key").val();
	load_devices(devices);
});

chrome.storage.sync.get({
	api_key: '',
	devices:[],
	refresh_interval:1000
}, function(items) {
	$("#api_key").val(items.api_key);
	$("#refresh_interval").val(items.refresh_interval);
	PushBullet.APIKey = items.api_key;
	devices = items.devices;
	load_devices();
});

function load_devices()
{
	$("#devices").empty().append(
		$("<div>").append("DO NOT SELECT CHROME DEVICES OR YOU MAY END UP IN A NEVERENDING LOOP")
	);
	PushBullet.devices(function(err, res) {
		if(err) {
			throw err;
		} else {
			$.each(res.devices, function(index, device)
			{
				$("#devices").append(
					$("<div>").append(
						$("<input>").attr("type", "checkbox").addClass("devices").attr("id",device.iden).val(device.iden).prop('checked', devices.indexOf(device.iden) !== -1)
					).append(
						$("<label>").attr("for",device.iden).append(device.nickname)
					)
				);
			});
		}
	});
}

$("#test").click(function(e){
	$.each(devices, function(index, device_iden){
		PushBullet.push("link", device_iden, null, {title: "I got you a Nexus 6", url: "https://www.google.com/"});
	});
});