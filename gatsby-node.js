const _ = require(`lodash`)
const { GraphQLUnionType, GraphQLList } = require(`graphql`)

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
      value: node.sideLength * node.sideLength + 0.01 // hack for the moment to force GQLfloat
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

/**
 * The GraphQL definition of our shape union type
 */
const defineShapesType = (CircleGql, SquareGql) => (
  new GraphQLUnionType({
    name: `AllShapesType`,
    description: `All shapes under one roof`,
    types: [ CircleGql, SquareGql ],
    resolveType: (data) => {
      const { type } = data.internal
      switch (type) {
        case `ContentfulCircle`:
          return CircleGql
        case `ContentfulSquare`:
          return SquareGql
        default:
          return null
      }
    },
  })
)

const genAllShapesField = (CircleGql, SquareGql, allNodes) => {
  return {
    allShapes: {
      type: new GraphQLList(defineShapesType(CircleGql, SquareGql)),
      args: {},
      resolve(root, args) {
        const latestNodes = _.filter(
          allNodes,
          n => (n.internal.type === `ContentfulCircle`) ||
                (n.internal.type === `ContentfulSquare`)
        )
        return latestNodes
      },
    },
  }
}

/**
 * Hook up the Union Query
 */
exports.enhanceSchema = ({ types, allNodes}) => {
  const CircleType = types[`contentfulCircle`].nodeObjectType
  const SqaureType = types[`contentfulSquare`].nodeObjectType

  return new Promise((resolve, reject) => {
    const allShapes = genAllShapesField(CircleType, SqaureType, allNodes);
    resolve(allShapes)
  });
}
