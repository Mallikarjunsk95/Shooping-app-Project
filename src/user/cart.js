import { useState, useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";

const MyCart = ()=>{
    let [product, updateProduct] = useState([]);
    const getProduct = ()=>{
      fetch("http://localhost:1234/cart")
      .then(response=>response.json())
      .then(productArray=>{
          updateProduct(productArray.reverse());
      })
  }

  useEffect(()=>{
      getProduct();
  },[1]);
    
  let grandtotal = 0;

  const one = (pid, qty, productinfo)=>{
    let newqty = parseInt(qty) + 1;
    productinfo["qty"] = newqty;
    let postoption = {
        headers:{'Content-Type':'application/json'},
        method:'PATCH',
        body:JSON.stringify(productinfo)
    };
    let url = "http://localhost:1234/cart/"+pid;
    fetch(url, postoption )
    .then(response=>response.json())
    .then(serverres=>{
        toast(productinfo.name + "Updated in your Cart");
        getProduct()// to update page data
        
    })
  }
  const two = (pid, qty, productinfo)=>{
    let newqty = parseInt(qty) - 1;
    if(newqty<=0){
        deleteItem(pid);
    }else{

    productinfo["qty"] = newqty;
    let postoption = {
        headers:{'Content-Type':'application/json'},
        method:'PUT',
        body:JSON.stringify(productinfo)
    };
    let url = "http://localhost:1234/cart/"+pid;
    fetch(url, postoption )
    .then(response=>response.json())
    .then(serverres=>{
        toast(productinfo.name + "Upated in your Cart");
        getProduct()// to update page data
        
    })
   }
  }
  const deleteItem=(pid)=>{
    let url = "http://localhost:1234/cart/"+pid;
    let postData= { method:"DELETE"}
    fetch(url, postData)
    .then(response=>response.json())
    .then(serverRes=>{
        toast(pid + "Deleted from ur cart");
        getProduct();
    })
  }
  let [fullname, pickName]= useState("");
  let [mobileno, pickMobile]= useState("");
  let [emailid, pickEmail]= useState("");
  let [address, pickAddress]= useState("");


  const save = ()=>{
    let url = "http://localhost:1234/order";
    let data = {
        customername:fullname,
        mobile:mobileno,
        email:emailid,
        address:address,
        orderitem:product // acts as nested array- array inside array
    };
    let postoption = {
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(data)
    }
    fetch(url, postoption)
    .then(response=>response.json())
    .then(serverRes=>{
        toast("Hi, "+ fullname + " We received ur order No : "+ serverRes.id);
    })


  }


    return(
       <div className="container">
          <ToastContainer/>
            <div className="row">
                <div className="col-lg-3">
                    <div className="p-3 shadow-lg">
                        <h4 className="text-center">Customer Details</h4>
                        <hr/>
                        <div className="mb-3">
                            <label>Full Name</label>
                            <input type="text" className="form-control"
                            onChange={obj=>pickName(obj.target.value)}/>
                           
                        </div>
                        <div className="mb-3">
                            <label>Mobile No</label>
                            <input type="number" className="form-control"
                             onChange={obj=>pickMobile(obj.target.value)}/>
                           
                        </div>
                        <div className="mb-3">
                            <label>Email-id</label>
                            <input type="email" className="form-control"
                             onChange={obj=>pickEmail(obj.target.value)}/>
                           
                        </div>
                        <div className="mb-3">
                            <label>Delivery Address</label>
                           <textarea className="form-control"
                            onChange={obj=>pickAddress(obj.target.value)}></textarea>   
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary"
                            onClick={save}>Place Order</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h1 className="text-center text-primary">
                        {product.length} - Items in My Cart
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((pinfo, index)=>{
                                    grandtotal = grandtotal + pinfo.qty * pinfo.price;
                                    return(
                                        <tr key={index}>
                                            <td>{pinfo.name}</td>
                                            <td><img src={pinfo.photo} height="50"/></td>
                                            <td>Rs.{pinfo.price}</td>
                                            <td>
                                                <div className="input-group">
                                                    <button className="btn btn-warning input-group-text"
                                                    onClick={two.bind(this, pinfo.id, pinfo.qty, pinfo)}> - </button>
                                                    <input type="text" className="form-control" value={pinfo.qty}/>
                                                    <button className="btn btn-info input-group-text"
                                                    onClick={one.bind(this, pinfo.id, pinfo.qty, pinfo)}> + </button>

                                                </div>
                                            </td>
                                            <td>{pinfo.qty * pinfo.price}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"
                                                onClick={deleteItem.bind(this, pinfo.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="3" className="text-end">Payble Amount : {grandtotal}</td>
                                <td colSpan="3"></td>

                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
       </div>
    )
}

export default MyCart;