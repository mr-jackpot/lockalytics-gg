// Helper function to determine style based on rating
const getRatingStyle = (rating) => {
    if (rating < 0.8) {
        return { color: "darkred", fontWeight: "normal" };
    } else if (rating < 1.0) {
        return { color: "lightcoral", fontWeight: "normal" };
    } else if (rating < 1.2) {
        return { color: "lightgreen", fontWeight: "normal" };
    } else {
        return { color: "green", fontWeight: "bold" };
    }
};

// Example usage in your JSX component:
export const RatingDisplay = ({ rating }) => {
    return (
        <h3 style={getRatingStyle(rating)}>
            Rating: {rating.toFixed(2)}
        </h3>
    );
}
