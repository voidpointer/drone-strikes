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
				$(".loader").hide();
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
		DroneVisualize.clear();

		// update button states
		$(".countries .btn").removeClass("active");
		$(this).addClass("active");

		// filter based on country clicked
		DroneData.country = $(this).text();
		DroneData.filterData();

		DroneVisualize.update();
	},
	yearClick: function() {
		DroneVisualize.clear();

		// update button states
		$(".years .btn").removeClass("active");
		$(this).addClass("active");

		// filter based on country clicked
		DroneData.year = $(this).text();
		DroneData.filterData();

		DroneVisualize.update();
	}	
};
