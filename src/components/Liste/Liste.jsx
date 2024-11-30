export default function Liste({ mylist, mylabels }) {
  console.log(mylist);
  console.log(mylabels);

  return (
    <>
      {mylist.map((listItem) => (
        <div key={listItem.username}>
          {listItem.username}
        </div>
      ))}
    </>
  );
}

// Durch user_data iterieren und in mylist speichern
// und mylabels soll label erhalten von der user_data liste
