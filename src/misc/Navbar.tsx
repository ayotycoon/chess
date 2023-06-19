import {useContext, useEffect, useRef, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {StateContext} from "./StateProvider";


function NavBar() {
    const history = useHistory();
    const {optionsClicked, setOptionsClicked} = useContext(StateContext)

    return (
        <nav className="navbar navbar-light bg-light">
            <span>
                {history.location.pathname != '/' && <span onClick={()=>history.goBack()}  style={{width:'50px',cursor:'pointer'}}  className="text-center d-inline-block">
                    <i className="fa fa-arrow-left"> </i>
                </span>}

                <Link className="navbar-brand" to="/">
                    <div style={{width:'50px'}} className="d-inline-block text-center" >
                    <img src="favicon.png" width="25" height="25"   className="align-top" alt="" />
                    </div>
                 
                    <span className=" d-inline-block">
                    Games
                    </span>
                </Link>

              <span onClick={()=>setOptionsClicked(!optionsClicked)}  style={{width:'50px',cursor:'pointer'}}  className="text-center d-inline-block">
                    <i className="fa fa-user"> </i>
                </span>


            </span>
        </nav>
    )

}

export default NavBar;
