<template>
    <div>
        <p v-if="!store.reviewsContent || store.reviewsContent.length === 0">
            No Reviews Yet
        </p>
        <div class="reviewList">
            <ReviewItem
                v-for="item in store.reviewsContent"
                :key="item"
                :item="item"
            />
        </div>
    </div>
</template>

<script setup>
import ReviewItem from './ReviewItem.vue';
import { useReviewsStore } from '../stores/reviews';

const store = useReviewsStore();
</script>
