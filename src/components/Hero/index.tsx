import bannerImg from '../../assets/images_M35/images/fundo_hogwats.png'
import Button from '../Button'
import Tag from '../Tag'

import { Banner, Infos } from './styles'

const Hero = () => (
  <Banner style={{ backgroundImage: `url(${bannerImg})` }}>
    <div className="container">
      <div>
        <Tag>RPG</Tag>
        <Tag>PS5</Tag>
      </div>
      <Infos>
        <h2>Hogwarts Legacy</h2>
        <p>
          <span>De R$ 250,00</span>
          Por R$ 199,90
        </p>
        <Button
          type="button"
          title="Clique aqui para adicionar esse item ao carrinho"
          variant="primary"
        >
          Adicionar ao Carrinho
        </Button>
      </Infos>
    </div>
  </Banner>
)
export default Hero
