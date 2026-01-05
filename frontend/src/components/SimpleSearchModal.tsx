import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

interface SimpleSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (movieTitle: string) => void;
}

export function SimpleSearchModal({ open, onOpenChange, onSearch }: SimpleSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Handle search
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
      onOpenChange(false);
    }
  };

  // Popular suggestions
  const suggestions = [
    "Inception",
    "The Dark Knight",
    "Interstellar",
    "The Matrix",
    "Pulp Fiction",
    "The Shawshank Redemption",
    "Oppenheimer",
    "Barbie",
    "Avatar",
    "Titanic"
  ];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 animate-in fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl animate-in zoom-in-95 fade-in">
        <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Search Movie</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-border">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type any movie name... (e.g., Oppenheimer, The Godfather)"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    onOpenChange(false);
                  }
                }}
              />
            </form>
            <p className="mt-2 text-xs text-muted-foreground">
              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to search
            </p>
          </div>

          {/* Suggestions */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Popular Movies</h3>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((movie) => (
                <button
                  key={movie}
                  onClick={() => {
                    onSearch(movie);
                    setSearchQuery("");
                    onOpenChange(false);
                  }}
                  className="px-4 py-2 text-left bg-accent/50 hover:bg-accent rounded-md transition-colors text-sm"
                >
                  {movie}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              You can search for ANY movie - classics, recent releases, indie films, foreign films, documentaries
            </p>
          </div>
        </div>
      </div>
    </>
  );
}