import { createGlobalStyle } from 'styled-components'

export const cores = {
  Branco: '#EEEEEE',
  Preto: '#111111',
  Cinza: '#333333',
  Verde: '#10AC84',
  CinzaClaro: '#A3A3A3'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Roboto, sans-serif;
      list-style: none;
    }

    body {
      background-color: ${cores.Preto};
      color: ${cores.Branco};
      paadding-top: 40px;
    }

    .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }
`
