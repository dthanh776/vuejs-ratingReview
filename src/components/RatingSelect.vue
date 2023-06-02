<template>
    <ul class="rating">
        <li v-for="n in 5" :key="`rating-${n}`">
            <input
                type="radio"
                :id="`num${n}`"
                name="rating"
                :value="n"
                :checked="selected === n"
                v-model="selected"
            />
            <!--:checked="selected === n": Xác định xem nút radio có được chọn hay không
                 dựa trên giá trị của biến selected. Nếu selected bằng n, 
                 tức là nút radio hiện tại có giá trị tương ứng  với mức đánh giá 
                 hiện đang được chọn, thì thuộc tính checked sẽ được đặt là true.  -->
            <label :for="`num${n}`"> {{ n }} </label>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            selected: this.rating
        };
    },
    props: {
        rating: {
            type: Number
        }
    },
    watch: {
        selected(newVal) {
            this.$emit('setRating', newVal);
        },
        rating(newVal) {
            this.selected = newVal;
        }
    }
};
</script>
