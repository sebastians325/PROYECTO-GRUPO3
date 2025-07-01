const API_URL = 'http://localhost:3001/reviews';

export const ReviewService = {
    async getReviews() {
        const res = await fetch(API_URL);
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || `Error al cargar reseñas (HTTP ${res.status})`);
        }
        return await res.json();
    },

    async createReview(reviewData) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Error al crear reseña.');
        }

        return await res.json();
    }
};