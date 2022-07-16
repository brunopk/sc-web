import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from './Context'

const CARD_BODY_PADDING_IN_EM = 2

const Container = styled.div`
  padding: ${CARD_BODY_PADDING_IN_EM}em ${CARD_BODY_PADDING_IN_EM}em ${CARD_BODY_PADDING_IN_EM}em 3em;
`

function CardBody({ children }) {
  const { cardBodyId, cardHeaderId, expandible, expanded } = useContext(Context)
  if (expandible) {
    return (
      <Container
        id={cardBodyId}
        className={expanded ? 'collapse show' : 'collapse'}
        aria-labelledby={cardHeaderId}>
        <div>
          {children}
        </div>
      </Container>
    )
  }
  return (
    <Container id={cardBodyId} aria-labelledby={cardHeaderId}>
      <div>
        {children}
      </div>
    </Container>
  )
}

export { CardBody, CARD_BODY_PADDING_IN_EM }
