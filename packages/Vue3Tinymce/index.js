import Vue3Tinymce from './src/main.vue';

Vue3Tinymce.install = function (app) {
  app.component('Vue3Tinymce', Vue3Tinymce);
};

export default Vue3Tinymce;
