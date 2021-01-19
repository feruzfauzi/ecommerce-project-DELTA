import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {listProducts } from "../actions/productActions"
import Rating from "../components/Rating";


function HomeScreen(props){
    const [sortOrder,setSortOrder] = useState('')
    const [searchKeyword,setSearchKeyword] = useState('')
    const category = props.match.params.id?props.match.params.id:'';
    const productList = useSelector(state=> state.productList);
    const {products,loading,error} =productList;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listProducts(category));
        
        return ()=>{

        };
    },[category]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category,searchKeyword,sortOrder));
          }
        const sortHandler = (e) => {
        const order = e.target.value;
        dispatch(listProducts(category,searchKeyword,sortOrder));
        }




    return(
        loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <div>    
          <div className="content">
            {category&&
             <h2>{category}</h2>}
          </div>
         <ul className="filter">
           <li>
               <form onSubmit={submitHandler}>
                   <input name="searchKeyword" onChange= {(e)=> setSearchKeyword(e.target.value)}></input>
                   <button type="submit">Search</button>
               </form>
           </li>
           <li>
               Sort By {' '}
               <select name="sortOrder" onChange={sortHandler}>
                   <option value="">Newest</option>
                   <option value="lowest">Lowest</option>
                   <option value="highest">Highest</option>
               </select>
           </li>
         </ul>     
                
               <ul className="products">
                    { 
                       products.map(product=>     
                        <li key={product._id}>
                            <div className="product">
                             <Link to={'product/'+ product._id}><img src={product.image} alt="product" className="product-image" /></Link>
                                <div className="product-name">
                                    <Link to={'product/'+ product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="price">{product.price}</div>
                                <div className="product-rating">
                                    <Rating value={product.rating} text={product.numReviews + ' reviews' } />
                                </div>
                            </div>
                        </li>)
                    }
              
                </ul>

        </div>
    ));
    }

export default HomeScreen;