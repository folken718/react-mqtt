import { useState } from "react";

function useCircularArray(size: number) {
  const [arr, setArr] = useState<number[]>(new Array(size));

  const addValue = (value: number) => {
    setArr((prevArray) => {
      const newArray = [...prevArray];
      if (newArray.length === size) {
        // Aquí se verifica si el arreglo está lleno
        newArray.shift(); // Si está lleno, se elimina el primer elemento
      }
      newArray.push(value);
      return newArray;
    });
  };

  return { arr, addValue };
}

export default useCircularArray;
