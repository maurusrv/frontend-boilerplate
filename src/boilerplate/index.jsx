// Core
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// Store
import store from 'boilerplateModules/app/store'

// Components
import App from 'boilerplateComponents/App'

const renderComponent = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename="/boilerplate">
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

renderComponent(App)
