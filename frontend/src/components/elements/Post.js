import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { formatDate } from "../../date";
import Vote from "./Vote";
import { post } from "../../client";
import type PostType from "../../../state/posts";
import { EditButton, DeleteButton } from "./buttons";

type Props = {
  post: ?PostType
};

// TODO: make edit and delete buttons work
class Post extends Component {
  static props: Props;

  state = {
    deleted: false
  };

  onVote = (like: boolean) => {
    this.props.vote(this.props.post.id, like);
  };

  onEdit = () => {
    console.log("Post::onEdit");
  };

  onDelete = async () => {
    await this.props.unpublish(this.props.post.id);
    await this.setState({ deleted: true });
    console.log("Post::onDelete");
  };

  render() {
    if (this.state.deleted) return <Redirect to="/" push />;
    if (!this.props.post) return null;

    const {
      id,
      title,
      body,
      author,
      category,
      voteScore,
      timestamp,
      commentCount
    } = this.props.post;
    return (
      <div key={id}>
        <h2>{title}</h2>
        <div className="post-header">
          {author} {formatDate(timestamp)}{" "}
          <Vote votes={voteScore} onVote={this.onVote}>
            Category: {category}
          </Vote>
          <span style={{ marginLeft: 5 }}>Comments: {commentCount}</span>{" "}
          <span style={{ fontSize: 20 }}>
            <Link to={`/post/edit/${id}`}>
              <EditButton />
            </Link>{" "}
            <DeleteButton onClick={this.onDelete} />
          </span>
        </div>
        <div className="post-body">{body}</div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    vote: async (postId: string, like: boolean) => {
      dispatch(await post.vote(postId, like));
    },
    unpublish: async (postId: string) => {
      dispatch(await post.unpublish(postId));
    }
  })
)(Post);
