<template>
  <v-app>
    <v-card width="400" class="pa-5 mx-auto mt-5 mb-5" elevation="20">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-card-text>
          <v-text-field
            v-model="username"
            :counter="10"
            :rules="nameRules"
            label="Username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="password"
            :counter="15"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" class="mx-auto" :disabled="!valid" color="info">
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import { isEmpty, isValidUsername, isValidPassword } from '~/utils/validators';
import { validatorFactory } from '~/utils/validatorFactory';

export default {
  middleware: ['noAuth'],
  data() {
    return {
      showPassword: false,
      valid: true,
      username: '',
      nameRules: [
        validatorFactory(isEmpty, 'Username is required'),
        validatorFactory(isValidUsername),
      ],
      password: '',
      passwordRules: [
        validatorFactory(isEmpty, 'Password is required'),
        validatorFactory(isValidPassword),
      ],
    };
  },
  methods: {
    login() {
      this.error = null;

      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          this.error = e.response.data;
        });
    },
  },
};
</script>
