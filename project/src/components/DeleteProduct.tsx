import '../css/DeleteProduct.css'
import SearchBar from './SearchBar';
import {product} from './Interfaces'


import {Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { useState } from 'react';

function DeleteProduct(props:any){

    const [filter,setFilter] = useState("");

    async function deleteRequest(id:number){
        const URL = "http://localhost:3000/api/products/";
        
        if(window.confirm("Delete Item")){
            try{
                const response = await fetch(URL + id, { 
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                headers:{
                    'Content-Type': 'application/json'
                    }
                    
                });
                window.alert(await "Server response:" + response.status);
            }catch(e){

            }
        }
        
        let controller = new AbortController();     
        try{
            const response = await fetch("http://localhost:3000/api/products",{signal: controller.signal});
            props.setProducts(await response.json())
        }catch(e){

        } 
        controller.abort();  
    }

 
    return(
        <div className="DeleteProduct">
            <Col md="12"> 
                <h1>Delete Items</h1>
                <SearchBar setFilter={setFilter}/>
                { props.products.length > 0? props.products.filter((product:product) => product.name.toLowerCase()
                                                            .includes(filter.toLowerCase()))
                                                            .map((item:product) => {
                    return(
                    <ListGroup key={item.id}  horizontal="sm" className="products-list">
                        <ListGroupItem>
                            <img className="cart-img" src={item.img} alt=""></img>
                        </ListGroupItem>
                        <ListGroupItem style={{width:"80px"}}>
                            id: {item.id} 
                        </ListGroupItem>
                        <ListGroupItem >
                            Product: {item.name} 
                        </ListGroupItem>
                        <ListGroupItem style={{width:"80px"}}>
                            <Button color="danger"  className="btn-remove btn-lg" onClick={() => deleteRequest(item.id)}>X</Button> 
                        </ListGroupItem>
                    </ListGroup>
                    )
                }) : <>No Products Avaliable in Database</> }
            </Col>
        </div>
    )
}

export default DeleteProduct