<template>
    <div class="boolflix-loader">
        <span id="typing" ref="typing"></span>
    </div>
</template>


<script>
import state from '../store.js';

export default {
  name: "IntroComponent",
  data() {
    return {
      boolflixText: "BOOLFLIX",
      i: 0,
    };
  },
  methods: {
    typeWriter() {
      if (this.i < this.boolflixText.length) {
        this.$refs.typing.innerHTML += this.boolflixText.charAt(this.i);
        this.i++;
        setTimeout(this.typeWriter, 800);
      }else {
        setTimeout(() => {
          this.$refs.typing.classList.add('fade-out');
          state.loading = false;
        }, 1000);
      }
    }
  },
  mounted() {
    this.typeWriter();
  }
}

</script>

<style lang="scss">
  .boolflix-loader {
    background-color: black;
    height: 100vh;
    width: 100%;
    color: red;
    font-family: monospace;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-size: 1000%;
    }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    100% { opacity: 0; }
  }

  #typing::after {
    content: "|";
    animation: blink 0.7s infinite;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 1s ease-in;
  }


</style>