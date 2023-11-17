import { useDispatch } from "react-redux";
import { editProducts } from "../store/actions"; // Make sure to import the appropriate action
import { editThisProduct } from "../api"; // Make sure to import the API function for adding recipes
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; // Import React and useState for managing state
import { Container } from "@material-ui/core";

function EditProudct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: "",
        instructions: [],
        difficulty: "",
        duration: "",
        description: "",
        userId: "", // You may need to set the user ID
        categoryId: 0, // Set the appropriate category ID
        img: "",
        ingredients: [],
    });

    const change = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        });
    };

    const addInstruction = () => {
        setRecipe({
            ...recipe,
            instructions: [...recipe.instructions, ""],
        });
    };

    const updateInstruction = (index, value) => {
        const updatedInstructions = [...recipe.instructions];
        updatedInstructions[index] = value;
        setRecipe({
            ...recipe,
            instructions: updatedInstructions,
        });
    };

    const removeInstruction = (index) => {
        const updatedInstructions = [...recipe.instructions];
        updatedInstructions.splice(index, 1);
        setRecipe({
            ...recipe,
            instructions: updatedInstructions,
        });
    };

    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [
                ...recipe.ingredients,
                {
                    name: "",
                    count: 0,
                    type: "",
                },
            ],
        });
    };

    const updateIngredient = (index, key, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][key] = value;
        setRecipe({
            ...recipe,
            ingredients: updatedIngredients,
        });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients.splice(index, 1);
        setRecipe({
            ...recipe,
            ingredients: updatedIngredients,
        });
    };

    const editRecipeHandler = async (e) => {
        e.preventDefault();
        try {
            const newRecipe = await editThisProduct(recipe);
            dispatch(editProducts(newRecipe));
            alert('The recipe has been edit successfully!');
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
            <h1>עריכת מתכון</h1>
            <form>
                <div>
                    <label>שם המתכון:</label>
                    <input
                        type="text"
                        placeholder="הכנס שם מתכון"
                        name="name"
                     
                        onChange={change}
                    />
                </div>
                <div>
                    <label>הוראות:</label>
                    {recipe.instructions.map((instruction, index) => (
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
                        type="text"
                        placeholder="הכנס רמת קושי"
                        name="difficulty"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>זמן הכנה:</label>
                    <input
                        type="text"
                        placeholder="הכנס זמן הכנה"
                        name="duration"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>תיאור מתכון:</label>
                    <input
                        type="text"
                        placeholder="הכנס תיאור קצר"
                        name="description"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        placeholder="Enter user ID"
                        name="userId"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>קטגוריה ID:</label>
                    <input
                        type="number"
                        placeholder="הכנס קטגוריה ID"
                        name="categoryId"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        placeholder="Enter the image URL"
                        name="img"
                        onChange={change}
                    />
                </div>
                <div>
                    <label>מצרכים:</label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Enter ingredient name"
                                value={ingredient.name}
                                onChange={(e) => updateIngredient(index, "name", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="הכנס כמות"
                                value={ingredient.count}
                                onChange={(e) => updateIngredient(index, "count", e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="הכנס סוג כמות"
                                value={ingredient.type}
                                onChange={(e) => updateIngredient(index, "type", e.target.value)}
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
                <input type="submit" value="ערוך מתכון" onClick={editRecipeHandler} />
                <input type="button" value="ביטול" onClick={cancel} />
            </form>
        </Container>
    );
}

export default EditProudct;




