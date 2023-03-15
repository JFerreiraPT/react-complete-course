import { useParams, Link } from "react-router-dom";

function ProductDetail() {
    const params = useParams();
    const prodId = params.id;

    return <>
    <h1>Product Details!</h1>
    <p>Chose product has id {prodId} </p>
    <Link to=".." relative="path">Back</Link>
    </>

};

export default ProductDetail;