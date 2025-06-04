import { HeaderBar, Links, LinkItem, LinkCart } from './styles'
import logo from '../../assets/images_M35/images/logo.svg'
import carrinho from '../../assets/images_M35/images/carrinho.svg'

const Header = () => (
  <HeaderBar>
    <div>
      <img src={logo} alt="Eplay" />
      <nav>
        <Links>
          <LinkItem>
            <a href="#categorias">Categorias</a>
          </LinkItem>
          <LinkItem>
            <a href="#novidades">Novidades</a>
          </LinkItem>
          <LinkItem>
            <a href="#promocoes">Promoções</a>
          </LinkItem>
        </Links>
      </nav>
    </div>
    <LinkCart href="#carrinho">
      0 - produto(s)
      <img src={carrinho} alt="Carrinho de compras" />
    </LinkCart>
  </HeaderBar>
)

export default Header
