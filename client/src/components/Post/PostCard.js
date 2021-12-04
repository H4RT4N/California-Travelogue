import React from "react";
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard(props) {
  const { title, author, album, tags, likes, _id, comments } = props.post;
  return (
    <div className="card">
      <div className="cover" onClick={() => props.onSelect(_id)}>
        <img src={album[0]}></img>
      </div>
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="info">
        <div id="author">
          by
          <span>{author}</span>
        </div>
        <div className="tags">
          {tags?.filter(tag => tag !== "").map(tag => (
            <span>{tag}</span>
          ))}
        </div>
        <div className="social">
          <div>
            <a href="javascript:undefined" onClick={() => props.onLike(_id)}>
              {likes.includes(props.userID) ? (
                <FontAwesomeIcon icon={["fas", "heart"]} className="active" />
              ) : (
                <FontAwesomeIcon icon={["fas", "heart"]} className="inactive"/>
              )}
            </a>
            <span>{likes.length}</span>
          </div>
          <div>
            <a href="javascript:undefined">
              <FontAwesomeIcon icon={["fas", "comment"]} />
            </a>
            <span>{comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
