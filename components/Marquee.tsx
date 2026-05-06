import { Fragment } from 'react';

interface Props {
  items: string[];
}

export default function Marquee({ items }: Props) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span>·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
