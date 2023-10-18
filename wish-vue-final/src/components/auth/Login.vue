<template>
    <div>
        <h1>Authentification</h1>

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
        </form>

        <p>
            Pas encore de compte ? <RouterLink to="/register">Créer un compte</RouterLink>
        </p>
    </div>
</template>
  
<script>
    import { ref } from 'vue';

    const email = ref('');
    const password = ref('');

</script>

<style>
</style>