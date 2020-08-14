<template>
  <v-app>
    <v-card width="600" class="mx-auto mt-5 mb-5 pa-5" elevation="20">
      <v-card-title>
        <h1 class="display-1">
          User profile
        </h1>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account-circle"
          :value="$auth.user.username"
        />
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          :value="$auth.user.email"
        />
      </v-card-text>
      <v-img
        :src="$auth.user.picture"
        height="200"
        max-height="200"
        contain
        alt="User photo"
        class="mb-10"
      ></v-img>
      <v-card-actions>
        <v-btn class="mx-auto" color="error" @click="$auth.logout()">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'Profile',
  middleware: ['auth'],
};
</script>
