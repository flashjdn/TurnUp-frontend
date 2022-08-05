export const getEvents = async () => {
  const res = await fetch(``);
  const data = await res.json();
  // console.log(data);
  return data.payload;
};