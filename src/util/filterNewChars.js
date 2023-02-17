const filterNewChars = (newArr, contextArr) => {
  let newChars = newArr.filter(
    (charArrObj) =>
      !contextArr.some((contextObj) => contextObj.id === charArrObj.id)
  );
  return newChars;
};

export default filterNewChars;
