var DroneVisualize = {
	clear: function() {
		$(".visualizations").hide().empty();
		$(".loader").show();
	},
	update: function() {
		$(".visualizations").text("visualizations go here").show();
		$(".loader").hide();
	}
};
