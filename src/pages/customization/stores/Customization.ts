import { makeObservable, observable } from 'mobx'
import DeletionWizard from './DeletionWizard'
import Section from './Section'
import SectionCreator from './SectionCreator'

/**
 * Sorts the list using merge sort algorithm
 * @returns null in case of section overlapping
 */
/* function sortSections(sections) {
  if (sections.length > 1) {
    const result = []
    const m = Math.floor(sections.length / 2)
    let i = 0
    let j = 0
    let l1 = sections.slice(0, m)
    let l2 = sections.slice(m)
    l1 = sortSections(l1)
    l2 = sortSections(l2)
    while (i < l1.length && j < l2.length) {
      if (
        ((l2[j].start <= l1[i].start) && (l1[i].start <= l2[j].end)) ||
        ((l2[j].start <= l1[i].end) && (l1[i].end <= l2[j].end)) ||
        (l1[i].start < l2[j].start && l1[i].end > l2[j].end)
      ) {
        return null
      }
      if (l1[i].end < l2[j].start) {
        result.push(l1[i])
        i += 1
      } else {
        result.push(l2[j])
        j += 1
      }
    }
    return result.concat(l1.slice(i)).concat(l2.slice(j))
  }
  return sections
} */

export default class Customization {
  sectionCreator: SectionCreator

  deletionWizard: DeletionWizard

  sections: Section[] = []

  constructor() {
    makeObservable(this, {
      sections: observable,
      sectionCreator: observable
    })
    this.sectionCreator = new SectionCreator(this)
    this.deletionWizard = new DeletionWizard(2)
  }
}
