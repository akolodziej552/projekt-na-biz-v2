const ProductCard = (props) => {
    const {name,price} = props;
    return (
        <div className="product-card">
            <h3>{name}</h3>
            <span>{price}</span>
        </div>
    )
}
export default ProductCard;