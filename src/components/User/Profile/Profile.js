import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Profile.scss";

const Profile = (props) => {
  const params = useParams;

  const account = useSelector((state) => state.user.accout);
  const email = account.email.split("@")[0];

  return (
    <>
      <div className="card ">
        <div className="img">
          <img src={`data:image/jpeg;base64,${account.image}`} />
        </div>
        <div className="infos">
          <div className="name">
            <h2> Nick Name : {account.username}</h2>
            <h4>@{email}</h4>
          </div>
          <p className="text">
            I'm a Front End Developer, follow me to be the first who see my new
            work.
          </p>
          <ul className="stats">
            <li>
              <h3>15K</h3>
              <h4>Views</h4>
            </li>
            <li>
              <h3>82</h3>
              <h4>Projects</h4>
            </li>
            <li>
              <h3>1.3M</h3>
              <h4>Followers</h4>
            </li>
          </ul>
          <div className="links">
            <button className="follow">Follow</button>
            <button className="view">View profile</button>
            <button className="view">Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
