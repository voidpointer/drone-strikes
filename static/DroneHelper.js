var DroneHelper = {
	getUniqueValues: function(callback) {
		var values = [];
		var data = DroneData.getAllData();
		for(var i = 0; i < data.length; i++) {
			var value = callback(data[i]);
			if (values.indexOf(value) == -1) {
				values.push(value);
			}
		}
		return values;
	},
	createButtonGroup: function(values) {
		var el = $("<div class='btn-toolbar'>").append($("<div class='btn-group'>"));
		for(var i = 0; i < values.length; i++) {
			$('.btn-group', el).append($("<a class='btn btn-default'>").text(values[i]));
		}
		return el;
	}
};
