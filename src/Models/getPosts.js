export const getPosts = async () => {
    const res = await fetch(`https://week9-project-soc.herokuapp.com/posts`);
    const data = await res.json();
    // console.log(data);
    return data.payload;
  };