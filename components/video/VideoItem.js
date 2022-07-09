import Video from "./Video";

function VideoItem({ videos, auth, subjects }) {
   return (
      <div>
         <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {videos.map(
               ({
                  _id,
                  title,
                  classe,
                  url,
                  thumbnail,
                  subject,
                  description,
               }) => (
                  <Video
                     key={_id}
                     id={_id}
                     title={title}
                     url={url}
                     classe={classe}
                     auth={auth}
                     thumbnail={thumbnail}
                     subject={subject}
                     subjects={subjects}
                     description={description}
                  />
               ),
            )}
            <div className="h-20" />
         </div>
      </div>
   );
}

export default VideoItem;
