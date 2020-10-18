import Node from './Node';
import PriorityQueue from './PriorityQueue';

function reconstruct_path(cameFrom, current) {
    return 0;
}

function isValidNode(node) {
    return true;
}

function get_neighbors(node) {
    const nodes = [];

    const neighbors = [
        [node.x, node.y - 1],
        [node.x, node.y + 1],
        [node.x - 1, node.y],
        [node.x + 1, node.y],

    ];

    neighbors.forEach((item) => {
        if(isValidNode(item)) nodes.push(new Node(item[0], item[1]))
    });
}

function node_in_set(node, set) {
    return set.some(e => e.isEqual(node));
}

const comparator = (node1, node2) => node1.total_cost < node2.total_cost; 
export function a_star(startNode, goalNode, h) {
    const openSet = PriorityQueue(comparator);
    openSet.push(startNode);

    startNode.g_n_cost = 0;
    startNode.calculate_h(goalNode);

    while(!openSet.isEmpty()) {
        let currentNode = openSet.peek();
        if (currentNode.isEqual(goalNode)) {
            return reconstruct_path(currentNode.predecessor, currentNode);
        }

        openSet.pop();
        get_neighbors(currentNode).forEach((neighbor) => {
            let tentative_gScore = currentNode.g_n_cost + 1;

            if(tentative_gScore < neighbor.g_n_cost) {
                neighbor.predecessor = currentNode;
                neighbor.g_n_cost = tentative_gScore;
                neighbor.calculate_h(goalNode); // no need to calculate f(x), use node.total_cost

                if(!node_in_set(neighbor, openSet.heap)) {
                    openSet.push(neighbor);
                }
            }
        });
        
    }
    return false;
}