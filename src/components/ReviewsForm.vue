<template>
    <Card>
        <form @submit.prevent="handleSubmit">
            <h2>How would you rate your service with us?</h2>
            <!-- Rating Component -->
            <RatingSelect :rating="rating" @setRating="setRating" />
            <div class="input-group">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Write a review"
                    v-model="text"
                />
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="btnDisabled"
                >
                    Save
                </button>
            </div>
            <div class="message">{{ message }}</div>
        </form>
    </Card>
</template>

<script setup>
import Card from '../components/Card.vue';
import RatingSelect from '../components/RatingSelect.vue';
import { ref, watch } from 'vue';
import { useReviewsStore } from '../stores/reviews';
import { storeToRefs } from 'pinia';

const store = useReviewsStore();

const text = ref('');
const btnDisabled = ref(false);
const message = ref('');
const rating = ref(5);

const setRating = (val) => {
    rating.value = val;
};
//  hàm storeToRefs để chuyển đổi đối tượng store thành một đối tượng các biến tham chiếu (ref)
const { editedContent } = storeToRefs(store);

// Hiện review muốn chỉnh sửa lên input
// Hàm watch để theo dõi sự thay đổi của biến editedContent.
watch(editedContent, (newData) => {
    if (newData.editable) {
        text.value = newData.item.text;
        rating.value = newData.item.rating;
    }
});

watch(text, (newVal) => {
    if (newVal.trim().length <= 10) {
        btnDisabled.value = true;
        message.value = 'Text must be at least 10 characters';
    } else {
        btnDisabled.value = false;
        message.value = '';
    }
});

const handleSubmit = () => {
    const newReview = {
        text: text.value,
        rating: rating.value
    };

    // Nếu editable = false
    if (!store.editedContent.editable) {
        store.addReview(newReview);
    } else {
        // Nếu editable = true
        store.updateReview({ ...newReview, id: store.editedContent.item.id });
    }
};
</script>

<style></style>
