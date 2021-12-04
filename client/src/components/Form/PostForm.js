import React, { useState, useEffect } from "react";

import "./form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileBase from "react-file-base64";
import { connect } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";
// butter toast
import ButterToast, { Cinnamon } from "butter-toast";

const initialValues = {
  title: "",
  tags: [],
  content: "",
};

function PostForm(props) {
  // form values
  const [values, setValues] = useState(initialValues);
  // edit form mode
  useEffect(() => {
    // populate form
    if (props.postID != 0) {
      setValues({
        ...props.post
      });
    }
  }, [props.postID]);
  // images
  const [files, setFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  let fileArea = [];
  for (let i = 0; i < fileCount; i++) {
    fileArea.push(
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => handleFiles(base64)}
      />
    );
  }
  function handleFiles(base64) { setFiles([...files, base64]); }
  function removeFiles() {
    //setFiles(files.filter(f => f.indexOf() != fileCount - 1)); 
    //fileArea.splice(fileCount - 1, 1);
    //setFileCount(fileCount - 1);
    setFiles([]);
    setFileCount(0);
  }
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }
  function handleTagsChange(e) {
    setValues({
      ...values,
      tags: e.target.value.split(",")
    });
  }
  function resetForm() {
    setValues(initialValues);
    setFiles([]);
    setFileCount(0);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if(_id == 'guest')
      ButterToast.raise({content: (<Cinnamon.Crisp title="You must sign in to post." scheme={Cinnamon.Crisp.SCHEME_RED}/>)});
    else if(files.length < 1)
      ButterToast.raise({content: (<Cinnamon.Crisp title="Please include at least 1 picture." scheme={Cinnamon.Crisp.SCHEME_RED}/>)});
    else {
      // authorUID inserted server-side
      const newPost = {
        title: values.title,
        author: username,
        album: files,
        tags: values.tags,
        content: values.content,
      };
      // check if not edit mode
      if(props.postID == 0)
        props.createPost(newPost, () => {
          ButterToast.raise({content: (<Cinnamon.Crisp title="Posted!" scheme={Cinnamon.Crisp.SCHEME_GREEN}/>)});
        });
      // edit mode
      else
        props.updatePost(props.postID, newPost, () => {
          ButterToast.raise({content: (<Cinnamon.Crisp title="Change Submitted!" scheme={Cinnamon.Crisp.SCHEME_GREEN}/>)});
        });
      resetForm();
      props.onHide();
    }
  }

  
  const {username, _id} = props.author.cred;
  return (
    <React.Fragment>
      <div className="appbar">
        <a
          href="javascript:undefined"
          data-text="CLOSE"
          onClick={() => {
              resetForm();
              props.onHide();
            }
          }
        >
          <FontAwesomeIcon icon={["fas", "times"]} />
        </a>
      </div>
      <form id="postForm" autoComplete="off" onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="formControl">
            <div className="inputBox">
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
                required
              />
              <span className="placeholder">Title</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <div className="formControl">
            <div className="inputBox">
              <input
                type="text"
                name="tags"
                onChange={handleTagsChange}
                value={values.tags}
              />
              <span className="placeholder">Tags</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <div className="formControl">
            <div className="inputBox textBox">
              <textarea
                name="content"
                onChange={handleChange}
                value={values.content}
                required
              ></textarea>
              <span className="placeholder">Content</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        <div className="fileUpload">
          <div className="fileCtrl">
            <a href="javascript:undefined" onClick={() => setFileCount(fileCount + 1)}>
              Add Picture(s)
            </a>
            <a href="javascript:undefined" onClick={() => removeFiles()}>
              Reset Pictures
            </a>
          </div>
          {fileArea}
          <small>1st picture will be the thumbnail</small>
          <small>total size limit: 10MB</small>
        </div>
        <div className="formGroup">
          <button type="submit">Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  posts: state.postReducer.posts,
});

export default connect(mapStateToProps, { createPost, updatePost })(PostForm);
