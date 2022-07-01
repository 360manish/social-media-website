import React from "react";

export default function Comment({username,comment}) {
  return (
    <div className="comment">
        <p>
          <span style={{ fontWeight: "500", margin: "6px" }}>{username}</span>
          {comment}
        </p>
    </div>
  );
}
