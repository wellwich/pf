"use client";

import meta from "../images-meta";
import { useState } from "react";

const Gallery = () => {
    const initialImage = Object.keys(meta)[0] || "";
    const [image, setImage] = useState(initialImage);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // 画像をクリックしたときに画像を表示する
    const handleClick = (filename: string) => {
        setImage(filename);
    };

    // タグをクリックしたときにタグを選択する
    const handleTagClick = (tag: string | null) => {
        setSelectedTag(tag);
    };

    // タグのリストを取得する
    const tags = Array.from(new Set(Object.values(meta).flatMap(({ tags }) => tags)));

    // 選択されたタグに基づいてサムネイルをフィルタリングする
    const filteredMeta = selectedTag
        ? Object.entries(meta).filter(([_, { tags }]) => tags.includes(selectedTag))
        : Object.entries(meta);

    return (
        <div className="mx-auto p-4 w-full md:w-3/4 lg:w-3/5 flex flex-col items-center bg-gray-100 mt-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
                Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center">
                <div className="col-span-1 md:col-span-2 p-8">
                    {/*ここに画像を表示させる*/}
                    {image && (
                        <div className="w-full h-96 flex items-center justify-center">
                            <img src={`https://images.wellwi.ch/${image}`}
                                className="object-contain w-full h-full" />
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex flex-wrap gap-2 mb-4 text-sm p-8">
                        <button
                            className={`px-4 py-2 rounded-full ${selectedTag === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handleTagClick(null)}
                        >
                            All
                        </button>
                        {tags.map(tag => (
                            <button
                                key={tag}
                                className={`px-4 py-2 rounded-full ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-4 p-8 overflow-y-auto max-h-96">
                        {filteredMeta.map(([filename, { title, tags }]) => (
                            <div key={filename} className={`w-full h-24 flex items-center justify-center ${image === filename ? 'border-4 border-blue-500' : ''}`}>
                                <img src={`https://images.wellwi.ch/${filename}`}
                                    alt={title}
                                    className="object-cover w-full h-full cursor-pointer"
                                    onClick={() => handleClick(filename)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Gallery;