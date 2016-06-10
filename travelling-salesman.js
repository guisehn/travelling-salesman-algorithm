'use strict'

const _ = require('lodash')

function getDistances(distances, node, path) {
  return distances[node]
    .map((distance, node) => path.indexOf(node) === -1 ? distance : Infinity) // remove visited nodes
}

function getCloserNode(distances) {
  let closerDistance = _.min(distances)

  if (closerDistance === Infinity) {
    throw new Error('Path not found')
  }

  return _.findIndex(distances, x => x === closerDistance)
}

function greedyCalculate(nodeNames, startNode, distances) {
  let currentNode = startNode
  let path = [startNode]

  while (path.length !== distances.length) {
    let distancesFromCurrentNode = getDistances(distances, currentNode, path)
    let closerNode = getCloserNode(distancesFromCurrentNode)

    currentNode = closerNode
    path.push(closerNode)
  }

  return path.concat(startNode)
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

  for (let i = 1; i < sourcePath.length - rotationSize; i++) {
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

function getFinalSolution(initialPath, distances) {
  let bestSolution = {
    path: initialPath,
    distance: calculateTotalDistance(initialPath, distances)
  }

  for (let rotationSize = 2; rotationSize < distances.length; rotationSize++) {
    let paths = performRotations(bestSolution.path, rotationSize)

    let candidates = paths.map(path => ({
      path: path,
      distance: calculateTotalDistance(path, distances)
    }))

    let currentBestSolution = _.minBy(candidates, 'distance')

    if (currentBestSolution.distance < bestSolution.distance) {
      bestSolution = currentBestSolution
    }
  }

  return bestSolution
}

function calculate(nodeNames, startNode, distances) {
  let initialPath = greedyCalculate(nodeNames, startNode, distances)
  let finalSolution = getFinalSolution(initialPath, distances)

  finalSolution.path = finalSolution.path.map(x => nodeNames[x])

  return finalSolution
}

module.exports = {
  calculate: calculate
}