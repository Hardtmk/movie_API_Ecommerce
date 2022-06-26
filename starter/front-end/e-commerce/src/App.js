
import{BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import ProductList from './movieList';
import MovieDetail from './MovieDetail';
import Checkout from './Checkout';
import {CartContext} from './CartContext';
import {useState} from 'react'
function App() {

const [cartItems, setCartItems] = useState([])

  return (
<BrowserRouter>

<CartContext.Provider value={{cartItems,setCartItems}}>

<Routes>
<Route path='/' element={<ProductList/>}/>
<Route path='/checkout' element={<Checkout/>}/>
<Route path="/movie_detail" element={<MovieDetail/>}>
   <Route path=":id" element={<MovieDetail/>}/>
</Route>
<Route path='*' element={<p>找不到頁面</p>}/>
</Routes>
</CartContext.Provider>
</BrowserRouter>

  );
}

export default App;
