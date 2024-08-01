import React, { useState, useEffect, useCallback } from 'react';
import { Graph } from 'react-d3-graph';
import { dijkstraWithSteps, shortestPath } from '../algorithms/dijkstra';
import './GraphVisualization.css';

const GraphVisualization = ({ selectedGraph }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [unvisitedNodes, setUnvisitedNodes] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [distances, setDistances] = useState({});
  const [previous, setPrevious] = useState({});
  const [inputValue, setInputValue] = useState(''); // State for the input value

  const startNode = selectedGraph.startNode || '';
  const endNode = selectedGraph.endNode || '';

  const calculateDistance = (nodeA, nodeB) => {
    if (!nodeA || !nodeB) return 0; // Guard clause for undefined nodes
    const distance = Math.sqrt((nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2);
    return Math.round(distance); // Round to the nearest whole number
  };

  useEffect(() => {
    if (!selectedGraph.initialNodes || !selectedGraph.initialLinks) {
      return; // Ensure graph data is available
    }

    const initialNodes = selectedGraph.initialNodes;
    const initialLinks = selectedGraph.initialLinks;

    setNodes(initialNodes);

    const updatedLinks = initialLinks.map((link) => ({
      ...link,
      weight: calculateDistance(
        initialNodes.find((node) => node.id === link.source),
        initialNodes.find((node) => node.id === link.target)
      ),
    }));
    setLinks(updatedLinks);

    resetVisualization();
  }, [selectedGraph]);

  const resetVisualization = useCallback(async () => {
    if (!nodes.length || !links.length || !startNode || !endNode) return;
    console.log(nodes, "nodes");
    console.log(links, "links");

    const graph = nodes.reduce((acc, node) => {
      acc[node.id] = {};
      return acc;
    }, {});

    links.forEach((link) => {
      graph[link.source][link.target] = link.weight;
      graph[link.target][link.source] = link.weight; // Assuming undirected graph
    });
    console.log(graph, "graph");
    try {
      setIsAnimating(true);
      const { distances, previous, visitedOrder } = await dijkstraWithSteps(graph, startNode, endNode);
      setDistances(distances);
      setSteps(visitedOrder);
      setVisitedNodes([]);
      setUnvisitedNodes(Object.keys(graph));
      setCurrentStep(0);
      setPath([]); // Ensure path is always an array
      setPrevious(previous);
    } catch (error) {
      console.error('Error in dijkstraWithSteps:', error);
    } finally {
      setIsAnimating(false);
    }
  }, [nodes, links, startNode, endNode]);

  const handleNextStep = async () => {
    if (currentStep >= steps.length) return;

    const nextNode = steps[currentStep];
    setVisitedNodes((prevVisited) => [...prevVisited, nextNode]);
    setUnvisitedNodes((prevUnvisited) =>
      prevUnvisited.filter((node) => node !== nextNode)
    );
    setCurrentStep(currentStep + 1);

    // Check if the end node has been reached
    if (nextNode === endNode) {
      console.log(`Calculating shortest path after reaching end node ${endNode}`); // Debugging
      const graph = nodes.reduce((acc, node) => {
        acc[node.id] = {};
        return acc;
      }, {});

      links.forEach((link) => {
        graph[link.source][link.target] = link.weight;
        graph[link.target][link.source] = link.weight; // Assuming undirected graph
      });

      try {
        const shortest = await shortestPath(previous, startNode, endNode);
        setPath(shortest);
      } catch (error) {
        console.error('Error in shortestPath calculation:', error);
      }
    }
  };

  const handleNodePositionChange = (nodeId, x, y) => {
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, x, y } : node
    );
    setNodes(updatedNodes);

    const updatedLinks = links.map((link) => ({
      ...link,
      weight: calculateDistance(
        updatedNodes.find((node) => node.id === link.source),
        updatedNodes.find((node) => node.id === link.target)
      ),
    }));
    setLinks(updatedLinks);

    resetVisualization();
  };

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    setGraphData({
      nodes: nodes.map((node) => ({
        id: node.id,
        x: node.x,
        y: node.y,
        color: Array.isArray(path) && path.includes(node.id)
          ? 'red'
          : visitedNodes.includes(node.id)
          ? 'orange'
          : 'lightblue',
      })),
      links: links.map((link) => ({
        source: link.source,
        target: link.target,
        label: link.weight,
        color:
          Array.isArray(path) && path.includes(link.source) && path.includes(link.target)
            ? 'red'
            : 'lightgrey',
      })),
    });
  }, [nodes, links, path, visitedNodes]);

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightblue',
      size: 300,
      highlightStrokeColor: 'blue',
      fontSize: 35,
      fontColor: '#d4edda',
      renderLabel: true,
    },
    link: {
      highlightColor: 'lightblue',
      renderLabel: true,
      fontSize: 25,
      fontColor: '#d4edda',
    },
    height: 1000,
    width: 1600,
    d3: {
      gravity: -200,
      linkLength: 200,
      linkStrength: 1,
    },
    staticGraph: false,
    staticGraphWithDragAndDrop: true,
  };

  const getNodePath = (node) => {
    if (!previous[node]) return node;
    const path = [];
    let currentNode = node;
    while (currentNode) {
      path.unshift(currentNode);
      currentNode = previous[currentNode];
    }
    return path.join(' -> ');
  };

  // Handle input change to convert to uppercase
  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase
    setInputValue(value); // Update state with uppercase value
  };

  return (
    <div className="graph-container">
      <div className="graph-section">
        <Graph
          id="graph-id"
          data={graphData}
          config={config}
          onNodePositionChange={(nodeId, x, y) => {
            handleNodePositionChange(nodeId, x, y);
          }}
        />
      </div>
      <div className="info-section">
        <h2>
          Shortest Path from {startNode} to {endNode}: {Array.isArray(path) ? path.join(' -> ') : 'No path found'}
        </h2>
        <button 
          className="graph-button" 
          onClick={handleNextStep} 
          disabled={currentStep >= steps.length || path.includes(endNode)}
        >
          Next
        </button>
        <div className="node-tables">
          <div>
            <h3>Visited Nodes</h3>
            <table className="visited-nodes-table">
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Distance Covered</th>
                  <th>Path</th>
                </tr>
              </thead>
              <tbody>
                {visitedNodes.map((node, index) => (
                  <tr key={index}>
                    <td>{node}</td>
                    <td>{distances[node] || 0}</td>
                    <td>{getNodePath(node)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Unvisited Nodes</h3>
            <table className="unvisited-nodes-table">
              <thead>
                <tr>
                  <th>Node</th>
                </tr>
              </thead>
              <tbody>
                {unvisitedNodes.map((node, index) => (
                  <tr key={index}>
                    <td>{node}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Input box for unvisited nodes */}
            <div className="input-container">
            <h3>Priority Que</h3>
              <input
                type="text"
                className="text-input"
                value={inputValue}
                onChange={handleInputChange}
                // placeholder="Enter text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
