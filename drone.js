var DroneData = {
	data: null,
	filtered: null,
	ALL_COUNTRIES: "All Countries",
	ALL_YEARS: "All Years",
	country: null,
	year: null,
	initialize: function() {
		this.country = this.ALL_COUNTRIES;
		this.year = this.ALL_YEARS;
	},
	setAllData: function(data) {
		for(var i = 0; i < data.length; i++) {
			var date = new Date(data[i].date);
			data[i].year = date.getFullYear();
		}
		this.data = data;
	},
	getAllData: function() {
		return this.data;
	},
	setFilteredData: function(data) {
		this.filtered = data;
	},
	getFilteredData: function() {
		return this.filtered;
	},
	filterData: function() {
		var _this = this;
		this.filtered = this.getAllData().filter(function(item){
			return (item.country == _this.country || _this.country == _this.ALL_COUNTRIES) &&
				(item.year == _this.year || _this.year == _this.ALL_YEARS);
		});

		console.log(this.country);
		console.log(this.year);
		console.log(this.filtered.length);
	}
};

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

var DroneApp = {
	initialize: function() {
		DroneData.initialize();
		this.loadData();
	},
	loadData: function() {
		var _this = this;
		$.ajax({
			url: "http://api.dronestre.am/data",
			dataType: "jsonp",
			success: function(data) {
				DroneData.setAllData(data.strike);
				_this.processData();
			}
		});
	},
	processData: function() {
		// country button bar
		var countries = DroneHelper.getUniqueValues(function(item){return item.country;}).sort();
		countries.unshift(DroneData.ALL_COUNTRIES);
		$(".filters").append(DroneHelper.createButtonGroup(countries).addClass("countries"));

		// years button bar
		var years = DroneHelper.getUniqueValues(function(item){return item.year;}).sort();
		years.unshift(DroneData.ALL_YEARS);
		$(".filters").append(DroneHelper.createButtonGroup(years).addClass("years"));

		// make first button in button bars active
		$(".btn:first-child").addClass("active");

		// click handlers
		$(".countries .btn").click(this.countryClick);
		$(".years .btn").click(this.yearClick);
	},
	countryClick: function() {
		// update button states
		$(".countries .btn").removeClass("active");
		$(this).addClass("active");

		// filter based on country clicked
		DroneData.country = $(this).text();
		DroneData.filterData();
	},
	yearClick: function() {
		// update button states
		$(".years .btn").removeClass("active");
		$(this).addClass("active");

		// filter based on country clicked
		DroneData.year = $(this).text();
		DroneData.filterData();
	}	
};
