export const addOrRemove = (array: number[], item: number) => {
  const exists = array.includes(item);

  if (exists) {
    return array.filter((c) => {
      return c !== item;
    });
  } else {
    const result = [...array];
    result.push(item);
    return result;
  }
};
