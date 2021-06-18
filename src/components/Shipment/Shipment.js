import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const savedCart = getDatabaseCart();
  const [shipingData, setShipingData] = useState(null)

  const onSubmit = data => {
    setShipingData(data)
  };
  const paymentDone = (paymentId) => {
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shipingData,
      orderTime: new Date()
    };
    fetch('https://e-commerce-backhand.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed successfully Yeh!!');
        }
      })
  }

  console.log(watch("example"));

  return (
    <div className="row">
      <div style={{ display: shipingData ? 'none' : 'block' }} className="col-md-6">

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>

      <div style={{ display: shipingData ? 'block' : 'none' }} className="col-md-6">
        <h2>Plase Pay</h2>
        <ProcessPayment handlePayment={paymentDone} />
      </div>
    </div>

  );
};

export default Shipment;