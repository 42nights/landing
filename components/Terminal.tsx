interface Line {
  prompt: string; // e.g. '$' or '▶'
  cmd?: string; // typed command (data-typed)
  out?: string; // output line text (no command)
  outClass?: 'ok' | 'muted';
}

interface Props {
  title: string;
  lines: Line[];
}

export default function Terminal({ title, lines }: Props) {
  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal-bar">
        <span className="dot d-r" />
        <span className="dot d-y" />
        <span className="dot d-g" />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body" id="terminal-body">
        {lines.map((line, i) =>
          line.cmd ? (
            <div className="t-line" key={i}>
              <span className="prompt">{line.prompt}</span> <span className="cmd" data-typed={line.cmd} />
            </div>
          ) : (
            <div
              className={`t-line out${line.outClass ? ' ' + line.outClass : ''}`}
              key={i}
            >
              <span>{line.out}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
