import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast.js';
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors.js';

import { AiOutlineSearch } from 'react-icons/ai';

import { Option, Container, Content, Form } from './styles.js';

import Header from '../../components/Header';
import ButtonLogout from '../../components/ButtonLogout';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import api from '../../services/api.js';

function CreateAppointment() {
  const { addToast } = useToast()
  const formRef = useRef(null);
  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(null);
  const [ordersServices, setOrdersServices] = useState([]);

  const [typeInputDate, setTypeInputDate] = useState({
    date: 'string',
    initial: 'string',
    final: 'string'
  })

  const [dataOrderSelected, setDataOrderSelected] = useState({
    id: null,
    title: null,
    client_name: null,
    category_id: null,
    created_at: null,
    updated_at: null,
    expected_hours: null,
    hours_performed: null,
    hours_percent: null,
    category: {
      category: null,
    }
  })


  const handleSubmit = useCallback(async (data) => {
    delete data.numberOrNameOS

    data.order_service_id = dataOrderSelected.id

    try {
      if (formRef.current) {
        formRef.current.setErrors({})
      }

      const schema = Yup.object().shape({
        date: Yup.date().required('A data é obrigatória'),
        description: Yup.string().required('A descrição é obrigatória'),
        initial_datetime: Yup.string().required('A hora inicial é obrigatória'),
        final_datetime: Yup.string().required('A hora final é obrigatória'),
        order_service_id: Yup.number().required('É necessário selecionar a ordem'),
      })

      await schema.validate(data, { abortEarly: false })

      await api.post('appointments', data)

      addToast({
        type: 'success',
        title: 'Apontamento inserido',
        description: 'Seu apontamento foi inserido com sucesso.'
      })

      history.push('/appointments-list')
    }
    catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        if ( formRef.current ) {
            formRef.current.setErrors(errors)
        }
        return
      }

      addToast({
          type: 'error',
          title: 'Erro na inserção',
          description: 'Ocorreu um erro ao inserir apontamento, tente novamente.'
      })
    }
  })

  const handleSearchOS = async () => {

    // Se for texto
    if (inputSearch === null || inputSearch === '') {
      addToast({
        type: 'error',
        title: 'Campo obrigatório',
        description: 'Campo "Número ou nome OS" obrigatório'
      })
  
      return
    }
    if (isNaN(Number(inputSearch))) {

      try {

        const { data } = await api.get('orderservice/name', { params: {name: inputSearch} })
        setOrdersServices(data)
      } catch (err) {
        addToast({
            type: 'error',
            title: 'Erro na pesquisa',
            description: 'Ocorreu um erro ao pesquisar pelo nome da OS'
        })
      }
    } else if (!isNaN(Number(inputSearch))) {

      try {
        const { data } = await api.get(`orderservice/${inputSearch}`)
        data.hours_percent = data.expected_hours * data.hours_performed / 100
        
        setDataOrderSelected(data)
      } catch (err) {
        addToast({
            type: 'error',
            title: 'Erro na pesquisa',
            description: 'Ocorreu um erro ao pesquisar pelo número da OS'
        })
      }
    }
  }

  return (
    <>
      <Header 
        title='APONTAR'
        options={<Options />}
      />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="search-input">
              <div className="div-input">
                <Input 
                  name='numberOrNameOS'
                  placeholder='Número ou Nome OS'
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                {ordersServices ?
                  ordersServices.length > 0 ?
                    <div className="data-search">
                      <ul>
                        {ordersServices.map(row => (
                          <li key={row.id} onClick={() => {setDataOrderSelected(row); setOrdersServices(null);}}>
                            <p>{row.title}</p> - <p>{row.client_name}</p> - <p>{row.category.category}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  : null
                : null}
              </div>
              <Button
                onClick={handleSearchOS}
              >
                <span
                  style={{
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                  }}
                >
                  PESQUISAR <AiOutlineSearch style={{margin: '0 4px'}} />
                </span>
              </Button>
            </div>
            <div className="data-appointments">
              <h4><span>Titulo:</span> {dataOrderSelected?.title}</h4>
              <div className="grid-data-appointments">
                <h4><span>Cliente:</span> {dataOrderSelected?.client_name}</h4>
                <h4><span>Categoria:</span> {dataOrderSelected?.category?.category}</h4>
                <h4><span>Previsto/Realizado:</span> {dataOrderSelected.hours_performed ? parseFloat((dataOrderSelected?.hours_performed * 100 / dataOrderSelected?.expected_hours).toFixed(2)) : null}</h4>
              </div>
            </div>
            <Textarea
              name='description'
              placeholder='O que foi feito?'
              cols="40"
              rows="15"
            />
            <div className="data-appointments-date">
              <Input 
                name='date'
                type={typeInputDate.date}
                placeholder='Data'
                onFocus={() => setTypeInputDate(prevState => ({...prevState, date: 'date'}))}
              />
              <Input 
                name='initial_datetime'
                type={typeInputDate.initial}
                placeholder='Inicial'
                onFocus={() => setTypeInputDate(prevState => ({...prevState, initial: 'time'}))}
              />
              <Input 
                name='final_datetime'
                type={typeInputDate.final}
                placeholder='Final'
                onFocus={() => setTypeInputDate(prevState => ({...prevState, final: 'time'}))}
              />
            </div>
            <div className="button-submit">
              <Button type='submit'>Salvar</Button>
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
}

const Options = () => {
    
  const history = useHistory()

  const handleNavigateToListOrders = useCallback(() => {
    history.push('/orders-list')
  }, [history])

  const handleNavigateToListAppointments = useCallback(() => {
    history.push('/appointments-list')
  }, [history])

  const handleNavigateToAvaluations = useCallback(() => {
    history.push('/schedules-list')
  }, [history])

  return (
    <>
      <Option haveMoreThanOneButton>
        <button onClick={handleNavigateToListOrders}><p>ORDENS DE SERVIÇO</p></button>
        <button onClick={handleNavigateToListAppointments}><p>APONTAMENTOS</p></button>
        <button onClick={handleNavigateToAvaluations}><p>AVALIAÇÕES</p></button>
      </Option>
      <ButtonLogout />
    </>
  )
}

export default CreateAppointment;