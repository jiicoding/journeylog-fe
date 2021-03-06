import { types } from "mobx-state-tree";
import Journey from "../models/Journey";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";

const JourneyStore = types
  .model("JourneyStore", {
    journeys: types.array(Journey),
    status: types.optional(RequestStateType, RequestState.UNINITIALIZED)
  })
  .views((self) => {
    return {
      findJourney: (slug) =>
        self.journeys.find((journey) => journey.slug === slug)
    };
  })
  .actions((self) => ({
    loadJourneys: flow(function*() {
      try {
        self.status = RequestState.LOADING;

        self.journeys = yield Api.request("journeys/");
        self.status = RequestState.LOADED;
      } catch (e) {
        self.status = RequestState.ERROR;
        console.log(e);
      }
    })
  }));

export default JourneyStore;
