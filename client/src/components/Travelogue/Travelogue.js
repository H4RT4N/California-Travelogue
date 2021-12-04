import React, { useState, useEffect } from "react";

import "./travelogue.css";
import "../Form/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostForm from "../Form/PostForm";
import PostCard from "../Post/PostCard";
import PostFull from "../Post/PostFull";
// butter toast
import ButterToast, { Cinnamon } from "butter-toast";
import { CSSTransitionGroup } from "react-transition-group";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
//redux
import { connect } from "react-redux";
import {
  fetchPost,
  fetchPosts,
  likePost,
  commentPost,
  deletePost,
} from "../../actions/postActions";
import { logout } from "../../actions/authActions";

const guest = {
  cred: {
    username: "guest",
    _id: "guest",
  },
};

function Travelogue(props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState({query: "", category: "All"});
  // edgecase: user clicks on same category again
  const [check, setCheck] = useState(false);
  const [page, setPage] = useState(1);
  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleCategory(str) {
    setCategory(str);
    setCheck(!check);
  }
  // category selection
  useEffect(() => { hideOverlay() }, [check]);
  // should only fire when the search bar is used
  function handleSearch() {setSearch({ query: query, category: category})}
  //search
  useEffect(() => {
    if (page == 1) 
      props.fetchPosts(page, search.category, search.query);
    else 
      setPage(1);
  }, [search]);
  // paginate
  useEffect(() => {
    props.fetchPosts(page, search.category, search.query);
  }, [page]);
  // componentDidMount
  useEffect(() => {
    props.fetchPosts(page, category, query);
  }, []);
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // when redirected
  useEffect(() => {
    // check for expired token
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  // logout
  const handleLogout = () => {
    props.logout(history);
    setUser(null);
    window.location.reload();
  };
  const [options, setOptions] = useState({});
  function toggleOptions() {
    options.enabled ? setOptions({}) : setOptions({enabled:true});
  }

  // show overlays
  const [show, setShow] = useState("");
  function showOverlay(str) {
    // disable background scroll
    if (str == "form" || str == "post")
      document.querySelector("body").classList.add("noScroll");
    setShow(str);
  }
  function hideOverlay() {
    document.querySelector("body").classList.remove("noScroll");
    setShow("");
  }
  // select post
  const [selected, setSelected] = useState("");
  // currently selected post
  function selectPost(id) {
    setSelected(id);
    showOverlay("post");
  }
  function unselectPost() {
    setSelected("");
    setEditPostID(0);
    hideOverlay();
  }
  useEffect(() => {
    props.fetchPost(selected);
  }, [selected]);
  function handleLike(postID) {
    if (user) props.likePost(postID);
    else
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="You must sign in to like a post."
            scheme={Cinnamon.Crisp.SCHEME_RED}
          />
        ),
      });
  }
  function handleComment(comment, postID) {
    props.commentPost(postID, { value: comment });
  }
  // edit post mode
  const [editPostID, setEditPostID] = useState(0);
  function handleEdit(postID) {
    setEditPostID(postID);
    setSelected(postID);
    showOverlay("form");

  }
  function handleDelete(postID) {
    const onSuccess = () => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Deleted!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
          />
        ),
      });
    };
    props.deletePost(postID, onSuccess);
  }

  return (
    <section id="travelogue">
      <div className="appbar">
        <a
          href="javascript:undefined"
          data-text="FEED"
          onClick={() => {
            setSearch({ query: "", category: "All"})
          }}
        >
          <FontAwesomeIcon icon={["fas", "poll-h"]} />
        </a>
        {user ? <a 
          href="javascript:undefined" 
          data-text="PROFILE" 
          onClick={toggleOptions}
        >
          <FontAwesomeIcon icon={["fas", "users-cog"]} />
        </a> :
        <a href="/auth#auth" data-text="SIGN IN">
        <FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
      </a>
        }
        <a
          href="javascript:undefined"
          data-text="POST"
          onClick={() => showOverlay("form")}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </a>
      </div>
      <CSSTransitionGroup
        className={`appbar options ${options.enabled && 'enabled'}`}
        transitionName="btn"
        transitionLeaveTimeout={500}
      >
        {options.enabled && 
          <a 
            href="javascript:undefined" 
            data-text="MY POSTS"
            onClick={() => {
              setSearch({ query: user.cred.username, category: "Author"})
            }}
          >
            <FontAwesomeIcon icon={["fas", "comment-alt"]} />
          </a>
        }
        {options.enabled && 
          <a 
            href="javascript:undefined" 
            data-text="SIGN OUT"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
          </a>
        }
        {options.enabled && 
          <a 
            href="javascript:undefined" 
            data-text="LIKED"
            onClick={() => {
              setSearch({ query: user.cred._id, category: "MyLikes"})
            }}
          >
            <FontAwesomeIcon style={{color: "red"}} icon={["fas", "heart"]} />
          </a>
        }
      </CSSTransitionGroup>
      <div id="searchbar" className={`wrapper ${options.enabled && 'optionsEnabled'}`}>
        <form
          id="searchForm"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="formGroup">
            <div className="formControl">
              <div className="inputBox">
                <input
                  type="text"
                  name="query"
                  onChange={handleChange}
                  value={query}
                />
                <span className="placeholder">Search</span>
                <span className="line"></span>
              </div>
            </div>
          </div>
        </form>
        <div className="dropdown" onClick={() => showOverlay("category")}>
          <span className={show == "category" ? "show" : ""}>{category}</span>
          <div className={`content ${show == "category" ? "show" : ""}`}>
            <span onClick={() => handleCategory("All")}>All</span>
            <span onClick={() => handleCategory("Title")}>Title</span>
            <span onClick={() => handleCategory("Author")}>Author</span>
            <span onClick={() => handleCategory("Tag")}>Tag</span>
          </div>
        </div>
        <a href="javascript:undefined" onClick={handleSearch}>
          <FontAwesomeIcon icon={["fas", "search"]} />
        </a>
      </div>
      <div className={`pagination ${options.enabled && 'optionsEnabled'}`}>
        <button
          href="javascript:undefined"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="btn paginate"
        >
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </button>
        <button
          href="javascript:undefined"
          onClick={() => setPage(page + 1)}
          disabled={props.posts.length < 6}
          className="btn paginate"
        >
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </button>
      </div>
      <div className={`postContainer ${options.enabled && 'optionsEnabled'}`}>
        {props.posts.length > 0 ? (
          props.posts.map((post) => (
            <PostCard
              post={post}
              userID={user?.cred._id}
              onSelect={selectPost}
              onLike={handleLike}
            />
          ))
        ) : (
          <h1
            style={{
              color: "white",
              fontSize: "5em",
            }}
          >
            Nothing Here!
          </h1>
        )}
      </div>
      <section
        id="formOverlay"
        className={`overlay ${show == "form" ? "show" : ""}`}
      >
        <PostForm 
          onHide={unselectPost} 
          author={user ? user : guest} 
          postID={editPostID}
          post={editPostID == props.post._id && props.post} />
      </section>
      <section
        id="fullOverlay"
        className={`overlay ${show == "post" ? "show" : ""}`}
      >
        <PostFull
          onHide={unselectPost}
          post={props.post}
          onComment={handleComment}
          onLike={handleLike}
          onEdit={handleEdit}
          onDelete={handleDelete}
          user={user ? user : guest}
        />
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
  post: state.postReducer.post,
  authData: state.authReducer.authData,
});

export default connect(mapStateToProps, {
  fetchPost,
  fetchPosts,
  likePost,
  commentPost,
  logout,
  deletePost,
})(Travelogue);
