import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import Button from '../../components/Button'
import Card from '../../components/Card'

import boleto from '../../assets/images_M35/images/boleto.png'
import cartao from '../../assets/images_M35/images/cartao.png'

import { usePurchaseMutation } from '../../services/api'

import { InputGrup, Row, TabButton } from './styles'
const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)

  const [purchase, { data, isSuccess }] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confimeDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter no mínimo 5 caracteres')
        .required('Esse campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('Esse campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter no minimo 14 caracteres')
        .max(14, 'O campo precisa ter no minimo 14 caracteres')
        .required('Esse campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('Esse campo é obrigatório'),
      confimeDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('Esse campo é obrigatório'),

      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      ),
      installments: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('Esse campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: 1,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: 1,
              year: 2025
            }
          }
        },
        products: [
          {
            id: 1,
            price: 200
          }
        ]
      })
    }
  })

  const getMessageError = (fieldName: string, message?: string) => {
    const estaAlterado = fieldName in form.touched
    const estaInvalido = fieldName in form.errors

    if (estaAlterado && estaInvalido) {
      return message
      return ''
    }
  }

  return (
    <div className="container">
      {isSuccess ? (
        <Card title="Muito obrigado!">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
              Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja.
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de Cobrança">
            <>
              <Row>
                <InputGrup>
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getMessageError('fullName', form.errors.fullName)}
                  </small>
                </InputGrup>
                <InputGrup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>{getMessageError('email', form.errors.email)}</small>
                </InputGrup>
                <InputGrup>
                  <label htmlFor="cpf">CPF</label>
                  <input
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>{getMessageError('cpf', form.errors.cpf)}</small>
                </InputGrup>
              </Row>
              <h3 className="margin-top">
                Dados de Entrega - Conteúdo Digital
              </h3>
              <Row>
                <InputGrup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    id="deliveryEmail"
                    type="email"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getMessageError(
                      'deliveryEmail',
                      form.errors.deliveryEmail
                    )}
                  </small>
                </InputGrup>
                <InputGrup>
                  <label htmlFor="confimeDeliveryEmail">
                    Confirme o E-mail
                  </label>
                  <input
                    id="confimeDeliveryEmail"
                    type="email"
                    name="confimeDeliveryEmail"
                    value={form.values.confimeDeliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  <small>
                    {getMessageError(
                      'confimeDeliveryEmail',
                      form.errors.confimeDeliveryEmail
                    )}
                  </small>
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
                        <label htmlFor="cardOwner">
                          Nome do Titular do Cartão
                        </label>
                        <input
                          id="cardOwner"
                          type="text"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        />
                        <small>
                          {getMessageError('cardOwner', form.errors.cardOwner)}
                        </small>
                      </InputGrup>
                      <InputGrup>
                        <label htmlFor="cpfCardOwner">
                          CPF do Titular do Cartão
                        </label>
                        <input
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        />
                        <small>
                          {getMessageError(
                            'cpfCardOwner',
                            form.errors.cpfCardOwner
                          )}
                        </small>
                      </InputGrup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGrup>
                        <label htmlFor="cardDisplayName">Nome no Cartão</label>
                        <input
                          id="cardDisplayName"
                          type="text"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        />
                        <small>
                          {getMessageError(
                            'cardDisplayName',
                            form.errors.cardDisplayName
                          )}
                        </small>
                      </InputGrup>
                      <InputGrup>
                        <label htmlFor="cardNumber">Número do Cartão</label>
                        <input
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          placeholder="0000 0000 0000 0000"
                        />
                        <small>
                          {getMessageError(
                            'cardNumber',
                            form.errors.cardNumber
                          )}
                        </small>
                      </InputGrup>
                      <InputGrup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês do Vencimento</label>
                        <input
                          id="expiresMonth"
                          type="text"
                          name="expiresMonth"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          placeholder="MM"
                        />
                        <small>
                          {getMessageError(
                            'expiresMonth',
                            form.errors.expiresMonth
                          )}
                        </small>
                      </InputGrup>
                      <InputGrup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano do Vencimento</label>
                        <input
                          id="expiresYear"
                          type="text"
                          name="expiresYear"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          placeholder="AAAA"
                        />
                        <small>
                          {getMessageError(
                            'expiresYear',
                            form.errors.expiresYear
                          )}
                        </small>
                      </InputGrup>
                      <InputGrup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <input
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          placeholder="CVV"
                        />
                        <small>
                          {getMessageError('cardCode', form.errors.cardCode)}
                        </small>
                      </InputGrup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGrup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        >
                          <option value="">1x de R$ 200,00</option>
                          <option value="">2x de R$ 200,00</option>
                          <option value="">3x de R$ 200,00</option>
                        </select>
                        <small>
                          {getMessageError(
                            'installments',
                            form.errors.installments
                          )}
                        </small>
                      </InputGrup>
                    </Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do código de ativação do jogo
                    adquirido ocorrerá somente após a aprovação do pagamento do
                    boleto.
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button
            type="submit"
            onClick={form.handleSubmit}
            title="Clique aqui para finalizar a compra"
          >
            Finalizar compra
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
