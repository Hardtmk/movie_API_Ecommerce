import Title from'./Title'
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext';
import { useContext } from "react"
import axios from 'axios'
import styles from './Checkout.module.css'
import Nav from './nav'
import Footer from './footer'

export default function Checkout(){

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

let {cartItems} = useContext(CartContext)
let cartEmpty = cartItems.length<=0? true:false


let grandTotal = cartItems.reduce((total,product)=>{
 return total += product.price*product.quantity
},0)

const handlePayment=()=>{
    

// const response = await axios.post(`http://localhost:8000/api/v1/movies/checkout`,{cartItems})
//  if (response.status=201){
//      console.log('success')
//      console.log(response.data)
//  }
  fetch("http://localhost:8000/api/v1/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     cartItems
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
    window.location=url
    })
    .catch(e => {
      console.error(e.error)
    })
}

return(

<>
<Nav/>
 <Title mainTitle='Your Cart'/>
<div className={styles.box}></div>
{cartEmpty &&
<Link to ='/'>Back to HomePage</Link>

}

 {
                !cartEmpty &&
                <div className={styles.checkOutItem}>
              
                    <div className={styles.cartSection}>
                        {
                            /* 產品列表 */
                            cartItems.map(product=>(
                                <div className={styles.addPadding} key={product._id}>
                                    <img  className={styles.moviePic} src={IMGPATH+product.poster_path} alt={product.title}/>
                                    <QuantityBtn productInfo={product}/>
                                </div>
                            ))
                        }
</div>

  <div className={styles.checkoutSection}>
      
<div>The Total Is ${grandTotal}</div>
<button className={styles.pay} onClick={handlePayment}>PAY</button>
   {/* 價錢總數，免費送貨 */}
  </div>
 </div>
}

<Footer/>
</>

)



}