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
        </form>

        <p>
            Déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink>
        </p>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const email = ref('');
    const password = ref('');
    const conf_password = ref('');

    const router = useRouter();

    const register = async () => {
        if (!email.value || !password.value || !conf_password.value) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        if (password.value !== conf_password.value) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((res) => res.json());

        if (response.success) {
            localStorage.setItem('token', response.token);
            router.push('/');
        } else {
            alert(response.message);
        }
    }


</script>