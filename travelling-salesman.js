'use strict'

const _ = require('lodash')

function getDistances(distances, node, path) {
  return distances[node]
    .map((distance, node) => _.includes(path, node) ? Infinity : distance) // remove visited nodes
}

function getCloserNode(distances) {
  let closerDistance = _.min(distances)

  if (closerDistance === Infinity) {
    throw new Error('Path not found')
  }

  return _.findIndex(distances, x => x === closerDistance)
}

function greedyCalculate(startNode, distances) {
  let currentNode = startNode
  let path = [startNode]

  while (path.length !== distances.length) {
    let distancesFromCurrentNode = getDistances(distances, currentNode, path)
    let closerNode = getCloserNode(distancesFromCurrentNode)

    currentNode = closerNode
    path.push(closerNode)
  }

  path.push(startNode)

  return pathToSolution(path, distances)
}

function calculateTotalDistance(path, distances) {
  return _(path)
    .initial()
    .map((x, i) => {
      let current = path[i], next = path[i + 1]
      return distances[current][next]
    })
    .sum()
}

function performRotations(sourcePath, rotationSize) {
  let paths = []
  let max = sourcePath.length - rotationSize

  for (let i = 1; i < max; i++) {
    let path = _.clone(sourcePath)
    let portion = path.slice(i, i + rotationSize).reverse()

    // inject portion into path
    for (let j = i, k = 0; k < rotationSize; j++, k++) {
      path[j] = portion[k]
    }

    paths.push(path)
  }

  return paths
}

function pathToSolution(path, distances) {
  return {
    path: path,
    distance: calculateTotalDistance(path, distances)
  }
}

function optimizeSolution(initialSolution, distances) {
  let bestSolution = initialSolution

  for (let rotationSize = 2; rotationSize < distances.length; rotationSize++) {
    let paths = performRotations(bestSolution.path, rotationSize)
    let solutions = paths.map(path => pathToSolution(path, distances))
    let currentBestSolution = _.minBy(solutions, 'distance')

    if (currentBestSolution.distance < bestSolution.distance) {
      bestSolution = currentBestSolution
    }
  }

  return bestSolution
}

function calculate(startNode, distances) {
  let initialSolution = greedyCalculate(startNode, distances)
  let finalSolution = optimizeSolution(initialSolution, distances)

  return finalSolution
}

module.exports = {
  calculate: calculate
}