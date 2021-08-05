import { componentShow } from "./Interfaces";
import { Navbar, NavbarBrand, Nav, NavItem, Button, Col, Row} from "reactstrap";
import logo from '../resources/logo.png'
import '../css/Header.css'

function Header(props: any){



    function changeComponent(obj:componentShow){
        props.setComponent(obj);
    }
    
    return(
    <>
        <Navbar color="dark" light expand="lg" className="Navbar pl-5" fixed="top"> 
            <Row className="main-container"> 
                <Col className="col-4">
                    <Col className="col-12">
                    <img src={logo} className="logo ml-4" alt=""/>
                    </Col>
                    <Col className="col-12">
                    <NavbarBrand> Italian Food Restaurant </NavbarBrand>
                    </Col>
                </Col>
                <Col className="menu col-8">
                    <Nav navbar>
                        <NavItem>
                            <Button color="link" onClick={()=> changeComponent({cartComponent:false,foodListComponent:true,AddProductComponent: false,DeleteProduct: false,EditProduct:false})}>Order Food</Button>
                        </NavItem>
                        <NavItem>
                            <Button color="link" onClick={()=> changeComponent({cartComponent:true,foodListComponent:false,AddProductComponent: false,DeleteProduct: false,EditProduct:false})}>Cart</Button>
                        </NavItem>
                        <NavItem>
                            <Button color="link" onClick={()=> changeComponent({cartComponent:false,foodListComponent:false,AddProductComponent: true,DeleteProduct: false,EditProduct:false})}>Create Product</Button>
                        </NavItem>
                        <NavItem>
                            <Button color="link" onClick={()=> changeComponent({cartComponent:false,foodListComponent:false,AddProductComponent: false,DeleteProduct: true,EditProduct:false})}>Delete Product</Button>
                        </NavItem>
                        <NavItem>
                            <Button color="link" onClick={()=> changeComponent({cartComponent:false,foodListComponent:false,AddProductComponent: false,DeleteProduct: false,EditProduct:true})}>Edit Product</Button>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
        </Navbar>

    </>
    )

}


export default Header