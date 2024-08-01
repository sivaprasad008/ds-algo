export const dijkstraWithSteps = async (graph, startNode, endNode) => {
  const distances = {}
  const previous = {}
  const visitedOrder = []
  const pathMap = {}

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    pathMap[node] = [];
  }

  distances[startNode] = 0;
  pathMap[startNode] = [startNode];

  const unvisitedNodes = new Set(Object.keys(graph));

  while (unvisitedNodes.size > 0) {
    let currentNode = Array.from(unvisitedNodes).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    if (distances[currentNode] === Infinity) break;

    unvisitedNodes.delete(currentNode);
    visitedOrder.push(currentNode);

    // if (currentNode === endNode) {
    //   break;
    // }

    for (let neighbor in graph[currentNode]) {
      let distance = distances[currentNode] + graph[currentNode][neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentNode;
        pathMap[neighbor] = [...pathMap[currentNode], neighbor];
      }
    }
  }

  return { distances, previous, visitedOrder, pathMap };
};




export const shortestPath = async (previous, startNode, endNode) => {
  const path = [];
  let currentNode = endNode;

  if (previous[endNode] === null) {
    return []; // Return empty if no path found
  }

  while (currentNode !== startNode) {
    path.push(currentNode);
    currentNode = previous[currentNode];
    if (currentNode === null) break; // Prevent infinite loop
  }

  path.push(startNode);
  return path.reverse();
};
