import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {  getRandomColor, invertColor } from '../colors'

const Shapes = styled.article`
  width: 100%;
  text-align: center;
`

const Wrap = styled.div`
    & div {
      background-color: ${props => props.bgcolor};
    }
`


const Square = styled.div`
  width: ${props => `${props.sideLength}px`};
  height: ${props => `${props.sideLength}px`};
  margin: 20px auto;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-shadow: 5px 5px 2px 1px rgba(0, 0, 0, .2);
`

const Area = styled.span`
  font-size : 12px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const IndexPage = ({ data }) => (
  <div>
    <h1>Shapes ordered by area</h1>
    <Shapes>
    {
      data.squares.edges.map(
        ({ node }) =>
          <Wrap key={node.id} bgcolor={getRandomColor()}>
            <Square {...node} />
            <Area>◻️ {node.sideLength * node.sideLength} ({node.sideLength} x {node.sideLength})</Area>
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
          sideLength
          id
        }
      }
    }
  }
`
