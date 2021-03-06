import * as React from "react";

export function buildOptions<T>(label: string, items: T[], valueFactory: (t: T) => string | number, labelFactory: (t:T)  => string){
  let options = [<option key={`blank`} value="" disabled={true}>{label}</option>];
  items && items.forEach((d, idx) => {
    options.push(<option key={idx} value={valueFactory(d)}>{labelFactory(d)}</option>);
  })
  return options;
}
