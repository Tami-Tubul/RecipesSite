
import { useDispatch } from "react-redux";
import { addProduct } from "../store/actions"; // Make sure to import the appropriate action
import { addNewRecipe } from "../api"; // Make sure to import the API function for adding recipes
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; // Import React and useState for managing state
import { Container } from "@material-ui/core";

function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        Name: "",
        Instructions: [],
        Difficulty: 0,
        Duration: 0,
        Description: "",
        UserId: 0, // You may need to set the user ID
        CategoryId: 0, // Set the appropriate category ID
        Img: "",
        Ingredients: [],
    });

    const change = (e) => {
        const { name, value } = e.target;

        const numericValue = e.target.type === 'number' ? parseFloat(value) : value; //Convert a field of type number from string to numeric

        setRecipe({
            ...recipe,
            [name]: numericValue,
        });
    };

    const addInstruction = () => {
        setRecipe({
            ...recipe,
            Instructions: [...recipe.Instructions, ""],

        });
    };

    const updateInstruction = (index, value) => {
        const updatedInstructions = [...recipe.Instructions];
        updatedInstructions[index] = value;
        setRecipe({
            ...recipe,
            Instructions: updatedInstructions,
        });
    };

    const removeInstruction = (index) => {
        const updatedInstructions = [...recipe.Instructions];
        updatedInstructions.splice(index, 1);
        setRecipe({
            ...recipe,
            Instructions: updatedInstructions,
        });
    };

    const addIngredient = () => {
        setRecipe({
            ...recipe,
            Ingredients: [
                ...recipe.Ingredients,
                {
                    Name: "",
                    Count: 0,
                    Type: "",
                },
            ],
        });
    };

    const updateIngredient = (index, key, value) => {
        const updatedIngredients = [...recipe.Ingredients];
        updatedIngredients[index][key] = value;
        setRecipe({
            ...recipe,
            Ingredients: updatedIngredients,
        });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...recipe.Ingredients];
        updatedIngredients.splice(index, 1);
        setRecipe({
            ...recipe,
            Ingredients: updatedIngredients,
        });
    };

    const addRecipeHandler = async (e) => {
        e.preventDefault();
        try {
            const newRecipe = await addNewRecipe(recipe);
            dispatch(addProduct(newRecipe));
            alert('The recipe has been added successfully!');
            navigate("/list"); // Redirect to the recipe list page
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const cancel = () => {
        navigate("/list"); // Redirect to the recipe list page
    };

    return (
        <Container maxWidth="xs">
            <h1>הוספת מתכון</h1>
            <form>
                <div>
                    <label>שם המתכון:</label>
                    <input
                        type="text"
                        placeholder="הכנס שם מתכון"
                        name="Name"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>הוראות:</label>
                    {recipe.Instructions.map((instruction, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="הכנס הוראות מתכון"
                                value={instruction}
                                onChange={(e) => updateInstruction(index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeInstruction(index)}>
                                הסר
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction}>
                        הוסף הוראה של מתכון
                    </button>
                </div>
                <div>
                    <label>רמת קושי:</label>
                    <input
                        type="number"
                        placeholder="הכנס רמת קושי"
                        name="Difficulty"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>זמן הכנה:</label>
                    <input
                        type="number"
                        placeholder="הכנס זמן הכנה"
                        name="Duration"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>תיאור מתכון:</label>
                    <input
                        type="text"
                        placeholder="הכנס תיאור קצר"
                        name="Description"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        placeholder="Enter user ID"
                        name="UserId"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>קטגוריה ID:</label>
                    <input
                        type="number"
                        placeholder="הכנס קטגוריה ID"
                        name="CategoryId"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        placeholder="Enter the image URL"
                        name="Img"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>מצרכים:</label>
                    {recipe.Ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Enter ingredient name"
                                value={ingredient.name}
                                onChange={(e) => updateIngredient(index, "Name", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="הכנס כמות"
                                value={ingredient.count}
                                onChange={(e) => updateIngredient(index, "Count", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="הכנס סוג כמות"
                                value={ingredient.type}
                                onChange={(e) => updateIngredient(index, "Type", e.target.value)}
                            />
                            <button type="button" onClick={() => removeIngredient(index)}>
                                הסר
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>
                        הוסף מצרך
                    </button>
                </div>
                <input type="submit" value="הוסף מתכון" onClick={addRecipeHandler} />
                <input type="button" value="ביטול" onClick={cancel} />
            </form>
        </Container>
    );
}

export default AddProduct;
