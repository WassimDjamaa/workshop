<template>
    <div>
        <h1>Connexion</h1>
        
        <form @submit.prevent="submit">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>

            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password" />
            </div>

            <button type="submit">Se connecter</button>

            <p>
                Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink>
            </p>
        </form>
    </div>
</template>
  
<script>
    import axios from "axios";
    export default {$,
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            submit() {
                let data = {
                    email: this.email,
                    password: this.password,
                };

                const { email, password } = data;

                axios
                    .post("http://localhost:5000/login", data)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    console.log(email, password);
            },
        },
    };

</script>

<style>
</style>