import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#008bcc", //#
        secondary: "#005780", //#
        accent: "E53935", //#
      },
    },
  },
});
