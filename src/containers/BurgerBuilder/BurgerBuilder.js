import {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseable = (updatedIngredients)=>{
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients)
                .map((igkey) => {
                    return ingredients[igkey]
                })
                .reduce((sum, el) => {
                    return sum+el
                },0);
        this.setState({purchaseable: sum>0});
    }

    addIngredientHandler = (type) => {
        // console.log(type);
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=newCount;
        // console.log(updatedIngredients);
        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({ingredients:updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // console.log(type);
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
            const newCount = oldCount-1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type]=newCount;
            // console.log(updatedIngredients);
            const priceAddition = INGREDIENTS_PRICES[type];
            const newPrice = this.state.totalPrice - priceAddition;
            this.setState({ingredients:updatedIngredients, totalPrice: newPrice});
            this.updatePurchaseable(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
        //console.log("done");
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        alert("You Continue!");
    }

    render(){

        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice} 
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <p>ok</p>
                <BuildControls
                    disabled={disabledInfo} 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    purchaseable={this.state.purchaseable}
                />
            </>
        );
    }
}

export default BurgerBuilder;