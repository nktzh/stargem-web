import styles from './ButtonAuthorize.module.css';

interface ButtonAuthorizeProp {
    onclick: () => void;
}

export default function ButtonAuthorize({onclick}: ButtonAuthorizeProp) {
    return (
        <button
            className={styles.authorize}
            onClick={() => onclick()}
        >
            Авторизоваться в кленте
        </button>
    );
}