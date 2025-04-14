import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import "./EditMember.css";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [brainrotValue, setBrainrotValue] = useState(50);
  const [catchphrase, setCatchphrase] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
          setMember(data);
          setBrainrotValue(data.brainrotted);
          setCatchphrase(data.catchphrase || "");
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
    setImageError(true);
    e.target.src = "https://placehold.co/250x250/f3ba2f/121212?text=No+Image";
  };

  const handleBrainrotChange = (e) => {
    setBrainrotValue(e.target.value);
  };

  const handleCatchphraseChange = (e) => {
    setCatchphrase(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("Users")
        .update({
          brainrotted: brainrotValue,
          catchphrase: catchphrase,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      alert("Member updated successfully!");
      navigate(`/member/${id}`);
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="edit-member-loading">Loading member details...</div>;
  }

  if (error) {
    return <div className="edit-member-error">{error}</div>;
  }

  if (!member) {
    return <div className="edit-member-not-found">Member not found</div>;
  }

  return (
    <div className="edit-member-container">
      <div className="edit-member-content">
        <h1>Edit {member.name}</h1>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-member-image">
            {member.animal && (
              <img
                src={member.animal}
                alt={`${member.name}'s spirit animal`}
                className="member-image"
                onError={handleImageError}
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="brainrot">Brainrot: {brainrotValue}%</label>
            <input
              type="range"
              id="brainrot"
              min="0"
              max="100"
              value={brainrotValue}
              onChange={handleBrainrotChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="catchphrase">Catchphrase:</label>
            <input
              type="text"
              id="catchphrase"
              value={catchphrase}
              onChange={handleCatchphraseChange}
              placeholder="Enter a catchphrase"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate(`/member/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="save-button" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
