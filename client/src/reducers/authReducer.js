import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //we use false because if we are logged out our payload is an empty string "" which in javascript world means false !"" means true
    default:
      return state;
  }
}
