<template>
  <canvas v-visible.once="drawPage" v-bind="canvasAttrs"></canvas>
</template>

<script>
export default {
    props : ['page', 'scale'],

        computed: {
        canvasAttrs(){
            let {width, height} = this.viewport;
            [width, height] = [width, height].map(dim => Math.ceil(dim));

            const style = this.canvasStyle;

            return {
                width,
                height,
                style,
                class : 'pdf-page',
            };
        },

        canvasStyle(){
            const {width: actualSizeWidth, height: actualSizeHeight} = this.actualSizeViewport;
            const pixelRatio = window.devicePixelRatio || 1;
            const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(dim => Math.ceil(dim / pixelRatio));
            return `width: ${pixelWidth}px; height: ${pixelHeight}px;`
        },

        actualSizeViewport(){
            return this.viewport.clone({scale: this.scale});
        },

        pageNumber(){
            return this.page.pageNumber;
        }
    },

    methods: {
        drawPage(){
            if(this.renderTask) return;
            const {viewport} = this;
            const canvasContext = this.$el.getContext('2d');
            const renderContext = {canvasContext, viewport};
            this.renderTask = this.page.render(renderContext);
            this.renderTask.then(() => this.$emit('rendered', this.page));
        },

        destroyPage(page) {
            if (!page) return;
            page._destroy();
            if (this.renderTask) this.renderTask.cancel();
        },
    },

    watch: {
        page(page, oldPage) {
            this.destroyPage(oldPage);
        },
    },

    created() {
        this.viewport = this.page.getViewport(this.scale);
    },

    mounted(){
        console.log(`Page ${this.pageNumber} mounted`);
        this.drawPage();
    },

    beforeDestroy() {
        this.destroyPage(this.page);
    },

    render(h){
        const {canvasAttrs : attrs} = this;
        return h('canvas', {attrs});
    },

    

}
</script>

<style>
.pdf-page {
  display: block;
  margin: 0 auto 0.5em;
}
</style>