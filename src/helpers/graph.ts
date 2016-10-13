
// export class Graph {
// 	constructor(private map) {

// 	}
// 	extractKeys(obj) {
// 		var keys = [], key;
// 		for (key in obj) {
// 			Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
// 		}
// 		return keys;
// 	}

// 	sorter(a, b) {
// 		return parseFloat(a) - parseFloat(b);
// 	}
// 	addToOpen(cost, vertex) {
// 		var key = "" + cost;
// 		if (!open[key]) open[key] = [];
// 		open[key].push(vertex);
// 	}
// 	public findShortestPath(start, end, infinity = Infinity) {

// 		var costs = {},
// 			open = { '0': [start] },
// 			predecessors = {},
// 			keys;



// 		costs[start] = 0;

// 		while (open) {
// 			if (!(keys = this.extractKeys(open)).length) break;

// 			keys.sort(this.sorter);

// 			var key = keys[0],
// 				bucket = open[key],
// 				node = bucket.shift(),
// 				currentCost = parseFloat(key),
// 				adjacentNodes = this.map[node] || {};

// 			if (!bucket.length) delete open[key];

// 			for (var vertex in adjacentNodes) {
// 				if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
// 					var cost = adjacentNodes[vertex],
// 						totalCost = cost + currentCost,
// 						vertexCost = costs[vertex];

// 					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
// 						costs[vertex] = totalCost;
// 						this.addToOpen(totalCost, vertex);
// 						predecessors[vertex] = node;
// 					}
// 				}
// 			}
// 		}

// 		if (costs[end] === undefined) {
// 			return null;
// 		} else {
// 			return predecessors;
// 		}

// 	}
// }