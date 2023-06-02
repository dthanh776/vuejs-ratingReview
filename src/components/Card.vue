<template>
    <div class="card" :class="{ reverse: reverse }">
        <!-- reviewItem sử dụng slot -->
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        reverse: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>
.card {
    background: #fff;
}

.card.reverse {
    background: #212121;
    color: #fff;
}
</style>
