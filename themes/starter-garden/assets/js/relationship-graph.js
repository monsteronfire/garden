// Get data attributes from DOM for D3 processing
  const graphData = {
    nodes: JSON.parse(document.querySelector('.relationship-graph').dataset.nodes),
    links: JSON.parse(document.querySelector('.relationship-graph').dataset.links)
  }

  const container = d3.select(".relationship-graph")
  const containerRect = container.node().getBoundingClientRect()
  const width = containerRect.width - 40
  const height = containerRect.height - 40

  const svg = d3.select("#garden-graph")
            .attr("width", width)
            .attr("height", height)
  
  // Define arrow markers
  svg.append("defs").selectAll("marker")
      .data(["builds_on", "connects_to", "challenges"])
      .enter().append("marker")
      .attr("id", d => `arrowhead-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", d => {
          if (d === "builds_on") return "#28a745"
          if (d === "connects_to") return "#17a2b8"
          return "#dc3545"
      })
    
    const tooltip = d3.select(".tooltip")

    const simulation = d3.forceSimulation(graphData.nodes)
            .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
    const link = svg.append("g")
            .selectAll("line")
            .data(graphData.links)
            .enter().append("line")
            .attr("class", d => `link link--${d.type}`)
            .attr("marker-end", d => `url(#arrowhead-${d.type})`)

    // Create nodes
    const node = svg.append("g")
        .selectAll("circle")
        .data(graphData.nodes)
        .enter().append("circle")
        .attr("class", d => `node node--${d.growth_stage}`)
        .attr("r", d => d.type === "essay" ? 12 : 10)
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1)
                .html(`<strong>${d.title}</strong><br/>Growth stage: ${d.growth_stage}<br/>Type: ${d.type}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0)
        })
        .on("click", function(event, d) {
            // In Hugo, this would navigate to the post
            console.log(`Navigate to: ${d.id}`)
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

    const labels = svg.append("g")
            .selectAll("text")
            .data(graphData.nodes)
            .enter().append("text")
            .attr("class", "node-label")
            .text(d => d.title.length > 20 ? d.title.substring(0, 20) + "..." : d.title)
            .attr("dy", 25)
    const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(20, 20)")
        
    const legendData = [
        { type: "builds_on", color: "#28a745", label: "Builds On" },
        { type: "connects_to", color: "#17a2b8", label: "Connects To" },
        { type: "challenges", color: "#dc3545", label: "Challenges" }
    ]
    
    const legendItems = legend.selectAll(".legend-item")
        .data(legendData)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
    
    legendItems.append("line")
        .attr("x1", 0)
        .attr("x2", 20)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", d => d.color)
        .attr("stroke-width", 2)
    
    legendItems.append("text")
        .attr("x", 25)
        .attr("y", 4)
        .text(d => d.label)
    
    // Update positions on each tick
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
        
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
        
        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y)
    })
    
    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
    }
    
    function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
    }
