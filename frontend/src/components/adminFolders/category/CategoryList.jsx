import classes from "./CategoryList.module.css";
import Card from "../../ui/card/Card";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../../store/category/categoryIndex";
import Loader from "../../ui/loader/Loader";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  // console.log(categories);
  const dispatch = useDispatch();

  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const showDeleteNotifierHandlerTrue = (slug) => {
    setCategoryToDelete(slug);
    setShowDeleteNotifier(true);
  };

  const showDeleteNotifierHandlerFalse = () => {
    setCategoryToDelete(null);
    setShowDeleteNotifier(false);
  };
  

  const deleteCategoryHandler =async () => {
      await dispatch(deleteCategory(categoryToDelete));
      setShowDeleteNotifier(false);
      await dispatch(getCategories())
      console.log(categoryToDelete)
  };

  // const deleteCategoryHandler = async () => {
  //   await dispatch(deleteCategory(categoryToDelete))//slug has been stored in the categoryToDelete curtesy of showDeleteNotifierHandlerFalse()
  //   await dispatch(getCategories());
  //   setShowDeleteNotifier(false)
  // };

  // {slug: SyntheticBaseEvent}

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={classes["category-list"]}>
      <h2>
        <b> All categories</b>
      </h2>
      <Card className={classes.cardClass}>
        {isLoading && <Loader />}
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Category name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat, index) => {
                  return (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>{cat.name}</td>
                      <td>{cat.slug}</td>
                      <td>
                        <FaTrashAlt
                          size={16}
                          color={"red"}
                          onClick={() =>
                            showDeleteNotifierHandlerTrue(cat.slug)
                          }
                        />
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          heading={"Delete Category"}
                          body={`You are about to DELETE ${categoryToDelete} category`}
                          onConfirm={deleteCategoryHandler}
                          cancel={showDeleteNotifierHandlerFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Card>
    </div>
  );
};

export default CategoryList;
