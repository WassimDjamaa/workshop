<template>
    <div class="login-container">
      <h1 class="login-title">Connexion</h1>
      <form class="login-form" @submit.prevent="submit">
        <div>
          <label for="email">Email : </label>
          <input type="email" id="email" v-model="email" />
        </div>
              
        <div>
          <label for="password">Mot de passe : </label>
          <input type="password" id="password" v-model="password" />
        </div>
  
        <button type="submit">Se connecter</button>

        <p class="login-footer">
          Pas encore de compte ? <RouterLink to="/signup">S'inscrire</RouterLink>
        </p>

        <p class="error-message">{{ errors }}</p>
      </form>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  methods: {
    submit() {
      // Clear any previous error message
      this.errors = "";

      const validateInput = () => {
        return new Promise((resolve, reject) => {
          if (!this.email) {
            this.errors = "Le champ email est requis.";
          } else if (!this.password) {
            this.errors = "Le champ mot de passe est requis.";
          } else {
            resolve();
          }
        });
      };

      validateInput()
        .then(() => {
          const data = {
            email: this.email,
            password: this.password,
          };

          return axios.post("http://localhost:5000/login", data);
        })
        .then((response) => {
            if(response.data.error === 'Informations d\'identification non valides') {
              this.errors = "Mot de passe ou email incorrect";
            }

            if (response.status === 200) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.userId));
              this.$router.push({ name: 'home' });
            }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>


<style>
</style>