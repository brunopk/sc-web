import React, { useEffect, useContext, useState } from 'react';
import './PCustomization.css';
import * as Icon from 'react-feather';
import $ from 'jquery';
import Modal from '../../modal';
import ColorPicker from 'rc-color-picker';
import { Accordion, Card } from '../../accordion';
import { ButtonMenuContext } from '../../../context/ButtonMenuContext';

function Form({ showColorPickerModal, colors }) {
  // const { setButtonList } = useContext(ButtonMenuContext);

  return (
    <div className="container-fluid">
      <div className="row row-with-margin-top align-items-center">
        <div className="col col-4">
          <span>Start:</span>
        </div>
        <div className="col col-8">
          <input
            type="number"
            className="form-control"
            onChange={() => null}
          />
        </div>
      </div>
      <div className="row row-with-margin-top align-items-center">
        <div className="col col-4">
          <span>End:</span>
        </div>
        <div className="col col-8">
          <input
            type="number"
            className="form-control"
            onChange={() => null}
          />
        </div>
      </div>
      <div className="row row-with-margin-top align-items-center">
        <div className="col col-4">
          <span>Color:</span>
        </div>
        <div className="col col-8">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              aria-label="Select color" />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {colors.map((hex, index) => (
                <div className="dropdown-item" key={index} style={{ backgroundColor: hex }}><br /></div>
              ))}
              {typeof showColorPickerModal !== 'undefined' ? (
                <div className="dropdown-item" onClick={() => showColorPickerModal()}>New color</div>
              ) : (<></>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel() {
  const { setButtonList } = useContext(ButtonMenuContext);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentNewColor, setCurrentNewColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [sections, setSections] = useState([]);
  // eslint-disable-next-line no-shadow
  const newSection = (sections) => {
    const l = sections.slice();
    const s = {
      i: sections.length === 0 ? 1 : sections.length + 1,
    };
    l.push(s);
    setCurrentSection(s.i);
    setSections(l);
  };
  // eslint-disable-next-line no-shadow
  const newColor = (colors, c) => {
    const l = colors.slice();
    l.push(c);
    setColors(l);
  };
  const showColorPickerModal = () => {
    $('#modalColorPicker').modal();
  };

  useEffect(() => {
    setButtonList([{
      Icon: Icon.Plus,
      title: 'New section',
      onClick: () => $('#modalNewSection').modal(),
    }]);
  }, []);

  return (
    <>
      <Modal id="modalNewSection" primaryBtn={{ text: 'OK', onClick: () => newSection(sections), dataDismiss: 'modal' }}>
        <Form colors={colors} />
      </Modal>
      <Modal id="modalColorPicker" primaryBtn={{ text: 'OK', onClick: () => newColor(colors, currentNewColor), dataDismiss: 'modal' }}>
        <ColorPicker.Panel
          enableAlpha={false}
          onChange={(selected) => setCurrentNewColor(selected.color)} />
      </Modal>
      <div className="container-fluid panel">
        <div className="row">
          <div className="col  col-12">
            <Accordion>
              {sections.map(({ i }) => (
                <Card id={`card${i}`} title={`Section ${i}`} key={i} expanded={currentSection === i}>
                  <Form showColorPickerModal={() => showColorPickerModal()} colors={colors} />
                </Card>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default Panel;
