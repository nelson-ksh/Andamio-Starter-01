export function DataBox(props: {
  value: number;
  label: string;
}): JSX.Element {
  return (
    <div className="mx-auto flex max-w-xs flex-col gap-y-2 bg-gray-900 rounded-lg w-full py-6">
      <dt className="text-base leading-7 text-gray-400">{props.label}</dt>
      <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {props.value}
      </dd>
    </div>
  );
}
