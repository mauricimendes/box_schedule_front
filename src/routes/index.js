import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Route'

import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import CreateSchedule from '../pages/CreateSchedule'
import ListSchedule from '../pages/ListSchedule'
import Avaluation from '../pages/Avaluation'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/singup' component={CreateAccount} />

            <Route path='/schedules' component={CreateSchedule} isPrivate />
            <Route path='/schedules-list' component={ListSchedule} isPrivate />
            <Route path='/avaluation' component={Avaluation} isPrivate />
        </Switch>
    )
}

export default Routes