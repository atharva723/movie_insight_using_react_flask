import React from "react";

interface GenreChipsProps {
  genres: string[];
}

export function GenreChips({ genres }: GenreChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-surface text-foreground text-body rounded-full border border-border"
        >
          {genre}
        </span>
      ))}
    </div>
  );
}
