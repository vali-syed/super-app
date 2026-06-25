'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function NewsWidget() {
    const [articles, setArticles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchNews() {
            try {
                const apiKey = process.env.NEXT_PUBLIC_WORLD_NEWS_API_KEY;

                if (!apiKey) {
                    throw new Error('Missing World News API key.');
                }

                const response = await fetch(
                    'https://api.worldnewsapi.com/top-news?source-country=in&language=en&date=2026-06-09',
                    {
                        method: 'GET',
                        headers: {
                            'x-api-key': apiKey
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                const flattenedArticles = (data?.top_news || []).flatMap((group) => group?.news || []);

                setArticles(flattenedArticles);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news.');
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    useEffect(() => {
        if (articles.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 60000);

        return () => clearInterval(interval);
    }, [articles]);

    if (loading) {
        return (
            <div className="w-full max-w-[463px] h-[700px] rounded-3xl overflow-hidden bg-black text-white flex items-center justify-center">
                Loading news...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-[463px] h-[700px] rounded-3xl overflow-hidden bg-black text-red-400 flex items-center justify-center">
                {error}
            </div>
        );
    }

    const article = articles[currentIndex];

    return (
        <div className="w-full max-w-[463px] h-[700px] lg:h-[907px] rounded-3xl overflow-hidden bg-black">
            <div className="relative h-[260px] lg:h-[300px]">
                {article?.image ? (
                    <Image
                        src={article.image}
                        alt={article.title || 'News article'}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="bg-gray-700" />
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-[#000000]/60 p-4">
                    <p className="text-[#ffffff] text-lg lg:text-xl font-semibold line-clamp-2">
                        {article?.title}
                    </p>
                    <p className="text-[#ffffff] text-sm mt-2">
                        {article?.publish_date}
                    </p>
                </div>
            </div>

            <div className="p-5 lg:p-6 h-[440px] lg:h-[607px] bg-[#ffffff] overflow-y-auto">
                <p className="text-[#272727] font-[18px] leading-7 text-base break-words">
                    {article?.summary || article?.text}
                </p>
            </div>
        </div>
    );
}
