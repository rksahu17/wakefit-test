import logo from './logo.svg';
import {useState,useEffect} from "react";
import CartItem  from "./component/cartitem";
import './App.css';
const fetchURL = "http://localhost:3000/data"
function App() {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const getData = () =>
     fetch(`${fetchURL}`)
      .then((res) =>  res.json());
  useEffect(() => {

        getData()
        .then((data) => data)
        .then((data) => 
        { 
          let quant={}; 
        
          data.forEach(element => {
           quant[element.sku]=element.quant;
          }); 
        setQuantity(quant);
        setData(data);
        
      });

  }, [])
 const calculateTotal = ()=>{
   let total =0;
    data.forEach(item => {
      total+=Math.round((item.mrp - (item.discount/100 * item.mrp))*(item.qty));
    })
  return total;
 }
  return (
  
    <div className="container">
      <h2>You currently have {data && data.length} items in your cart</h2>

      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>MRP</th>
          <th>Discount</th>
          <th>Total</th>
          <th></th>
        </tr>
        {data?.map((item,i) => 
           <CartItem item={item} key={i} quantity={quantity} setQuantity={setQuantity} data={data} setData={setData}/>
        )}
       <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>{
              data!=null && calculateTotal()
            }</th>
        </tr>
      </table>
    </div>
  );
}

export default App;
