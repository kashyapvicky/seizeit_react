import React, { Componentm,useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,

} from "react-native";
//local imports
import styles from "../../../styles";
import { string } from "../../../utilities/languages/i18n";
import Listitems from "./ListItem";
import { FilterButton } from "./FilterButton";
import { ProductPlaceholder } from "./PlaceHolderProduct";
import {
  updateProductCartValue,
  updateCartSuccess,
  updateWishListSuccess
} from "../../../utilities/method";

const ProductCartItem  = (props)=> {
  const [products, setProducts] = useState(props.products);
    this.veiwRef = {};
    this.loaderComponent = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
//   constructor(props) {
//     super(props);
//     this.veiwRef = {};
//     this.state = {
//       products: this.props.products,
//     };
//     this.loaderComponent = new Promise(resolve => {
//       setTimeout(() => {
//         resolve();
//       }, 1000);
//     });
//   }
//   componentDidMount(){
//       this.setState({
//         products : this.props.products
//       })
//   }
renderItems = ({ item, index }) => {
    return (
      <Listitems
        item={item}
        index={index}
        imageHeight={168}
        onPress={() =>
            props.navigation.navigate("ProductDetails", {
            productId: item.product_id
          })
        }
        onPressWishlist={() => this.onPressWishlist(item, index)}
        onPressCart={() => this.addRemoveCart(item)}
        onGetRefWishlist={ref => (this.veiwRef[index] = ref)}
      />
    );
  };
  renderProductsList = () => {  
    console.log(products)
    return (<FlatList
          bounces={true}
        //   extraData={this.state}
          // pagingEnabled={true}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item, index) => index + "product"}
          renderItem={this.renderItems}
          ListEmptyComponent={
            <ProductPlaceholder
              array={[1, 2, 3, 4, 5, 6]}
              message={props.screenProps.loader ? "" : string("No products found")}
              loader={this.loaderComponent}
            />
          }
          // refreshing={this.state.isRefreshing}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.9}
          // ListFooterComponent={this.renderFooter}
          // ListEmptyComponent={
          //     (this.state.allProductsListForItem.length == 0) ?
          //         ListEmpty2({ state: this.state.visible, margin: screenDimensions.height / 3 - 20, message: string('noproductfound') })

          //         :
          //         null
          // }
        />
    );
  };
  /************** Cart Method  **************/
  bounce = index =>
    this.veiwRef[index]
      .rubberBand(500)
      .then(endState =>
        console.log(endState.finished ? "bounce finished" : "bounce cancelled")
      );
  onPressWishlist = (item, index) => {
    this.bounce(index);
    let { addToWishlistSuccess } = props.screenProps.productActions;
    let updateArray = updateWishListSuccess(products, item);
    setProducts(updateArray)
    addToWishlistSuccess({
      ...item,
      isFevorite: item.isFevorite ? false : true
    });
  };
  addRemoveCart = item => {
    let { addCartRequestApi } = props.screenProps.productActions;
    let updateArray = updateCartSuccess(products, item);
    setProducts(updateArray)
    // this.setState({
    //   products: updateArray
    // });
    addCartRequestApi({ ...item, isCart: item.isCart ? false : true });
  };

  /************** Cart Method  **************/
return (
    
    this.renderProductsList()
)
  
}
export default ProductCartItem;
