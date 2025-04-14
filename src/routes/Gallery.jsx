import React, { useState, useEffect } from "react";
import { supabase } from "../../client";
import Card from "../components/Card";
import "./Gallery.css";

const Gallery = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Sort by created_at in descending order (newest first)
        const { data, error } = await supabase
          .from("Users")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setMembers(data);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Failed to load squad members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="gallery-container">
      <h1>Italian Brainrot Squad</h1>

      {loading && <div className="loading">Loading squad members...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="members-grid">
        {members.length > 0
          ? members.map((member) => <Card key={member.id} member={member} />)
          : !loading && (
              <p className="no-members">
                No squad members found. Create some first!
              </p>
            )}
      </div>
    </div>
  );
};

export default Gallery;
