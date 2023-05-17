import { ReactNode, useEffect, useState } from "react";

import { api } from "../../services/api";

import { ModalError } from "../ModalError";
import axios from "axios";

interface AxiosInterceptorProps {
  children: ReactNode;
}

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const errInterceptor = (error: Error) => {
      if(!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        setIsOpenModal(true);
      }

      return Promise.reject(error);
    }


    const interceptor = api.interceptors.response.use(null, errInterceptor);

    return () => api.interceptors.response.eject(interceptor);

  }, [])

  return (
    <>
      {children}
      {
        isOpenModal && 
          <ModalError closeModal={() => setIsOpenModal(!isOpenModal)} />
      }
    </>
  )

}
