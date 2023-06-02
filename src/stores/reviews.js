import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useReviewsStore = defineStore('reviews', {
    state: () => ({
        reviews: JSON.parse(localStorage.getItem('reviews')) || [],
        editedData: {
            editable: false,
            item: null
        }
    }),
    actions: {
        async addReview(reviews) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/reviews/',
                    reviews
                );
                const newReview = await response.data;
                //  Thêm đánh giá mới vào đầu danh sách đánh giá hiện tại bằng cách sử dụng
                this.reviews = [newReview, ...this.reviews];
                localStorage.setItem('reviews', JSON.stringify(this.reviews));
            } catch (error) {
                console.log(error);
            }
        },

        async getReview() {
            try {
                const response = await axios.get(
                    'http://localhost:3000/reviews?_sort=id&_order=desc'
                );
                const data = await response.data;
                this.reviews = data;
            } catch (error) {
                console.log(error);
            }
        },
        editReview(review) {
            // editable được đặt thành true, để chỉ định rằng đang có dữ liệu được chỉnh sửa.
            // item được đặt thành review, để lưu trữ dữ liệu của đánh giá đang được chỉnh sửa.
            let editedData = {
                editable: true,
                item: review
            };
            //  gán giá trị của đối tượng editedData mới vào this.editedData
            this.editedData = editedData;
        },
        async updateReview(review) {
            try {
                const response = await axios.put(
                    `http://localhost:3000/reviews/${review.id}`
                );
                const update = await response.data;
                let reviews = this.reviews.map((item) => {
                    //  Nếu === tạo một đối tượng mới bằng cách kết hợp item và update
                    // sử dụng cú pháp { ...item, ...update }
                    return item.id === review.id
                        ? { ...item, ...update }
                        : item;
                });
                // Cập nhật danh sách đánh giá.
                this.reviews = reviews;
                // Lấy lại danh sách đánh giá sau khi đã cập nhật.
                this.getReview();
                let editedData = {
                    editable: false,
                    item: null
                };
                this.editedData = editedData;
            } catch (error) {}
        },
        async deleteReview(review) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/reviews/${review.id}`,
                    review
                );
                this.reviews = this.reviews.filter(
                    (rev) => rev.id !== review.id
                );
                this.getReview();
            } catch (error) {}
        }
    },
    getters: {
        // Tính trung bình rating
        averageRating(state) {
            let temp =
                state.reviews.reduce((acc, cur) => {
                    // trong reviews co rating
                    return acc + cur.rating;
                }, 0) / state.reviews.length;
            temp = temp.toFixed(1).replace(/[.,]0$/, ''); //để loại bỏ số 0 không cần thiết sau chữ số thập phân
            return temp;
        },
        // Độ dài mảng reviews
        reviewsCount() {
            return this.reviews.length;
        },
        // Lấy data reviews
        reviewsContent() {
            return this.reviews;
        },
        editedContent() {
            return this.editedData;
        }
    }
});
