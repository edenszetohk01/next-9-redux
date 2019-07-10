import * as R from 'ramda'
import { Selector, createSelector } from 'reselect'
import { ApplicationState } from 'src/redux/rootReducer'
import { Component } from 'src/types'
import { NodeJSON, componentsToEditorNodeJSON } from 'src/utils/hk01EditorUtils'

export const getEditorNodesSelector = (
  storyComponentSelector: Selector<ApplicationState, Component[]>
) =>
  createSelector(
    storyComponentSelector,
    (components: Component[]): NodeJSON[] =>
      componentsToEditorNodeJSON(components)
  )

export const isPreviewSelector = (state: ApplicationState) =>
  R.pathOr(false, ['story', 'previewArticle', 'details'], state)
