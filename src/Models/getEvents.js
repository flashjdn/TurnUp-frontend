export const getEvents = async () => {
  const res = await fetch(`https://turnupdb.herokuapp.com/events/all`);
  const data = await res.json();
  // console.log(data);
  return data.payload;
};