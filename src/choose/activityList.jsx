import React from "react";
import { useNavigate } from "react-router-dom";

//import "./choose.css";

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

export function ActivityList({ changeGroup }) {
  const navigate = useNavigate();
  const [activities, setActivities] = React.useState([]);
  const [group, setGroup] = React.useState("");

  React.useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const response = await fetch("/api/activities/group", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        const data = await response.json();
        setGroup(data.group);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchUserGroup();
  }, []);

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

  const handleJoinActivity = async (activityName) => {
    try {
      const response = await fetch("/api/activities/join", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ name: activityName }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.msg);
        return;
      }

      // Update local state with new activities list
      setActivities(data.activities);
      changeGroup(activityName);
      navigate("/joined");
    } catch (error) {
      console.error("Error joining activity:", error);
    }
  };

  return (
    <div className="container">
      {activities && Array.isArray(activities) ? (
        activities.map((activity) => (
          <ActivityCard
            key={activity.name}
            {...activity}
            group={group}
            onJoin={handleJoinActivity}
          />
        ))
      ) : (
        <p>Loading activities...</p>
      )}
    </div>
  );
}
