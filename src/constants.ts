import {
  faSlidersH,
  faSpinner,
  faSave,
  faMicrochip,
  faMagic,
  faPlusSquare,
  faEdit
} from '@fortawesome/free-solid-svg-icons'

export const MODAL_ID = {
  NEW_DEVICE_MODAL: 'new-device-modal',
  EDIT_DEVICE_MODAL: 'edit-device-modal'
}

export const ROUTES = {
  NOT_FOUND: '/not-found',
  HOME: '/home',
  CUSTOMIZATION: '/customization',
  EFFECTS: '/effects',
  DEVICES: '/devices',
  LOGOUT: '/logout'
}

export const MAIN_MENU = [{
  isPath: true,
  path: ROUTES.EFFECTS,
  label: 'Effects',
  icon: faMagic,
}, {
  isPath: true,
  path: ROUTES.CUSTOMIZATION,
  label: 'Customization',
  icon: faSlidersH,
}, {
  isPath: true,
  path: ROUTES.DEVICES,
  label: 'Devices',
  icon: faMicrochip
}]

export const SUB_MENU = {
  [ROUTES.EFFECTS]: [],
  [ROUTES.CUSTOMIZATION]: [{
    isModal: true,
    label: 'Save',
    icon: faSave,
  }, {
    isModal: true,
    label: 'Load',
    icon: faSpinner,
  }],
  [ROUTES.DEVICES]: [{
    isModal: true,
    label: 'New',
    icon: faPlusSquare,
    modalId: MODAL_ID.NEW_DEVICE_MODAL
  }, {
    isModal: true,
    label: 'Edit',
    icon: faEdit,
    modalId: MODAL_ID.EDIT_DEVICE_MODAL,
  }],
}

export const COLOR = {
  GRAY10: '#f5f5f5',
  GRAY20: '#f8f9fa',
  GRAY30: '#efefef',
  MATERIAL_GRAY: '#757575', /* 600 */
  MATERIAL_GRAY_LIGHT: '#a4a4a4', /* 600 */
  MATERIAL_GRAY_DARK: '#494949', /* 600 */
  MATERIAL_BLUE: '#2962ff', /* A-700 */
  MATERIAL_BLUE_LIGHT: '#768fff', /* A-700 */
  MATERIAL_GREEN: '#00c853', /* A-700 */
  MATERIAL_GREEN_DARK: '#009624', /* A-700 */
  MATERIAL_RED_LIGHT: '#ff5131', /* A-700 */
  MATERIAL_RED: '#d50000' /* A-700 */
}

// Sizes in em
export const SIZE = {
  S00: 0.200, // = 1 / 2
  S10: 0.250, // = 1 / 4
  S20: 0.333, // ~ 1 / 3
  S30: 0.500,
  S40: 0.666, // ~ 2 / 3
  S45: 0.75,
  S50: 0.800, // = 4 / 5
  S60: 1,
  S62: 1.25,
  S65: 1.4,
  S67: 2,
  S70: 2.500, // = 5 / 2
  S80: 5,
  S90: 14
}

export const INF = '∞'

// TODO: font size its not constant, not the same for mobile or desktop
export const FONT_SIZE_IN_PX = 16
