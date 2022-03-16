<template>
  <div class="flex-row mx-auto  d-flex mb-6 justify-center fill-height">
    <v-content>
      <v-container class="fill-height mt-n16" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-0">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center primary--text  display-2">
                          Willkommen
                        </h1>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div> -->
                        <h4 class="text-center font-weight-light mt-4">
                          Melde dich hier an
                        </h4>
                        <v-form>
                          <v-text-field
                            data-testid="emailLogin"
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="primary"
                            v-model="email"
                          />

                          <v-text-field
                            data-testid="passwordLogin"
                            id="password"
                            label="Passwort"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="primary"
                            v-model="password"
                          />
                        </v-form>
                        <h3 class="text-center font-weight-light mt-4">
                          Passwort vergessen?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <!-- Anmelde Button um zum Dashboard MainMenu zu kommen -->
                        <v-btn
                          data-testid="btnLogin"
                          rounded
                          color="primary"
                          dark
                          @click="loginUser"
                          >SIGN IN</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class=" grad1">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Noch kein Account?
                        </h1>
                        <h5 class="text-center mt-5">
                          Erstelle dir kostenlos einen neuen Account
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <!-- Button um zum Dialog für account erstellen -->
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="grad2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Schon einen Account?
                        </h1>
                        <h5 class="text-center mt-5">
                          Melde dich auf der anderen Seite an!
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <!-- Button um zum Dialog für anmelden -->
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 primary--text ">
                          Account Erstellen
                        </h1>
                        <!-- <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div> -->
                        <h4 class="text-center font-weight-light mt-4">
                          Gib deine Daten ein und erstelle einen Account
                        </h4>
                        <v-form>
                          <v-layout>
                            <v-flex xs6>
                              <v-text-field
                                label="Vorname"
                                name="Vorname"
                                prepend-icon="mdi-account"
                                type="text"
                                color="primary"
                                v-model="firstname"
                              />
                            </v-flex>

                            <v-flex xs6>
                              <v-text-field
                                class="ml-1"
                                label="Nachname"
                                name="Nachname"
                                type="text"
                                color="primary"
                                v-model="lastname"
                              />
                            </v-flex>
                          </v-layout>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="primary"
                            v-model="email"
                          />

                          <v-text-field
                            id="password"
                            label="Passwort"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="primary"
                            v-model="password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-12">
                        <!-- Button um zum Dashboard MainMenu nach Accout erstellen -->
                        <v-btn rounded color="primary" dark @click="createAccount">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// import axios from 'axios';
import server from '@/serverInterface';
export default {
  data: () => ({
    step: 1,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  }),
  props: {
    source: String,
    user_id: String,
  },
  methods: {
    async loginUser() {
      console.log(this.email);
      let user = (
        await server.post(`http://localhost:3000/user/login`, {
          email: this.email,
          password: this.password,
        })
      ).data;
      if (user.user_id != undefined) {
        console.log('richtiges passwort');
        this.$router.replace(`/mainmenu`);
        // Router.beforeach machen
      } else {
        this.password = 'falsches Passwort';
      }
    },
    async createAccount() {
      await server.post(`http://localhost:3000/user/createNewOne`, {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
      });
      let user = (
        await server.post(`http://localhost:3000/user/login`, {
          email: this.email,
          password: this.password,
        })
      ).data;
      if (user.user_id != undefined) {
        console.log('richtiges passwort');
        this.$router.replace(`/mainmenu`);
        // Router.beforeach machen
      } else {
        this.password = 'falsches Passwort';
      }
    },
  },
};
</script>

<style scoped>
.grad1 {
  background-image: linear-gradient(to left bottom, #b3ccff, #90deff, #79edfe);
}
.grad2 {
  background-image: linear-gradient(to right bottom, #b3ccff, #90deff, #79edfe);
}
</style>
