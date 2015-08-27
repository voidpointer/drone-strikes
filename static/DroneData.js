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
