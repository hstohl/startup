import React from "react";
import { useNavigate } from "react-router-dom";

import { ActivityList } from "./activityList";
import "./choose.css";

export function Choose(props) {
  const [activities, setActivities] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedActivities =
      JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(storedActivities);
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Join an Activity!</h1>
      <div>
        <span>User: Hudson Stohl </span>
        <button
          type="join"
          onClick={() => navigate("/")}
          className="btn btn-outline-light btn-sm"
        >
          {" "}
          Sign Out
        </button>
      </div>
      <br />
      <br />

      <div className="container">
        <ActivityList
          activities={activities}
          onGroupChoice={props.onGroupChoice}
        />
      </div>
    </main>
  );
}
