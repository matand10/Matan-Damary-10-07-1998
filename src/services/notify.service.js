import { toast } from 'react-toastify';

const notify = (text, theme) => {
    if (theme === 'light') {
        return toast.dark(text, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2500
        });
    } else {
        return toast(text, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2500
        });
    }
}


export const msgService = {
    notify
}