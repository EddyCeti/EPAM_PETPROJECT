import { useState } from 'react'
import { newProduct } from './Interfaces'
import { Button, Col, Row } from 'reactstrap'
import '../css/AddProduct.css'



function AddProduct(props:any){
   const [name,setName] = useState("Empty");
   const [cost,setCost] = useState(0);
   const [description,setDescription] = useState("Missing Description");
   const [img,setImg] = useState("");
   const [stock,setStock] = useState(0); 


    async function createProduct(){
       let newProduct:newProduct = {
           name: name,
           cost: cost,
           description: description,
           img: img,
           stock: stock
       }
       let body:string =  JSON.stringify(newProduct);
        try{
            const response = await fetch("http://localhost:3000/api/products",{
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: body,
                headers:{
                    'Content-Type': 'application/json'
                }

            });
            window.alert(await "Server response:" + response.status);
           
        }catch(e){
    
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
        <div className="AddProduct">    
            <Row>
                <form>
                    <Col>
                        <h3>Create New Product</h3>
                    </Col>
                    <Col>
                        <label className="pr-2"> Name </label>
                        <input type="text" placeholder="Name" onBlur={(e:any) => setName(e.target.value)}/>
                        
                        <label className="pr-2 ml-1"> Price </label>
                        <input type="Number" placeholder="0" onBlur={(e:any) => setCost(e.target.value)}/>
                    </Col>
                    <Col className="description-container">
                        <label className="p-1 mt-3 pr-2"> Description </label>
                        <textarea rows={2} placeholder="Description" onBlur={(e:any) => setDescription(e.target.value)}/>
                    </Col>
                    <Col>
                        <label className="pr-2"> Image Url </label>
                        <input type="String" onBlur={(e:any) => setImg(e.target.value)}/>

                        <label className="pr-2 pl-2"> Stock </label>
                        <input type="Number" placeholder="0" onBlur={(e:any) => setStock(e.target.value)}/>
                    </Col>
                    <Col className="mt-3" style={{display:"flex"}}>
                        <Button className="btn-small btn-create" color="success" onClick={() => createProduct()}> Confirm </Button>
                    </Col>
                </form>
                
            </Row>
        </div>
    )
}

export default AddProduct