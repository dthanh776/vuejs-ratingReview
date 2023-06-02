<template>
    <!-- <RouterView /> -->
    <div>
        <Header />
        <router-view></router-view>
    </div>
</template>

<script setup>
import Header from './components/Header.vue';
import { useReviewsStore } from './stores/reviews';
import { onMounted } from 'vue';

const store = useReviewsStore();

onMounted(() => {
    store.getReview();
});
</script>
