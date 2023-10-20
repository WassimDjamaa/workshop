<template>
    <div>
        <h1>Inscription</h1>
        
        <form @submit.prevent="submit">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>

            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" v-model="password" />
            </div>

            <div>
                <label for="password">Confirmer le mot de passe</label>
                <input type="password" id="password" v-model="conf_password" />
            </div>

            <button type="submit">S'inscrire</button>

            {{ errors  }}

            <p>
                Déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink>
            </p>
        </form>
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

                errors: '',
            };
        },
        methods: {
            submit() {
                let data = {
                    email: this.email,
                    password: this.password,
                    conf_password: this.conf_password,
                };

                const { email, password, conf_password } = data;

                axios
                    .post("http://localhost:5000/signup", data)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                
                
            },
        },
    };

</script>