import { Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'

import Home from './Home'
import NotFound from './NotFound/'

import PageInspectores from './Inspectores'
import PageClientes from './Clientes'
import PageInformes from './Informes'
import Layout from 'layout/layout'
import PageOrder from './Ordenes'

const RouterApp = () => {
  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home" />}
        />
        <Route path="/home" component={Home} />
        <Route path="/inspectores" component={PageInspectores}/>
        <Route path="/ordenes" component={PageOrder} />
        <Route path="/informes" component={PageInformes} />
        <Route path="/clientes" component={PageClientes} />
        <Route component={NotFound}/>
      </Switch>
    </Layout>
  )
}

export default RouterApp
