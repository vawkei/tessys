import { Fragment } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card";
import classes from "./ContactForm.module.css";

const ContactForm = () => {
  return (
    <Fragment>
      <form className={classes.contact}>
        <Card className={classes.cardClass1}>
          <div className={classes.control}>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              placeholder="Enter your full name here"
              name="user_name"
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="">Subject:</label>
            <input
              type="text"
              placeholder="Enter subject  of your email here"
              name="subject"
            />
          </div>
          <div className={classes.control}>
          <label>Message</label>
            <textarea
              cols={"60"}
              rows={"10"}
              type={"text"}
              name="user_message"></textarea>
          </div>
          <div className={classes.action}>
                <Button className={classes.btn}>Submit</Button>
          </div>
        </Card>
      </form>
    </Fragment>
  );
};

export default ContactForm;
