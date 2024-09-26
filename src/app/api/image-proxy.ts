export default async function handler(req: any, res: any) {
  try {
    const { imageUrl } = req.query;

    // Fetch the image
    const response = await fetch(imageUrl);

    // Check if the response is an image
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.startsWith("image")) {
      // Handle invalid content type
      res
        .status(400)
        .json({ error: "The requested resource isn't a valid image." });
      return;
    }

    // Return the image
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch the image." });
  }
}
