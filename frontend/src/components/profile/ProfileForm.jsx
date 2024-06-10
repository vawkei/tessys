import classes from "./ProfileForm.module.css";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updateUserPhoto } from "../../store/auth/authIndex";
import Spinner from "../ui/spinner/Spinner";


const ProfileForm = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  console.log(user);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredTown, setEnteredTown] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");

  useEffect(() => {
    if (user) {
      setEnteredName(user?.name || "");
      setEnteredPhone(user?.phone || "");
      setEnteredAddress(user?.address || "");
      setEnteredSurname(user.surname || "");
      setEnteredState(user?.state || "");
      setEnteredTown(user?.town || "");
    }
  }, [user]);

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  //arrowFunction
  const saveImage = async (event) => {
    event.preventDefault();

    const image = new FormData();
    image.append("image", profileImage);

    if (
      imagePreview !== null &&
      (profileImage.type === "image/jpeg" ||
        profileImage.type === "image/jpg" ||
        profileImage.type === "image/png")
    ) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/uploadUserPhoto`,
        {
          method: "Post",
          body: image,
        }
      );
      const imageData = await response.json();
      console.log(imageData);

      const userData = {
        photo: imageData.msg.src,
      };

      await dispatch(updateUserPhoto(userData));
    }
  };

  //regularFunction
  async function submitHandler(e) {
    e.preventDefault();

    const userData = {
      name: enteredName,
      surname: enteredSurname,
      phone: enteredPhone,
      address: enteredAddress,
      town: enteredTown,
      state: enteredState,
    };

    await dispatch(updateUser(userData));

    setEnteredName("");
    setEnteredSurname("");
    setEnteredPhone("");
    setEnteredAddress("");
    setEnteredTown("");
    setEnteredState("");
  }

  return (
    <div className={classes["over-all-container"]}>
      {isLoading && <Spinner />}
      <ProfileHeader />

      <h2>Name: {user?.name || ""}</h2>
      <h4>{user?.email || ""}</h4>

      <Card className={classes.container}>
        <div className={classes["image-area"]}>
          <img
            src={
              imagePreview
                ? imagePreview
                : user
                ? user.photo
                : "You are UNAUTHORIZED"
            }
          />

          {imagePreview ? (
            <div className={classes["save-PhotoButton"]}>
              <Button onClick={saveImage} className={classes.btn}>
                Save photo
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">
              <b>Role:</b> {isLoggedIn ? (user ? user.role : "") : ""}
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">
              <b>Name:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">
              <b>Surname:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter your surname"
              required
              value={enteredSurname}
              onChange={(e) => setEnteredSurname(e.target.value)}
            />
          </div>
          {/* <div className={classes.control}>
            <label htmlFor="name">Email:</label>
            <input type="email" value={enteredEmail} disabled />
          </div> */}
          <div className={classes.control}>
            <label htmlFor="phone">
              <b>Phone:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter phone number"
              required
              value={enteredPhone}
              onChange={(e) => setEnteredPhone(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">
              <b>Address:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter residential address here"
              value={enteredAddress}
              required
              onChange={(e) => setEnteredAddress(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="town">
              <b>Town:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter town of residence"
              value={enteredTown}
              required
              onChange={(e) => setEnteredTown(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="state">
              <b>State:</b>
            </label>
            <input
              type="text"
              placeholder="Please enter state of residence"
              value={enteredState}
              required
              onChange={(e) => setEnteredState(e.target.value)}
            />
          </div>
          <div className={classes.action}>
            <Button className={classes.btn}>Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
