import Node from './Node';

class GridClass {
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
        return node.isEqual(this.goalNode);
    }
    visit(node) {
        this.visited.set(node.id, node);
    }
    isVisited(node) {
        if (Array.isArray(node)) {
            return this.visited.has(node.toString());
        }
        return this.visited.has(node.id);
    }
    isWall(node) {
        if (Array.isArray(node)) {
            return this.walls.has(node.toString());
        }
        return this.walls.has(node.id);
    }
    validCoord(node) {
        if (Array.isArray(node)) {
            return node[0] > 0 && node[0] < this.height && node[1] > 0 && node[1] < this.width;
        }
        return node.x > 0 && node.x < this.height && node.y > 0 && node.y < this.width;
    }
}

export default GridClass;
