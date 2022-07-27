import React, { useContext, ReactElement } from 'react'
import $ from 'jquery'
import styled from 'styled-components'
import Context from './Context'
import { COLOR, SIZE } from '../../constants'

type CardHeaderProps = {
  children: ReactElement
}

const Container = styled.div`
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,.125);
  padding: ${SIZE.S30}em;
  background: ${COLOR.GRAY20};
`

export default function CardHeader({ children }: CardHeaderProps) {
  const { expanded, expandible, cardHeaderId, cardBodyId } = useContext(Context)
  if (expandible) {
    return (
      <Container
        id={cardHeaderId}
        onClick={() => $(`#${cardBodyId}`).collapse('toggle')}
        aria-expanded={expanded}
        aria-controls={cardBodyId}>
        {children}
      </Container>
    )
  }
  return (<Container id={cardHeaderId}>{children}</Container>)
}
