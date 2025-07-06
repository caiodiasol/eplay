import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { RootReducer } from '../../store'
import { Navigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

import Button from '../../components/Button'
import Card from '../../components/Card'

import barCode from '../../assets/images_M35/images/boleto.png'
import creditCard from '../../assets/images_M35/images/cartao.png'

import { usePurchaseMutation } from '../../services/api'
import { getTotalPrice, parseToBrl } from '../../utils'
import { clear } from '../../store/reducers/cart'

import * as S from './styles'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}
const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])
  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)

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
      installments: Yup.number().when((values, schema) =>
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
          installments: values.installments,
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
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  const checkInputhasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsArray: Installment[] = []
      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i)
        })
      }
      return installmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments())
    }
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && isSuccess === false) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
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
              <S.Row>
                <S.InputGrup>
                  <label htmlFor="fullName">Nome Completo</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('fullName') ? 'error' : ''}
                  />
                </S.InputGrup>
                <S.InputGrup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('email') ? 'error' : ''}
                  />
                </S.InputGrup>
                <S.InputGrup>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputhasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                  />
                </S.InputGrup>
              </S.Row>
              <h3 className="margin-top">
                Dados de Entrega - Conteúdo Digital
              </h3>
              <S.Row>
                <S.InputGrup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    id="deliveryEmail"
                    type="email"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      checkInputhasError('deliveryEmail') ? 'error' : ''
                    }
                  />
                </S.InputGrup>
                <S.InputGrup>
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
                    className={
                      checkInputhasError('confimeDeliveryEmail') ? 'error' : ''
                    }
                  />
                </S.InputGrup>
              </S.Row>
            </>
          </Card>
          <Card title="pagamento">
            <>
              <S.TabButton
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
                type="button"
              >
                <img src={barCode} alt="Boleto" />
                Boleto Bancário
              </S.TabButton>
              <S.TabButton
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
                type="button"
              >
                <img src={creditCard} alt="Cartão de Crédito" />
                Cartão de Crédito
              </S.TabButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <S.Row>
                      <S.InputGrup>
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
                          className={
                            checkInputhasError('cardOwner') ? 'error' : ''
                          }
                        />
                      </S.InputGrup>
                      <S.InputGrup>
                        <label htmlFor="cpfCardOwner">
                          CPF do Titular do Cartão
                        </label>
                        <InputMask
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cpfCardOwner') ? 'error' : ''
                          }
                          mask="999.999.999-99"
                        />
                      </S.InputGrup>
                    </S.Row>
                    <S.Row marginTop="24px">
                      <S.InputGrup>
                        <label htmlFor="cardDisplayName">Nome no Cartão</label>
                        <input
                          id="cardDisplayName"
                          type="text"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                      </S.InputGrup>
                      <S.InputGrup>
                        <label htmlFor="cardNumber">Número do Cartão</label>
                        <InputMask
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardNumber') ? 'error' : ''
                          }
                          mask="9999 9999 9999 9999"
                        />
                      </S.InputGrup>
                      <S.InputGrup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês do Expiração</label>
                        <InputMask
                          id="expiresMonth"
                          type="text"
                          name="expiresMonth"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expiresMonth') ? 'error' : ''
                          }
                          placeholder="MM"
                          mask="99"
                        />
                      </S.InputGrup>
                      <S.InputGrup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de Expiração</label>
                        <InputMask
                          id="expiresYear"
                          type="text"
                          name="expiresYear"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('expiresYear') ? 'error' : ''
                          }
                          placeholder="AA"
                          mask="99"
                        />
                      </S.InputGrup>
                      <S.InputGrup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <InputMask
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('cardCode') ? 'error' : ''
                          }
                          placeholder="CVV"
                          mask="999"
                        />
                      </S.InputGrup>
                    </S.Row>
                    <S.Row marginTop="24px">
                      <S.InputGrup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          id="installments"
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputhasError('installments') ? 'error' : ''
                          }
                        >
                          {installments.map((installment) => (
                            <option
                              value={installment.quantity}
                              key={installment.quantity}
                            >
                              {installment.quantity}x de{' '}
                              {installment.formattedAmount}
                            </option>
                          ))}
                        </select>
                      </S.InputGrup>
                    </S.Row>
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
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
