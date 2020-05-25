<template>
  <div id="app">
    <h1 id = 'title'>Pdf Viewer</h1>
    <div
    v-if="showBrowser"
     id = 'tree'>
      <TreeBrowser 
        id = 'tree-browser'
        :node="files"
        @onClick="nodeWasClicked"
      />
    </div>
    <div id = 'pdf-view'>
      <PdfDocument
      @click='removeComponent'
      v-if="showPdf"
      v-bind="{url, scale, name}"
      
      />
    </div>
    <div id='footer-div'>
      <p id = 'footer'>
        Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        <br>Icons made by <a href="https://www.flaticon.com/authors/dimitry-miroliubov" title="Dimitry Miroliubov">Dimitry Miroliubov</a> from<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </p>
    </div>
  </div>
</template>

<script>
import TreeBrowser from './components/TreeBrowser.vue'
import PdfDocument from './components/PdfDocument.vue'
import AxiosPlugin from 'vue-axios-cors'
import Vue from 'vue'
Vue.use(AxiosPlugin)

export default {
  name: 'App',
  props : {
    pdfUrl : String,
  },
  data(){
    return{
      files : {},
      url: '',
      scale: 2.5,
      showPdf: false,
      showBrowser: true
    }
  },
  mounted(){
    this.fetchDirectory();
  },
  methods:{
    nodeWasClicked(node){
      this.url = 'http://localhost:3000/pdf?pdfLink=' + node.name;
      this.name = node.name;
      this.showPdf = true;
      this.showBrowser = false;
      console.log(node.path);
      console.log('URL: ' + this.url);
      console.log('SHowPDF: ' + this.showPdf);

    },

    fetchDirectory: function () {
      const baseURI = 'http://localhost:3000/files'
      this.$http.get(baseURI)
      .then((result) => {
        console.log(result.data)
        this.files = result.data
      })
    },
    
    removeComponent: function(){
      console.log('Component was removed');
      this.showPdf = false;
      this.showBrowser = true;
    }
  },
  components: {
    TreeBrowser,
    PdfDocument
  }
}
</script>

<style>

#footer-div{
  margin-top: 30px;
  background-color: #D3F8FB;
}

#footer{
  padding-top: 10px;
  padding-bottom: 10px;
  text-align:center;
  font-size: 10px;
}

#tree-browser{
  margin-left: 30px;
}

#title{
  text-align: center;
  background-color: lightblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
