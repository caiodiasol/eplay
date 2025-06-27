import styled from 'styled-components'
import { cores } from '../../styles'

export const HeaderBar = styled.header`
  background-color: ${cores.Cinza};
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 80px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${cores.Branco};
    text-decoration: none;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
  }
`

export const Links = styled.ul`
  display: flex;
  margin-left: 40px;
`
export const LinkItem = styled.li`
  margin-right: 16px;
`
export const CartButton = styled.a`
  display: flex;

  img {
    margin-left: 16px;
  }
`
