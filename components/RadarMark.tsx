interface Props {
  size?: number;
  withPad?: boolean;
}

export default function RadarMark({ size = 18, withPad = true }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r={withPad ? 1.5 : 1.5} fill="currentColor" />
    </svg>
  );
}
