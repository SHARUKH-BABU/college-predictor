import React from 'react'
import { toast } from 'react-toastify'

const Check = () => {
    const notify = () =>{
        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    return (
    <>
        <button onClick={notify}>
            CLICK ME
        </button>
    </>
  )
}

export default Check