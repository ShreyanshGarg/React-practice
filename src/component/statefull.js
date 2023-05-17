import React, {Component} from "react";
import { useState } from "react";

const products = [
    {
      emoji: '🍦',
      name: 'ice cream',
      price: 5
    },
    {
      emoji: '🍩',
      name: 'donuts',
      price: 2,
    },
    {
      emoji: '🍉',
      name: 'watermelon',
      price: 4
    }
  ];

class Statefull extends React.Component{
          
state={
    cart:[],
    total:0
}

add=(product)=>{
this.setState(state=>({
    cart:[...state.cart,product.name],
    total:state.total + product.price
}))
}

remove = (product) => {
    this.setState(state => {
        if(state.cart.length <= 0) {
            return;
          }
      const cart = [...state.cart];
      let index = cart.indexOf(product.name)
      if (index > -1) {
        cart.splice(index, 1);
      }else return ;
      return ({
        cart,
        total: state.total - product.price
      })
    })
  }
    render(){
           
        return( 
        <div className="wrapper">
            <div>
                Shopping cart: {this.state.cart.length} total items
            </div>
            <div>Total Amount: {this.state.total}</div>
            {products.map(product =>(
            <div key={product.name}>
            <div className="product"><span role="img" aria-label={product.name}>{product.emoji} </span></div>
            <div>price:{product.price}</div>
            <button onClick={()=>this.add(product)}>Add</button>
            <button onClick={()=>this.remove(product)}>Remove</button>
            </div>
))}
        </div>
        )
    }
}


export default Statefull;