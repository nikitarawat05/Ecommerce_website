import React, { useEffect, useState } from 'react'
import './Popular.css'  // Importing the CSS file for styling the Popular component
import Item from '../Item/Item'  // Importing the Item component, which is used to display individual items

// Popular component which fetches and displays the popular products in the women's category
const Popular = () => {

  // Using useState to create a state variable for storing popular products and a function to update it
  const [popularProducts, setPopularProducts] = useState([]);

  // useEffect hook to fetch data from the server when the component loads
  useEffect(() => {
    // Fetching popular products from the backend API (this runs when the component mounts)
    fetch('http://localhost:4000/popularinwomen')  // Backend endpoint to get the popular products for women
      .then((response) => response.json())  // Converting the API response to JSON format
      .then((data) => setPopularProducts(data));  // Updating the popularProducts state with the data received
  }, [])  // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className='popular'>
      {/* Heading for the popular products section */}
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      
      {/* Container for popular product items */}
      <div className="popular-item">
        {/* Mapping through the popularProducts array and rendering the Item component for each product */}
        {popularProducts.map((item, i) => {
          return (
            <Item 
              key={i}  // Using index 'i' as a unique key for each Item (ideally 'id' should be unique)
              id={item.id}  // Passing product id as a prop to the Item component
              name={item.name}  // Passing product name as a prop to the Item component
              image={item.image}  // Passing product image URL as a prop to the Item component
              new_price={item.new_price}  // Passing the new price of the product
              old_price={item.old_price}  // Passing the old price of the product
            />
          );
        })}
      </div>
    </div>
  )
}

export default Popular
