<template>
    <Card>
        <!-- Gọi hàm delete từ stores/review.js -->
        <button class="close" @click="store.deleteReview(item)">
            <i class="fas fa-times"></i>
        </button>
        <!-- Gọi hàm edit từ stores/review.js -->
        <button class="edit" @click="store.editReview(item)">
            <i class="fas fa-edit"></i>
        </button>
        <div class="num-display">{{ item.rating }}</div>
        <div class="text-display">
            {{ item.text }}
        </div>
    </Card>
</template>

<script setup>
import Card from '../components/Card.vue';
import { useReviewsStore } from '../stores/reviews';
import { defineProps } from 'vue';

const store = useReviewsStore();

// Truyền từ reviewList
const props = defineProps({
    item: {
        type: Object
    }
});
</script>
