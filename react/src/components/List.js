import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThisProduct, getAllProducts } from "../api";
import { deleteProduct, saveProducts } from "../store/actions";
import Item from "./Item";
import { useNavigate } from 'react-router-dom';
function List() {
    let dispatch = useDispatch();
    let myUser = useSelector(state => state.u.currentUser);
    let navigate = useNavigate();
    useEffect(() => {
        getAllProducts().then(res => {
            dispatch(saveProducts(res));
        }).catch(err => {
            console.log(err);
        })
    }, [])
    let arr = useSelector(state => state.p.productArr);


    let deleteProd = (ind) => {
        deleteThisProduct(ind);
        dispatch(deleteProduct(ind));
    }
    let editProduct = (id) => {
    navigate(`/editProduct/${id}`);
    }
    return (
        <div className="dives">
            {arr.map(item => {
                return <div><Item key={item.Id} show={item} />
                    <input type="button" className="ui button" value="מחיקת מתכון" onClick={() => { deleteProd(item.Id) }} />
                    <input type="button" className="ui button" value="עריכת מתכון" onClick={() => { editProduct(item.Id) }} />
                </div>
            })}
        </div>);
}

export default List;