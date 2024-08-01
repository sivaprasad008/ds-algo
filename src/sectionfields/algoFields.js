const algofields = [
    {
        title: 'Dijkstra Algorithm',
        algorithm: 'Dijkstra',
        overview: `
          <h3>Definition:</h3>
          <p><b>Dijkstra's algorithm</b> is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge path costs, producing a shortest path tree. The algorithm maintains a set of nodes whose shortest distance from the source is known and continuously expands this set by selecting the node with the minimum known distance.</p>
          <h3>Inventor:</h3>
          <p><b>Dijkstra's algorithm</b> was conceived by Dutch computer scientist <b>Edsger W. Dijkstra</b> in 1956 and published in 1959.</p>
          <h3>Purpose:</h3>
          <p>The primary purpose of <b>Dijkstra's algorithm</b> is to find the shortest path from a starting node (source) to all other nodes in a weighted graph.</p>
          <h3>Complexity:</h3>
          <p>The time complexity of <b>Dijkstra's algorithm</b> is <b>O(V^2)</b> for the naive implementation, where V is the number of vertices. Using priority queues, the complexity can be reduced to <b>O(E log V)</b>, where E is the number of edges.</p>
        `,
        applications: `
          <p><b>Dijkstra's algorithm</b> is extensively used in network routing protocols and geographic mapping applications. It helps in finding the shortest path between nodes in a graph, which is crucial for:</p>
          <ul>
            <li>Route optimization in transportation and logistics.</li>
            <li>Telecommunication networks for efficient data routing.</li>
            <li>Robotics for path planning and navigation.</li>
            <li>Pathfinding in video games.</li>
            <li>As a subroutine in other graph algorithms.</li>
          </ul>
        `,
        prosAndCons: {
          pros: [
            "Finds the shortest path efficiently for graphs with non-negative weights.",
            "Can handle both directed and undirected graphs.",
            "The algorithm is straightforward and easy to implement.",
            "It provides the shortest path from a single source to all other nodes in the graph."
          ],
          cons: [
            "Not suitable for graphs with negative weight edges.",
            "Less efficient than other algorithms like A* in some cases.",
            "It requires additional data structures such as priority queues for efficient implementation.",
            "The algorithm can be slow for large graphs due to its time complexity of O(V^2) for the naive implementation and O(E log V) for the optimized version using priority queues."
          ]
        },
        thingsToKnow : {
            pdfFilePath : `/dijkstraSlides.pdf`
        },
        visualization: {
            componentName: 'GraphVisualization',
            props: {
                graphs : [
                    {
                        initialNodes: [
                            { id: 'A', x: 200, y: 49 },
                            { id: 'B', x: 284, y: 153 },
                            { id: 'C', x: 504, y: 161 },
                            { id: 'D', x: 268, y: 292 },
                            { id: 'E', x: 504, y: 295 },
                            { id: 'F', x: 792, y: 185 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'E' },
                            { source: 'D', target: 'E' },
                            { source: 'E', target: 'F' },
                            { source: 'C', target: 'F' },
                        ],
                        startNode: 'A',
                        endNode: 'F',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 167, y: 213 },
                            { id: 'B', x: 354, y: 98 },
                            { id: 'C', x: 343, y: 226 },
                            { id: 'D', x: 336, y: 352 }
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'A', target: 'D' },
                            { source: 'B', target: 'C' },
                            { source: 'D', target: 'C' }
                        ],
                        startNode: 'A',
                        endNode: 'C',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 100, y: 100 },
                            { id: 'B', x: 300, y: 250 },
                            { id: 'C', x: 500, y: 100 },
                            { id: 'D', x: 700, y: 300 },
                            { id: 'E', x: 900, y: 300 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'A', target: 'C' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'D' },
                            { source: 'D', target: 'E' },
                        ],
                        startNode: 'A',
                        endNode: 'E',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 100, y: 100 },
                            { id: 'B', x: 300, y: 250 },
                            { id: 'C', x: 500, y: 100 },
                            { id: 'D', x: 700, y: 300 },
                            { id: 'E', x: 900, y: 300 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'A', target: 'C' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'D' },
                            { source: 'D', target: 'E' },
                        ],
                        startNode: 'A',
                        endNode: 'B',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 100, y: 100 },
                            { id: 'B', x: 300, y: 250 },
                            { id: 'C', x: 500, y: 100 },
                            { id: 'D', x: 700, y: 300 },
                            { id: 'E', x: 900, y: 300 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'A', target: 'C' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'D' },
                            { source: 'D', target: 'E' },
                        ],
                        startNode: 'A',
                        endNode: 'E',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 100, y: 100 },
                            { id: 'B', x: 250, y: 250 },
                            { id: 'C', x: 400, y: 250 },
                            { id: 'D', x: 700, y: 250 },
                            { id: 'E', x: 900, y: 300 },
                            { id: 'F', x: 1200, y: 450 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'E' },
                            { source: 'D', target: 'E' },
                            { source: 'E', target: 'F' },
                            { source: 'C', target: 'F' },
                        ],
                        startNode: 'A',
                        endNode: 'F',
                    },
                    {
                        initialNodes: [
                            { id: 'A', x: 100, y: 100 },
                            { id: 'B', x: 300, y: 250 },
                            { id: 'C', x: 500, y: 100 },
                            { id: 'D', x: 700, y: 300 },
                            { id: 'E', x: 900, y: 300 },
                        ],
                        initialLinks: [
                            { source: 'A', target: 'B' },
                            { source: 'A', target: 'C' },
                            { source: 'B', target: 'C' },
                            { source: 'B', target: 'D' },
                            { source: 'C', target: 'D' },
                            { source: 'D', target: 'E' },
                        ],
                        startNode: 'A',
                        endNode: 'D',
                    }
                ] 
            },
        }
    },
    {
        title: 'Huffman Coding Algorithm',
        algorithm: 'HuffmanTree',
        overview: `
            <h3>Definition:</h3>
            <p><b>Huffman coding</b> is a lossless data compression algorithm that assigns variable-length codes to input characters, with shorter codes assigned to more frequent characters. The result is a prefix-free binary tree known as a Huffman tree.</p>
            <h3>Inventor:</h3>
            <p><b>Huffman coding</b> was developed by <b>David A. Huffman</b> while he was a Ph.D. student at MIT, and it was published in 1952.</p>
            <h3>Purpose:</h3>
            <p>The primary purpose of <b>Huffman coding</b> is to compress data efficiently by reducing the average length of the codes assigned to the input characters, thereby minimizing the overall size of the data.</p>
            <h3>Complexity:</h3>
            <p>The time complexity for building a <b>Huffman tree</b> is <b>O(n log n)</b>, where n is the number of unique characters in the input. The complexity for encoding and decoding operations is <b>O(n)</b>, where n is the length of the input string.</p>
        `,
        applications: `
            <p><b>Huffman coding</b> is widely used in various data compression applications, including:</p>
            <ul>
                <li>File compression formats such as ZIP and GZIP.</li>
                <li>Multimedia codecs such as JPEG for image compression and MP3 for audio compression.</li>
                <li>Transmission protocols to reduce the size of transmitted data.</li>
                <li>Text file compression.</li>
                <li>As a fundamental technique in information theory and coding theory.</li>
            </ul>
        `,
        prosAndCons: {
            pros: [
                "Achieves optimal data compression for a given set of input frequencies.",
                "The algorithm is simple and easy to implement.",
                "Produces a prefix-free code, ensuring no code is a prefix of another.",
                "Widely applicable to various types of data, including text and multimedia."
            ],
            cons: [
                "Requires knowledge of the frequency of input characters beforehand.",
                "May not be as efficient for small datasets compared to other compression methods.",
                "In some cases, more modern algorithms like Arithmetic coding can achieve better compression ratios."
            ]
        },
        thingsToKnow : {
            pdfFilePath : `/huffmanSlides.pdf`
        },
        visualization: {
            componentName: 'HuffmanVisualization',
            props: {},
        },
    }
]


export default algofields