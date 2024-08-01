import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import './custom-tree.css'; // Ensure this file is imported
import styles from './HuffmanVisualization.module.css';
import {
  HuffmanNode,
  buildFrequencyTable,
  buildMinHeap,
  buildHuffmanCodes,
  encode,
  decode,
} from '../algorithms/huffman';

const HuffmanVisualization = () => {
  const [inputText, setInputText] = useState('');
  const [frequencyTable, setFrequencyTable] = useState({});
  const [minHeap, setMinHeap] = useState([]);
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [huffmanCodes, setHuffmanCodes] = useState({});
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    if (inputText) {
      const freqTable = buildFrequencyTable(inputText);
      setFrequencyTable(freqTable);

      const heap = buildMinHeap(freqTable);
      setMinHeap(heap);

      const steps = [];
      const buildTreeSteps = (heap) => {
        while (heap.length > 1) {
          const left = heap.shift();
          const right = heap.shift();
          const newNode = new HuffmanNode(null, left.freq + right.freq, left, right);
          heap.push(newNode);
          heap.sort((a, b) => a.freq - b.freq);
          steps.push([...heap]);
        }
        return heap[0];
      };

      const tree = buildTreeSteps([...heap]);
      setHuffmanTree(tree);
      setSteps(steps);
      setTreeData(convertToTreeData(tree));
    }
  }, [inputText]);

  useEffect(() => {
    if (huffmanTree && inputText) {
      const codes = buildHuffmanCodes(huffmanTree);
      setHuffmanCodes(codes);

      const encoded = encode(inputText, codes);
      setEncodedText(encoded);

      try {
        const decoded = decode(encoded, huffmanTree);
        setDecodedText(decoded);
      } catch (error) {
        setDecodedText('Decoding error');
      }
    }
  }, [huffmanTree, inputText]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setTreeData(convertToTreeData(steps[currentStep]));
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTreeData(convertToTreeData(steps[currentStep - 1]));
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const convertToTreeData = (node) => {
    if (!node) return null;
    return {
      name: node.char !== null ? `${node.char} (${node.freq})` : `(${node.freq})`,
      children: [
        convertToTreeData(node.left),
        convertToTreeData(node.right)
      ].filter(child => child !== null)
    };
  };

  const getDynamicPathClass = ({ source, target }, orientation) => {
    if (!target.children) {
      // Target node has no children -> this link leads to a leaf node.
      return 'link__to-leaf';
    }

    // Style it as a link connecting two branch nodes by default.
    return 'link__to-branch';
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <h2>Huffman Tree</h2>
        <div className={styles.huffmanTree}>
          {treeData ? (
            <Tree
              data={treeData}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              // pathClassFunc={() => 'link__to-branch'}
              pathClassFunc={getDynamicPathClass} // Use the dynamic path class function
            />
          ) : (
            <p>No tree data available</p>
          )}
        </div>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.inputSection}>
          <h2>Input Text</h2>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text here..."
            rows={4}
            cols={50}
          />
        </div>
        <div className={styles.rightPaneContent}>
          <div className={styles.frequencyTable}>
            <h3>Frequency Table</h3>
            <table>
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(frequencyTable).map(([char, freq]) => (
                  <tr key={char}>
                    <td>{char}</td>
                    <td>{freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.huffmanCodes}>
            <h3>Huffman Codes</h3>
            <table>
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(huffmanCodes).map(([char, code]) => (
                  <tr key={char}>
                    <td>{char}</td>
                    <td>{code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.rightPaneContent}>
          <div className={styles.encodedOutput}>
            <h3>Encoded Output</h3>
            <p>{encodedText}</p>
          </div>
          <div className={styles.decodedOutput}>
            <h3>Decoded Output</h3>
            <p>{decodedText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuffmanVisualization;
