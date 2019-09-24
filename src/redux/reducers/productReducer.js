"use-strict";
import * as type from "../actionType";
const initialState = {
   carts:[],
   wishlists:[]

};
const product = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_CART_API_SUCCESS:
        return {
          ...state,
          carts: action.payload
      }
    case type.ADD_REMOVE_CART_SUCCESS:
      let newCart;
      if(state.carts.length > 0){
        let indexCart = state.carts.findIndex(x=>x.product_id == action.payload.product_id)
        if(indexCart > -1){
          let newArr = [...state.carts]
             newArr.splice(indexCart,1)
          newCart = newArr
        }else{
          newCart = [...state.carts,action.payload] 
        }
      }else{
        newCart = [...state.carts,action.payload]
      }
      return {
        ...state,
        carts: newCart
      };

      case type.REMOVE_CART_SUCCESS:
          return {
            ...state,
            carts: []
      };
      case type.ADD_REMOVE_WISHLIST_SUCCESS:
          let newWishlist;
          if(state.wishlists.length > 0){
            let indexWish = state.wishlists.findIndex(x=>x.product_id == action.payload.product_id)
            if(indexWish > -1){
              let newArr = [...state.wishlists]
                 newArr.splice(indexWish,1)
                 newWishlist = newArr
            }else{
              newWishlist = [...state.carts,action.payload] 
            }
          }else{
            newWishlist = [...state.wishlists,action.payload]
          }
          return {
            ...state,
            wishlists: newWishlist
          };
    default:
      return state;
  }
};
export default product;
