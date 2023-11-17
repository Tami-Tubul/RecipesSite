import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToList } from '../store/actions/bayList';
import { Container } from '@material-ui/core';
import { addBuyItem } from '../api';


export default function AddBuyItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let myUser = useSelector((state) => state.u.currentUser);

    const [product, setProduct] = useState({
        Id: 0, // Initialize with default values
        UserId: myUser.Id,
        Count: 0,
        Name: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const numericValue = e.target.type === 'number' ? parseFloat(value) : value; //Convert a field of type number from string to numeric
        setProduct({ ...product, [name]: numericValue });

    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        let newProduct = addBuyItem(product);
        dispatch(addProductToList(newProduct));
        alert(`המוצר ${product.Name} נוסף בהצלחה`);

        setProduct({
            Id: 0,
            UserId: 0,
            Count: 0,
            Name: '',
        });
        navigate(`/BayList/${myUser.Id}`);
    };

    return (
        <Container maxWidth="xs">
            <form>
                <div>
                    <input type="text" placeholder="Name" name='Name' onChange={handleInputChange} />
                </div>
                <div>
                    <input type="number" placeholder="Count" name='Count' onChange={handleInputChange} />
                </div>
                <input type='submit' value="הוסף מוצר" onClick={handleAddProduct} />
            </form>
        </Container>
    );
}
