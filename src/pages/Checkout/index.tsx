import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'

import { InputGrup, Row, TabButton } from './styles'

import boleto from '../../assets/images_M35/images/boleto.png'
import cartao from '../../assets/images_M35/images/cartao.png'

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)

  return (
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
        <>
          <TabButton
            isActive={!payWithCard}
            onClick={() => setPayWithCard(false)}
          >
            <img src={boleto} alt="Boleto" />
            Boleto Bancário
          </TabButton>
          <TabButton
            isActive={payWithCard}
            onClick={() => setPayWithCard(true)}
          >
            <img src={cartao} alt="Cartão de Crédito" />
            Cartão de Crédito
          </TabButton>
          <div className="margin-top">
            {payWithCard ? (
              <>
                <Row>
                  <InputGrup>
                    <label htmlFor="cardOwner">Nome do Titular do Cartão</label>
                    <input id="cardOwner" type="text" />
                  </InputGrup>
                  <InputGrup>
                    <label htmlFor="cpfCardOwner">
                      CPF do Titular do Cartão
                    </label>
                    <input id="cpfCardOwner" type="text" />
                  </InputGrup>
                </Row>
                <Row marginTop="24px">
                  <InputGrup>
                    <label htmlFor="cardDisplayName">Nome no Cartão</label>
                    <input id="cardDisplayName" type="text" />
                  </InputGrup>
                  <InputGrup>
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <input id="cardNumber" type="text" />
                  </InputGrup>
                  <InputGrup maxWidth="123px">
                    <label htmlFor="expiresMonth">Mês do Vencimento</label>
                    <input id="expiresMonth" type="text" />
                  </InputGrup>
                  <InputGrup maxWidth="123px">
                    <label htmlFor="expiresYear">Ano do Vencimento</label>
                    <input id="expiresYear" type="text" />
                  </InputGrup>
                  <InputGrup maxWidth="48px">
                    <label htmlFor="cardCode">CVV</label>
                    <input id="cardCode" type="text" />
                  </InputGrup>
                </Row>
                <Row marginTop="24px">
                  <InputGrup maxWidth="150px">
                    <label htmlFor="installments">Parcelamento</label>
                    <select>
                      <option value="">1x de R$ 200,00</option>
                      <option value="">2x de R$ 200,00</option>
                      <option value="">3x de R$ 200,00</option>
                    </select>
                  </InputGrup>
                </Row>
              </>
            ) : (
              <p>
                Ao optar por essa forma de pagamento, é importante lembrar que a
                confirmação pode levar até 3 dias úteis, devido aos prazos
                estabelecidos pelas instituições financeiras. Portanto, a
                liberação do código de ativação do jogo adquirido ocorrerá
                somente após a aprovação do pagamento do boleto.
              </p>
            )}
          </div>
        </>
      </Card>
      <Button type="button" title="Clique aqui para finalizar a compra">
        Finalizar compra
      </Button>
    </div>
  )
}

export default Checkout
