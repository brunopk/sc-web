import React, { useState } from 'react'
import Switch from 'react-switch'

function CardHeader({
  id,
  title,
  color,
  headerRed,
  headerGreen,
  dataTarget,
  ariaExpanded,
  onToggle,
  showHeaderTitle,
  showHeaderButton
}) {
  const [toggleValue, setToggleValue] = useState(false)
  const onToggleWrapper = (value) => {
    const newValue = !value
    setToggleValue(newValue)
    onToggle(newValue)
  }
  let className = 'card-header '

  ariaExpanded = typeof ariaExpanded === 'boolean' && ariaExpanded
  className += headerRed ? 'alert-danger' : ''
  className += headerGreen ? 'alert-success' : ''

  return (
    <div className={className} id={id}>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-3 col-lg-1 text-left">
            {showHeaderButton ? (
              <button
                className="form-control color-button"
                style={{ backgroundColor: color, borderColor: color }}
                data-toggle="collapse"
                data-target={dataTarget}
                aria-expanded={ariaExpanded}
                aria-controls={dataTarget.slice(1)}>
                <span>{showHeaderTitle ? title : ''}</span>
              </button>
            ) : (
              <h5 className="mb-0">
                <button
                  className="btn 'btn-link"
                  data-toggle="collapse"
                  data-target={dataTarget}
                  aria-expanded={ariaExpanded}
                  aria-controls={dataTarget.slice(1)}>
                  <span>{showHeaderTitle ? title : ''}</span>
                </button>
              </h5>
            )}
          </div>
          <div className="col-9 col-lg-11 justify-content-end align-items-center d-flex card-header-buttons">
            {onToggle !== null ? (
              <label>
                <Switch
                  className="align-middle"
                  height={24}
                  onChange={() => onToggleWrapper(toggleValue)}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  offColor="#6c757d"
                  onColor="#007bff"
                  checked={toggleValue} />
              </label>
            ) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function CardBody({ children, id, dataParent, ariaLabelledBy, ariaExpanded }) {
  const className = typeof ariaExpanded === 'boolean' && ariaExpanded ? 'collapse show' : 'collapse'

  return (
    <div id={id} className={className} data-parent={dataParent} aria-labelledby={ariaLabelledBy}>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

function Card({
  children,
  id,
  className,
  title,
  expanded,
  onToggle,
  color = null,
  showHeaderButton = false,
  showHeaderTitle = true,
  headerRed = false,
  headerGreen = false,
}) {
  onToggle = typeof onToggle === 'undefined' ? null : onToggle

  // <CardBody id={id} ariaLabelledBy={`heading${id}`} dataParent="#accordion" ariaExpanded={expanded}>
  return (
    <div className={`card ${className}`}>
      <CardHeader
        id={`heading${id}`}
        title={title}
        color={color}
        headerRed={headerRed}
        headerGreen={headerGreen}
        dataTarget={`#${id}`}
        ariaExpanded={expanded}
        onToggle={onToggle}
        showHeaderButton={showHeaderButton}
        showHeaderTitle={showHeaderTitle} />
      <CardBody
        id={id}
        dataParent="#accordion"
        ariaLabelledBy={`heading${id}`}
        ariaExpanded={expanded}>
        {children}
      </CardBody>
    </div>
  )
}

export default Card
