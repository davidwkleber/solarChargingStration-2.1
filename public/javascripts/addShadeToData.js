   
   function addShadeToData( sendData ) {

	 // send the incoming data to browser with websockets.
		if (sendData.length > 0 ) {
			var now = new Date();
			var formatNow = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+'\:'+now.getHours()+'\:'+now.getMinutes()+'\:'+now.getSeconds()+'\:'+now.getMilliseconds();


			console.log('SEND update data : '+sendData);
		
			//start with the date
			var sendJSON = '{\n  \"date\": \"'+formatNow+'\",';
			// put in the JSON from the serial input next
			sendJSON += sendData.substring(1, sendData.length-3);
			// now add the info local to the interface, shadeStatus
			sendJSON += ",\n  \"shadeSetting\": \""+shadingStatus+"\"\n";
			sendJSON += "}";

			now = null;
			receivedData = null;
			jsonClosed = null;
			jsonOpened = null;
			
			// console.log("in SerialListener: the wind speed: "+windSpeedValue);
			// console.log("in SerialListener: the pitch angle: "+pitchAngleValue);
			// console.log("in SerialListener: the dummy load: "+dummyLoadValue);

			//  return JSON.stringify(dataItem);
		console.log("sendJSON: "+sendJSON );
			return sendJSON;
			
		};
		
		};
		


		