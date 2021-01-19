import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  detailsOrder, payOrder } from "../actions/orderActions";
import PayPalButton from "../components/PayPalButton";

function OrderScreen(props){
    
    const orderPay = useSelector(state=>state.orderPay);
    const {loading: loadingPay, succcess: successPay, error: errorPay} = orderPay;
    const dispatch = useDispatch();
    useEffect(()=>{

         if(successPay)
         {
             props.history.push("/profile")
         }
         else{
            dispatch(detailsOrder(props.match.params.id));
         }

 
        return () => {

        }

    },[successPay])

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order,paymentResult))
    }

    const orderDetails = useSelector(state=>state.orderDetails);
    const {loading,order,error} = orderDetails;

    const payHandler = () => {

    }

 

    return(  loading? <div>Loading...</div> : error? <div>{error}</div> :
        
        <div>
         
             <div className="placeorder">
             <div className="placeorder-info">
                 <div>
                     <h3>Shipping</h3>
                 </div>
                 <div>
                     {order.shipping[0].address},{order.shipping[0].city},{order.shipping[0].postalCode},{order.shipping[0].country}
                 </div>
                 <div>
                     {order.isDelivered?"Delivered at " + order.deliveredAt : "Not Delivered"}
                 </div>
                 <div>
                     <h3>Payment</h3>
                     <div>
                         Payment Method: {order.payment}
                     </div>
                     <div>
                     {order.isPaid?"Paid at " + order.paidAt : "Not Paid"}
                 </div>
                 </div>
                  <div>
                  <ul className="cart-list-container">
                      <li>
                          <h3>Shopping Cart</h3>
                          <div>Price</div>
                      </li>
                        {
                         order.orderItems.length === 0 ?
                         <div>Cart is Empty</div>
                         : 
                        
                         order.orderItems.map(item => 
                          <li>

                            <div className="cart-image">
                            <img src = {item.image} alt="product" />
                            </div>
                            <div className="cart-name">
                               <div>
                                  <Link to={"/product/" + item.product}>
                                  {item.name}
                                  </Link>
                               </div>
                                <div>
                                  Qty: {item.qty}
                                </div>
                                <div className="cart-price">
                                ${item.price}
                               </div>
                
                            </div>
                         
                            
                          </li>
                            )
                        }

                        
                  </ul>
                  </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li className="placeorder-actions-payment">
                       {!order.isPaid && <PayPalButton amount={order.totalPrice} onSuccess={handleSuccessPayment}></PayPalButton> }
                    </li>
                    <li>
                         <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${order.itemPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${order.shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${order.taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${order.totalPrice}</div>
                    </li>
                    
                </ul>
        
       
              
            </div>
            
        </div>
        </div>
      
        
    );

}

export default OrderScreen;
