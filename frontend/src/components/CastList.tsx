import React from "react";

interface CastMember {
  name: string;
  character: string;
  profile_path?: string | null;
}

interface CastListProps {
  cast: CastMember[];
}

export function CastList({ cast }: CastListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {cast.map((actor, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center"
        >
          {/* Actor Image */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-3">
            {actor.profile_path ? (
              <img
                src={actor.profile_path}
                alt={actor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Actor Name */}
          <p className="text-sm font-medium text-foreground">
            {actor.name}
          </p>

          {/* Character Name */}
          <p className="text-xs text-muted">
            {actor.character}
          </p>
        </div>
      ))}
    </div>
  );
}
