import Node from './Node';
import PriorityQueue from './PriorityQueue';

// TODO: Maybe reconstruc path outside of this? In some svelte component to rerender
// the path as its generated?
function reconstruct_path(cameFrom, current) {
    let totalPath = [current];
    while(current.predecessor != null) {
        current = current.predecessor
        totalPath.unshift(current)
    }
    return totalPath
}

function isValidNode(node, grid) {
    return !grid.isWall(node) && !grid.isVisited(node) && grid.validCoord(node);
}

function get_neighbors(node, grid) {
    const nodes = [];

    const neighbors = [
        [node.x, node.y - 1],
        [node.x, node.y + 1],
        [node.x - 1, node.y],
        [node.x + 1, node.y],

    ];

    neighbors.forEach((item) => {
        if(isValidNode(item,grid)) nodes.push(new Node(item[0], item[1]))
    });
    
    return nodes;
}

function node_in_set(node, set) {
    return set.some(e => e.isEqual(node));
}

export function a_star(grid) {
    const comparator = (node1, node2) => node1.total_cost < node2.total_cost;
    const openSet = new PriorityQueue(comparator);
    let visitedNodes = [];
    let fullSetNodes = []
    openSet.push(grid.startNode);

    grid.startNode.g_n_cost = 0;
    grid.startNode.predecessor = null;
    grid.startNode.calculate_h(grid.goalNode);

    while(!openSet.isEmpty()) {
        let currentNode = openSet.peek();
        if (grid.isGoal(currentNode)) {
            return [visitedNodes, reconstruct_path(currentNode.predecessor, currentNode), fullSetNodes];
        }

        let visitedNode = openSet.pop(); // Add visited nodes in order to be used
        visitedNodes.push(visitedNode); // in animation
        grid.visit(visitedNode);
        fullSetNodes.push({
            "node" : visitedNode,
            "type" : "visited",
        });

        get_neighbors(currentNode, grid).forEach((neighbor) => {
            fullSetNodes.push({
                "node" : neighbor,
                "type" : "neighbor",
            });
            let tentative_gScore = currentNode.g_n_cost + 1;
            if(tentative_gScore < neighbor.g_n_cost) {
                neighbor.predecessor = currentNode;
                neighbor.g_n_cost = tentative_gScore;
                neighbor.calculate_h(grid.goalNode); // no need to calculate f(x), use node.total_cost

                if(!node_in_set(neighbor, openSet.heap)) {
                    openSet.push(neighbor);
                }
            }
        });
        
    }
    return false;
}
