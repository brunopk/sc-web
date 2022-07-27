import React, { useContext, useState, FunctionComponent } from 'react'
import styled from 'styled-components'
import { bp } from '@bootstrap-styled/css-mixins/lib'
import { Container, Row } from '@bootstrap-styled/v4'
import { observer } from 'mobx-react-lite'
import { Modal } from '../../../components/modal'
import { buildOptionList } from '../../../components/option-list'
import { Text, Input } from '../../../components/form'
import { StoreContext } from '../../../context'
import { SIZE } from '../../../constants'
import AvailableSelectionModes from '../SelectionModes'

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
// TODO: fix margin/paddings on the first step of this modal (set fixed size for lg screens)
// TODO: use methods from mobx store for onSelect attribute of SelectionModes component
const SelectionModes = buildOptionList(AvailableSelectionModes)

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
        <SelectionModes
          onSelect={(option) => store!.customization.deletionWizard.changeSelectionMode(option)} />
      ) : <></>}
      {store!.customization.deletionWizard.currentStep === 1 ? (
        <>
          { store!.customization.deletionWizard.selectionMode.name ===
          AvailableSelectionModes.SECTIONS_BETWEEN_TWO_POINTS.name ? (
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
          AvailableSelectionModes.BY_COLOR.name ? (
            <Container>
              <StyledRow>
                <div className="col col-4">
                  <span>Color:</span>
                </div>
                <div className="col col-8">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      style={{ backgroundColor: color || '#000000' }}
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-label="Select color" />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {[].map((hex, index) => (
                        <div
                          className="dropdown-item"
                          key={index}
                          style={{ backgroundColor: hex }}
                          onClick={() => setColor(hex)}>
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StyledRow>
            </Container>
          ) : <></>}
        </>
      ) : <></>}
    </StyledModal>
  )
}) as FunctionComponent<DeletionWizardProps>
