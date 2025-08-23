const relationshipData = {
    nodes: JSON.parse(document.querySelector('.gardenpath').dataset.nodes),
    edges: JSON.parse(document.querySelector('.gardenpath').dataset.links)
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
            mentions: '#3498db'  // Single relationship type
        },
        contentTypes: {
            note: { shape: 'circle', size: 8 },
            pin: { shape: 'star', size: 15 },
            essay: { shape: 'diamond', size: 12 },
            portrait: { shape: 'triangle', size: 10 },
            project: { shape: 'pentagon', size: 12 }
        }
    }
};

// Initialize graph
let svg, simulation, nodes, links, nodeElements, linkElements, tooltip, zoom;
let currentData = JSON.parse(JSON.stringify(relationshipData));
let allData = JSON.parse(JSON.stringify(relationshipData));

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
    
    // Single arrow marker for mentions
    defs.append('marker')
        .attr('id', 'arrow-mentions')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', config.colors.relationships.mentions);

    // Setup tooltip
    gtooltip = d3.select('#gtooltip');

    // Initialize simulation
    setupSimulation();
    updateGraph();
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

    // Update links - treat all links as mentions since we removed type field
    linkElements = g.selectAll('.link')
        .data(currentData.edges, d => `${d.source.id || d.source}-${d.target.id || d.target}`);

    linkElements.exit().remove();

    const linkEnter = linkElements.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke-width', 2)
        .attr('opacity', 0.6);

    linkElements = linkEnter.merge(linkElements)
        .attr('stroke', config.colors.relationships.mentions)
        .attr('marker-end', 'url(#arrow-mentions)');

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
            case 'pin':
                // Star shape
                const starSize = contentConfig.size;
                const starPoints = [];
                for (let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI / 5) - (Math.PI / 2);
                    const radius = i % 2 === 0 ? starSize : starSize * 0.4;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    starPoints.push(`${x},${y}`);
                }
                node.append('polygon')
                    .attr('points', starPoints.join(' '));
                break;
            case 'essay':
                node.append('polygon')
                    .attr('points', `0,-${contentConfig.size} ${contentConfig.size},${contentConfig.size} -${contentConfig.size},${contentConfig.size}`);
                break;
            case 'project':
                // Cross shape using path
                const crossSize = contentConfig.size;
                const crossWidth = crossSize * 0.3;
                node.append('path')
                    .attr('d', `M-${crossWidth},-${crossSize} L${crossWidth},-${crossSize} L${crossWidth},-${crossWidth} L${crossSize},-${crossWidth} L${crossSize},${crossWidth} L${crossWidth},${crossWidth} L${crossWidth},${crossSize} L-${crossWidth},${crossSize} L-${crossWidth},${crossWidth} L-${crossSize},${crossWidth} L-${crossSize},-${crossWidth} L-${crossWidth},-${crossWidth} Z`);
                break;
            case 'portrait':
                // Pentagon shape
                const pentagonSize = contentConfig.size;
                const pentagonPoints = [];
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 2 * Math.PI / 5) - (Math.PI / 2); // Start from top
                    const x = pentagonSize * Math.cos(angle);
                    const y = pentagonSize * Math.sin(angle);
                    pentagonPoints.push(`${x},${y}`);
                }
                node.append('polygon')
                    .attr('points', pentagonPoints.join(' '));
                break;
        }
    });

    nodeElements = nodeEnter.merge(nodeElements);

    // Style nodes
    nodeElements.selectAll('circle, rect, polygon, path')
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
    const connectedCount = currentData.edges.filter(edge => {
        const sourceId = edge.source.id || edge.source;
        const targetId = edge.target.id || edge.target;
        return sourceId === d.id || targetId === d.id;
    }).length;

    const content = `
        <h4>${d.title}</h4>
        <div class="meta"><strong>Type:</strong> ${d.content_type}</div>
        <div class="meta"><strong>Growth:</strong> ${d.growth}</div>
        <div class="meta"><strong>Connections:</strong> ${connectedCount}</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">Click to open page</div>
    `;
    
    gtooltip
        .html(content)
        .style('display', 'block')
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
}

function hideTooltip() {
    gtooltip.style('display', 'none');
}

// Filter functions - simplified since we only have mentions now
function applyFilters() {
    const growthFilter = document.getElementById('growthFilter').value;
    const contentFilter = document.getElementById('contentFilter').value;

    // Filter nodes
    let filteredNodes = allData.nodes;
    if (growthFilter !== 'all') {
        filteredNodes = filteredNodes.filter(n => n.growth === growthFilter);
    }
    if (contentFilter !== 'all') {
        filteredNodes = filteredNodes.filter(n => n.content_type === contentFilter);
    }

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

    // Filter edges based on filtered nodes
    let filteredEdges = allData.edges.filter(e => 
        filteredNodeIds.has(e.source.id || e.source) && 
        filteredNodeIds.has(e.target.id || e.target)
    );

    currentData = {
        nodes: filteredNodes,
        edges: filteredEdges
    };

    updateGraph();
}

function resetFilters() {
    document.getElementById('growthFilter').value = 'all';
    document.getElementById('contentFilter').value = 'all';
    currentData = JSON.parse(JSON.stringify(allData));
    updateGraph();
}

function centerGraph() {
    const transform = d3.zoomIdentity.translate(0, 0).scale(1);
    
    svg.transition().duration(750).call(
        zoom.transform,
        transform
    );
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

// Event listeners - removed relationship filter
document.getElementById('growthFilter').addEventListener('change', applyFilters);
document.getElementById('contentFilter').addEventListener('change', applyFilters);

// Initialize everything
initGraph();
