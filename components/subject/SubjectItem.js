import Subject from "./Subject";

function subjectItem({ subjects, auth }) {
   return (
      <div>
         <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:-mt-64 md:-mt-28">
            {subjects.map(({ _id, title, classe, thumbnail }) => (
               <Subject
                  key={_id}
                  id={_id}
                  title={title}
                  classe={classe}
                  auth={auth}
                  thumbnail={thumbnail}
               />
            ))}
            <div className="h-20" />
         </div>
      </div>
   );
}

export default subjectItem;
