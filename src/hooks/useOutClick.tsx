import { useEffect, useRef } from "react";

type AllowedElement = HTMLDivElement;

export const useOutClick= <T extends AllowedElement>(callback: () => void) => {
   const ref = useRef<T>(null);

   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if(!ref.current) {
          return;
        }

        if(!event.target) {
          return;
        }

        if (!ref.current.contains(event.target as T)) {
          callback();
        }
      };

      window.addEventListener("mousedown", handleClick);

      return () => {
         window.removeEventListener("mousedown", handleClick);
      };
   }, [callback]);

   return ref;
};