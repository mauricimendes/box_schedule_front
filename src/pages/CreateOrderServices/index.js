import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast.js';
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors.js';


import { MdHourglassEmpty, MdTitle, MdPeople } from 'react-icons/md'

import { Option, Container, Content, Form } from './styles.js';

import Header from '../../components/Header';
import ButtonLogout from '../../components/ButtonLogout';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api.js';

function CreateOrderServices() {
  const { addToast } = useToast()
  const formRef = useRef(null);
  const history = useHistory();

  const [categorys, setCategorys] = useState([])
  const [categorySelected, setCategorySelected] = useState(null)

  useEffect(() => {
    api.get('/ordercategory')
      .then(response => {
        setCategorys(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Erro na busca',
          description: 'Não foi possível carregar as categorias, tente novamente mais tarde.'
      })
      })
  }, [])

  const handleSubmit = useCallback(async (data) => {
    try {
      data.category_id = categorySelected;
      if (formRef.current) {
        formRef.current.setErrors({})
      }

      const schema = Yup.object().shape({
        title: Yup.string().required('O título é obrigatório'),
        client_name: Yup.string().required('O nome do cliente é obrigatório'),
        category_id: Yup.string().required('A categoria é obrigatória'),
        expected_hours: Yup.string().required('As horas esperadas é obrigatória')
      })



      await schema.validate(data, { abortEarly: false })

      data.hours_performed = 0

      await api.post('/orderservice', data)

      addToast({
        type: 'success',
        title: 'Apontamento inserido',
        description: 'Seu apontamento foi inserido com sucesso.'
      })

      history.push('/orders-list')
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

  return (
    <>
      <Header 
        title='CRIAR ORDEM DE SERVIÇO'
        options={<Options />}
      />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} id="form">
            <Input
              type="text"
              name="title"
              placeholder="Título"
              icon={MdTitle}
            />
            <Input
              type="text"
              name="client_name"
              placeholder="Nome do cliente"
              icon={MdPeople}
            />
            <Input
              type="number"
              name="expected_hours"
              placeholder="Horas esperadas"
              icon={MdHourglassEmpty}
            />
            <div className="div-category" form="form" onChange={(e) => {setCategorySelected(e.target.value)}}>
              <select name="category_id">
                {categorys.map(category => (
                  <option value={category.id}>{category.category}</option>
                ))}
              </select>
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

// { title, client_name, category_id, expected_hours, hours_performed }

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

export default CreateOrderServices;