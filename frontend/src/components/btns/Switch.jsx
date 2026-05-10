import React from 'react';

const Switch = () => {
  return (
    <label className="relative inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary">
      <input className="peer sr-only" id="AcceptConditions" type="checkbox" />
      <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[4px] ring-inset ring-white transition-all peer-checked:start-5 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent" />
    </label>
  );
}

export default Switch;
