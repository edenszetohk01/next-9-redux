import { css } from 'styled-components'

export const BreakWord = css`
  /* Ref: https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ */
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;
`
