
// Load Data
var PositiveB = [{"word":"Strong","frequency":75,"sentiment":"Positive"},{"word":"Endorsement","frequency":51,"sentiment":"Positive"},{"word":"Reform","frequency":45,"sentiment":"Positive"},{"word":"Win","frequency":44,"sentiment":"Positive"},{"word":"Fantastic","frequency":40,"sentiment":"Positive"},{"word":"Fair","frequency":33,"sentiment":"Positive"},{"word":"Incredible","frequency":30,"sentiment":"Positive"},{"word":"Congratulations","frequency":29,"sentiment":"Positive"},{"word":"Tough","frequency":28,"sentiment":"Positive"},{"word":"Loves","frequency":26,"sentiment":"Positive"},{"word":"Protect","frequency":22,"sentiment":"Positive"},{"word":"Happy","frequency":20,"sentiment":"Positive"},{"word":"Proud","frequency":20,"sentiment":"Positive"},{"word":"Love","frequency":18,"sentiment":"Positive"},{"word":"Success","frequency":18,"sentiment":"Positive"},{"word":"Beautiful","frequency":17,"sentiment":"Positive"},{"word":"Protection","frequency":17,"sentiment":"Positive"},{"word":"Wonderful","frequency":17,"sentiment":"Positive"},{"word":"Fast","frequency":16,"sentiment":"Positive"},{"word":"Free","frequency":16,"sentiment":"Positive"}]
;

var NegativeB = [{"word":"Crime","frequency":73,"sentiment":"Negative"},{"word":"Hard","frequency":67,"sentiment":"Negative"},{"word":"Bad","frequency":55,"sentiment":"Negative"},{"word":"Fake","frequency":42,"sentiment":"Negative"},{"word":"Crooked","frequency":35,"sentiment":"Negative"},{"word":"Disaster","frequency":30,"sentiment":"Negative"},{"word":"Hit","frequency":24,"sentiment":"Negative"},{"word":"Weak","frequency":23,"sentiment":"Negative"},{"word":"Worst","frequency":21,"sentiment":"Negative"},{"word":"Illegal","frequency":20,"sentiment":"Negative"},{"word":"Terrible","frequency":19,"sentiment":"Negative"},{"word":"Lost","frequency":16,"sentiment":"Negative"},{"word":"Badly","frequency":14,"sentiment":"Negative"},{"word":"Witch","frequency":14,"sentiment":"Negative"},{"word":"Dead","frequency":13,"sentiment":"Negative"},{"word":"Losing","frequency":13,"sentiment":"Negative"},{"word":"Failed","frequency":12,"sentiment":"Negative"},{"word":"Failing","frequency":12,"sentiment":"Negative"},{"word":"False","frequency":12,"sentiment":"Negative"},{"word":"Lie","frequency":11,"sentiment":"Negative"}];


// setting the dimensions and margins of the chart
var margin = { top: 20, right: 0, bottom: 30, left: 80 };
    width4b = 500 - margin.left - margin.right,
    height4b = 1070 - margin.top - margin.bottom;

// appending the svg object to the body of the page
var svg4b = d3.select("#_4b_econ")
	.append("svg")
	.attr("width", width4b + margin.left + margin.right)
	.attr("height", height4b + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// setting chart title
var Title = svg4b.append("text")
		.attr("y", -5)
		.attr("font-size", "1.75em")
		.attr("text-anchor", "right")
		.text("Top Words by Sentiment");

// adding X axis
var xb = d3.scaleLinear()
    .range([0, width4b]);
var xAxis4b = svg4b.append("g")
	.attr("transform", "translate(0," + height4b + ")")
	.attr("class", "xAxis")
  
// adding Y axis
var yb = d3.scaleBand()
    .range([0, height4b])
	.paddingInner(0.1)
	.paddingOuter(0.2);
var yAxis4b = svg4b.append("g")
	.attr("class", "yAxis")
  
// updating data (positive or negative data) based on button clicked
function update4B(data) {

		
// creating tooltip
var tip4b = d3.tip().attr("class", "d3-tip")
	.html(function(d){
		var text = "<strong>Tweets: <span style='color:steelblue'>"
					+ "Economic Policy</strong></span><br>";
		text += "<strong>Sentiment: <span style='color:steelblue'>"
					+ d.sentiment + "</strong></span><br>";					
		text += "<strong>Word: <span style='color:steelblue'>"
					+ d.word + "</strong></span><br>";
		text += "<strong>Frequency: <span style='color:steelblue'>"
					+ d.frequency + "</strong></span>";
		return text;
	})	

svg4b.call(tip4b);		

	// updating the X axis
	xb.domain([0, 130])
	xAxis4b.call(d3.axisBottom(xb))
	.selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
	  
	// updating the Y axis
	yb.domain(data.map(function(d) { return d.word; }))
	yAxis4b.transition().duration(1000).call(d3.axisLeft(yb));
	
	// adding bars to chart
	var bars4b = svg4b.selectAll(".bars4b")
		.data(data);

	// initiating bars
	bars4b
		.enter()
		.append("rect")
		.attr("class", "bars4b")
		.attr("y", function(d) { return yb(d.word); })
		.attr("height", yb.bandwidth() )
		.attr("x", 0)
		.attr("width", function(d) { return xb(d.frequency); })
		.on("mouseover", function(d,i){
			tip4b.show(d)	
			tempColor = this.style.fill;
			d3.select(this)
				.transition() //takes a little longer to change the color
				.style('opacity', 0.5)
				.style('fill', 'grey')
			})
		.on("mouseout", function(d,i){
			tip4b.hide(d)
				d3.select(this)
					.transition().duration(500) //default is 250
					.style('opacity', 1)
					.style('fill', tempColor)
			})

	// removing bars
	bars4b
		.enter()
		.append("rect")
		.merge(bars4b)
		.attr("x", 0 )
		.attr("width", function(d) { return 0; })
			
	// Animation (readd bars)
	bars4b
		.enter()
		.append("rect")
		.merge(bars4b)
		.transition()
		.duration(100)
		.attr("x", 0 )
		.attr("width", function(d) { return xb(d.frequency); })
		.delay(function(d,i){return(i*100)})		
		
		
	bars4b
		.exit()
		.remove()
}

// Initialize the plot with the first dataset
update4B(NegativeB);