import { Meteor } from 'meteor/meteor';
import "./dataScheme.js";

Meteor.startup(() => {
	const MAXTOPTIP = 3;
	const MAXNEWTIP = 3;


	function shuffle(tmparray) {
		let currentIndex = tmparray.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = tmparray[currentIndex];
		tmparray[currentIndex] = tmparray[randomIndex];
		tmparray[randomIndex] = temporaryValue;
		}
	return tmparray;
	}
		

	Meteor.methods({
		storeTip: function(requestBody){
			Tips.insert({
				provider_id: requestBody.providerID,
				hit_set_id: requestBody.hitSetID,
				hit_type : requestBody.hitType,
				tip: requestBody.content,
				score: 0
			});
			console.log("Success store raw tips to database");
		},
		storeRawType: function(requestBody){
			//Todo: think whether require to store the raw tips info
			HITType.insert({
				hit_set_id: requestBody.hitSetID,
				hit_raw_type: requestBody.hitType,
				worker_id: requestBody.providerID
			});
		},
		provideTip: function(requestBody){
			Meteor.call("storeTip",requestBody);
			Meteor.call("getTip",requestBody);
			
		},
		getTip: function(requestBody){
			let tips = Tips.find({hit_set_id: requestBody.hitSetID}).fetch();
			if(tips.length > 0){
				tips.sort(function(a,b){return b.score - a.score});
				console.log(tips);
				let topTips = [];
				let tmpTips = []; //Handle the tips which has the same score 
				let prvScore = -3; //The plugin do not display the tips which score is lower than -3
				let prvIndex = -1;
				for(let i = 0 ; i < tips.length; i++){
					if(tips[i].score != prvScore){
						//Have enough tips to display
						if(tmpTips.length < MAXTOPTIP - topTips.length ){
							let tmpLength = tmpTips.length;
							for(let j = 0; j < tmpLength; j++){
								topTips.push(tmpTips.pop());
							}
						}else{ //Do not have enough space to display
							tmpTips = shuffle(tmpTips);
							for (let j = 0; j < MAXTOPTIP - topTips.length; j++){
								topTips.push(tmpTips.pop());
							}
						}
						if(topTips.length >= MAXTOPTIP){
							break;
						}
						prvScore = tips[i].score;
						prvIndex = i;
						tmpTips.push(tips[i]);
					}else{
						tmpTips.push(tips[i]);
					}
				}

				
				return JSON.stringify(topTips);
			}else{
				console.log("There are no tips for the same hit id");
			}
			
		}
	});

});
