<template>
    <div class="home">
        <div class="container">
            <!-- Review Form -->
            <ReviewForm />
            <!-- Review Stats -->
            <ReviewStats />
            <!-- Review List -->
            <ReviewList />
        </div>
    </div>
</template>

<script setup>
import ReviewForm from '../components/ReviewsForm.vue';
import ReviewStats from '../components/ReviewStats.vue';
import ReviewList from '../components/ReviewList.vue';
</script>
