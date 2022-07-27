import $ from 'jquery'

// TODO: remove (check if not used any more)
export function showModal(id) {
  $(`#${id}`).modal({ backdrop: 'static', keyboard: false })
}

// TODO: remove (check if not used any more)
export function hideModal(id) {
  $(`#${id}`).modal('hide')
}

/**
 * Loads an object previously saved with saveStateToSessionStorage method
 * @param {*} key of the object to retrieve
 * @returns the object or null if there's no object with the specified key
 */
export function loadFromSessionStorage(key) {
  const state = sessionStorage.getItem(key) as string
  return JSON.parse(state)
}

/**
 * Saves a stringified version of an object to session storage
 * @param {*} key which will be used to store the object
 * @param {*} value the object that will be saved
 */
export function saveToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Generates random unique identifier.
 *
 * A 6-character alphanumeric sequence is pretty enough to randomly index a 10k collection 
 * (366 = 2.2 billion and 363 = 46656).
 *
 * I generate the UID from two parts here to ensure the random number provide enough bits.
 *
 * Extracted from: https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 * @returns 6-character alphanumeric sequence.
 */
export function uid(): string {
  // eslint-disable-next-line no-bitwise
  let firstPart: any = (Math.random() * 46656) | 0
  // eslint-disable-next-line no-bitwise
  let secondPart: any = (Math.random() * 46656) | 0
  firstPart = `000${firstPart.toString(36)}`.slice(-3)
  secondPart = `000${secondPart.toString(36)}`.slice(-3)
  return firstPart + secondPart
}
