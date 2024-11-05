import { Rating } from "@/types";
import { StartIconFill, StartIconOutline } from "@/util/Icons";

export function RatingStarsView({ rating }: { rating: Rating }) {
    return (
        <>
            {Array(5)
                .fill(0)
                .map((e, idx) => {
                    const starNumber = idx + 1;

                    if (starNumber <= rating) {
                        return (
                            <div key={starNumber}>
                                <StartIconFill />
                            </div>
                        );
                    } else {
                        return (
                            <div key={starNumber}>
                                <StartIconOutline />
                            </div>
                        );
                    }
                })}
        </>
    );
}

export function RatingStarsEditable({
    rating,
    setRating,
}: {
    rating: Rating;
    setRating: (v: Rating) => void;
}) {
    return (
        <>
            {Array(5)
                .fill(0)
                .map((e, idx) => {
                    const starNumber = (idx + 1) as Rating;

                    if (starNumber <= rating) {
                        return (
                            <div
                                key={starNumber}
                                className="cursor-pointer"
                                onClick={() => {
                                    if (starNumber === 1) {
                                        setRating(rating > 1 ? 1 : 0);
                                    } else {
                                        setRating(starNumber);
                                    }
                                }}
                            >
                                <StartIconFill />
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={starNumber}
                                className="cursor-pointer"
                                onClick={() => {
                                    setRating(starNumber);
                                }}
                            >
                                <StartIconOutline />
                            </div>
                        );
                    }
                })}
        </>
    );
}
