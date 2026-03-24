
// ProfileList.jsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard"; // reuse the existing component

const ProfileList = () => {
  // State for existing profiles
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Alice",
      bio: "Loves cats",
      avatar: "https://i.pravatar.cc/50?img=1",
      highlight: false,
    },
    {
      id: 2,
      name: "Bob",
      bio: "Enjoys hiking",
      avatar: "https://i.pravatar.cc/50?img=2",
      highlight: false,
    },
  ]);

  // State for new profile form inputs
  const [newProfile, setNewProfile] = useState({ name: "", bio: "", avatar: "" });

  // Toggle highlight for a specific profile
  const toggleHighlight = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((p) =>
        p.id === id ? { ...p, highlight: !p.highlight } : p
      )
    );
  };

  // Add a new profile to the list
  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfile.name || !newProfile.bio) return;

    const id = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
    setProfiles([...profiles, { ...newProfile, id, highlight: false }]);
    setNewProfile({ name: "", bio: "", avatar: "" });
  };

  return (
    <div>
      <h2>Profile List</h2>

      {/* Form to add a new profile */}
      <form onSubmit={handleAddProfile} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) =>
            setNewProfile({ ...newProfile, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Bio"
          value={newProfile.bio}
          onChange={(e) =>
            setNewProfile({ ...newProfile, bio: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={newProfile.avatar}
          onChange={(e) =>
            setNewProfile({ ...newProfile, avatar: e.target.value })
          }
        />
        <button type="submit">Add Profile</button>
      </form>

      {/* Render ProfileCard for each profile */}
      <div>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile} // pass all props: name, bio, avatar, highlight
            onToggleHighlight={() => toggleHighlight(profile.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileList;