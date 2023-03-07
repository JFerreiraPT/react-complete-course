import './Card.css';

const Card = (props) => {
    //props are always available, even if we dont pass them to childen, that we can render childrens, and get classes
    //this is the way of defining wraping classes without losing classes or components
    const classes = 'card ' + props.className;
    return (
        
        <div className={classes}>{props.children}</div>

    )

}

export default Card;