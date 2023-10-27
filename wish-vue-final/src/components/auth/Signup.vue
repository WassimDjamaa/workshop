<template>
    <div class="signup-container">
        <h1 class="signup-title">Inscription</h1>

        <form class="signup-form" @submit.prevent="submit">
            <div>
                <label for="email">Email :</label>
                <input type="email" id="email" v-model="email" />
            </div>

            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="password" />
            </div>

            <div>
                <label for="conf_password">Confirmer le mot de passe :</label>
                <input type="password" id="conf_password" v-model="conf_password" />
            </div>

            <button type="submit">S'inscrire</button>

            <p class="login-link">
                Déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink>
            </p>
        </form>
        <p class="error-message">{{ errors }}</p>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Signup",
        data() {
            return {
                email: "",
                password: "",
                conf_password: "",
                errors: "",
            };
        },
        methods: {
            submit() {

                // Réinitialisez les erreurs à chaque soumission.
                this.errors = [];

                switch (true) {
                    case !this.email:
                        this.errors.push("Le champ Email est requis.");
                        break;
                    case !this.password:
                        this.errors.push("Le champ Mot de passe est requis.");
                        break;
                    case this.password.length < 6:
                        this.errors.push("Le mot de passe doit contenir au moins 6 caractères.");
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
                    conf_password: this.conf_password,
                };

                axios
                .post("http://localhost:5000/signup", data)
                .then((response) => {
                    if (response.status === 200) {
                        this.$router.push({ name: 'login' });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
                },
            },
        };
</script>