import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import CreateSchedule from '../pages/CreateSchedule'
import ListSchedule from '../pages/ListSchedule'
import Avaluation from '../pages/Avaluation'
import EditSchedule from '../pages/CreateSchedule/edit'

import CreateAppointment from '../pages/CreateAppointment'
import ListAppointments from '../pages/ListAppointments'

import CreateOrderServices from '../pages/CreateOrderServices'
import ListOrderService from '../pages/ListOrderService'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/singup' component={CreateAccount} />

            <Route path='/schedules' component={CreateSchedule} isPrivate />
            <Route path='/schedules-list' component={ListSchedule} isPrivate />
            <Route path='/avaluation' component={Avaluation} isPrivate />
            <Route path='/schedule-edit' component={EditSchedule} isPrivate />

            <Route path='/appointment' component={CreateAppointment} isPrivate />
            <Route path='/appointments-list' component={ListAppointments} isPrivate />

            <Route path='/orders-service' component={CreateOrderServices} isPrivate />
            <Route path='/orders-list' component={ListOrderService} isPrivate />
        </Switch>
    )
}

export default Routes