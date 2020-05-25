<!-- 
https://rossta.net/blog/building-a-pdf-viewer-with-vue-part-1.html
-->
<template>
  <div class="pdf-document">

    <div id = 'header'>
        <p class = 'align-left'><b> Name: {{this.name}} </b></p>
        <input class="align-right"  id='button' type="button" value="X" @click="closePdf"/>
        <!--<button class = 'align-right' @click="closePdf" id='close-button'> X </button> -->
        <div style="clear:both;"></div>
    </div>
    <div class = 'pdf-view'> 
        <PDFPage
        v-for="page in pages"
        v-bind="{page, scale}"
        :key="page.pageNumber"
        :page="page"
        />
    </div>
  </div>
</template>

<script>
import PDFPage from './PDFPage';
import range from 'lodash/range';

export default {
    components: {
        PDFPage,
    },

    props : {
        url: {
            type: String,
            required: true,
        },
        scale: {
            type: Number,
            default: 2.0,
        },
        name: {
            type: String,
            required: true,
        }
    },

    data(){
        return{
            pdf: undefined,
            pages: [],
        };
    },

    watch:{
        pdf: {
            handler(pdf) {
                this.pages = [];
                const promises = range(1, pdf.numPages + 1).map(number => pdf.getPage(number));
                return Promise.all(promises).
                then(pages => (this.pages = pages)).
                then(() => console.log('pages fetched'))
            }
        },
    },

    created(){
        this.fetchPdf();
    },

    methods:{
        fetchPdf(){
            import('pdfjs-dist/webpack')
            .then(pdfjs => pdfjs.getDocument(this.url))
            .then(pdf => (this.pdf = pdf)).then(() => console.log('pdf fetched'));
        },

        closePdf(){
            console.log('Close the pdf');
            this.$emit('click');
        }
    },

}
</script>

<style>
.pdf-document {
    width: 100%;
    height: 90%;
}

.pdf-view{
    background-color: lightblue;
    width: 100%;
    height: 90%;
    position: fixed;
    overflow: scroll;
}

#header{
    color: #000;
    background-color: lightblue;
    margin: 0;
    font-size: 15px;
    padding: 5px 0;
}

.align-left{
    margin-left: 5%;
    float: left;
}

.align-right{
    margin-right: 5%;
    float: right;
}

.pdf-page{
    margin-top: 20px;
}

#button{
    border: 2px outset black;
    background-color: lightBlue;
    height:25px;
    width:25px;
    cursor:pointer;
}

#button:hover{
    background-color:black;
    color:white;
}
</style>