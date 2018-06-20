/**
Author: Chun-Wei Chiang
Create Date: 2018/06/07
Purpose: Handle the website content, we can get page information here.
Modify History:
**/

// chrome.runtime.onMessage.addListener(
// 	function (request, sender, sendResponse){
// 		console.log("chrome.runtime.onMessage",request);

// 		if(request.getWorkerInfo){
// 			console.log("received get worker infomation request", request);
// 			let workerName = $(".me-bar a[href='/account']").text();
// 			let workerID = $(".me-bar .copyable-content").text();

// 			return true;
// 		}


// 	}
// );

let workerName = $(".me-bar a[href='/account']").text();
let workerID = $(".me-bar .copyable-content").text();
let hitSetID = "";

chrome.runtime.sendMessage({method: "getHitSetID"}, function(response) {
	console.log(response);
	hitSetID = response.hitSetID;
});

let getHitDetail = function(){
	let props = $("div.task-project-title span[data-react-class*='require']").attr("data-react-props");
	let detailJson = JSON.parse(props).modalOptions;

	return {
		hitTitle: detailJson.projectTitle,
		hitDesc: detailJson.description,
		requesterName: detailJson.requesterName
	}
	
}

let sendListener = function(){
	//Todo: get hit id, hit title, hit description, requester id 
	if( hitSetID == ""){
		return;
	}

	let hitdetail = getHitDetail();
	let requesterID = $("a[title="+ hitdetail.requesterName +"]").attr("href").split("/")[2];

	let xhrPostTips = $.post( "https://98f2afda.ngrok.io", { 
		method: "provideTip", //Todo: seperate the method into provideTip and provide HIT type
		providerID: workerID,
		hitSetID: hitSetID,
		content: $("#hintPvdContent").val(),
		hitType: $("#typeSelector option:selected").val(), //Todo: add the following variable to the server
		hitTitle: hitdetail.hitTitle,
		hitDesc: hitdetail.hitDesc,
		requesterName: hitdetail.requesterName,
		requesterID: requesterID
	}).done(function(data) {
		xhrPostTips.abort();
	});

	

};

