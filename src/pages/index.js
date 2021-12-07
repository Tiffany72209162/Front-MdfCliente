import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './app'

const Router = () => {
  return (
    < >
    <BrowserRouter>
      <Switch>
        <Route path="/" >
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default Router
