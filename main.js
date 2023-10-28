
let svg = d3.select("#svg");
let keyframeIndex = 0;
const width = 650;
const height = 550;
async function loadData(){
    await d3.csv("yearwise_data.csv").then(data => {
        crimeData = data;
    });
    // await d3.csv("../data/crime_data.csv").then(data => {
    //     data.forEach(d => {
    //         d.State = 
    //         d.Year = parseInt(d.Year);
    //         d.Rape = parseInt(d.Rape);
    //     });
    // });
}

function drawRoseColours() {
    return
}



function drawLineChart(data, title) {
    // svg.selectAll("*").remove();
    svg.attr("width", width);
    svg.attr("height", height);

    // Define the margin so that there is space around the vis for axes and labels
    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    let chartWidth = width - margin.left - margin.right;
    let chartHeight = height - margin.top - margin.bottom;

    // Create a 'group' variable to hold the chart, these are used to keep similar items together in d3/with svgs
    let chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define an x scale which will assign a spot on the x axis to each of the unique values of colour in the dataset
    let xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
        .range([0, chartWidth]);

    let yScale = d3.scaleLinear()
        .domain([0, 300000])
        .nice()
        .range([chartHeight, 0]);

    // console.log(d3.max(data, d => d["Cruelty by Husband or his Relatives"]));

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

    // const line7 = d3.line()
    //     .x(d => xScale(d.Year))
    //     .y(d => yScale(d["Importation of Girls"]));

    // svg.append("path")
    //     .datum(data)
    //     .attr("class", "line")
    //     .attr("d", line7)
    //     .attr("fill", "none")
    //     .attr("stroke", "purple")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //     .attr("stroke-width", 1.5);

        // Cruelty by Husband or his Relatives
    // Create bars
    // chart.selectAll(".bar")
    //     .data(data)
    //     .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", d => xScale(d.colour)) // This arrow function notation is a more concise way of calling a function on each bar
    //     .attr("y", d => yScale(d.count))
    //     .attr("width", xScale.bandwidth())
    //     .attr("height", d => chartHeight - yScale(d.count))
    //     .attr("fill", "#999"); // Set the bars to be a light grey colour


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
        .attr("fill", d => d.color); // Use the same color scale as your lines

    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 0)
        .attr("dy", "0.3em")
        .text(d => d.name)
        .style("fill", "lightgrey")
        .style("font-family", "Gill Sans")
        .style("font-size", "10px")
        .style("font-weight", 100); // Use the name property of your data for the legend labels
    
}

// TODO Write a new function updateBarchart so that it updates the existing svg rather than rewriting it
// TODO Update the xScale domain to match new order
// TODO Update the yScale domain for new values

// TODO select all the existing bars
// TODO remove any bars no longer in the dataset
// TODO move any bars that already existed to their correct spot
// TODO Add any new bars

// TODO update the x and y axis

// TODO update the title

// TODO add some animation to this

function initialiseSVG() {
    svg.attr("width", width);
    svg.attr("height", height);

    svg.selectAll("*").remove();

    const margin = { top: 120, right: 30, bottom: 50, left: 90 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = svg.append("g") // g = group element
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
    // TODO draw the first keyframe

    // TODO load the data
    await loadData();
    console.log(crimeData);

    // TODO initalise the SVG
    initialiseSVG();
    drawLineChart(crimeData, "Crimes Against Women in India");

    // TODO make the word red clickable
}


initialise();
