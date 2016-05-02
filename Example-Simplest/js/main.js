var color = d3.scale.category10();

var canvas = d3.select("body").append("svg")
.attr("width",500)
.attr("height",500);

d3.json("data/data-easy.json", function(data){

	//put data into treemap layout
	var treemap = d3.layout.treemap()
				.size([500, 500])
				.ratio(1)
				.nodes(data);
				
	//get cells from the layout
	var cells = canvas.selectAll(".cell")
				.data(treemap)
				.enter()
				.append("g")
				.attr("class", "cell");
				
	//draw cells
	cells.append("rect")
				.attr("x", function (d) {return d.x;})
				.attr("y", function (d) {return d.y;})
				.attr("width", function (d) {return d.dx;})
				.attr("height", function (d) {return d.dy;})
				.attr("fill", function(d){ return d.children? null : color(d.parent.name);})
				.attr("stroke","white");

	cells.append("text")
				.attr("x", function(d){return d.x + d.dx/2;})
				.attr("y", function(d){return d.y + d.dy/2;})
				.attr("text-anchor", "middle")
				.attr("font-size","10px")
				.text(function(d) {
					if(d.children)
						return null
					else
					{
						return ""//d.value + " | " + d.dx + " x "+ d.dy + " = "+d.dx * d.dy;
					}
				})
})