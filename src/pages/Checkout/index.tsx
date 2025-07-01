import Button from '../../components/Button'
import Card from '../../components/Card'

import { InputGrup, Row } from './styles'

const Checkout = () => (
  <div className="container">
    <Card title="Dados de Cobrança">
      <>
        <Row>
          <InputGrup>
            <label htmlFor="fullName">Nome Completo</label>
            <input id="fullName" type="text" />
          </InputGrup>
          <InputGrup>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" />
          </InputGrup>
          <InputGrup>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" type="text" />
          </InputGrup>
        </Row>
        <h3 className="margin-top">Dados de Entrega - Conteúdo Digital</h3>
        <Row>
          <InputGrup>
            <label htmlFor="deliveryEmail">E-mail</label>
            <input id="deliveryEmail" type="email" />
          </InputGrup>
          <InputGrup>
            <label htmlFor="confimeDeliveryEmail">Confirme o E-mail</label>
            <input id="confimeDeliveryEmail" type="email" />
          </InputGrup>
        </Row>
      </>
    </Card>
    <Card title="pagamento">
      <div>
        <p>
          Ao optar por essa forma de pagamento, é importante lembrar que a
          confirmação pode levar até 3 dias úteis, devido aos prazos
          estabelecidos pelas instituições financeiras. Portanto, a liberação do
          código de ativação do jogo adquirido ocorrerá somente após a aprovação
          do pagamento do boleto.
        </p>
      </div>
    </Card>
    <Button type="button" title="Clique aqui para finalizar a compra">
      Finalizar compra
    </Button>
  </div>
)

export default Checkout
