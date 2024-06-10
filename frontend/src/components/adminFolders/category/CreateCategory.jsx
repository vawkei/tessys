import classes from "./CreateCategory.module.css";
import Card from "../../ui/card/Card";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../ui/button/Button";
import { createCategory, getCategories } from "../../../store/category/categoryIndex";

const CreateCategory = () => {
  const [enteredName, setEnteredName] = useState("");


  const dispatch = useDispatch();


  const enteredNameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const submitCategoryHandler =async (e) => {
    e.preventDefault();

    if(enteredName.length === 0){
      console.log("please enter a name");
      return  
    };
    if(enteredName.length < 3 || enteredName.length > 10){
      console.log("Name shouldn't be <3 or >10 characters");
      return
    };

    const formData = {name:enteredName.charAt(0).toUpperCase() + enteredName.slice(1)}
    await dispatch(createCategory(formData)) 

    setEnteredName("");

    await dispatch(getCategories())
  };

  return (
    <div className={classes["create-category"]}>
      <h2>
        <b>Create category</b>
      </h2>

      <Card className={classes.cardClass}>
        <form onSubmit={submitCategoryHandler}>
          <div className={classes.control}>
            <label htmlFor="">Category name:</label>
            <input
              type="text"
              value={enteredName}
              onChange={enteredNameChangeHandler}
            />
          </div>
          <div className={classes.action}>
            <Button className={classes.btn}>Create Category</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategory;
