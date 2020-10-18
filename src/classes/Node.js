function manhattan_distance(node1, node2) {
    return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}

class Node {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.g_n = Infinity;
        this.h_n = 0;
        this.predecessor = NULL;
    }

    get id() {
        return `${this.x},${this.y}`;
    }

    set predecessor(predecessor) {
        this.predecessor = predecessor;
    }

    get predecessor() {
        return this.predecessor;
    }

    set g_n_cost(cost) {
        this.g_n = cost;
    }

    get g_n_cost() {
        return this.g_n;
    }

    calculate_h(endNode) {
        this.h_n = manhattan_distance(this, endNode);
    }
    //set h_n_cost(cost) {
        //this.h_n = cost;
    //}
    
    get h_n_cost() {
        return this.h_n;
    }

    get total_cost() {
        return this.g_n + this.h_n;
    }
    
    isEqual(node) {
        return this.x == node.x && this.y == node.y;
    }
    
}

export default Node;
