<template>
  <div>
    <h2>Welcome to vue-shop , {{username}} !</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.getName()
  },
  methods: {
    getName() {
      this.username = window.sessionStorage.getItem('username')
    }
  }
}
</script>