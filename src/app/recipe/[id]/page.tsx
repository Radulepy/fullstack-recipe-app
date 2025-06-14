"use client";
import { Recipe } from "@/app/types";
import { addFavorite, removeFavorite, isFavorite } from "@/store/localstorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("selectedRecipe");
        if (stored) {
            const r = JSON.parse(stored);
            setRecipe(r);
            setIsFav(isFavorite(r));
        } else {
            router.push("/");
        }
    }, [router]);

    const handleFavorite = () => {
        if (!recipe) return;
        if (isFav) {
            removeFavorite(recipe);
        } else {
            addFavorite(recipe);
        }
        setIsFav(!isFav);
    };

    if (!recipe) return null;

    //todo: divide into multiple / sepparate components (ext.)
    return (
        <div className="container py-4">
            <div className="row">
                {/* Left section: sticky on large screens as per req.*/}
                <div className="col-lg-5 mb-4 mb-lg-0">
                    <div className="position-lg-sticky" style={{ top: "40px" }}>
                        <div className="bg-light rounded d-flex align-items-center justify-content-center mb-4" style={{ width: "100%", aspectRatio: "1/1", minHeight: 280, maxWidth: 400, margin: "0 auto" }}>
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "cover" }}
                                onError={e => (e.currentTarget.style.display = "none")}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h2 className="fw-bold mb-1 d-inline">{recipe.title}</h2>
                                <span className="ms-3 align-middle">
                                    <button
                                        className="btn p-0 border-0 bg-transparent"
                                        onClick={handleFavorite}
                                        aria-label="Add to favorites"
                                        type="button"
                                    >
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill={isFav ? "#6c4ba6" : "none"} stroke="#6c4ba6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.8 4.6c-1.5-1.4-3.9-1.4-5.4 0l-.9.9-.9-.9c-1.5-1.4-3.9-1.4-5.4 0-1.6 1.5-1.6 3.9 0 5.4l6.3 6.3 6.3-6.3c1.6-1.5 1.6-3.9 0-5.4z" />
                                        </svg>
                                    </button>
                                </span>
                                <div className="text-muted mt-1">{recipe.prepTime}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right section: scrollable, stacks under on mobile as per req. */}
                <div className="col-lg-7">
                    <div>
                        <h5 className="fw-bold mb-2">Ingredients:</h5>
                        <ul className="mb-4">
                            {recipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                        <h5 className="fw-bold mb-2">Instructions:</h5>
                        <ol>
                            {recipe.instructions?.map((step, i) => <li key={i} className="mb-2">{step}</li>)}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}