
const DropDownItem = (props) => {
return(<option value={props.q} >{props.q}</option>);
}



export default function CartItem(props){

    const quantityChanged = (e,sku) => {


        let newData=[];
        props.data.forEach(element => {
            if(sku==element.skucode){
                element["qty"]=e.target.value;
                newData.push(element);
            }else{
                newData.push(element);
            }
        });
        props.setData(newData);
     
    }
    const quantityDeleted = (e,sku) => {

        let newData=[];
        props.data.forEach(element => {
            if(sku!=element.skucode){
                newData.push(element);
            }
        });

        props.setData(newData);
        

    }

    return(
        
        <tr style={{padding:"24px"}}>
          
          <td>
            <img style={{display:"inline",height:"42px"}}  src={props.item.thumbnail} />
            <span>{props.item.title}</span><span>{props.item.skucode} - {props.item.name}</span></td>
          <td>

          <select name="items" id="items" onChange={(e)=>{quantityChanged(e,props.item.skucode)}}>
            {
                Array.from({length: props.item.qty}, (_, i) => i+1 ).map(function (x, i) {
                    return <DropDownItem key={x} q={x} />;
                })
            }
           
          </select>
         
          </td>
          <td> {props.item.mrp}</td>
          <td> {props.item.discount}</td>
          <td> {Math.round((props.item.mrp - (props.item.discount/100 * props.item.mrp))*(props.item.qty?props.item.qty:1))}</td>
          <td><button onClick={(e)=>{quantityDeleted(e,props.item.skucode)}}>delete</button></td>
        </tr>
    );
}