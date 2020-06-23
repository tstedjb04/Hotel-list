import { categoryReducer } from './reducers/';

export const mainReducer = ({ category }, action) => {
  return {
    category: categoryReducer(category, action),
  };
};
