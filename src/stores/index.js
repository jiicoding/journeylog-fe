import { types } from "mobx-state-tree";
import JourneyStore from "./JourneyStore";
import TagStore from "./TagStore";
import MapLocationStore from "./MapLocationStore";
import RequestState from "./util/RequestState";
import PhotoModalStore from "./PhotoModalStore";
import AboutModalStore from "./AboutModalStore";
import PhotoStore from "./PhotoStore";

const RootStore = types
  .model("RootStore", {
    journeyStore: types.optional(JourneyStore, {}),
    tagStore: types.optional(TagStore, {}),
    mapLocationStore: types.optional(MapLocationStore, {}),
    photoModalStore: types.optional(PhotoModalStore, {}),
    photoStore: types.optional(PhotoStore, {}),
    aboutModalStore: types.optional(AboutModalStore, {})
  })
  .actions((self) => ({
    bootstrap: function() {
      self.tagStore.loadTags();
      self.journeyStore.loadJourneys();
    }
  }))
  .views((self) => ({
    get isLoaded() {
      return [self.journeyStore.status, self.tagStore.status].every(
        (status) => status === RequestState.LOADED
      );
    },
    get hasErrors() {
      return [self.journeyStore.status, self.tagStore.status].some(
        (status) => status === RequestState.ERROR
      );
    }
  }));

export default RootStore;
