import React from "react";
import { useNavigate } from "react-router-dom";

//import "./choose.css";

//const initialActivities = fetch("/api/activities");

const ActivityCard = ({ emoji, name, capacity, group, onJoin }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="activity">
        <div>{emoji}</div>
        <div>{name}</div>
        <div>
          👤 {capacity[0]}/{capacity[1]}
        </div>
        <button
          onClick={() => {
            if (group === name) {
              navigate("/joined");
              return;
            }
            onJoin(name);
          }}
          type="button"
          className="btn btn-primary"
          disabled={capacity[0] >= capacity[1] || (group && group !== name)}
        >
          {group
            ? group === name
              ? "View Group"
              : "Already Joined"
            : capacity[0] >= capacity[1]
            ? "Full"
            : "Join"}
        </button>
      </div>
    </div>
  );
};

export function ActivityList({ group, onGroupChoice }) {
  const navigate = useNavigate();
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const data = await response.json();
        setActivities(data); // Set the fetched activities in state
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  // const [activities, setActivities] = React.useState(() => {
  //   const storedActivities = localStorage.getItem("activities");
  //   return storedActivities ? JSON.parse(storedActivities) : initialActivities;
  // });

  // React.useEffect(() => {
  //   localStorage.setItem("activities", JSON.stringify(activities));
  // }, [activities]);

  const handleJoinActivity = async (activityName) => {
    try {
      const response = await fetch("/api/activities/join", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        //credentials: "include",
        body: JSON.stringify({ name: activityName }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.msg);
        return;
      }

      // Update local state with new activities list
      setActivities(data.activities);
      onGroupChoice(activityName);
      navigate("/joined");
    } catch (error) {
      console.error("Error joining activity:", error);
    }
    // const updatedActivities = activities.map((activity) => {
    //   if (
    //     activity.name === activityName &&
    //     activity.capacity[0] < activity.capacity[1]
    //   ) {
    //     return {
    //       ...activity,
    //       capacity: [activity.capacity[0] + 1, activity.capacity[1]],
    //     };
    //   }
    //   return activity;
    // });
    // localStorage.setItem("activities", JSON.stringify(updatedActivities));
    // onGroupChoice(activityName);
  };

  return (
    <div className="container">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.name}
          {...activity}
          group={group}
          onJoin={handleJoinActivity}
        />
      ))}
    </div>
  );
}
