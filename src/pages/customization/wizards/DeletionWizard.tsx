import React, { useContext, useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { Container, Row } from '@bootstrap-styled/v4'
import { observer } from 'mobx-react-lite'
import { Modal } from '../../../components/modal'
import { Text, Input } from '../../../components/form'
import { Type } from '../../../components/selection/types'
import { ColorSelector, Selector } from '../../../components/selection'
import { StoreContext } from '../../../context'
import { SIZE } from '../../../constants'
import SelectionModes from '../SelectionModes'


// TODO: improve this to avoid using .modal the user should not know there is a "modal" class
const StyledModal = styled(Modal)`
  .modal-content {
    ${(props) => bp.up('sm', props.theme['$grid-layout'], `height: ${SIZE.S92}rem`)};
  }
`

const StyledRow = styled(Row)`
  margin-top: ${SIZE.S30}em;
`

const Label = styled(Text)`
  width: 5rem;
`

const StyledInput = styled(Input)`
  flex: 1;
`

// TODO: edit JSX for each step using components similar to SectionCreator
// TODO: use methods from mobx store for onSelect attribute of SelectionModes component

/*
 <Text>Delete all sections with the same color.</Text>
 <span className="m-3">Delete all sections between two points.</span>
*/

type DeletionWizardProps = {
  id: string
  colorList: string[]
}

export default observer(() => {
  const { store } = useContext(StoreContext)
  // eslint-disable-next-line no-shadow
  const primaryButton = store!.customization.deletionWizard.getPrimaryButton()
  const secondaryButton = store!.customization.deletionWizard.getSecondaryButton()
  const [color, setColor] = useState<string | null>(null)
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  return (
    <StyledModal
      formId="deletion-wizard"
      errorMessage={store!.customization.deletionWizard.error}
      isOpen={store!.customization.deletionWizard.isVisible}
      primaryBtn={{ text: primaryButton.text, onClick: primaryButton.action }}
      secondaryBtn={{ text: secondaryButton.text, onClick: secondaryButton.action }}>
      {store!.customization.deletionWizard.currentStep === 0 ? (
        <Selector
          type={Type.List}
          options={SelectionModes}
          onSelect={(option) => store!.customization.deletionWizard.changeSelectionMode(option)} />
      ) : <></>}
      {store!.customization.deletionWizard.currentStep === 1 ? (
        <>
          { store!.customization.deletionWizard.selectionMode.name ===
          SelectionModes.SECTIONS_BETWEEN_TWO_POINTS.name ? (
            <Container>
              <StyledRow>
                <Label>From:</Label>
                <StyledInput
                  type="number"
                  name="from"
                  value={from}
                  onChange={(v) => setFrom(parseInt(v.target.value, 10))}
                  required />
              </StyledRow>
              <StyledRow>
                <Label>To:</Label>
                <StyledInput
                  type="number"
                  name="to"
                  value={to}
                  onChange={(v) => setTo(parseInt(v.target.value, 10))}
                  required />
              </StyledRow>
            </Container>
          ) : <></>}
          { store!.customization.deletionWizard.selectionMode.name ===
          SelectionModes.BY_COLOR.name ? (
            <Container>
              <StyledRow>
                <div className="col col-4">
                  <span>Color:</span>
                </div>
                <div className="col col-8">
                  <ColorSelector
                    options={{
                      OP1: { hex: '#f20e0e' },
                      OP2: { hex: '#0011aa' },
                      OP3: { hex: '#00aa6f' }
                    }}
                    onSelect={() => null} />
                </div>
              </StyledRow>
            </Container>
          ) : <></>}
        </>
      ) : <></>}
    </StyledModal>
  )
}) as FunctionComponent<DeletionWizardProps>
