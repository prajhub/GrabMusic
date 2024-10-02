"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getUserProfile,
  createPlaylist,
  addTracksToPlaylist,
} from "@/lib/spotify-api";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Error from "next/error";

interface Track {
  track: {
    uri: string;
  };
}

interface CreatePlaylistProps {
  existingTracks: Track[];
}

export default function CreatePlaylist({
  existingTracks,
}: CreatePlaylistProps) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,

    retry: false,

    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: async (newPlaylist: { name: string; description: string }) => {
      const playlist = await createPlaylist(
        newPlaylist.name,
        data?.id,
        newPlaylist.description
      );
      const playlistId = playlist.id;

      const trackURIs = existingTracks.map((track) => track.track.uri);
      await addTracksToPlaylist(playlistId, trackURIs);
    },
    onSuccess: () => {
      toast.success("Playlist created successfully!");
      setDialogOpen(false);
    },
    onError: (error: Error) => {
      toast.error("Error creating playlist!");
      console.error(error);
    },
  });

  const handleCreatePlaylist = () => {
    if (!playlistName) {
      toast.error("Please enter a playlist name.");
      return;
    }
    mutation.mutate({ name: playlistName, description: playlistDescription });
  };

  return (
    <div>
      <Toaster />
      <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogTrigger asChild>
          <Button className="mt-4 px-6 py-2 tracking-wider bg-[#1db954] hover:bg-[#1aa34a] text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1db954]">
            Copy this{" "}
          </Button>
        </DialogTrigger>

        <DialogContent
          aria-labelledby="create-playlist-title"
          aria-describedby="create-playlist-description"
          className="bg-gray-900 text-white rounded-xl p-8 shadow-lg w-full max-w-lg"
        >
          <DialogHeader className="mb-6">
            <DialogTitle
              id="create-playlist-title"
              className="text-3xl font-bold text-center tracking-wide"
            >
              Create New Playlist
            </DialogTitle>
          </DialogHeader>

          {/* Form fields */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="playlist-name"
                className="block text-sm font-medium text-gray-400"
              >
                Playlist Name
              </label>
              <input
                type="text"
                id="playlist-name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="mt-2 w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent py-3 px-4"
                placeholder="Enter playlist name"
              />
            </div>

            <div>
              <label
                htmlFor="playlist-description"
                className="block text-sm font-medium text-gray-400"
              >
                Playlist Description
              </label>
              <textarea
                id="playlist-description"
                rows={3}
                className="mt-2 w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent py-3 px-4"
                placeholder="Add a description (optional)"
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Action buttons */}
          <DialogFooter className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="px-8 py-2 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePlaylist}
              className="px-8 py-2 bg-[#1db954] text-white rounded-full hover:bg-[#1aa34a] transition"
              disabled={mutation.isPending || isLoading}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
