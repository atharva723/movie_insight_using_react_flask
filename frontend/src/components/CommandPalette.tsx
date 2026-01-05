import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Film, User, Building2 } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (title: string) => void; // ✅ NEW
}

export function CommandPalette({
  open,
  onOpenChange,
  onSearch,
}: CommandPaletteProps) {
  const movies = [
    "Inception",
    "Interstellar",
    "The Dark Knight",
    "Avatar",
    "Titanic",
  ];

  const talent = [
    "Leonardo DiCaprio",
    "Robert Downey Jr.",
    "Scarlett Johansson",
    "Brad Pitt",
  ];

  const studios = [
    "Paramount Pictures",
    "Universal Studios",
    "Warner Bros",
    "Sony Pictures",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border p-0 max-w-2xl">
        <Command className="bg-surface text-foreground">
          <CommandInput
            placeholder="Search movies, talent, studios..."
            className="text-body text-foreground placeholder:text-muted"
          />

          <CommandList>
            <CommandEmpty className="text-body text-muted py-6 text-center">
              No results found.
            </CommandEmpty>

            {/* 🎬 MOVIES */}
            <CommandGroup heading="Movies" className="text-label text-muted">
              {movies.map((movie) => (
                <CommandItem
                  key={movie}
                  className="text-body text-foreground hover:bg-background cursor-pointer"
                  onSelect={() => onSearch(movie)} // ✅ CALL FLASK
                >
                  <Film className="w-4 h-4 mr-3 text-primary" strokeWidth={2} />
                  {movie}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* 👤 TALENT (UI ONLY FOR NOW) */}
            <CommandGroup heading="Talent" className="text-label text-muted">
              {talent.map((person) => (
                <CommandItem
                  key={person}
                  className="text-body text-foreground hover:bg-background cursor-pointer"
                >
                  <User className="w-4 h-4 mr-3 text-secondary" strokeWidth={2} />
                  {person}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* 🏢 STUDIOS (UI ONLY FOR NOW) */}
            <CommandGroup heading="Studios" className="text-label text-muted">
              {studios.map((studio) => (
                <CommandItem
                  key={studio}
                  className="text-body text-foreground hover:bg-background cursor-pointer"
                >
                  <Building2 className="w-4 h-4 mr-3 text-info" strokeWidth={2} />
                  {studio}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
