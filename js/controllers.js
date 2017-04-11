app.controller("customerForm",["$scope",function(s){


	var config = angular.copy(pageConfig);

	s.customers = new app.const.Data();
	s.customers.list = config.form.customers;


	s.formActive = s.customers.list[0];


	s.submitForm = function(e){

		console.log(e);

		e.target.submit();

	}


}]);


app.controller("findMissingNumber",["$scope",function(s){

	s.input = '';
	s.finalOutput = [];

	var valueArray;
	var outPut = [];

	s.calculate = function(){
		
		var arrItem,
			difference;

		outPut = [];

		s.finalOutput = [];

		//SPLIT THE STRING INTO ARRAY
		valueArray = s.input.split(",");

		//PUSHING THE VALUE OF SPLITTED STRING IN OUTPUT VARIABLE 
		//AND CONVERT EACH OF THE ARRAY ELENENTS INTO A NUMBER
		valueArray.forEach(function(item, index){
			
			arrItem = parseInt(item.trim());
			if(!isNaN(arrItem))
				outPut.push(arrItem);
		});

		//SORT THE RESULTING ARRAY OF NUMBERS IN ASCENDING ORDER
		outPut.sort(function(a,b) { return a - b; });


		for(var i = 1; i < outPut.length; i++){
			
			//Check the case if there is any missing numbers between 0 to lowest value entered
			if(i == 1 && outPut[0] > 0){
	
				//console.log("Missing 0");
				if(outPut[0] > 1)
					s.finalOutput.push("0-"+(outPut[0]-1));
				else
					s.finalOutput.push(0);
			
			}

			//Finding difference and find missing number in betweens
			difference = outPut[i] - outPut[(i - 1)];
			console.log(difference);

			if(difference == 2){
				//console.log("difference is 2");
				//console.log("pushing "+(outPut[i] - 1));
				s.finalOutput.push(outPut[i] - 1);
			} 

			else if( difference > 2){
				//console.log("difference is greater than 2");
				//console.log("pushing "+(outPut[(i - 1)] + 1) +"-"+ (outPut[i] - 1));
				s.finalOutput.push((outPut[(i - 1)] + 1) +"-"+ (outPut[i] - 1));
			}
		}

		console.log(outPut);

		s.finalOutput = s.finalOutput.join(", ");
	}

}]);