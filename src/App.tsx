import * as React from 'react';
import { store } from "./store/index"
import { Provider } from "react-redux";
import Basket from './components/basket';
import Product from './components/product';
import { Container, Box } from "@material-ui/core"

const App = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Box mt={5} mb={5}>
          <Product />
        </Box>
        <Box mt={5} mb={5}>
          <Basket />
        </Box>
      </Container>
    </Provider>
  )
}

export default App;
