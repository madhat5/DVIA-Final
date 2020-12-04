// console.log('sim sim salabim')

async function init() {

    let width = 600,
        height = 400;

    var myColor = d3.scaleSequential().domain([1, 40])
        .interpolator(d3.interpolatePlasma);

    let xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);

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


        // var numNodes = 54;
        // var nodes = d3.range(numNodes).map(function (d, i) {
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
                value: Math.abs(data[i].spread.spread[1]) / 10
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
                .attr('r', (d) => {
                    return d.radius;
                })
                .style('fill', (d) => {
                    return myColor(d.radius);
                })
                .merge(u)
                .attr('cx', (d) => {
                    return d.x;
                })
                .attr('cy', (d) => {
                    return d.y;
                })

            u.exit().remove();
        }
    });
}
init()