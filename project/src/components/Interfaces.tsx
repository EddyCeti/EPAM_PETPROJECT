export interface product{
    id: number,
    name: string,
    cost: number,
    description: string,
    img: string,
    stock: number
}

export interface newProduct{
    name: string,
    cost: number,
    description: string,
    img: string,
    stock: number
}

export interface shoppingCart{
    product: product,
    quantity: number
}

export interface componentShow {
    cartComponent: boolean,
    foodListComponent: boolean,
    AddProductComponent: boolean,
    DeleteProduct: boolean,
    EditProduct: boolean
}

