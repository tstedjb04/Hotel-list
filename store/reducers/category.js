const category = (state, { type, data }) => {
  switch (type) {
    case 'setCategoryData':
      return {
        ...state,
        data,
      };

    default:
      return state;
  }
};

export default category;
