import React from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./WidgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [newRelease, setNewRelease] = React.useState([]);

  React.useEffect(() => {
    if (artistID) {
      apiClient
        .get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          const a = res.data?.artists.slice(0, 4);
          setSimilar(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data?.playlists.items.slice(0, 4);
          setFeatured(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 4);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistID]);

  let randomWidgetes = Math.floor(Math.random() * 4)

  return (
    <div className="widgets-body flex">
        <WidgetCard title="Similar Artists" similar={similar} href={similar[randomWidgetes]?.external_urls?.spotify} />
        <WidgetCard title="Made For You" featured={featured} hasNavigate={true}  />
        <WidgetCard title="New Releases" newRelease={newRelease} href={newRelease[randomWidgetes]?.external_urls?.spotify} />
    </div>
  );
}