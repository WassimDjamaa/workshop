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

                switch (true) {
                    case !this.email:
                        this.errors = "Le champ Email est requis.";
                        break;
                    case !this.password:
                        this.errors = "Le mot de passe est incorrect.";
                        break;
                    default:
                        break;
                }

                if (this.errors.length > 0) {
                    return;
                }

                let data = {
                    email: this.email,
                    password: this.password,
                };

                axios
                    .post("http://localhost:5000/login", data)
                    .then((response) => {
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