import style from "./Spinner.module.scss";

const Spinner = () => (
  <div className={style.spinnerContainer}>
    <span className={style.spinner} />
  </div>
);

export default Spinner;
