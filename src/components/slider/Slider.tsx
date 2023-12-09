import { ChangeEvent } from "react";
import style from "./Slider.module.scss";

const Slider = ({
  min, max, value, label, onChange
}: SliderProps) => (
  <div className={style.slider}>
    <span>{label}</span>
    <input type="range" min={min} max={max} value={value} onChange={onChange} />
    <span>{value}</span>
  </div>
)

type SliderProps = {
  min: number;
  max: number;
  value: number;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default Slider;