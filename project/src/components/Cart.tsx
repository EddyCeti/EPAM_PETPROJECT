import "../css/Cart.css";
    import * as fs from 'fs';

import { Button, Col, ListGroup, ListGroupItem } from "reactstrap";
import {shoppingCart } from "./Interfaces"


function Cart(props: any){
   

    function calculateTotal():number{
        let Total:number = 0;
        props.cart.forEach((element:shoppingCart) => {
            Total += (element.product.cost * element.quantity);
        });
        return Total;
    }

    async function requestTransaction(){
        while(props.cart.length > 0){
            let body = {
                stock: props.cart[0].product.stock - props.cart[0].quantity
            }
            const URL = "http://localhost:3000/api/products/"
            try{
                const response = await fetch(URL + props.cart[0].product.id,{
                    method: 'PATCH',
                    mode: 'cors',
                    cache: 'no-cache',
                    body:  JSON.stringify(body),
                    headers:{
                        'Content-Type': 'application/json'
                    }
    
                });  
            }catch(e){
    
            }
            props.cart.shift();
        }
        let controller = new AbortController();     
        try{
            const response = await fetch("http://localhost:3000/api/products",{signal: controller.signal});
            props.setCart([]);
            props.setProducts(await response.json());
            console.log("hola");
            
        }catch(e){

        } 
        controller.abort();  
        
    }

    function removeItem(id:number){        
        let newArray:shoppingCart[] = props.cart.filter((cart:shoppingCart) => cart.product.id  !== id );
        props.setCart(newArray);
    }
    return(
        <div className="Cart">
                <Col md="12"> 
                    { props.cart.length > 0? props.cart.map((item:shoppingCart) => {
                        return(
                            <ListGroup key={item.product.id}  horizontal="sm" className="products-list">
                                <ListGroupItem>
                                   <img className="cart-img" src={item.product.img} alt=""></img>
                                </ListGroupItem>
                                <ListGroupItem >
                                    Product: {item.product.name} 
                                </ListGroupItem>
                                <ListGroupItem >
                                     Cost: {item.product.cost}$ 
                                </ListGroupItem>
                                <ListGroupItem>
                                    Quantity: {item.quantity}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Total: {item.quantity * item.product.cost}$
                                    <Button color="danger" className="btn-remove" onClick={() => removeItem(item.product.id)}>X</Button>
                                </ListGroupItem>
                            </ListGroup>
                        )
                    }): <>Empty shoppingCart</>}
                    <div style={{justifyContent: "center",display:"flex",flexDirection: "column"}} >
                        {
                            
                        }
                        <p className="grand-total"> Grand Total: {calculateTotal()}$</p>
                         <Button color="success" className="btn-small btn-purchase m-3" onClick={() => requestTransaction() }> Confirm </Button>
                    </div>
               </Col>
        </div>       
    )
}


export default Cart