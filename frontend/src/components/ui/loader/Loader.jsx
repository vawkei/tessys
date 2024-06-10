import classes from "./Loader.module.css";
import loaderImage from "../../../assets/veeshoploading.gif";
import ReactDOM from "react-dom";

const Loader = () => {
    return ReactDOM.createPortal( 
        <div className={classes.wrapper}>
            <div className={classes["image-container"]}>
                <img src={loaderImage} alt="spinning" />
            </div>
        </div>,
        document.getElementById("loader")
     );
}
 
export default Loader;
