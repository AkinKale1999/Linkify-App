'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter(); // Для програмного редіректу

  // Використовуємо useEffect для редіректу при першому рендері компонента
  useEffect(() => {
    router.push('/login'); // Зміна маршруту одразу після того, як компонент був відрендерений
  }, [router]);

  return null; // Не потрібно відображати жодного контенту
}

export default Home;