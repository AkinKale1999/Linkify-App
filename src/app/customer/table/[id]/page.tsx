// export default function Page({ id }: { id: number }) {
//     console.log(id);

//   return <h1>My Page {id}</h1>
// }
"use client";
import Users from "../../users/[id]/page";
const Page = () => {
  return (
    <div>
      <ul style={{ margin: "0", padding: "0" }}>
        <li style={{ listStyle: "none" }}>{<Users />}</li>
      </ul>
    </div>
  );
};

export default Page;
