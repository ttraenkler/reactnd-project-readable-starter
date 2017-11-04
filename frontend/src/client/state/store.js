import { createStore, combineReducers } from "redux";
import { reducer as posts } from "./posts";
import { reducer as comments } from "./comments";
import { reducer as categories } from "./categories";

export default createStore(
  combineReducers({
    posts,
    comments,
    categories
  })
);