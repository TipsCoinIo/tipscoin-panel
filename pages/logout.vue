<template>
  <div></div>
</template>

<script>
export default {
  name: 'LogoutPage',
  layout: 'login',
  auth: false,
  created() {
    this.$auth.logout().finally(() => {
      this.$router.push({ name: 'login' })
    })
  },
}
</script>
