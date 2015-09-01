var DroneVisualize = {
	clear: function() {
		$(".visualizations").hide().empty();
		$(".loader").show();
	},
	update: function() {
		var data = DroneData.getFilteredData();

		$(".visualizations").append($("<p>").text(DroneData.country + ", " + DroneData.year + ": " + DroneData.getFilteredData().length + " drone strike" + (DroneData.getFilteredData().length == 1 ? "" : "s")));

		if (data.length) {
			var lineChartField = "deaths_max";
			this.makeLineChart(data, lineChartField);
			this.makeSomethingElse(data);
		} else {
			$(".visualizations").append($("<p>").text("Nothing to visualize"));
		}

		$(".visualizations").show();
		$(".loader").hide();
	},
	makeLineChart: function(data, field) {
		// throw out data points with values that can't be graphed
		var i = data.length;
		while(i--) {
			if (isNaN(+data[i][field])) {
				data.splice(i, 1);
			}
		}

		if (data.length <= 1) {
			$(".visualizations").append($("<p>").text("Not enough data to graph"));
			return;
		} else {
			$(".visualizations").append($("<p>").text("Graphing: " + field));			
		}

		$(".visualizations").append($("<div class='lineChart'>"));

		// on larger screens the full size will be 960x500 and on smaller screens it's scaled down with the same aspect ratio
		var totalWidth = $(".lineChart").width() < 960 ? Math.max(400, $(window).width()) : 960,
			totalHeight = 500 * totalWidth / 960;

		var margin = {top: 20, right: 20, bottom: 30, left: 30},
		    width = totalWidth - margin.left - margin.right,
		    height = totalHeight - margin.top - margin.bottom;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		var line = d3.svg.line()
		    .x(function(d) { return x(d.date); })
		    .y(function(d) { return y(d[field]); });

		var svg = d3.select(".lineChart").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		data.forEach(function(d) {
		    d[field] = +d[field];
		});

		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain(d3.extent(data, function(d) { return d[field]; }));

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis);

		svg.append("g")
		    .attr("class", "y axis")
		    .call(yAxis)
		.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 6)
		    .attr("dy", ".71em")
	        .style("text-anchor", "end")
		    .text(field);

		svg.append("path")
		    .datum(data)
		    .attr("class", "line")
		    .attr("d", line);
	},
	makeSomethingElse: function(data) {
		// TODO
		//$(".visualizations").append($("<div class='otherChart'>"));
	}
};
