const sampleData = {
    nodes: JSON.parse(document.querySelector('.relationship-graph').dataset.nodes),
    edges: JSON.parse(document.querySelector('.relationship-graph').dataset.links)
}

// Graph configuration
const config = {
    width: 1200,
    height: 800,
    colors: {
        growth: {
            seed: '#2ecc71',
            sprout: '#f1c40f',
            bloom: '#e74c3c'
        },
        relationships: {
            builds_on: '#2ecc71',
            connects_to: '#3498db',
            challenges: '#e74c3c'
        },
        contentTypes: {
            note: { shape: 'circle', size: 8 },
            link: { shape: 'rect', size: 10 },
            essay: { shape: 'diamond', size: 12 },
            picture: { shape: 'triangle', size: 10 }
        }
    }
};

// Initialize graph
let svg, simulation, nodes, links, nodeElements, linkElements, tooltip, zoom;
let currentData = JSON.parse(JSON.stringify(sampleData));
let allData = JSON.parse(JSON.stringify(sampleData));

function initGraph() {
    // Setup SVG
    svg = d3.select('#graph')
        .attr('width', config.width)
        .attr('height', config.height);

    // Add zoom behavior
    zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            svg.select('g').attr('transform', event.transform);
        });

    svg.call(zoom);

    // Create main group
    const g = svg.append('g');

    // Add arrow markers for directed edges
    const defs = svg.append('defs');
    
    Object.entries(config.colors.relationships).forEach(([type, color]) => {
        defs.append('marker')
            .attr('id', `arrow-${type}`)
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', color);
    });

    // Setup tooltip
    tooltip = d3.select('#tooltip');

    // Initialize simulation
    setupSimulation();
    updateGraph();
    updateStats();
}

function setupSimulation() {
    const width = svg.node().getBoundingClientRect().width
    const height = svg.node().getBoundingClientRect().height

    simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(80))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(25));
}

function updateGraph() {
    const g = svg.select('g');

    // Update links
    linkElements = g.selectAll('.link')
        .data(currentData.edges, d => `${d.source.id || d.source}-${d.target.id || d.target}-${d.type}`);

    linkElements.exit().remove();

    const linkEnter = linkElements.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke-width', 2)
        .attr('opacity', 0.6);

    linkElements = linkEnter.merge(linkElements)
        .attr('stroke', d => config.colors.relationships[d.type])
        .attr('marker-end', d => `url(#arrow-${d.type})`);

    // Update nodes
    nodeElements = g.selectAll('.node')
        .data(currentData.nodes, d => d.id);

    nodeElements.exit().remove();

    const nodeEnter = nodeElements.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    // Add shapes based on content type
    nodeEnter.each(function(d) {
        const node = d3.select(this);
        const contentConfig = config.colors.contentTypes[d.content_type];
        
        switch (d.content_type) {
            case 'note':
                node.append('circle')
                    .attr('r', contentConfig.size);
                break;
            case 'link':
                node.append('rect')
                    .attr('width', contentConfig.size * 2)
                    .attr('height', contentConfig.size * 2)
                    .attr('x', -contentConfig.size)
                    .attr('y', -contentConfig.size);
                break;
            case 'essay':
                node.append('polygon')
                    .attr('points', `0,-${contentConfig.size} ${contentConfig.size},${contentConfig.size} -${contentConfig.size},${contentConfig.size}`);
                break;
            case 'picture':
                node.append('polygon')
                    .attr('points', `0,-${contentConfig.size} ${contentConfig.size * 0.866},${contentConfig.size * 0.5} -${contentConfig.size * 0.866},${contentConfig.size * 0.5}`);
                break;
        }
    });

    nodeElements = nodeEnter.merge(nodeElements);

    // Style nodes
    nodeElements.selectAll('circle, rect, polygon')
        .attr('fill', d => config.colors.growth[d.growth])
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

    // Add hover effects
    nodeElements
        .on('mouseover', function(event, d) {
            showTooltip(event, d);
            highlightConnected(d);
        })
        .on('mouseout', function() {
            hideTooltip();
            clearHighlight();
        })
        .on('click', function(event, d) {
            if (d.url) {
                window.open(d.url, '_blank');
            }
        });

    // Update simulation
    simulation.nodes(currentData.nodes);
    simulation.force('link').links(currentData.edges);
    simulation.alpha(1).restart();

    simulation.on('tick', () => {
        linkElements
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        nodeElements
            .attr('transform', d => `translate(${d.x},${d.y})`);
    });
}

function highlightConnected(selectedNode) {
    const connectedIds = new Set();
    connectedIds.add(selectedNode.id);

    currentData.edges.forEach(edge => {
        if (edge.source.id === selectedNode.id || edge.source === selectedNode.id) {
            connectedIds.add(edge.target.id || edge.target);
        }
        if (edge.target.id === selectedNode.id || edge.target === selectedNode.id) {
            connectedIds.add(edge.source.id || edge.source);
        }
    });

    nodeElements.classed('dimmed', d => !connectedIds.has(d.id));
    nodeElements.classed('highlighted', d => d.id === selectedNode.id);

    linkElements.classed('dimmed', d => {
        const sourceId = d.source.id || d.source;
        const targetId = d.target.id || d.target;
        return sourceId !== selectedNode.id && targetId !== selectedNode.id;
    });

    linkElements.classed('highlighted', d => {
        const sourceId = d.source.id || d.source;
        const targetId = d.target.id || d.target;
        return sourceId === selectedNode.id || targetId === selectedNode.id;
    });
}

function clearHighlight() {
    nodeElements.classed('dimmed highlighted', false);
    linkElements.classed('dimmed highlighted', false);
}

function showTooltip(event, d) {
    const content = `
        <h4>${d.title}</h4>
        <div class="meta"><strong>Type:</strong> ${d.content_type}</div>
        <div class="meta"><strong>Growth:</strong> ${d.growth}</div>
        <div style="margin-top: 8px;">${d.description || ''}</div>
    `;
    
    tooltip
        .html(content)
        .style('display', 'block')
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
}

function hideTooltip() {
    tooltip.style('display', 'none');
}

// Filter functions
function applyFilters() {
    const growthFilter = document.getElementById('growthFilter').value;
    const contentFilter = document.getElementById('contentFilter').value;
    const relationshipFilter = document.getElementById('relationshipFilter').value;

    // Filter nodes
    let filteredNodes = allData.nodes;
    if (growthFilter !== 'all') {
        filteredNodes = filteredNodes.filter(n => n.growth === growthFilter);
    }
    if (contentFilter !== 'all') {
        filteredNodes = filteredNodes.filter(n => n.content_type === contentFilter);
    }

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

    // Filter edges
    let filteredEdges = allData.edges.filter(e => 
        filteredNodeIds.has(e.source.id || e.source) && 
        filteredNodeIds.has(e.target.id || e.target)
    );

    if (relationshipFilter !== 'all') {
        filteredEdges = filteredEdges.filter(e => e.type === relationshipFilter);
    }

    currentData = {
        nodes: filteredNodes,
        edges: filteredEdges
    };

    updateGraph();
    updateStats();
}

function resetFilters() {
    document.getElementById('growthFilter').value = 'all';
    document.getElementById('contentFilter').value = 'all';
    document.getElementById('relationshipFilter').value = 'all';
    currentData = JSON.parse(JSON.stringify(allData));
    updateGraph();
    updateStats();
}

function centerGraph() {
    const transform = d3.zoomIdentity.translate(0, 0).scale(1);
    svg.transition().duration(750).call(
        zoom.transform,
        transform
    );
}

function updateStats() {
    document.getElementById('totalNodes').textContent = allData.nodes.length;
    document.getElementById('totalEdges').textContent = allData.edges.length;
    document.getElementById('visibleNodes').textContent = currentData.nodes.length;
    
    const avgConnections = currentData.nodes.length > 0 ? 
        (currentData.edges.length * 2 / currentData.nodes.length).toFixed(1) : 0;
    document.getElementById('avgConnections').textContent = avgConnections;
}

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Event listeners
document.getElementById('growthFilter').addEventListener('change', applyFilters);
document.getElementById('contentFilter').addEventListener('change', applyFilters);
document.getElementById('relationshipFilter').addEventListener('change', applyFilters);

// Initialize everything
initGraph();
