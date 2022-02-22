import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#b3ccff", //#
        secondary: "#47DAF3 ", //#
        accent: "E53935", //#
      },
    },
  },
});
