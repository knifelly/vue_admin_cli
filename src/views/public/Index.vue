<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import vHead from '@components/common/Header.vue';
    import vSidebar from '@components/common/Sidebar.vue';
    import vTags from '@components/common/Tags.vue';
    export default {
        computed:{
            ...mapState(['collapse','tagsList'])
        },
        components:{
            vHead,
            vSidebar,
            vTags
        }
    }
</script>
