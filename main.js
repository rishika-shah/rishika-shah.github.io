
let svg = d3.select("#svg");
let keyframeIndex = 0;
const width = 650;
const height = 550;

// load data
async function loadData(){
    await d3.csv("yearwise_data.csv").then(data => {
        crimeData = data;
    });
}


function drawLineChart(data, title) {

    svg.attr("width", width);
    svg.attr("height", height);

    // Margin
    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    let chartWidth = width - margin.left - margin.right;
    let chartHeight = height - margin.top - margin.bottom;

    // 'group' variable for all elements of the SVG
    let chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale for all years
    let xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([0, chartWidth]);

    // Y scale for number of crimes
    let yScale = d3.scaleLinear()
        .domain([0, 1.2 * d3.max(data, d => parseInt(d["Cruelty by Husband or his Relatives"]))])
        .nice()
        .range([chartHeight, 0]);

    // line 1: Rape
    const line1 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Rape));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line1)
        .attr("fill", "none")
        .attr("stroke", "#f52f2f")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 2: Dowry Deaths
    const line2 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Dowry Deaths"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2)
        .attr("fill", "none")
        .attr("stroke", "#04c911")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 3: Cruelty by Husband or his Relatives
    const line3 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Cruelty by Husband or his Relatives"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line3)
        .attr("fill", "none")
        .attr("stroke", "#57d1f2")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 4: Kidnapping and Abduction
    const line4 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Kidnapping and Abduction"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line4)
        .attr("fill", "none")
        .attr("stroke", "#fc7600")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 5: Assault on women with intent to outrage her modesty
    const line5 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Assault on women with intent to outrage her modesty"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line5)
        .attr("fill", "none")
        .attr("stroke", "#edf502")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);

    // line 6: Insult to modesty of Women
    const line6 = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d["Insult to modesty of Women"]));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line6)
        .attr("fill", "none")
        .attr("stroke", "#a121fc")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("stroke-width", 1.5);


    // Add x-axis
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
        .style("color", "grey")
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .style("color", "grey")
        .selectAll("text");

    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("fill", "white")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text(title);

    // Add label to X axis
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("x", chartWidth / 2 + margin.left)
        .attr("y", chartHeight + margin.bottom + margin.top - 10)
        .style("font-size", "16px")
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text("Year");

    // Add label to Y-axis
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 2)
        .attr("y", 30)
        .style("font-size", "16px")
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-weight", 100)
        .text("Number of Crimes");

    // Create legend
    const legendData = [
        { name: "Rape", color: "#f52f2f" }, // Custom legend label and color for Series A
        { name: "Cruelty by Husband or his Relatives", color: "#57d1f2" }, // Custom legend label and color for Series B
        { name: "Dowry Deaths", color: "#04c911" },
        { name: "Kidnapping and Abduction", color: "#fc7600" },
        { name: "Assault on women with intent to outrage her modesty", color: "#edf502" },
        { name: "Insult to modesty of Women", color: "#a121fc" }
    ];

    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (chartWidth - margin.right - margin.left - 10) + ", 50)"); // Adjust the position of the legend
    
    const legendItems = legend.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing between legend items

    legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 2)
        .attr("fill", d => d.color); 

    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 0)
        .attr("dy", "0.3em")
        .text(d => d.name)
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-size", "10px")
        .style("font-weight", 100); 
    
}

function initialiseSVG() {

    svg.attr("width", width);
    svg.attr("height", height);

    svg.selectAll("*").remove();

    // margin
    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g") 
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale = d3.scaleLinear()
        .domain([])
        .range([0, chartWidth]);

    yScale = d3.scaleLinear()
        .domain([])
        .nice()
        .range([chartHeight, 0]);

    // Add x-axis
    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text");

    // Add y-axis
    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .selectAll("text");

    // Add title
    svg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("");


}

async function initialise() {

    await loadData();
    console.log(crimeData);

    initialiseSVG();
    drawLineChart(crimeData, "Crimes Against Women in India");

}


initialise();
