import { useState } from "react";

const MyLogin = ()=>{
    let[myemail, pickEmail] = useState("");
    let[mypass, pickPassword] = useState("");
    let[msg, updateMsg] = useState("");

    const go = ()=>{
        if (myemail=="" || mypass==""){
            updateMsg("please enter login Details");
        }else{
            updateMsg("please wait processing...")
            let url = "http://localhost:1234/account?email="+myemail+"&password="+mypass;
            //alert( url );
            fetch(url)
            .then(response=>response.json())
            .then(userinfo=>{
                if( userinfo.length >0 ){
                    updateMsg("Success : Please wait Re-directing...");
                    localStorage.setItem("fullname", userinfo[0].name);
                    localStorage.setItem("vid", userinfo[0].id);
                    window.location.href="http://localhost:3000/#/dashboard";
                 // window.location.href="http://localhost:5500/index.html/#/dashboard";
                  window.location.reload();
                    
                }else{
                    updateMsg("Fail : Invalid Email or password");
                }
            })
        }
        
       
        
    }
    return(
        <div className="container mt-4">
           
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h4 className="text-center text-info">{msg}</h4>
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white">
                            Vendor Login
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>E-mail Id</label>
                                <input type="email" className="form-control"
                                onChange={obj=>pickEmail(obj.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                onChange={obj=>pickPassword(obj.target.value)}/>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button onClick={go} className="btn btn-danger">Login</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default MyLogin;