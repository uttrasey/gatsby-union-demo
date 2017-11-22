import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { getRandomColor, invertColor } from '../colors'

const Shapes = styled.article`
  width: 100%;
  text-align: center;
`

const Wrap = styled.div`
    & div {
      background-color: ${props => props.bgcolor};
      margin: 20px auto;
      box-shadow: 5px 5px 2px 1px rgba(0, 0, 0, .2);
    }
`

const Area = styled.span`
  font-size : 12px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const Square = styled.div`
  width: ${props => `${props.sideLength}px`};
  height: ${props => `${props.sideLength}px`};
  margin: 20px auto;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-shadow: 5px 5px 2px 1px rgba(0, 0, 0, .2);
`

const Circle = styled.div`
  border-radius: 50%;
  width: ${props => `${props.radius * 2}px`};
  height: ${props => `${props.radius * 2}px`};
`

const radius = 50

const IndexPage = ({ data }) => (
  <div>
    <h1>Shapes ordered by area</h1>
    <Shapes>
      {
        data.squares.edges.map(
          ({ node }) =>
            <Wrap key={node.id} bgcolor={getRandomColor()}>
              <Square {...node} />
              <Area>◼️&nbsp; &nbsp;{node.fields.area} ({node.sideLength} x {node.sideLength})</Area>
            </Wrap>
        )
      }
      {
        data.circles.edges.map(
          ({ node }) =>
            <Wrap key={node.id} bgcolor={getRandomColor()}>
              <Circle bgcolor={getRandomColor()} radius={node.radius} />
              <Area>⚫&nbsp; &nbsp;{node.fields.area} (r:{node.radius})</Area>
            </Wrap>
        )
      }
    </Shapes>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    squares: allContentfulSquare {
      edges {
        node {
          ...sqaureFields
        }
      }
    }
    circles: allContentfulCircle {
      edges {
        node {
          ...circleFields
        }
      }
    }
    shapes: allShapes {
      ... on ContentfulCircle {
        ...circleFields
      }
      ... on ContentfulSquare {
        ...sqaureFields
      }
    }
  }

  fragment circleFields on ContentfulCircle {
    id
    radius
    fields {
      area
    }
  }

  fragment sqaureFields on ContentfulSquare {
    id
    sideLength
    fields {
      area
    }
  }
`
