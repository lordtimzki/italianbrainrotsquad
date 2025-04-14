import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import "./MemberDetail.css";

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data, error } = await supabase
          .from("Users")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          console.log("Member data:", data);
          console.log("Animal image URL:", data.animal);
          setMember(data);
        }
      } catch (error) {
        console.error("Error fetching member:", error);
        setError("Failed to load member details");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleImageError = (e) => {
    console.error("Image failed to load:", e);
    setImageError(true);
    e.target.src = "https://placehold.co/250x250/f3ba2f/121212?text=No+Image";
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      setIsDeleting(true);
      try {
        const { error } = await supabase.from("Users").delete().eq("id", id);

        if (error) {
          throw error;
        }

        navigate("/gallery");
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member. Please try again.");
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="member-detail-loading">Loading member details...</div>
    );
  }

  if (error) {
    return <div className="member-detail-error">{error}</div>;
  }

  if (!member) {
    return <div className="member-detail-not-found">Member not found</div>;
  }

  return (
    <div className="member-detail-container">
      <div className="member-detail-content">
        <div className="member-detail-header">
          <h1>{member.name}</h1>
          <div className="brainrot-badge">Brainrot: {member.brainrotted}%</div>
        </div>

        <div className="member-detail-body">
          <div className="image-container">
            {member.animal ? (
              <img
                src={member.animal}
                alt={`${member.name}'s spirit animal`}
                className="member-detail-image"
                onError={handleImageError}
              />
            ) : (
              <div className="placeholder-image">No image available</div>
            )}
            {imageError && (
              <div className="image-error-message">
                Image failed to load - check console for details
              </div>
            )}
          </div>

          <div className="member-detail-info">
            {member.description && (
              <div className="member-description">
                <h3>Description</h3>
                <p>{member.description}</p>
              </div>
            )}

            <div className="member-catchphrase">
              <h3>Catchphrase</h3>
              <p>"{member.catchphrase || "No catchphrase set"}"</p>
            </div>

            <div className="member-actions">
              <button className="edit-button" onClick={handleEdit}>
                Edit Member
              </button>
              <button
                className="delete-button"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Member"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
