import React, { useState } from 'react';
import './App.css';
import GraphVisualization from './components/GraphVisualization';
import algofields from './sectionfields/algoFields';
import HuffmanVisualization from './components/HuffmanVisualization'
import Presentation from './components/Presentation';


const componentMap = {
    GraphVisualization: GraphVisualization,
    HuffmanVisualization: HuffmanVisualization,
}

const calculateDistance = (nodeA, nodeB) => {
    if (!nodeA || !nodeB) return 0;
    const distance = Math.sqrt((nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2);
    return Math.round(distance);
  };

  

const App = () => {
    const [activeAlgorithm, setActiveAlgorithm] = useState(algofields[0].algorithm);
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const currentData = algofields.find((alg) => alg.algorithm === activeAlgorithm);
    const graphs = currentData.visualization.props.graphs;

    const renderVisualization = () => {
        let newGraph
        if(activeAlgorithm === 'Dijkstra'){
            console.log(graphs[selectedGraphIndex]);
            const updatedLinks = graphs[selectedGraphIndex].initialLinks.map((link) => ({
                ...link,
                weight: calculateDistance(
                    graphs[selectedGraphIndex].initialNodes.find((node) => node.id === link.source),
                    graphs[selectedGraphIndex].initialNodes.find((node) => node.id === link.target)
                ),
              }))
            console.log(updatedLinks,"ded");
            newGraph = {
                ...graphs[selectedGraphIndex],
                initialLinks : updatedLinks
            }
        }
        const additionalProps = {
            ...(activeAlgorithm === 'Dijkstra' && { selectedGraph: newGraph }),
            ...(activeAlgorithm === 'HuffmanTree' && { inputText: 'ACDED' }),
        };
        const VisualizationComponent = componentMap[currentData.visualization.componentName];
        return VisualizationComponent
            ? React.createElement(VisualizationComponent, {
                ...additionalProps,
                key: activeAlgorithm,
            })
            : null;
    };
    return (
        <div className="app-container">
            <h1 className="app-title">{currentData.title}</h1>
            <select className="algorithm-select" onChange={(e) => setActiveAlgorithm(e.target.value)} value={activeAlgorithm}>
                {algofields.map((alg) => (
                    <option key={alg.algorithm} value={alg.algorithm}>
                        {alg.algorithm}
                    </option>
                ))}
            </select>
            <div className="tabs">
                <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
                    Overview
                </button>
                <button onClick={() => setActiveTab('thingsToKnow')} className={activeTab === 'thingsToKnow' ? 'active' : ''}>
                    Things To Know
                </button>
                <button onClick={() => setActiveTab('visualization')} className={activeTab === 'visualization' ? 'active' : ''}>
                    Visualization
                </button>
                <button onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
                    Applications
                </button>
                <button onClick={() => setActiveTab('prosAndCons')} className={activeTab === 'prosAndCons' ? 'active' : ''}>
                    Pros and Cons
                </button>
            </div>
            <div className={activeTab === 'visualization' ? "tab-content" : "container"}>
                {activeTab === 'overview' && (
                    <div className="section">
                        <h2>Overview</h2>
                        <div dangerouslySetInnerHTML={{ __html: currentData.overview }} />
                    </div>
                )}
                {activeTab === 'thingsToKnow' && (
                    <div className="section">
                        <h2>Things To Know</h2>
                        {currentData.thingsToKnow.pdfFilePath && <Presentation pdfFilePath = {currentData.thingsToKnow.pdfFilePath}/>}
                    </div>
                )}
                {activeTab === 'applications' && (
                    <div className="section">
                        <h2>Applications</h2>
                        <div dangerouslySetInnerHTML={{ __html: currentData.applications }} />
                    </div>
                )}
                {activeTab === 'visualization' && (
                    <div className="visualization">
                        <div>
                            {activeAlgorithm === 'Dijkstra' && (
                                <select
                                    onChange={(e) => {
                                        const index = parseInt(e.target.value);
                                        setSelectedGraphIndex(index);
                                    }}
                                    value={selectedGraphIndex}
                                >
                                    {graphs.map((graph, index) => (
                                        <option key={index} value={index}>
                                            Graph {index + 1}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="graph-container">{renderVisualization()}</div>
                    </div>
                )}
                {activeTab === 'prosAndCons' && (
                    <div className="section">
                        <h2>Pros and Cons</h2>
                        <h3>Pros:</h3>
                        <ul>
                            {currentData.prosAndCons.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                            ))}
                        </ul>
                        <h3>Cons:</h3>
                        <ul>
                            {currentData.prosAndCons.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
