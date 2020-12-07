// console.log('sim sim salabim')

async function init() {

    let width = 600,
        height = 400;

    let myColor = d3.scaleSequential().domain([0, 12])
        .interpolator(d3.interpolatePlasma);

    let xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);

    // -1- Create a tooltip div that is hidden by default:
    let tooltip = d3.select("#content")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "rgba(1, 51, 105, 0.75)")
        // .style("background-color", "#013369")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")
        .style("width", "150px")
        .style("font", "12px Helvetica")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    let showTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("visibility", "visible")
            .html(
                d.date + "<br>" +
                "Superbowl " + d.SB + "<br>" +
                "W: " + d.winner + "<br>" +
                // "pts: " + d.pts + "<br>" +
                "L: " + d.loser + "<br>" +
                // "pts: " + d.pts__1 + "<br>" +
                "Score: " + d.pts + " - " + d.pts__1 + "<br>" +
                // "toss_call: " + d.toss_call + "<br>" +
                // "toss_winner: " + d.toss_winner + "<br>" +
                "Spread: " + d.spread[0] + " " + d.spread[1] + "<br>" +
                "Total points: " + d.totalPoints + "<br>" +
                "O_U: " + d.O_U)
    }
    let moveTooltip = function (d) {
        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    }
    let hideTooltip = function (d) {
        return tooltip.style("visibility", "hidden");
    }

    // create svg element
    let svg = d3.select("#content")
        .append("svg")
        .attr("width", 1400)

    // Create the scale
    let x = d3.scaleLinear()
        .domain([0, -19]) // This is what is written on the Axis: from 0 to 100
        .range([50, 1200]); // This is where the axis is placed: from 100px to 800px

    // Draw the axis
    svg
        .append("g")
        .attr("transform", "translate(0,50)") // This controls the vertical position of the Axis
        .call(d3.axisBottom(x));

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width * 2)
        .attr("y", height - 300)
        .text("Point Spread");

    d3.json("data/data.json", (data) => {
        // console.log(data);
        // console.log(data[0].spread.spread[1]);
        // console.log(data[0].spread.O_U);
        // console.log(data[0].pts);
        // console.log(data[0].pts__1);
        // console.log((data[0].spread.O_U / (data[0].pts + data[0].pts__1)))

        // let tempArr = []
        // data.map((d, i) => {
        //     tempArr.push(d.spread.spread[1])
        // })
        // console.log(tempArr)
        // console.log(tempArr.sort())
        // console.log(tempArr.length)

        // let temp = data.map((d, i) => {
        //     return {
        //         radius: (d.spread.O_U / (d.pts + d.pts__1)),
        //         value: d.spread.spread[1]
        //     }
        // });
        // console.log(temp)


        // let numNodes = 54;
        // let nodes = d3.range(numNodes).map(function (d, i) {
        //     return {
        //         radius: Math.random() * 25,
        //         value: Math.random()
        //     }
        // });
        // console.log(nodes)

        let nodes = d3.range(data.length).map((d, i) => {
            return {
                // create data items in DB for these??
                radius: (data[i].spread.O_U / (data[i].pts + data[i].pts__1)) * 10,
                value: Math.abs(data[i].spread.spread[1]) / 10,
                spreadDiff: (Math.abs(data[i].spread.spread[1]) / (data[i].pts - data[i].pts__1)) * 5,
                date: data[i].date,
                SB: data[i].SB,
                winner: data[i].winner,
                pts: data[i].pts,
                loser: data[i].loser,
                pts__1: data[i].pts__1,
                totalPoints: data[i].pts + data[i].pts__1,
                toss_call: data[i].toss_call,
                toss_winner: data[i].toss_winner,
                spread: [data[i].spread.spread[0], data[i].spread.spread[1]],
                O_U: data[i].spread.O_U
            }
        });
        console.log(nodes)

        let simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(5))
            .force('x', d3.forceX().x((d) => {
                return xScale(d.value);
            }))
            .force('y', d3.forceY().y((d) => {
                return 0;
            }))
            .force('collision', d3.forceCollide().radius((d) => {
                return d.radius;
            }))
            .on('tick', ticked);

        function ticked() {
            let u = d3.select('svg g')
                .selectAll('circle')
                .data(nodes);

            u.enter()
                .append('circle')
                .attr("class", "bubbles")
                .attr('r', (d) => {
                    return d.radius;
                })
                .style('fill', (d) => {
                    return myColor(d.spreadDiff);
                })
                .merge(u)
                .attr('cx', (d) => {
                    return d.x;
                })
                .attr('cy', (d) => {
                    return d.y;
                })
                .on("mouseover", showTooltip)
                .on("mousemove", moveTooltip)
                .on("mouseout", hideTooltip)

            u.exit().remove();
        }
    });


    // LEGEND
    // append the svg object to the body of the page
    let legendHeight = 460;
    let legendWidth = 460;
    let legendSvg = d3.select("#legend")
        .append("svg")
        .attr("width", legendWidth)
        .attr("height", legendHeight)

    // The scale you use for bubble size
    let size = d3.scaleSqrt()
        .domain([1, 100]) // What's in the data, let's say it is percentage
        .range([1, 100]) // Size in pixel

    // Add legend: circles
    let valuesToShow = [10, 50, 100];
    let actualShow = [-1, -8, -19];
    let xCircle = 230;
    let xLabel = 380;
    let yCircle = 330;
    legendSvg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function (d) {
            return yCircle - size(d)
        })
        .attr("r", function (d) {
            return size(d)
        })
        .style("fill", "none")
        .attr("stroke", "black")

    // Add legend: segments
    legendSvg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr('x1', function (d) {
            return xCircle + size(d)
        })
        .attr('x2', xLabel)
        .attr('y1', function (d) {
            return yCircle - size(d)
        })
        .attr('y2', function (d) {
            return yCircle - size(d)
        })
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    legendSvg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr('x', xLabel)
        .attr('y', function (d) {
            return yCircle - size(d)
        })
        .text(function (d, i) {
            return actualShow[i]
        })
        .style("font-size", 15)
        .style("font-style", 'italic')
        .attr('alignment-baseline', 'middle')

}
init()