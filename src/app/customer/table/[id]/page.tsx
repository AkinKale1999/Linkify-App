// export default function Page({ id }: { id: number }) {
//     console.log(id);
    
//   return <h1>My Page {id}</h1>
// }
"use client"
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams();  // Отримуємо параметр id з URL

  return (
    <div>
      <h1>Details for Post {id}</h1>
      {/* Тут можна відобразити деталі по id */}
    </div>
  );
};

export default Page;