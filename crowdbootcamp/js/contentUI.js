/**
Author: Chun-Wei Chiang
Create Date: 2018/06/07
Purpose: User interface of the website
Modify History:
**/

/*========== add tips ==========*/
let hintProvider = document.createElement("div");
hintProvider.id = "hintProvider";
hintProvider.className = "hidden";

let shareLabel = document.createElement("p");
shareLabel.className = "label_text";
shareLabel.innerHTML = "Share your tips for others";

let hintPvdContent = document.createElement("textarea");
hintPvdContent.id = "hintPvdContent";
hintPvdContent.placeholder = "Maximum 100 characters";

let typeLabel = document.createElement("p");
typeLabel.className = "label_text";
typeLabel.innerHTML = "Please classify the HIT";


let typeSelector = document.createElement("select");
typeSelector.id = "typeSelector";

let audioOption = document.createElement("option");
audioOption.value = "audio";
audioOption.innerHTML = "Audio Transcription";
typeSelector.append(audioOption);

let writeOption = document.createElement("option");
writeOption.value = "write";
writeOption.innerHTML = "Writing";
typeSelector.append(writeOption);

let surveyOption = document.createElement("option");
surveyOption.value = "survey";
surveyOption.innerHTML = "Survey";
typeSelector.append(surveyOption);

let imgTransOption = document.createElement("option");
imgTransOption.value = "imgtrans";
imgTransOption.innerHTML = "Image Transcription";
typeSelector.append(imgTransOption);

let dataOption = document.createElement("option");
dataOption.value = "data";
dataOption.innerHTML = "Data Collection";
typeSelector.append(dataOption);

let imgTagOption = document.createElement("option");
imgTagOption.value = "imgtag";
imgTagOption.innerHTML = "Image Tagging";
typeSelector.append(imgTagOption);

let categorizeOption = document.createElement("option");
categorizeOption.value = "categorize";
categorizeOption.innerHTML = "Categorize";
typeSelector.append(categorizeOption);


let sendButton = document.createElement("button");
sendButton.addEventListener("click", sendListener);
sendButton.id = "sendButton";
sendButton.type = "button";
sendButton.innerHTML = "send";


hintProvider.append(shareLabel);
hintProvider.append(hintPvdContent);
hintProvider.append(typeLabel);
hintProvider.append(typeSelector);
hintProvider.append(sendButton);

$("body").append(hintProvider);

/*========== add button ==========*/
let addButton = document.createElement("img");
let addURL = chrome.runtime.getURL("img/plus.svg");
addButton.className = "add_button";
addButton.src = addURL;
addButton.addEventListener("click", function(e){
	$("#hintProvider").toggleClass("hidden");
	$("#hintProvider").toggleClass("show");
});

$("body").append(addButton);

/*========== hint displayer ==========*/
$(".text-muted div:eq(0)").removeClass("col-xs-7");
$(".text-muted div:eq(0)").addClass("col-xs-3");
$(".text-muted div:eq(1)").removeClass("col-xs-5");
$(".text-muted div:eq(1)").addClass("col-xs-3");

let hintDisplayer = document.createElement("div");
hintDisplayer.className = "col-xs-6";
hintDisplayer.id = "hintDisplayer";

let hintContainer = document.createElement("div");
hintContainer.className = "textContent";

let hintTitle = document.createElement("div");
hintTitle.innerHTML = "Hint:";
hintContainer.append(hintTitle);

/*========== hint content ==========*/
let hintContent = document.createElement("div");
hintContent.id = "hintContent";
hintContent.innerHTML = "fdsfgs fds fds hrurv urh frgr wer.";
hintContainer.append(hintContent);

let xhrPost = $.post("https://98f2afda.ngrok.io", {
	method: "getTip"
}).done(function(tipsString){
	console.log(tipsString);
	let tips = JSON.parse(tipsString);
	$("#hintContent").text(tips[0].tip);
	xhrPost.abort();
});



/*========== feedback ==========*/
let feedbackContainer = document.createElement("div");

/*========== like button ==========*/
let likeButton = document.createElement("img");
let likeURL = chrome.runtime.getURL("img/like.svg");
likeButton.className = "feedbackButton";
likeButton.src = likeURL;
feedbackContainer.append(likeButton);

/*========== dislike button ==========*/
let dislikeButton = document.createElement("img");
let dislikeURL = chrome.runtime.getURL("img/dislike.svg");
dislikeButton.className = "feedbackButton";
dislikeButton.src = dislikeURL;
feedbackContainer.append(dislikeButton);

hintContainer.append(feedbackContainer);


/*========== left arrow button ==========*/
let preHintButton = document.createElement("img");
let preURL = chrome.runtime.getURL("img/left_arrow.svg");
preHintButton.className = "hintSelectorButton";
preHintButton.src = preURL;

/*========== right arrow button ==========*/
let nextHintButton = document.createElement("img");
let nextURL = chrome.runtime.getURL("img/right_arrow.svg");
nextHintButton.className = "hintSelectorButton";
nextHintButton.src = nextURL;

hintDisplayer.append(preHintButton);
hintDisplayer.append(hintContainer);
hintDisplayer.append(nextHintButton);

$(".text-muted div:eq(1)").before(hintDisplayer);

