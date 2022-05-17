import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#99bbff", //#
        secondary: "#008bcc", //#
        accent: "E53935", //#
      },
    },
  },
});
