"use-strict";
import * as type from "../actionType";
import { updateProductCartValue,setAllFalseValue } from "../../utilities/method";
const initialState = {
  carts: [],
  wishlists: [],
  filters: {},
  homeData: {}
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_HOME_DATA_SUCCESS:
      return addHomeList(state, action.payload);
    case type.ADD_FILTER_SUCCESS:
      return {
        ...state,
        filters: action.payload
      };
    case type.ADD_CART_API_SUCCESS:
      return {
        ...state,
        carts: action.payload
      };
    case type.GET_WISLIST_API_SUCCESS:
      return {
        ...state,
        wishlists: action.payload
      };

    case type.ADD_REMOVE_CART_SUCCESS:
      let newCart;
      debugger
      if (state.carts.length > 0) {
        let indexCart = state.carts.findIndex(
          x => x.id == action.payload.id
        );
        if (indexCart > -1) {
          let newArr = [...state.carts];
          newArr.splice(indexCart, 1);
          newCart = newArr;
        } else {
          newCart = [...state.carts, action.payload];
        }
      } else {
        newCart = [...state.carts, action.payload];
      }

      return {
        ...state,
        carts: newCart,
        homeData: updateHomeListCart({ ...state, carts: newCart })
      };

    case type.REMOVE_CART_SUCCESS:
      return {
        ...state,
        carts: []
      };
    case type.REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlists: []
      };

    case type.ADD_REMOVE_WISHLIST_SUCCESS:
      debugger
      let newWishlist;
      if (state.wishlists.length > 0) {
        let indexWish = state.wishlists.findIndex(
          x => x.id == action.payload.id
        );
        if (indexWish > -1) {
          let newArr = [...state.wishlists];
          newArr.splice(indexWish, 1);
          newWishlist = newArr;
        } else {
          newWishlist = [...state.carts, action.payload];
        }
      } else {
        newWishlist = [...state.wishlists, action.payload];
      }
      return {
        ...state,
        wishlists: newWishlist,
        homeData: updateHomeListWishList({ ...state, wishlists: newWishlist })

      };

    default:
      return state;
  }
};
export default product;

// Update Home  data popular and featured
const addHomeList = (previousState, payload) => {
  let { carts, wishlists } = previousState;
  if ((carts && carts.length > 0) || (wishlists && wishlists.length > 0)) {
    let featured = updateProductCartValue(payload.featured, previousState);
    let popular = updateProductCartValue(payload.popular, previousState);
    return {
      ...previousState,
      homeData: {
        banners: payload.banner,
        featured,
        popular
      }
    };
  } else {
    return {
      ...previousState,
      homeData: payload
    };
  }
};

// Update Cart List
const updateHomeListCart = previousState => {
  if (previousState.carts.length > 0) {
    let featured = updateProductCartValue(
      previousState.homeData.featured,
      previousState
    );
    let popular = updateProductCartValue(
      previousState.homeData.popular,
      previousState
    );
    return {
      ...previousState.homeData,
      featured,
      popular
    };
  } else {
    let featured = setAllFalseValue(previousState.homeData.featured,'cart');
    let popular = setAllFalseValue(previousState.homeData.popular,'cart');
    return {
      ...previousState.homeData,
      featured,
      popular
    };
  }
};
const updateHomeListWishList= previousState => {
  if (previousState.wishlists.length > 0) {
    let featured = updateProductCartValue(
      previousState.homeData.featured,
      previousState
    );
    let popular = updateProductCartValue(
      previousState.homeData.popular,
      previousState
    );
    return {
      ...previousState.homeData,
      featured,
      popular
    };
  } else {
    let featured = setAllFalseValue(previousState.homeData.featured,'wishlist');
    let popular = setAllFalseValue(previousState.homeData.popular,'wishlist');
    return {
      ...previousState.homeData,
      featured,
      popular
    };
  }
};
