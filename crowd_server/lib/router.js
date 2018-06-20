Router.route("/", {where: "server"})
	.post(function() {
		// console.log(this.request.body); //{ content: 'test1', hitType: 'audio' }
		
		let requestBody = this.request.body;
		if(typeof requestBody.method != "undefined"){
			switch(requestBody.method){
				case "provideTip":
					Meteor.call("provideTip", requestBody);
					break;
				case "getTip":
					Meteor.call("getTip", requestBody, (err, result) => {
						console.log(result);
						this.response.end(result);
					});
					break; 
			}
		}
		
	});