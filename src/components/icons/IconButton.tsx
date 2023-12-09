import Icon from "@/components/icons/Icon";
import style from "./IconButton.module.scss";

const IconButton = ({ icon, onClick }: IconButtonProps) => (
  <button className={style.iconButton} onClick={onClick}>
    <Icon icon={icon} />
  </button>
);

type IconButtonProps = {
  icon: string;
  onClick: () => void;
};

export default IconButton;
