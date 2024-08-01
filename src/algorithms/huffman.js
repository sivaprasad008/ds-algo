class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
      this.char = char
      this.freq = freq
      this.left = left
      this.right = right
    }
  }
  
  const buildFrequencyTable = (text) => {
    const freqMap = {}
    for (let char of text) {
      if (!freqMap[char]) {
        freqMap[char] = 0
      }
      freqMap[char]++
    }
    return freqMap
  }
  
  const buildMinHeap = (freqMap) => {
    const heap = []
    for (let char in freqMap) {
      heap.push(new HuffmanNode(char, freqMap[char]))
    }
    heap.sort((a, b) => a.freq - b.freq)
    return heap
  }
  
  const buildHuffmanTree = (heap) => {
    while (heap.length > 1) {
      const left = heap.shift()
      const right = heap.shift()
      const newNode = new HuffmanNode(null, left.freq + right.freq, left, right)
      heap.push(newNode)
      heap.sort((a, b) => a.freq - b.freq)
    }
    return heap[0]
  }
  
  const buildHuffmanCodes = (node, code = '', codeMap = {}) => {
    if (node.char !== null) {
      codeMap[node.char] = code
    } else {
      if (node.left) buildHuffmanCodes(node.left, code + '0', codeMap)
      if (node.right) buildHuffmanCodes(node.right, code + '1', codeMap)
    }
    return codeMap
  }
  
  const encode = (text, codeMap) => {
    console.log(codeMap,"codeMap");
    let encodedText = ''
    for (let char of text) {
      encodedText += codeMap[char]
    }
    return encodedText
  }


const decode = (encodedText, rootNode) => {
    if (!encodedText || !rootNode) return '';
  
    let decodedText = '';
    let currentNode = rootNode;
    console.log(encodedText);
  
    for (let bit of encodedText) {
      if (!currentNode) {
        throw new Error('Decoding error: Current node is undefined.');
      }
  
      // Traverse the Huffman tree based on the bit
      currentNode = bit === '0' ? currentNode.left : currentNode.right;
  
      // Check if the traversal reached a leaf node
      if (currentNode && currentNode.char !== null) {
        decodedText += currentNode.char;
        // Reset to the root node for the next character
        currentNode = rootNode;
      }
    }
  
    // Check if currentNode is undefined after processing the encoded text
    if (currentNode !== rootNode) {
      throw new Error('Decoding error: Traversal did not return to the root node.');
    }
  
    return decodedText;
  }
  
  
  
  export {
    HuffmanNode,
    buildFrequencyTable,
    buildMinHeap,
    buildHuffmanTree,
    buildHuffmanCodes,
    encode,
    decode,
  }
  