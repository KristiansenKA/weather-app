const Icon = ({
  icon
}: IconProps) => (
  <span className="material-symbols-outlined">
    {icon}
  </span>
)

type IconProps = {
  icon: string;
};

export default Icon;