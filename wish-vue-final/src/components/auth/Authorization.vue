<template>
    <div>
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        user: null
      };
    },
  
    methods: {
      login() {
        this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
      }
    },
  };
  </script>