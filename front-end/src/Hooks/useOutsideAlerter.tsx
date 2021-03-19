import { Ref, useEffect, RefAttributes, ReactEventHandler } from "react";
/**
 * https://stackoverflow.com/a/42234988
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref: any, fn: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        fn?.();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 
export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}
*/
