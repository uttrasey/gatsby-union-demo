const cmsPrefix = `Contentful`

const getCircleArea = radius => {
  const area = radius * radius * Math.PI
  return Math.round(area * 100) / 100
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `${cmsPrefix}Square`) {
    createNodeField({
      node,
      name: `area`,
      value: node.sideLength * node.sideLength
    })
  }

  if (node.internal.type === `${cmsPrefix}Circle`) {
    createNodeField({
      node,
      name: `area`,
      value: getCircleArea(node.radius)
    })
  }
}
