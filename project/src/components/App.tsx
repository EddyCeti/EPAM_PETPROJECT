import React, { useState,useEffect } from 'react';
import '../css/App.css';

import Header from './Header';
import Foodlist from './Foodlist'
import Cart from './Cart';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

import {Container, Row} from 'reactstrap'
import {shoppingCart,product} from './Interfaces';


function App() {
  
  const [component ,setComponent] = useState({cartComponent:false,foodListComponent:true,AddProductComponent: false,DeleteProduct: false,EditProduct:false});
  const [cart, setCart] = useState<Array<shoppingCart>>([]);
  const [products,setProducts] = useState<Array<product>>([]);

  useEffect(() => {
    let controller = new AbortController();
    (async() => {
        try{
            const response = await fetch("http://localhost:3000/api/products",{signal: controller.signal});
            setProducts(await response.json())
        }catch(e){

        }
        
    })();
    return () => controller?.abort();
  },[]);


  return (
    <div className="App">
      <Container className="main-container">
        <Header setComponent = {setComponent}/>
        <Row className="components">
        {component.cartComponent ? <Cart cart={cart} setCart={setCart} setProducts={setProducts}/> :
          <></>
        }
        {component.foodListComponent?  <Foodlist cart={cart} setCart={setCart} products={products}/> : 
        <> </>}
        {component.AddProductComponent?  <AddProduct setProducts={setProducts}/> : 
        <> </>}
        {component.DeleteProduct?  <DeleteProduct products={products} setProducts={setProducts}/> : 
        <> </>}
        {component.EditProduct?  <EditProduct products={products} setProducts={setProducts}/> : 
        <> </>}
        </Row>
      </Container>
    </div>
  );
}

export default App;

