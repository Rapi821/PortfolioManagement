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
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="primary"
                          />

                          <v-text-field
                            id="password"
                            label="Passwort"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="primary"
                          />
                        </v-form>
                        <h3 class="text-center font-weight-light mt-4">
                          Passwort vergessen?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <v-btn rounded color="primary" dark>SIGN IN</v-btn>
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
                        <v-btn rounded outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
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
                        <v-btn rounded outlined dark @click="step--"
                          >Sign in</v-btn
                        >
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
                          <v-layout >
                          <v-flex xs6>
                            <v-text-field
                            label="Vorname"
                            name="Vorname"
                            prepend-icon="mdi-account"
                            type="text"
                            color="primary"
                          />
                          </v-flex>
                          
                          <v-flex xs6>
                            <v-text-field
                            class="ml-1"
                            label="Nachname"
                            name="Nachname"
                           
                            type="text"
                            color="primary"
                          />
                          </v-flex>
                           </v-layout>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="mdi-email"
                            type="text"
                            color="primary"
                          />

                          <v-text-field
                            id="password"
                            label="Passwort"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            color="primary"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5 mb-12">
                        <v-btn rounded color="primary" dark>SIGN UP</v-btn>
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
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
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
