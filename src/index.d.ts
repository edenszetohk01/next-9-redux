declare module '@hk01-digital/web-js-sdk'
declare module '@hk01-digital/web-js-sdk/dist/stg/esm'
declare module 'react-stack-grid' {
  export type StackGridProps = {
    className?: string
    style?: object
    component?: string
    itemComponent?: string
    columnWidth?: number | string
    gutterWidth?: number
    gutterHeight?: number
    duration?: number
    easing?: string
    appearDelay?: number
    appear?: () => void
    appeared?: () => void
    enter?: () => void
    entered?: () => void
    leaved?: () => void
    units?: () => void
    monitorImagesLoaded?: boolean
    vendorPrefix?: boolean
    userAgent?: string
    enableSSR?: boolean
    onLayout?: () => void
    horizontal?: boolean
    rtl?: boolean

    columnWidth: string | number
  }
  const StackGrid: React.FunctionComponent<StackGridProps>
  export default StackGrid
}
