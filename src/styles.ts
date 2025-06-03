import { createGlobalStyle } from 'styled-components'

const cores = {
  Branco: '#EEEEEE',
  Preto: '#111111',
  Cinza: '#333333',
  Verde: '#10AC84'
}

export const GlobalCss = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Roboto, sans-serif;
    }

    body {
      background-color: ${cores.Preto};
      color: ${cores.Branco};
    }
`
