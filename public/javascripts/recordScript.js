



		var recordDataItem;
		var recordedData;
	//	var recordSocket;
		var recordDataFlag = false;
			recordedData = [];
		var recordSelection = "off";
					var theStart = new Date().getSeconds();


					function handleRecordData(dataIn) {
					
						if( recordDataFlag) {	
							var dataToSave = addShadeToData(dataIn);
							recordedData.push(dataToSave);
							stopRecordFunction();
						}
					};	
			dataSocket.on('updateData', handleRecordData );

		function recordFunction() {
	//		console.log('start recording');
			recordDataFlag = true;
		}
		function stopRecordFunction() {
		//	console.log('stop recording');
			recordDataFlag = false;
		}
		
		function saveDataFunction() {
			//		console.log('record button in saveDataFunction is: '+$(".recordButtons-checkbox:checked").val());

			if ( recordDataFlag === true ) {
					stopRecordFunction()
			}

			var json = recordedData;
		//	var blob = new Blob([json], {type: "application/json"});
			
			var tsv = JSON2TSV("["+json+"]");
			var blob = new Blob([tsv], {type: "application/csv"});
	
			var url = URL.createObjectURL(blob);
			
			var a = document.createElement('a');
			a.id = "saveDataLinkPlace";
			var date = new Date();
			var fileName = "data."+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+"."+date.getMinutes()+".tsv";
			a.download = fileName;
			a.href = url;
			a.textContent = "Download data as JSON";
			
			saveAs(blob,fileName);

			recordedData = []

		}

