export const getComments = async (post_id) => {
    const res = await fetch(`https://week9-project-soc.herokuapp.com/comments`);
    const data = await res.json();
    //   console.log(data);
  
    return data.payload.filter((comment) => comment.post_id === post_id);
  };   