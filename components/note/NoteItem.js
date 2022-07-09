import Note from "./Note";

function NoteItem({ files, auth, subjects }) {
   return (
      <div>
         <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {files.map(
               ({
                  _id,
                  title,
                  classe,
                  subject,
                  file,
               }) => (
                  <Note
                     key={_id}
                     id={_id}
                     title={title}
                     classe={classe}
                     auth={auth}
                     file={file}
                     subject={subject}
                     subjects={subjects}
                  />
               ),
            )}
            <div className="h-20" />
         </div>
      </div>
   );
}

export default NoteItem;
