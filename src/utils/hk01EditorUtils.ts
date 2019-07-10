import * as R from 'ramda'
import { Component } from 'src/types'

/* Below refers to slate editor types */
export type NodeJSON = BlockJSON | InlineJSON | TextJSON
export type BlockJSON = {
  type: string
  key?: string
  nodes?: NodeJSON[]
  data?: object
  object: 'block'
}

export type InlineJSON = {
  type: string
  key?: string
  nodes?: NodeJSON[]
  data?: object
  object: 'inline'
}

export type TextJSON = {
  key?: string
  leaves: LeafJSON[]
  object: 'text'
}

export type LeafJSON = {
  marks?: MarkJSON[]
  text?: string
  object: 'leaf'
}

export type MarkJSON = {
  type: string
  data?: object
  object: 'mark'
}
/* Above refers to slate editor types */

export const componentsToEditorNodeJSON = (components: Component[]) =>
  R.map<Component, BlockJSON>(
    component => ({
      type: component.code,
      data: R.omit(['nodes'], component.data),
      nodes: R.propOr(undefined, 'nodes', component.data),
      object: 'block',
    }),
    components
  )
