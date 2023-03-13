import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem.js";
import useFetch from "../../hooks/use-fecth";

const MEALS_URL = 'https://react-http-75b93-default-rtdb.firebaseio.com/meals.json'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const handleRequestData = (data) => {
    const loadedMeals = [];
    for(const key in data){
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price
      })
    }

    setMeals(loadedMeals);

  }

  const {
    isLoading,
    error,
    get,
  } = useFetch();

  useEffect(() => {
    get({url: MEALS_URL}, handleRequestData)
  }, []);

//we can return just the error message
if(error){
  return <p className="text-error">Couldn't fetch meals</p>
}


  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {isLoading && !error && <p>Loading...</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
