import React, { useEffect, useState } from "react";
import "./post.css";
import "../Form/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// butter toast
import ButterToast, { Cinnamon } from "butter-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Thumbs } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";

SwiperCore.use([Thumbs]);

function PostFull(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function handleHide() {
    resetForm();
    props.onHide();
  }

  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) document.querySelector(".comments").classList.add("show");
    else document.querySelector(".comments").classList.remove("show");
  }, [show]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    setComments(props.post.comments);
    setLikes(props.post.likes);
  }, [props.post]);
  const [comment, setComment] = useState("");
  function resetForm() {
    setComment("");
  }
  function handleChange(e) {
    setComment(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (props.user.cred._id == "guest")
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="You must sign in to comment."
            scheme={Cinnamon.Crisp.SCHEME_RED}
          />
        ),
      });
    else {
      const newComment = username + " : " + comment;
      props.onComment(newComment, props.post._id);
      resetForm();
      setComments((comments) => [...comments, newComment]);
    }
  }
  function handleLike() {
    if (props.user.cred._id == "guest")
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="You must sign in to like a post."
            scheme={Cinnamon.Crisp.SCHEME_RED}
          />
        ),
      });
    else {
      props.onLike(props.post._id);
      likes.includes(props.user.cred._id)
        ? setLikes(likes.filter((userIDs) => userIDs !== props.user.cred._id))
        : setLikes((likes) => [...likes, props.user.cred._id]);
    }
  }

  const { _id, title, author, authorUID, tags, album, content } = props.post;
  const { username } = props.user.cred;
  return (
    <React.Fragment>
      <div className="appbar">
        <a href="javascript:undefined" data-text="CLOSE" onClick={handleHide}>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </a>
        {props.user.cred._id == authorUID && (
          <a 
            href="javascript:undefined" 
            data-text="EDIT" 
            onClick={() => {
              props.onEdit(_id);
            }}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </a>
        )}
        {props.user.cred._id == authorUID && (
          <a 
            href="javascript:undefined" 
            data-text="DELETE" 
            onClick={() => {
              props.onDelete(_id);
              handleHide();
            }}>
            <FontAwesomeIcon icon={["fas", "trash"]} />
          </a>
        )}
      </div>
      <div className="post header">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div id="author">
          by
          <span>{author}</span>
        </div>
        <div className="tags">
          {tags
            ?.filter((tag) => tag !== "")
            .map((tag) => (
              <span>{tag}</span>
            ))}
        </div>
      </div>
      <div className="album">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          className="albumReel"
        >
          {album?.map((pic) => (
            <SwiperSlide>
              <img src={pic}></img>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="albumThumbs"
        >
          {album?.map((pic) => (
            <SwiperSlide>
              <img src={pic}></img>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="post content">
        <div className="address"></div>
        <div className="location"></div>
        <div className="content">
          <p>{content}</p>
        </div>
      </div>
      <div className="post social">
        <div className="counts">
          <div className="count">
            <a href="javascript:undefined" onClick={handleLike}>
              {likes?.includes(props.user.cred._id) ? (
                <FontAwesomeIcon icon={["fas", "heart"]} className="active" />
              ) : (
                <FontAwesomeIcon icon={["fas", "heart"]} className="inactive" />
              )}
            </a>
            <span>{likes?.length}</span>
          </div>
          <div className="count">
            <a href="javascript:undefined" onClick={() => setShow(!show)}>
              <FontAwesomeIcon icon={["fas", "comment"]} />
            </a>
            <span>{comments?.length}</span>
          </div>
        </div>
        <div id="comment" className="wrapper">
          <div className="comments">
            {comments?.map((comment) => (
              <p>{comment}</p>
            ))}
          </div>
          <form id="commentForm" autoComplete="off" onSubmit={handleSubmit}>
            <div className="formGroup">
              <div className="formControl">
                <div className="inputBox textBox">
                  <textarea
                    value={comment}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <span className="placeholder">Leave a Comment</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
            <div className="formGroup">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PostFull;
