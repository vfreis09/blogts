function setCounter(value: number) {
  if (value === undefined) {
    return (value = 1);
  } else {
    return (value = value + 1);
  }
}

export default setCounter;
