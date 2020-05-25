<!--
https://www.youtube.com/watch?v=VdSf6SFPiFg&t=1160s
-->
<template>
  <div>
      <div 
      @click="nodeClicked"
      :style="{'margin-left' : `${depth*30}px`}"
      class = "node">
        <span 
        v-if="hasChildren"
        class="type">
            <img v-if="expanded" src="@/assets/expanded.png"/>
            <img v-else src="@/assets/show-details.png" />
        </span>
        <span v-else><img src="@/assets/pdf.png"/></span>
        <span id='folder-name'>{{node.name}} </span>
      </div>
      <div v-if="expanded">
      <TreeBrowser
      v-for="child in node.children"
      :key="child.name"
      :node="child"
      :depth="depth + 1"
      @onClick="(node) => $emit('onClick', node)"
      />
      </div>
  </div>
</template>

<script>
export default {
    name: 'TreeBrowser',
    props: {
        node: Object,
        depth:{
            type: Number,
            default: 0
        }
    },
    data(){
        return{
            expanded: false,
        }
    },
    methods:{
        nodeClicked(){
            this.expanded = !this.expanded;
            if(!this.hasChildren){
                this.$emit('onClick',this.node);
            }
        }
    },
    computed: {
        hasChildren(){
            return this.node.children;
        }
    }
}
</script>

<style scoped>

.node{
    padding-top: 10px;
    padding-bottom: 10px;
}

img{
    width: 20px;
    height: 20px;
}

#folder-name{
    margin-left: 5px;
    font-size: 15px;
}
</style>