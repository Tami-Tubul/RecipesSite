import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { exitUser } from "../store/actions";

function NavBar() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let myUser = useSelector((state) => state.u.currentUser);
  let Id = myUser?.Id;
  let exit = () => {
    dispatch(exitUser());
    navigate("/");
  };
  return (
    <>
      <div className="ui inverted segment">
        <div className="ui inverted secondary pointin header five item menu">
          <Link to="list" className="item">
            כל המתכונים
          </Link>
          <Link to="add-product" className="item">
            הוספת מתכון
          </Link>
          <Link to="categoryList" className="item">
            קטגוריה
          </Link>

          {!myUser ? (
            <>
              <Link to="register" className="item">
                הרשמה
              </Link>
              <Link to="login" className="item">
                כניסה
              </Link>
            </>
            // myUser.role === 2 &&
          ) : (
            <>
              {/* change to send the id of user */}
              <Link to={{ pathname: '/bayList/' + Id }} className="item">
                רשימת קניות
              </Link>
              <button onClick={exit}>יציאה</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
