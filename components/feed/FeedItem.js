import Feed from "./Feed";
function FeedItem({ feeds, auth }) {
   return (
      <div className="grid grid-flow-row-dense md:mx-10 md:mt-10">
         {feeds.map(({ _id, title, classe, matter }) => (
            <Feed
               key={_id}
               id={_id}
               title={title}
               classe={classe}
               matter={matter}
               auth={auth}
            />
         ))}
      </div>
   );
}

export default FeedItem;
