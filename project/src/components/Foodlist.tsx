import { useState } from 'react'
import '../css/Foodlist.css'
import {product,shoppingCart} from './Interfaces'
import SearchBar from './SearchBar'
import {Card,CardImg,CardTitle,CardSubtitle,Button,CardBody,CardText,Col, Row} from "reactstrap"

function Productcard(props: any){

    const [productPurchaseQuantity,setProductPurchaseQuantity]  = useState(1);  

    function getProduct(product: product):void {
        props.setCart( addToCart(product));
    }

    function addToCart(product: product){
        let cart:Array<shoppingCart> = props.cart;
        let found:boolean = false
        if( productPurchaseQuantity === 0 && cart.length === 0){
            return cart;
        }
        if( product.stock === 0 || (product.stock - productPurchaseQuantity) < 0 ){
            window.alert("out of stock");
            return cart;
        }
        for(let i = 0 ; i < cart.length ; i++){
            if(cart[i].product.id ===  product.id){
                cart[i].quantity = productPurchaseQuantity;
                found = true;
                if(productPurchaseQuantity === 0){
                    cart.splice(i,1); 
                }
                
            }
        }
        if(found){
            return cart;
        }else{
            cart.push({product:product,quantity:productPurchaseQuantity });
            return cart;
        }
    }

    function addOrRemove(remove: boolean){
        if (remove === true){
            if (productPurchaseQuantity === 0){
                return
            }
            setProductPurchaseQuantity(productPurchaseQuantity - 1)
        }else{
            setProductPurchaseQuantity(productPurchaseQuantity + 1)
        }
        
    }

    

    return(
        <div className = "product-card">
            <Card>
                <CardImg top width="100%" src={props.product.img} className="card-img" alt=""/>
                <CardBody>
                    <CardTitle tag="h5">{props.product.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Cost: {props.product.cost}$ Stock: {props.product.stock}</CardSubtitle>
                    <CardText>{props.product.description}.</CardText>
                    <Col className="col-12 d-flex">

                      
                            <button className="add-remove-btn" 
                            onClick = {() => addOrRemove(true)}> - </button>

                                <p style={{ width: "20px",paddingTop: "10px"}}>{productPurchaseQuantity}</p>

                            <button className="add-remove-btn" 
                            onClick = {() => addOrRemove(false)}> + </button>
                       

                        <Button color="success" className="btn-small btn-product-card ml-5" id={props.product.id}
                         onClick={() => getProduct(props.product)}>{productPurchaseQuantity === 0? "Remove" : "Purchase"}</Button>

                    </Col>
                </CardBody>
            </Card>
        </div>
    )
}



function Foodlist(props: any){
    
    const [filter,setFilter] = useState("");

    return(
        <div className="Foodlist">
     
        <Row className="cards-container"> 
            <Col className="col-12" >  
                <SearchBar setFilter={setFilter} filter={filter} /> 
            </Col>
            {props.products? props.products.filter((product:product) => product.name.toLowerCase().includes(filter.toLowerCase()))
                                                    .map((product:product) => {
                return(
                    <Col  key={product.id} className="col-4 mt-5">
                        <Productcard key={product.id} product={product} setCart={props.setCart} cart={props.cart}/>
                    </Col>
                    )
                }) : (<></>)
            }
        </Row>
        </div>
    )
}


export default Foodlist