import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", Type: "salad"},
    {label: "Bacon", Type: "bacon"},
    {label: "Cheese", Type: "cheese"},
    {label: "Meat", Type: "meat"}
];

const BuildControls = props => {
    // console.log(props.disabled);

    return(
    <div className={classes.BuildControls}>
        <p>Burger Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((value) => {
            return <BuildControl
                        disabled={props.disabled[value.Type]}
                        key={value.label}
                        label={value.label}
                        type={value.Type}
                        added={props.ingredientAdded}
                        removed={props.ingredientRemoved}
                    />
        })}
        <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
    </div>
)};

export default BuildControls;