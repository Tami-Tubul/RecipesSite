import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBuyItemFromList, getBayList, updateBuyList } from '../api';
import { saveBayList, deleteBuyItem } from '../store/actions/bayList';
import { Container } from '@material-ui/core';

export default function BayList() {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { Id } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [editedItems, setEditedItems] = useState([]);
    // const [buyList, setBuyList] = useState([]);

    // Using Redux useSelector to get the buyList state
    const buyList = useSelector(state => state.b.buyList);

    // useEffect(async () => {
    //     await getBayList(Id).then(res => {
    //         dispatch(saveBayList(res));
    //         setBuyList(res);
    //         console.log(res);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, [Id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBayList(Id);
                dispatch(saveBayList(response));
                console.log(response);
            } catch (error) {
                console.log("Error fetching bay list:", error);
            }
        };

        fetchData();
    }, [Id, dispatch]);


    const deleteItem = (index) => {

        //delete from the server
        deleteBuyItemFromList(index).then((res) => {
            if (res.status === 200) {

                //delete from the redux
                dispatch(deleteBuyItem(Id, index));

                const updatedArr = buyList.filter(item => item.Id !== index);
                // setBuyList(updatedArr);
                dispatch(saveBayList(updatedArr));
                console.log("after delete ", updatedArr);
            }
            else alert("פעולת המחיקה נכשלה");
        }
        ).catch(err => {
            alert("פעולת המחיקה נכשלה")
        });
    }

    const addBuyItem = () => {
        navigate("/AddBuyItem");
    }

    const updateBayList = () => {
        setIsUpdate(!isUpdate);
    }

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        const updatedEditedItems = [...editedItems];
        const index = updatedEditedItems.findIndex(item => item.Id === id);
        
        //if the index not exist in the list - add new item.
        if (index === -1) {
            updatedEditedItems.push({ Id: id, [name]: value });
        } else {
            updatedEditedItems[index][name] = value;
        }
        setEditedItems(updatedEditedItems);

        // Update the count field in the buyList state
        const updatedBuyList = buyList.map(item => {
            const editedItem = updatedEditedItems.find(edited => edited.Id === item.Id);
            return editedItem ? { ...item, ...editedItem } : item;
        });
       
        dispatch(saveBayList(updatedBuyList));


    };

    const saveChanges = () => {
        const updatedBuyList = buyList.map(item => {
            const editedItem = editedItems.find(edited => edited.Id === item.Id);
            return editedItem ? { ...item, ...editedItem } : item;
        });
        console.log(buyList, updatedBuyList);
        //Call to serve 
        // updateBuyList(buyList)
        //     .then(res => setBuyList(res))
        //     .catch(err => {
        //         alert("Faild in update list. ", err);
        //         console.log(err)
        //     });
        // Clear the temporary editedItems
        setEditedItems([]);
        updateBayList();
    };

    return (
        <Container>
            {buyList.length != 0 ?
                <div>
                    {!isUpdate ? <button onClick={updateBayList}>ערוך רשימה</button> :
                        <button onClick={saveChanges}>שמור שינויים</button>}
                    {
                        buyList.map((item, index) => (
                            <div key={index}>
                                <input type='number'
                                    name='Count'
                                    value={isUpdate ? (editedItems[index]?.Count || item.Count) : item.Count}
                                    onChange={(e) => handleInputChange(e, item.Id)}
                                    readOnly={!isUpdate}></input>
                                <input type='text'
                                    name='Name'
                                    value={isUpdate ? (editedItems[index]?.Name || item.Name) : item.Name}
                                    onChange={(e) => handleInputChange(e, item.Id)}
                                    readOnly={!isUpdate}></input>
                                {!isUpdate && <button onClick={() => deleteItem(item.Id)}>הסר פריט</button>}
                            </div>))
                    }
                </div> :
                <p>רשימת הקניות שלך ריקה</p>}
            <button onClick={addBuyItem}>הוסף מוצר</button>
        </Container>
    )
}
