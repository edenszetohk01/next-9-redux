import React from 'react'
import HK01EditorComponents from 'src/components/HK01EditorComponents'
import { NodeJSON } from 'src/utils/hk01EditorUtils'

type Props = {
  nodes?: NodeJSON[]
}

const renderSkeleton = () => {
  // TODO: render skeleton of content
  return <></>
}

export default function StorytContent(props: Props) {
  return props.nodes ? (
    <HK01EditorComponents nodes={props.nodes} />
  ) : (
    renderSkeleton()
  )
}
