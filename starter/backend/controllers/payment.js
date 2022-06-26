
const handlePayment=async(req,res)=>{ 
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
 try {
console.log(req.body)
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.cartItems.map(item => {
        // const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount:item.price*100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3000/`,
      cancel_url: `${process.env.CLIENT_URL}/movie_detail`,
     
    })

    res.json({ url: session.url})
    
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}





module.exports={
handlePayment,
}