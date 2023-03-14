import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummy_products = [
  {
    id: 'p1',
    price: 6,
    title: 'My first book',
    description: 'First book i ever wrote',
  },
  {
    id: 'p2',
    price: 16,
    title: 'My second book',
    description: 'Second book',
  },
  {
    id: 'p3',
    price: 8,
    title: 'Some other book',
    description: 'Irrelevant one',
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((item) => 
        <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
        )}
      </ul>
    </section>
  );
};

export default Products;
