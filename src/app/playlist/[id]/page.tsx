export default function PlaylistDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div>
      <p>Playlist {id}</p>
    </div>
  );
}
