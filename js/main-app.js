var app = angular.module("app",[]);

//Making a key to put commonly used constructors throughout the app at one place.
app.const = {
	Toggle : function(defaultState){
		this.state 	= defaultState || true;
		this.msg	= "";
	},

	Data : function(){
		this.value = "";
		this.list = [];
		this.options = [];
	}
};

app.const.Toggle.prototype.show = function(msg){
	
	if(!this.state)
		this.state = true;
	
	if(msg)
		this.msg = msg;
}

app.const.Toggle.prototype.hide = function(){
	
	if(this.state)
		this.state = false;
	
	if(this.msg != "")
		this.msg = "";
}


//DIRECTIVE SECTIONS

//DIRECTIVE TO ATTACH A CUSTOM ACTION ATTRIBUTE ON THE FORM
app.directive("ngCustomaction",function(){
	return {
		scope : {
			ngCustomaction : "="
		},
		link : function(scope, $elem){
			scope.$watch("ngCustomaction",function(val){
				$elem.attr("action",val);
			});	
			
		}
	}
});

//DIRECTIVE TO ATTACH DATE PICKER TO THE HTML
app.directive("ngDateinput",function(){
	return {
		scope : {
			ngDateinput : "="
		},
		link : function(scope, $elem){

			scope.$watch("ngDateinput",function(newVal){
				//console.log(newVal);
				
				//Check if type key value is date and browser has it own date picker or not//
				//Chrome for example will have its own date picker so we will use that
				if(newVal.type.toLowerCase() == "date" && angular.element('[type="date"]').prop('type') != 'date')
					bindDatePicker(newVal);
			});

			function bindDatePicker(modelObj){
				//console.log(modelObj);

				var id = modelObj.label.split(" ")[0] + "DateInputId";

				//console.log(id);

				$elem.attr({"id":id});
				$elem[0].placeholder="Pick a date";

				//CONSTRUCT A NEW DATE ELEMENT WITH THE ELEMENT ID
				dateElem = new dhtmlXCalendarObject(id);
				dateElem.setDateFormat("%d-%M-%Y");
				dateElem.hideTime();


			}


		}
	}
});


