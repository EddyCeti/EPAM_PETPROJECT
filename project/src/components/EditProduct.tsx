import '../css/EditProduct.css'
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { newProduct, product } from './Interfaces';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, Col, ListGroupItem } from 'reactstrap';



function ModalEditProduct(props:any){
  
  const [name,setName] = useState(props.product.name);
  const [cost,setCost] = useState(props.product.cost);
  const [description,setDescription] = useState(props.product.description);
  const [img,setImg] = useState(props.product.img);
  const [stock,setStock] = useState(props.product.stock);

  async function editProductRequest(){
    let newData:newProduct = {
      name: name,
      cost: cost,
      description: description,
      img: img,
      stock: stock
    };

    let body:string = JSON.stringify(newData);
    try{
        await fetch("http://localhost:3000/api/products/" + props.product.id,{
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        body: body,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }catch(e){
      
    }

    let controller = new AbortController();     
    try{
        const response = await fetch("http://localhost:3000/api/products",{signal: controller.signal});
        props.setProducts(await response.json())
        
    }catch(e){} 
    controller.abort();  
    props.toggle();
   
  }


  return(
    <Modal isOpen={props.modal} toggle={props.toggle}>
          <ModalHeader toggle={props.toggle}>{props.product.name}</ModalHeader>
          <ModalBody>
            <form>
              <Col>
                  <h3>Edit Product</h3>
              </Col>
              <Col>
                  <label className="pr-2"> Name </label>
                  <input type="text" placeholder="Name" onBlur={(e:any) => setName(e.target.value)}/>
              <Col>        
                  <label className="pr-2 ml-1"> Price </label>
                  <input type="Number" placeholder="0" onBlur={(e:any) => setCost(e.target.value)}/>
              </Col>
              </Col>
              <Col className="description-container">
                  <label className="p-1 mt-3 pr-2"> Description </label>
                  <textarea rows={2} placeholder="Description" onBlur={(e:any) => setDescription(e.target.value)}/>
              </Col>
              <Col>
                  <label className="pr-2"> Image Url </label>
                  <input type="String" onBlur={(e:any) => setImg(e.target.value)}/>
              <Col>
                  <label className="pr-2 pl-2"> Stock </label>
                  <input type="Number" placeholder="0" onBlur={(e:any) => setStock(e.target.value)}/>
              </Col>
              </Col>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={ () => editProductRequest() } >Accept Changes</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )
}




function EditProduct(props:any){
    

  const [modal, setModal] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState<product>(props.products[0])
  const [filter, setFilter] = useState("");

  const toggle = () => setModal(!modal);

  return (
    <div className="EditProducts">
      <Col md="12"> 
        <h1>Edit Items</h1>
        <SearchBar setFilter={setFilter} />

        { props.products.length > 0? props.products.filter((product:product) => product.name.toLowerCase()
          .includes(filter.toLowerCase()))
          .map((item:product) =>{ 
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
                  <ListGroupItem style={{width:"100px"}}>
                    <Button color="warning"  className="btn-remove btn-lg" onClick={() => {toggle(); setSelectedProduct(item)}}>Edit</Button>
                  </ListGroupItem>
                </ListGroup>               
              )
            }): <></>
        }
        {modal?  <ModalEditProduct toggle={toggle} modal={modal} product={selectedProduct} setProducts={props.setProducts}/> : <></>}

      </Col>
    </div>
  );
  
}


export default EditProduct;