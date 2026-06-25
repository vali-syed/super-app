"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useCategoryStore from "@/store/useCategoryStore";
import { singleDay } from "../layout";

const tmdbGenreMap = {
  Action: 28,
  Thriller: 53,
  Horror: 27,
  Drama: 18,
  Romance: 10749,
  Fantasy: 14,
  Fiction: 878,
  Music: 10402,
  Western: 37,
};

export default function MoviesPage() {
  const categories = useCategoryStore((state) => state.categories);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedCategories = useMemo(
    () => (categories || []).filter((category) => Boolean(tmdbGenreMap[category])),
    [categories]
  );

  useEffect(() => {
    if (selectedCategories.length === 0) {
      return;
    }

    const controller = new AbortController();
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    async function fetchMovies() {
      if (!apiKey) {
        setError("TMDB API key not configured.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const responses = await Promise.all(
          selectedCategories.map(async (category) => {
            const genreId = tmdbGenreMap[category];
            const response = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-01-01&with_genres=${genreId}`,
              { signal: controller.signal }
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch ${category} movies`);
            }

            const data = await response.json();
            const movies = Array.isArray(data.results)
              ? data.results
                  .filter((movie) => movie.poster_path)
                  .slice(0, 4)
              : [];
            return { category, movies };
          })
        );

        setMoviesByCategory(
          responses.reduce((acc, item) => {
            acc[item.category] = item.movies;
            return acc;
          }, {})
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Unable to load movies.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [selectedCategories]);

  return (
    <main className="min-h-screen bg-[#030303] px-6 py-8 text-white lg:px-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className={`${singleDay.className} text-[32px] font-normal text-[#72DB73]`}>
            Super app
          </h1>
          <p className="max-w-2xl text-[18px] text-[#E7E7E7]">
            Entertainment according to your choice
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-lg shadow-black/30">
          <Image
            src="/Images/mini-profile-image.png"
            alt="Mini profile"
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        </div>
      </header>

      {loading && (
        <div className="mt-10 text-[15px] text-[#C7C7C7]">Loading movies...</div>
      )}

      {error && (
        <div className="mt-10 rounded-[16px] border border-red-500 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {selectedCategories.length === 0 ? (
        <div className="mt-10 text-[16px] text-[#A3A3A3]">
          No categories selected. Please choose your favorite categories first.
        </div>
      ) : (
        <section className="mt-10 space-y-10">
          {selectedCategories.map((category) => {
            const movies = moviesByCategory[category] || [];
            if (movies.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="text-[18px] font-semibold text-[#D7D7D7]">
                  {category}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="min-w-[240px] max-w-[240px] overflow-hidden rounded-[20px] bg-[#111111] shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
                    >
                      <div className="relative h-[140px] w-full bg-[#222222]">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title || movie.name || "Movie poster"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 240px"
                          loading="eager"
                          unoptimized
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
