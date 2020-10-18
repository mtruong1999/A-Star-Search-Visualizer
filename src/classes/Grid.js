import Node from './Node';

class Grid {
    constructor(w, h, startCoord, goalCoord, walls) {
        this.width = w;
        this.height = h;
        this.startNode = new Node(...startCoord);
        this.goalNode = new Node(...goalCoord);
        this.visited = new Map();
        this.walls = new Map();
        walls.forEach(w => this.walls.set(String(w), new Node(...w)));      
    }
    isGoal(node) {
        return node.isEqual(goalNode);
    }
    visit(node) {
        this.visited.set(node.id, node);
    }
    isVisited(node) {
        return this.visited.has(node.id);
    }
    isWall(node) {
        return this.walls.has(node.id);
    }
    validCoord(node) {
        return node.x > 0 && node.x < this.height && node.y > 0 && node.y < this.width;
    }
}

export default Grid;
