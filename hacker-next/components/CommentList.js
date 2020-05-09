import Comment from "./Comment";

export default ({ comments }) => {
  return (
    <React.Fragment>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </React.Fragment>
  );
};
